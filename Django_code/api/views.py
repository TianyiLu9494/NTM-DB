from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SpeciesSerializer,StrainsSerializer, VFGSerializer, AMRSerializer, GPtreeSerializer, DSTSerializer
from .models import Species,Strains,VF_Genes,AMR_Genes,GPtree,VF_Sequences,AMR_Sequences,DST
# Create your views here.
@api_view(["GET"])
def getRoutes(request):

    routes = [
        {'GET':'/api/species'},
        {'GET':'/api/species/?card_id=eg.ARO:3000816'},
        {'GET':'/api/species/?vfg_id=eg.VFG0000001'},
        {'GET':'/api/strains'},
        {'GET':'/api/strains/?species_name=M.abscessus'},
        {'GET':'/api/strains/?subspecies_name=subsp. abscessus'},
        {'GET':'/api/strains/?card_id=eg.ARO:3000816'},
        {'GET':'/api/strains/?vfg_id=eg.VFG0000001'},
        {'GET':'/api/strains/?mlst=eg.ST1'},
        {'GET':'/api/vfgenes'},
        {'GET':'/api/vfgenes/?vfc_id=eg.VFC0271'},
        {'GET':'/api/vfgenes/?vfc_name=eg.biofilm'},
        {'GET':'/api/amrgenes'},
        {'GET':'/api/amrgenes/?drug_class=eg.Aminoglycosides'},
    ]
    return Response(routes)

@api_view(['GET'])
def getSpecies(request):
    card_id = request.query_params.get('card_id',None)
    vfg_id = request.query_params.get('vfg_id',None)
    if card_id != None:
        card_id = card_id.replace("/","")
        matched_strains = AMR_Sequences.objects.filter(card_id = card_id).values_list('strain_id',flat=True).distinct()
        matched_species = Strains.objects.filter(accession__in = matched_strains).values_list('species_id',flat=True).distinct()
        species = Species.objects.filter(taxid__in = matched_species)
    elif vfg_id != None:
        vfg_id = vfg_id.replace("/","")
        matched_strains = VF_Sequences.objects.filter(vfg_id = vfg_id).values_list('strain_id',flat=True).distinct()
        matched_species = Strains.objects.filter(accession__in = matched_strains).values_list('species_id',flat=True).distinct()
        species = Species.objects.filter(taxid__in = matched_species)
    else:
        species = Species.objects.filter(tax_level='species').order_by('strains_count')
    serializer =  SpeciesSerializer(species,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getStrains(request):
    species_name = request.query_params.get('species_name',None)
    subspecies = request.query_params.get('subspecies_name',None)
    card_id = request.query_params.get('card_id',None)
    vfg_id = request.query_params.get('vfg_id',None)
    mlst = request.query_params.get('mlst',None)
    if species_name != None:
        species_name = species_name.replace("/","")
        species_name = species_name.replace("_"," ")
        strains = Strains.objects.filter(species_name__contains = species_name).order_by("-representative") #.order_by("-DST_test")
    elif subspecies != None:
        subspecies = subspecies.replace("/","")
        subspecies = subspecies.replace("_"," ")
        strains = Strains.objects.filter(subspecies_name = subspecies).order_by("-representative")
    elif card_id != None:
        card_id = card_id.replace("/","")
        matched_strains = AMR_Sequences.objects.filter(card_id = card_id).values_list('strain_id',flat=True).distinct()
        strains = Strains.objects.filter(accession__in = matched_strains)
    elif vfg_id != None:
        vfg_id = vfg_id.replace("/","")
        matched_strains = VF_Sequences.objects.filter(vfg_id = vfg_id).values_list('strain_id',flat=True).distinct()
        strains = Strains.objects.filter(accession__in = matched_strains)
    elif mlst != None:
        mlst = mlst.replace("/","")
        strains = Strains.objects.filter(MLST = mlst).order_by("-representative") #.order_by("-DST_test")
    else:
        strains = Strains.objects.all().order_by("-representative") #.order_by("-DST_test")
    serializer =  StrainsSerializer(strains,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getVFgenes(request):
    vfc_id = request.query_params.get('vfc_id',None)
    vfc_name = request.query_params.get('vfc_name',None)
    if vfc_id != None:
        vfc_id = vfc_id.replace("/","")
        vf_genes = VF_Genes.objects.filter(vfc_id = vfc_id,number_of_strains__gt = 0)
    elif vfc_name != None:
        vfc_name = vfc_name.replace("/","")
        vfc_name = vfc_name.replace("_"," ")
        vf_genes = VF_Genes.objects.filter(vfc_name = vfc_name,number_of_strains__gt = 0)
    else:
        vf_genes = VF_Genes.objects.filter(number_of_strains__gt = 0)
    serializer =  VFGSerializer(vf_genes,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getAMRgenes(request):
    drug_class = request.query_params.get('drug_class',None)
    if drug_class != None:
        drug_class = drug_class.replace("/","")
        amr_genes = AMR_Genes.objects.filter(drug_class__contains = drug_class,number_of_strains__gt = 0)
    else:
        amr_genes = AMR_Genes.objects.filter(number_of_strains__gt = 0)
    serializer =  AMRSerializer(amr_genes,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getGPtree(request):
    gptree = GPtree.objects.get(name = "Test")
    serializer = GPtreeSerializer(gptree,many= False)
    return Response(serializer.data)

@api_view(['GET'])
def getDST(request):
    strain_id = request.query_params.get('strain_id',None)
    if strain_id != None:
        strain_id = strain_id.replace("/","")
        dst = DST.objects.get(strain_id = strain_id)
    else:
        dst = DST.objects.all()
    serializer =  DSTSerializer(dst,many = True)
    return Response(serializer.data)