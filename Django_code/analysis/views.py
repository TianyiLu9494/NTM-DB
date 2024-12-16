from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import FileResponse
from django.conf import settings
from django.urls import reverse
from .forms import UploadFileForm
from Bio import SeqIO
from .models import Queries
import json
import time
import uuid
import io
import os
# from api.models import Species
# Imaginary function to handle an uploaded file.
from .file_handle import FileHandler


def analysis(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            form_data = form.cleaned_data
            file = form_data["file"]
            query_id = str(uuid.uuid4())[:8]
            file_dir = os.path.join(settings.MEDIA_ROOT, 'temp'+query_id)
            os.makedirs(file_dir)
            file_path = os.path.join(file_dir,"Query_assembly.fasta")
            try:
                with io.TextIOWrapper(file, encoding='utf-8') as f:
                    recs =list(SeqIO.parse(f, "fasta"))
                with open(file_path,'w') as outhandle:
                    contigs = SeqIO.write(recs,outhandle,'fasta')  
                    print(f"Query assembly has {contigs} been wrote to the {file_dir} directory")
            except Exception as e:
                print("Error:",e)
                form = UploadFileForm()
                print("Invalid FASTA")
                return render(request, "analysis/analysis.html", {"form": form, "error": "Invalid FASTA file"})
            query = Queries.objects.create(query_id=query_id)
            object = FileHandler(query_id)
            if form_data['build_tree']:
                query.build_tree = True
                if form_data['number_of_nodes_in_tree'] == "":
                    number_of_nodes = 0
                else: 
                    number_of_nodes = int(form_data['number_of_nodes_in_tree'])
                species_list=form_data['species_list']
                build_tree = object.run_build_tree_workflow(number_of_nodes,species_list)
                if build_tree['build_tree_status']:
                    query.build_tree_status = True
                    query.ssu_gff_path = build_tree['16S_gff_path']
                    query.ssu_fasta_path = build_tree['16S_fasta_path']
                    query.tree_file_path = build_tree['tree_file_path']
                    query.tree_visual_path = build_tree['tree_visualize_path']
                else:
                    query.build_tree_status = False                                     
                    print(build_tree['build_tree_error'])

            if form_data['identify_mlst']:
                query.mlst_identification = True
                MLST = object.run_MLST()
                if MLST['MLST_status']:
                    query.mlst_identification_status = True
                    query.mlst_tsv_path = MLST['MLST_tsv_path']
                    with open(MLST['MLST_json_path'], 'r') as f:
                        mlst_json = json.load(f)[0]
                        query.mlst_json = json.dumps({ 'alleles' : mlst_json['alleles'], 'sequence_type' : mlst_json['sequence_type'] })
                else:
                    query.mlst_identification_status = False
                    print(MLST['MLST_error'])
            
            if form_data['resistance_annotation']:
                query.resistance_annotation = True
                Resistance = object.run_Resistance()
                if Resistance['Resistance_status']:
                    query.resistance_annotation_status = True
                    query.AMR_tsv_path = Resistance['Resistance_tsv_path']
                    query.AMR_fasta_path = Resistance['Resistance_fasta_path']
                else:
                    query.resistance_annotation_status = False
                    print(Resistance['Resistance_error'])
            
            if form_data['virulence_annotation']:
                query.virulence_annotation = True
                Virulence = object.run_Virulence()
                if Virulence['Virulence_status']:
                    query.virulence_annotation_status = True
                    query.VFG_tsv_path = Virulence['Virulence_tsv_path']
                    query.VFG_fasta_path = Virulence['Virulence_fasta_path']
                else:
                    query.virulence_annotation_status = False
                    print(Virulence['Virulence_error'])
            query.save()
            return HttpResponseRedirect(reverse("analysis:results", args=(query.query_id,)))
        else:
            form = UploadFileForm()
            return render(request, "analysis/analysis.html", {"form": form, "error": "Invalid form"})
    else:
        form = UploadFileForm()
        return render(request, "analysis/analysis.html", {"form": form})

def view_results(request, query_id):
    # result_dir = os.path.join(settings.BASE_DIR, "analysis/static/user_upload", f"temp{query_id}")
    query = Queries.objects.get(query_id = query_id)
    return_dict = {'query':query}
    if query.build_tree and query.build_tree_status:
        tree_visual_url = query.tree_visual_path
        return_dict['tree_view'] = tree_visual_url.split("/static/")[1]
    if query.mlst_identification and query.mlst_identification_status:
        return_dict['mlst_json'] = json.loads(query.mlst_json)
    return render(request, "analysis/view_results.html", return_dict)

def download_result(request, query_id):
    query = Queries.objects.get(query_id = query_id)
    result = request.GET.get('result',None)
    if result == 'tree_file':
        file_name = 'tree_file.nwk'
        result_file_path = query.tree_file_path        
    elif result == 'tree_visual':
        file_name = 'tree.svg'
        result_file_path = query.tree_visual_path
    elif result == 'ssu_gff_file':
        file_name = 'ssu_rRNA.gff'
        result_file_path = query.ssu_gff_path
    elif result == 'ssu_fasta_file':
        file_name = 'ssu_rRNA.fasta'
        result_file_path = query.ssu_fasta_path
    elif result == 'mlst_file':
        file_name = 'MLST.tsv'
        result_file_path = query.mlst_file_path
    elif result == 'AMR_tsv_file':
        file_name = 'AMR.tsv'
        result_file_path = query.AMR_tsv_path
    elif result == 'AMR_fasta_file':
        file_name = 'AMR.fasta'
        result_file_path = query.AMR_fasta_path
    elif result == 'VFG_tsv_file':
        file_name = 'VF_gene.tsv'
        result_file_path = query.VFG_tsv_path
    elif result == 'VFG_fasta_file':
        file_name = 'VF_gene.fasta'
        result_file_path = query.VFG_tsv_path
     # 打开文件并创建FileResponse对象
    file = open(result_file_path, 'rb')
    response = FileResponse(file)
    # 设置响应的内容类型（MIME类型）
    response['Content-Type'] = 'text/plain'  # 指定为文本文件
    # 设置响应的头信息，指定文件名
    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response

def test_analysis(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            print('From is valid')
        time.sleep(5)
        return HttpResponseRedirect(reverse("analysis:test_results"))
    else:
        form = UploadFileForm()
        return render(request,"analysis/test_analysis.html", {"form": form})

def test_results(request):
    return render(request, "analysis/test_results.html")
