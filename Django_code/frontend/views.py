from django.shortcuts import render
from django.http import FileResponse
from django.http import HttpResponse
from django.conf import settings
from api.models import Species,Strains,VF_Genes,AMR_Genes,VF_Sequences,AMR_Sequences,DST,Download_files
import os
# from .file_hanlder import format_MSA_html,format_MSA_html2 #因为不按照alignment matrix 展示，所以不需要这个了
# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'index.html')

def browse_by_species(request, *args, **kwargs):
    return render(request, "browse/species.html")

def browse_by_strains(request, *args, **kwargs):
    return render(request, "browse/strains.html")

def browse_by_genes_rs(request, *args, **kwargs):
    return render(request, "browse/genes_rs.html")

def browse_by_genes_vf(request, *args, **kwargs):
    return render(request, "browse/genes_vf.html")

def browse_dst(request, *args, **kwargs):
    return render(request, "browse/dst.html")


def species(request, spec_name, *args, **kwargs):
    species = Species.objects.get(name = spec_name)
    sub_species = Species.objects.filter(parent_taxid = species.taxid)
    files = Download_files.objects.get(species=spec_name)
    return render(request, 'species/species_template.html', {'species':species,'sub_species':sub_species,'files':files})

def strains(request, accession, *args, **kwargs):
    strain = Strains.objects.get(accession = accession)
    dict_to_render = {'strain':strain}
    vf_sequences = VF_Sequences.objects.filter(strain_id = accession)
    vf_genes =  [{"vfg_id":vf.vfg_id,"gene_name":vf.vfg.gene_name,"vf_id":vf.vfg.vf_id,"vf_name":vf.vfg.vf_name,'vf_full_name':vf.vfg.vf_full_name,"vfc_id":vf.vfg.vfc_id,"vfc_name":vf.vfg.vfc_name,"coverage":vf.coverage,"identity":vf.identity} for vf in vf_sequences]
    dict_to_render['vf_genes'] = vf_genes
    amr_sequences = AMR_Sequences.objects.filter(strain_id = accession)
    amr_genes =  [{"card_accession":amr.card_id,"gene_name":amr.gene_name,"card_id":amr.card.card_id,"mechanism":amr.card.mechanism,'mechanism_ontology_id':amr.card.mechanism_ontology_id,"drug_class":amr.card.drug_class,"coverage":amr.coverage,"identity":amr.identity} for amr in amr_sequences]
    dict_to_render['amr_genes'] = amr_genes
    if strain.DST_test:
        DST_object = DST.objects.filter(strain = accession).values()[0]
        dict_to_render['DST'] = [{ 'drug':key, "result": value} for key,value in DST_object.items() if value != None and key != 'strain' ]
    else:
        dict_to_render['DST'] = "Not tested"

    if strain.representative == "Type strain & Representative Genome":
        dict_to_render['Representative_Strain'] = "Yes"
        dict_to_render['Type_Strain'] = "Yes"
    elif strain.representative == "Type strain Genome":
        dict_to_render['Representative_Strain'] = "No"
        dict_to_render['Type_Strain'] = "Yes"
    elif strain.representative == "Representative Genome":
        dict_to_render['Representative_Strain'] = "Yes"
        dict_to_render['Type_Strain'] = "No"
    else:
        dict_to_render['Representative_Strain'] = "No"
        dict_to_render['Type_Strain'] = "No"
    return render(request, 'strains/strain_template.html', dict_to_render)

def gene(request, *args, **kwargs):
    return render(request, 'gene/gene_template.html')

def resistance_gene(request,card_id, *args, **kwargs):
    amr_gene = AMR_Genes.objects.get(card_accession = card_id)
    # align_html = format_MSA_html2(f"frontend/{amr_gene.msa_file_path}")
    return render(request, 'gene/resistance_gene.html', {'amr_gene':amr_gene})

def virulence_gene(request,vfg_id, *args, **kwargs):
    vf_gene = VF_Genes.objects.get(vfg_id = vfg_id)
    # align_html = format_MSA_html2(f"frontend/{vf_gene.msa_file_path}")
    return render(request, 'gene/vf_gene.html', {'vf_gene':vf_gene})

def mlst(request, *args, **kwargs):
    return render(request, 'mlst.html')

def mlst_by_species(request, *args, **kwargs):
    return render(request, 'mlst_by_species.html')

def search_main(request, *args, **kwargs):
    return render(request, 'search/search_main.html')
def search_result(request, *args, **kwargs):
    return render(request, 'search/search_result.html')



def test_vf(request, *args, **kwargs):
    return render(request, 'Test/test_vf_heatmap.html')

def test_pan_rs(request, *args, **kwargs):
    return render(request, 'Test/test_pan_rs.html')
def test_pan_vf(request, *args, **kwargs):
    return render(request, 'Test/test_pan_vf.html')
def test_pan_alternative(request, *args, **kwargs):
    return render(request, 'Test/test_pan_alternative.html')

def test_aln_freq(request, *args, **kwargs):
    return render(request, 'Test/test_aln.html')

def test_extends(request, *args, **kwargs):
    return render(request, 'test_extends.html')

def test_page(request, *args, **kwargs):
    return render(request, "frontend/index.html")

def documentation(request, *args, **kwargs):
    return render(request, "documentation.html")

def download(request, *args, **kwargs):
    species = Download_files.objects.all().order_by('-strains_count')
    return render(request, "download.html", {'species': species})

def download_files(request, spec_name, *args, **kwargs):
    Downloads_dir = os.path.join(settings.BASE_DIR, 'frontend/static/Downloads')
    species = Download_files.objects.get(species=spec_name)
    file = request.GET.get('file',None)
    if file == 'pan_genome_fasta':
        relative_file_path = species.pan_genome_fasta
        file_name = f"M.{spec_name}_PanGenome.fasta"
    elif file == 'core_fasta':
        relative_file_path = species.core_fasta
        file_name = f"M.{spec_name}_Core.fasta"
    elif file == 'dispensable_fasta':
        relative_file_path = species.dispensable_fasta
        file_name = f"M.{spec_name}_Dispensable.fasta"
    elif file == 'unique_fasta':
        relative_file_path = species.unique_fasta
        file_name =f"M.{spec_name}_Unique.fasta"
    elif file == 'VF_csv':
        relative_file_path = species.VF_csv
        file_name = f"M.{spec_name}_VF_gene.csv"
    elif file == 'AMR_csv':
        relative_file_path = species.AMR_csv
        file_name = f"M.{spec_name}_AMR_gene.csv"
    elif file == 'MLST_csv':
        relative_file_path = species.MLST_csv
        file_name = f"M.{spec_name}_MLST_gene.csv"
    else:
        return HttpResponse("File not found")
    file_path = os.path.join(Downloads_dir, relative_file_path)
    # 打开文件并创建FileResponse对象
    file_object = open(file_path, 'rb')
    response = FileResponse(file_object)
    # 设置响应的内容类型（MIME类型）
    response['Content-Type'] = 'text/plain'  # 指定为文本文件
    # 设置响应的头信息，指定文件名
    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response

def download_assembly(request, strain_accession, *args, **kwargs):
    strains = Strains.objects.get(accession = strain_accession)
    file_path = os.path.join(settings.STATIC_ROOT ,strains.assembly_file)
    file_name = strains.accession + "_genome_assembly.fasta"
    # 打开文件并创建FileResponse对象
    file_object = open(file_path, 'rb')
    response = FileResponse(file_object)
    # 设置响应的内容类型（MIME类型）
    response['Content-Type'] = 'text/plain'  # 指定为文本文件
    # 设置响应的头信息，指定文件名
    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response

def ntmdb(request, *args, **kwargs):
    return render(request, "ntmdb.html")
