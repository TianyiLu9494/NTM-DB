from django import forms
from api.models import Species
from django.views.decorators.csrf import csrf_exempt
species = Species.objects.filter(tax_level="species")
@csrf_exempt
class UploadFileForm(forms.Form):
    file = forms.FileField(label="Upload file", widget=forms.FileInput(attrs={'class': 'form-control form-control-sm' ,'accept':'.fa,.fna,.fasta' }))
    build_tree = forms.BooleanField(label="Build tree", required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input', "role": "switch"}))
    number_of_nodes_choices = [(0,0),(15,15),(25,25),(50,50),(75,75),(100,100),(150,150),(len(species),len(species))]
    number_of_nodes_in_tree = forms.ChoiceField(choices=number_of_nodes_choices, label="Number of nodes in tree", required=False, widget=forms.Select(attrs={'class': 'js-example-basic-single','id':'singleSelect'}))
    species_choices = [(e.name,f"M.{e.name}") for e in species]
    species_list = forms.MultipleChoiceField(choices=species_choices, label="select species to build tree", required=False, widget=forms.SelectMultiple(attrs={'class':'js-example-basic-multiple','id':'multiSelect'}))
    identify_mlst = forms.BooleanField(label="Identify MLST", required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input', "role": "switch"}))
    resistance_annotation = forms.BooleanField(label="Resistance annotation", required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input', "role": "switch"}))
    virulence_annotation = forms.BooleanField(label="Virulence annotation", required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input', "role": "switch"}))
