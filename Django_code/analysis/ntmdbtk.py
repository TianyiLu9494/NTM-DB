import sys
import os
import argparse
import subprocess
from Bio import SeqIO
from Bio import AlignIO
from Bio.Phylo.TreeConstruction import DistanceCalculator
from Bio.Align import MultipleSeqAlignment
from contextlib import contextmanager
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

def get_top_MAS(alignment_path, top_number = 20):
    # 读入多序列比对文件
    with open(alignment_path,'r') as mafft:
        alignment = AlignIO.read(mafft, "fasta")

    # 构建距离矩阵对象
    calculator = DistanceCalculator('identity')
    dm = calculator.get_distance(alignment)

    # 找到query序列在alignment中的索引位置
    query_name = "query_16S_rRNA"
    if alignment[-1].id == query_name:
        index = len(alignment) - 1
    else:
        for i, seq in enumerate(alignment):
            if seq.id == query_name:
                query_index = i

    row = dm[index]
    sorted_indices = sorted(range(len(row)), key=lambda i: row[i])[:int(top_number)]

    # 提取序列并构建新的多序列比对对象
    records = [alignment[i] for i in sorted_indices]
    new_alignment = MultipleSeqAlignment(records)

    # 写入文件
    out_alignment_path = alignment_path.replace('.aln', f'.top{top_number}.aln')
    with open(out_alignment_path,'w') as out:
        AlignIO.write(new_alignment,out,'fasta')
    return out_alignment_path



def build_tree_wf(input_genome,output_dir,number_of_nodes,cpus):
    # Identify rRNA genes with barrnap
    input = input_genome
    barrnap_args = ['barrnap', '--kingdom', 'bac', '--threads', '4', '--lencutoff', '0.8', '--evalue', '1e-06', '--outseq', f'{output_dir}/rRNA.fasta', input]
    barrnap = subprocess.run(barrnap_args,capture_output=True, text=True)
    if barrnap.returncode != 0:
        print(barrnap.stderr)
        sys.exit(1) 
    # Merge 16S rRNA sequence of query genome to the reference 
    # 1. loead reference 16S rRNA sequences
    path_reference_16S_rRNA = os.path.join(BASE_DIR,'analysis','static','rRNA_REF','all_16S_rRNA.fasta')
    with open(path_reference_16S_rRNA,'r') as ref:
        ref_records = list(SeqIO.parse(ref,'fasta'))
    # 2. load query 16S rRNA sequence
    with  open(f'{output_dir}/rRNA.fasta','r') as barrnap_out:
        records = list(SeqIO.parse(barrnap_out,'fasta'))
        if len(records) == 0:
            print("No rRNA genes found in genome")
            sys.exit(1)
        for rec in records:
            if rec.id.startswith('16S'):
                rec.id = 'query_16S_rRNA'
                ref_records.append(rec)
                break
    # 3. write to file
    with open(f'{output_dir}/16S.fna','w') as out:
        count = SeqIO.write(ref_records,out,'fasta')
        print(f"In total {count} 16S has been written")
    # Align rRNA genes with mafft
    mafft_args = ['mafft', '--auto','--thread', '4', f'{output_dir}/16S.fna']
    mafft = subprocess.run(mafft_args,capture_output=True, text=True)
    if mafft.returncode != 0:
        print(mafft.stderr)
        sys.exit(1)

    alignment_path = f'{output_dir}/16S.aln'
    with open(alignment_path,'w') as out:
        out.write(mafft.stdout)
    # Get top {number_of_nodes} sequences with highest identity
    alignment_path = get_top_MAS(alignment_path, top_number = number_of_nodes)
    # Infer tree with iqtree
    iqtree_args = ['iqtree', '-s', alignment_path, '-nt', str(cpus), '-m', 'GTR+G', '-B', '1000', '-pre', f'{output_dir}/16S']
    iqtree = subprocess.run(iqtree_args,capture_output=True, text=True)
    if iqtree.returncode != 0:
        print(iqtree.stderr)
        sys.exit(1)

#     # Infer tree with fasttree
#     fasttree_args = ['FastTree', '-nt', '-gtr', '-gamma', '-lg', '-boot', '100', f'{output_dir}/16S.aln']
#     fasttree = subprocess.run(fasttree_args,capture_output=True, text=True)
#     if fasttree.returncode != 0:
#         print(fasttree.stderr)
#         sys.exit(1)
#     else:
#         with open(f'{output_dir}/16S.tree','w') as out:
#             out.write(fasttree.stdout)

def build_tree_ref(input_genome, out_dir, cpus, ref):
    # Identify rRNA genes with barrnap
    input = input_genome
    barrnap_args = ['barrnap', '--kingdom', 'bac', '--threads', '4', '--lencutoff', '0.8', '--evalue', '1e-06', '--outseq', f'{out_dir}/rRNA.fasta', input]
    barrnap = subprocess.run(barrnap_args,capture_output=True, text=True)
    if barrnap.returncode != 0:
        print(barrnap.stderr)
        sys.exit(1) 
    # Merge 16S rRNA sequence of query genome to the reference 
    # 1. loead reference 16S rRNA sequences
    with open(ref,'r') as ref:
        ref_records = list(SeqIO.parse(ref,'fasta'))
    # 2. load query 16S rRNA sequence
    with  open(f'{out_dir}/rRNA.fasta','r') as barrnap_out:
        records = list(SeqIO.parse(barrnap_out,'fasta'))
        if len(records) == 0:
            print("No rRNA genes found in genome")
            sys.exit(1)
        for rec in records:
            if rec.id.startswith('16S'):
                rec.id = 'query_16S_rRNA'
                ref_records.append(rec)
                break
    # 3. write to file
    with open(f'{out_dir}/16S.fna','w') as out:
        count = SeqIO.write(ref_records,out,'fasta')
        print(f"In total {count} 16S has been written")
    # Align rRNA genes with mafft
    mafft_args = ['mafft', '--auto','--thread', '4', f'{out_dir}/16S.fna']
    mafft = subprocess.run(mafft_args,capture_output=True, text=True)
    if mafft.returncode != 0:
        print(mafft.stderr)
        sys.exit(1)

    alignment_path = f'{out_dir}/16S.aln'
    with open(alignment_path,'w') as out:
        out.write(mafft.stdout)
    # Infer tree with iqtree
    iqtree_args = ['iqtree', '-s', alignment_path, '-nt', str(cpus), '-m', 'GTR+G', '-B', '1000', '-pre', f'{out_dir}/16S']
    iqtree = subprocess.run(iqtree_args,capture_output=True, text=True)
    if iqtree.returncode != 0:
        print(iqtree.stderr)
        sys.exit(1)
    
    
def MLST(input_genome,output_dir,cpus):
    # Identify MLST type with mlst
    mlst_args = ['mlst', '--threads', str(cpus), '--scheme', 'mycobacteria_2', input_genome]
    mlst = subprocess.run(mlst_args,capture_output=True, text=True)
    if mlst.returncode != 0:
        print(mlst.stderr)
        sys.exit(1)
    else:
        print(mlst.stdout)
        with open(f'{output_dir}/MLST.txt','w') as out:
            out.write(mlst.stdout)

# def classify(input_genome,output_dir,cpus):
#     # classify with ntmdbtk
#     ntmdbtk_args = ['ntmdbtk', 'classify', '--input_genome', input_genome, '--out_dir', output_dir, '--cpus', str(cpus)]

def resistance(input_genome,output_dir,cpus):
    # resistance with abricate
    abricate_args = ['abricate', '--db', 'card', input_genome]
    abricate = subprocess.run(abricate_args,capture_output=True, text=True)
    if abricate.returncode != 0:
        print(abricate.stderr)
        sys.exit(1)
    else:
        print(abricate.stdout)
        with open(f'{output_dir}/resistance.txt','w') as out:
            out.write(abricate.stdout)

def virulence(input_genome,output_dir,cpus):
    # virulence with abricate
    abricate_args = ['abricate', '--db', 'vfdb', input_genome]
    abricate = subprocess.run(abricate_args,capture_output=True, text=True)
    if abricate.returncode != 0:
        print(abricate.stderr)
        sys.exit(1)
    else:
        print(abricate.stdout)
        with open(f'{output_dir}/virulence.txt','w') as out:
            out.write(abricate.stdout)

def print_help():
    print('''\
              ...::: NTMDB-Tk v%s :::...
  Workflows:
    build_tree_wf -> Infer rRNA (by default 16S rRNA) tree and determine taxonomy base on phylogenetic placement.
                     (rRNA_extraction -> align -> build——tree -> classify_taxonomy)
    MLST          -> Determine MLST of genome
    resistance    -> Determine antibiotic resistance genes of genomes
    virulence     -> Determine virulence factors genes of genomes
  Use: ntmdbtk <command> -h for command specific help
    ''' % "1.0.0" ) # % __version__)


@contextmanager
def subparser(parser, name, desc):
    yield parser.add_parser(name, conflict_handler='resolve', help=desc)

def get_main_parser():
    main_parser = argparse.ArgumentParser(
        prog='ntmdbtk', add_help=False, conflict_handler='resolve')
    sub_parsers = main_parser.add_subparsers(help="--", dest='subparser_name')

    # Build 16s rRNA tree workflow 
    with subparser(sub_parsers, 'build_tree_wf', 'Build 16s rRNA tree') as parser:
        parser.add_argument('--input_genome', type=str, required=True,
                       help='Path to the genome to process.')
        parser.add_argument('--number_of_nodes', type=int, default=25,
                       help='Number of nodes in the tree.')
        parser.add_argument('--out_dir', type=str, required=True,
                       help='Output directory.')
        parser.add_argument('--cpus', type=int, default=1,)

    # Build 16s rRNA tree with defined reference
    with subparser(sub_parsers, 'build_tree_ref', 'Build 16s rRNA tree with defined reference') as parser:
        parser.add_argument('--input_genome', type=str, required=True,
                       help='Path to the genome to process.')
        parser.add_argument('--ref', type=str, help='Reference 16s rRNA gene.')
        parser.add_argument('--out_dir', type=str, required=True,
                       help='Output directory.')
        parser.add_argument('--cpus', type=int, default=1,)
    
    # MLST
    with subparser(sub_parsers, 'MLST', 'Determine MLST of genome') as parser:
        parser.add_argument('--input_genome', type=str, required=True,
                       help='Path to the genome to process.')
        parser.add_argument('--out_dir', type=str, required=True,
                       help='Output directory.')
        parser.add_argument('--cpus', type=int, default=1,)
        
    # with subparser(sub_parsers, 'classify', 'Determine taxonomic classification of genome') as parser:
    #     parser.add_argument('--input_genome', type=str, required=True,
    #                    help='Path to the genome to process.')
    #     parser.add_argument('--out_dir', type=str, required=True,
    #                    help='Output directory.')
    #     parser.add_argument('--cpus', type=int, default=1,)
        
    with subparser(sub_parsers, 'resistance', 'Determine antibiotic resistance of genomes') as parser:
        parser.add_argument('--input_genome', type=str, required=True,
                       help='Path to the genome to process.')
        parser.add_argument('--out_dir', type=str, required=True,
                       help='Output directory.')
        parser.add_argument('--cpus', type=int, default=1,)
        
    with subparser(sub_parsers, 'virulence', 'Determine virulence factors of genomes') as parser:
        parser.add_argument('--input_genome', type=str, required=True,
                       help='Path to the genome to process.')
        parser.add_argument('--out_dir', type=str, required=True,
                       help='Output directory.')
        parser.add_argument('--cpus', type=int, default=1,)
    return main_parser

def main():
    args = get_main_parser().parse_args()
    if args.subparser_name == 'build_tree_wf':
        build_tree_wf(args.input_genome, args.out_dir, args.cpus, args.number_of_nodes)
    elif args.subparser_name == 'build_tree_ref':
        build_tree_ref(args.input_genome, args.out_dir, args.cpus, args.ref)
    elif args.subparser_name == 'MLST':
        MLST(args.input_genome, args.out_dir, args.cpus)
    # elif args.subparser_name == 'classify':
    #     classify(args.input_genome, args.out_dir, args.cpus)
    #     print("classify")
    elif args.subparser_name == 'resistance':
        resistance(args.input_genome, args.out_dir, args.cpus)
    elif args.subparser_name == 'virulence':
        virulence(args.input_genome, args.out_dir, args.cpus)
    else:
        print_help()

if __name__ == '__main__':
    main()