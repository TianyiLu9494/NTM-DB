from django.db import models

# Create your models here.
class Queries(models.Model):
    query_id = models.CharField(max_length=8,primary_key=True,db_index=True,unique=True)
    start_date = models.DateTimeField(auto_now_add=True)
    build_tree = models.BooleanField(default=False)
    build_tree_status = models.BooleanField(default=False) # True for finish; False for unfinish
    ssu_gff_path = models.CharField(max_length=100,default="",blank=True)
    ssu_fasta_path = models.CharField(max_length=100,default="",blank=True)
    tree_file_path = models.CharField(max_length=100,default="",blank=True)
    tree_visual_path = models.CharField(max_length=100,default="",blank=True)
    mlst_identification = models.BooleanField(default=False)
    mlst_identification_status = models.BooleanField(default=False) # True for finish; False for unfinish
    mlst_tsv_path = models.CharField(max_length=100,default="",blank=True)
    mlst_json = models.JSONField(null=True)
    resistance_annotation = models.BooleanField(default=False)
    resistance_annotation_status = models.BooleanField(default=False) # True for finish; False for unfinish
    AMR_tsv_path = models.CharField(max_length=100,default="",blank=True)
    AMR_fasta_path = models.CharField(max_length=100,default="",blank=True)
    virulence_annotation = models.BooleanField(default=False)
    virulence_annotation_status = models.BooleanField(default=False) # True for finish; False for unfinish
    VFG_tsv_path = models.CharField(max_length=100,default="",blank=True)
    VFG_fasta_path = models.CharField(max_length=100,default="",blank=True)
    def __str__(self):
        return self.query_id