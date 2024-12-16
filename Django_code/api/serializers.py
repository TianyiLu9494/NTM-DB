from rest_framework import serializers
from . import models


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Species
        fields = '__all__'

class StrainsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Strains
        fields = '__all__'

class VFGSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.VF_Genes
        fields = '__all__'

class AMRSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AMR_Genes
        fields = '__all__'

class GPtreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GPtree
        fields = ['graph']

class DSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DST
        fields = '__all__'
