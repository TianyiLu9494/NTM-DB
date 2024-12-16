import os
import sys
from django.conf import settings
import subprocess
from Bio import SeqIO
from Bio.SeqRecord import SeqRecord
from Bio import AlignIO
from Bio.Phylo.TreeConstruction import DistanceCalculator
from Bio.Align import MultipleSeqAlignment
from contextlib import contextmanager
from pathlib import Path
conda_prefix = os.environ.get('CONDA_PREFIX')
Rscript_path = conda_prefix + "/bin/Rscript"
ggtree_script = os.path.join(settings.BASE_DIR, "analysis/visualize_tree.r")

class FileHandler(object):
    def __init__(self, query_id):
        self.file_name = "Query_assembly.fasta"
        self.file_dir = os.path.join(settings.MEDIA_ROOT, 'temp'+query_id)
        self.file_path = os.path.join(self.file_dir, self.file_name)
        
    def get_reference_16S(self,species_list):
        """
        Get the 16S from type strain of selected species.
        If no species selected, it return all the 16S rRNA sequence records.
        """
        if len(species_list) > 0:
            records = []
            output_dir = os.path.join(self.file_dir, 'build_tree')
            ref_path_list = [os.path.join(settings.STATIC_ROOT, "rRNA_REF/16SrRNA/",f"M.{spec}_16S_rRNA.fasta") for spec in species_list]
            for each in ref_path_list:
                with open(each,'r') as ref_rec_file:
                    records += [SeqIO.read(ref_rec_file,'fasta')]
        else:
            all_ref_path = f"{settings.STATIC_ROOT}rRNA_REF/all_16S_rRNA.fasta"
            print(all_ref_path)
            with open(all_ref_path,'r') as ref:
                records = list(SeqIO.parse(ref,'fasta'))
        return records

    def get_16s_rRNA(self,input_path,output_path):
        """
        Apply barrnap to extract 16s rRNA sequence

        input_path : the path to the input genome file
        output_path : the path to the output directory
        """
        output_gff_path = f'{output_path}/query_rRNA.gff'
        output_fasta_path = f'{output_path}/query_rRNA.fasta'
        barrnap_args = ['barrnap', '--kingdom', 'bac', '--threads', '4', '--lencutoff', '0.8', '--evalue', '1e-06', '--outseq', f'{output_path}/query_rRNA.fasta', input_path]
        barrnap = subprocess.run(barrnap_args,capture_output=True, text=True)
        if barrnap.returncode != 0:
            print(barrnap.stderr)
            sys.exit(1)
        else:
            with open(output_gff_path,'w') as out:
                out.write(barrnap.stdout)
            # load query 16S rRNA sequence
            with  open(output_fasta_path,'r') as barrnap_out:
                records = list(SeqIO.parse(barrnap_out,'fasta'))
                if len(records) == 0:
                    print("No rRNA genes found in genome")
                    sys.exit(1)
                for rec in records:
                    if rec.id.startswith('16S'):
                        rec.id = 'query_16S_rRNA'
                        return rec

    def extract_gene_sequence(self,seq_rec,info):
        sequence = seq_rec.seq[info['start']-1:info['end']]
        seq_id = f"{info['gene_name']}-{info['seq']}({info['strand']})[{info['start']}:{info['end']}]"
        if info['strand'] == "-":
            return SeqRecord(sequence.reverse_complement(),id=seq_id,description=info['product'])
        else:
            return SeqRecord(sequence,id=seq_id,description=info['product'])
    

    def get_gene(self,input_tsv,output_file): 
        with open(self.file_path,'r') as fa:
            input_recs = SeqIO.to_dict(SeqIO.parse(fa,'fasta'))
        out_recs = []
        with open(input_tsv,'r') as f1:
            for line in f1.readlines():
                line_splite = line.split("\t")
                if line.startswith("#"):
                    start_idx = line_splite.index('START')
                    end_idx = line_splite.index('END')
                    sequence_idx = line_splite.index("SEQUENCE")
                    strand_idx = line_splite.index('STRAND')
                    gene_idx = line_splite.index("GENE")
                    product_idx = line_splite.index('PRODUCT')
                    resistance_idx = line_splite.index('RESISTANCE\n')
                else:
                    info = {
                        "start" : int(line_splite[start_idx]),
                        "end" : int(line_splite[end_idx]),
                        "seq" : line_splite[sequence_idx],
                        "strand" : line_splite[strand_idx],
                        "gene_name" : line_splite[gene_idx],
                        "product" : line_splite[product_idx]
                    }
                    out_recs += [self.extract_gene_sequence(input_recs[info['seq']],info)]
        with open(output_file,'w') as outfile:
            count = SeqIO.write(out_recs,outfile,'fasta')

    def build_MSA(self,records,out_path):
        # temp write to file
        sequence_file = f'{out_path}.fna'
        with open(sequence_file,'w') as out:                
            count = SeqIO.write(records,out,'fasta')
            print(f"In total {count} 16S has been written")
        
        # Align rRNA genes with mafft
        mafft_args = ['mafft', '--auto','--thread', '4', sequence_file]
        mafft = subprocess.run(mafft_args,capture_output=True, text=True)
        if mafft.returncode != 0:
            print(mafft.stderr)
            sys.exit(1)
        alignment_path = sequence_file.replace('fna','aln')
        with open(alignment_path,'w') as out:
            out.write(mafft.stdout)
        os.remove(sequence_file)
        return alignment_path

    def get_top_MSA(self,records, top_number = 20):
        all_16s_file_path = f'{self.file_dir}/temp_16S'
        alignment_path = self.build_MSA(records,all_16s_file_path)
        
        # 读入多序列比对文件
        with open(alignment_path,'r') as mafft:
            alignment = AlignIO.read(mafft, "fasta")

        # 构建距离矩阵对象
        calculator = DistanceCalculator('identity')
        dm = calculator.get_distance(alignment)

        # 找到query序列在alignment中的索引位置
        query_name = "query_16S_rRNA"
        for i, seq in enumerate(alignment):
            if seq.id == query_name:
                query_index = i
                break

        row = dm[query_index]
        sorted_indices = sorted(range(len(row)), key=lambda i: row[i])[:int(top_number)]

        # 提取序列并构建新的多序列比对对象
        records = [alignment[i] for i in sorted_indices]
        return records

    def run_build_tree_workflow(self, number_of_nodes=0, species_list=[]):
        output_dir = os.path.join(self.file_dir, 'build_tree')
        os.makedirs(output_dir)
        query = [self.get_16s_rRNA(self.file_path,output_dir)]
        if int(number_of_nodes)>0:
            records = query + self.get_reference_16S(species_list=[])
            query = self.get_top_MSA(records,number_of_nodes)
        if len(species_list) > 0:
            query = query + self.get_reference_16S(species_list)
        alignment_path = self.build_MSA(records=query,out_path=output_dir+"/Final_16S")
        # Infer tree with iqtree
        iqtree_args = ['iqtree', '-s', alignment_path, '-nt', str(8), '-m', 'GTR+G', '-bb', '1000', '-pre', f'{output_dir}/16S']
        iqtree = subprocess.run(iqtree_args,capture_output=True, text=True)
        tree_file_path = f'{output_dir}/16S.treefile'
        if iqtree.returncode != 0:
            print(iqtree.stderr)
            return {'build_tree_status':False,'build_tree_error':"iQtree ERROR:"+iqtree.stderr}
        elif os.path.exists(tree_file_path):
            ggtree_visual_args = [Rscript_path, ggtree_script, tree_file_path, f'{output_dir}/16S.tree.svg']
            if os.path.exists(ggtree_script) and os.path.exists(Rscript_path):
                ggtree = subprocess.run(ggtree_visual_args,capture_output=True, text=True)
                if ggtree.returncode != 0:
                    print(ggtree.stderr)
                    return {'build_tree_status':False,'build_tree_error':"ggtree ERROR:"+ggtree.stderr}
                return {'build_tree_status':True,'tree_file_path':tree_file_path, 'tree_visualize_path':f'{output_dir}/16S.tree.svg', '16S_fasta_path':f'{output_dir}/query_rRNA.fasta','16S_gff_path':f'{output_dir}/query_rRNA.gff'}
        else:
            {'build_tree_status':False,'build_tree_error':f"iQtree ERROR: tree file not find in {tree_file_path}"}
            
    def run_MLST(self):
        output_tsv_path = f'{self.file_dir}/MLST.txt'
        output_json_path = f'{self.file_dir}/MLST.json'
        MLST_args = ['mlst', '--threads', str(8), '--scheme', 'mycobacteria_2', '--json', output_json_path, self.file_path]
        MLST = subprocess.run(MLST_args,capture_output=True, text=True)
        if MLST.returncode != 0:
            return {'MLST_status': False, 'MLST_error': MLST.stderr}
        with open(output_tsv_path,'w') as out:
            out.write(MLST.stdout)
        return {'MLST_status': True,  'MLST_tsv_path': output_tsv_path,'MLST_json_path':output_json_path}

    def run_Resistance(self):
        AMR_args = ['abricate', '--threads', str(8), '--db', 'card', '--nopath', self.file_path]
        AMR = subprocess.run(AMR_args,capture_output=True, text=True)
        if AMR.returncode != 0:
            return {'Resistance_status': False, 'Resistance_error': AMR.stderr}
        output_tsv_path = f'{self.file_dir}/resistance.txt' 
        output_AMR_fasta_path = f'{self.file_dir}/resistance.fa'
        with open(output_tsv_path,'w') as out:
            out.write(AMR.stdout)
        self.get_gene(output_tsv_path, output_AMR_fasta_path)
        return {'Resistance_status': True, 'Resistance_tsv_path': output_tsv_path, 'Resistance_fasta_path':output_AMR_fasta_path}
        
    def run_Virulence(self):
        VFG_args = ['abricate', '--threads', str(8), '--db', 'vfdb', '--nopath', self.file_path]
        VFG = subprocess.run(VFG_args,capture_output=True, text=True)
        if VFG.returncode != 0:
            return {'Virulence_status': False, 'Virulence_error': VFG.stderr}
        output_tsv_path = f'{self.file_dir}/virulence.txt'
        output_VFG_fasta_path = f'{self.file_dir}/virulence.fa'
        with open(output_tsv_path,'w') as out:
            out.write(VFG.stdout)
        self.get_gene(output_tsv_path, output_VFG_fasta_path)
        return {'Virulence_status': True, 'Virulence_tsv_path': output_tsv_path,'Virulence_fasta_path':output_VFG_fasta_path}

    def delete_file(self):
        os.removedirs(self.file_dir)
