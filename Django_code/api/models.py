from django.db import models

# Create your models here.
class Species(models.Model):
    taxid = models.CharField(max_length=55,primary_key=True,db_index=True,unique=True)
    name = models.CharField(max_length=55,unique=True)
    tax_level = models.CharField(max_length=55,default=None,blank=True)
    type_strain_genome = models.CharField(max_length=55,default=None,blank=True)
    representative_genome = models.CharField(max_length=55,default=None,blank=True)
    other_type_strains = models.CharField(max_length=150,default=None,blank=True)
    lpsn_address = models.CharField(max_length=100,default=None,blank=True)
    risk_group = models.CharField(max_length=5,default=None,blank=True)
    pathogenicity = models.CharField(max_length=55,default=None,blank=True)
    ncbi_genus = models.CharField(max_length=55,default=None,blank=True)
    ncbi_complex = models.CharField(max_length=55,default=None,blank=True)
    ncbi_species = models.CharField(max_length=55,default=None,blank=True)
    parent_taxid = models.CharField(max_length=55,db_index=True,default=None)
    strains_count = models.IntegerField(default=None)
    growth_type = models.CharField(max_length=10,db_index=True,default=None)
    rs_graph_path = models.CharField(max_length=100,default=None,blank=True)
    vf_graph_path = models.CharField(max_length=100,default=None,blank=True)
    grapetree_graph_path = models.CharField(max_length=100,default=None,blank=True)
    def __str__(self):
        return self.taxid
        
class Strains(models.Model):
    accession =  models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    species = models.ForeignKey(Species,on_delete=models.CASCADE,max_length=50,db_index=True,related_name='species_strains')
    species_name = models.CharField(max_length=50,default=None,blank=True)
    subspecies = models.ForeignKey(Species,on_delete=models.DO_NOTHING,max_length=50,db_index=True,related_name='subspecies_strains',null=True,default=None)
    subspecies_name = models.CharField(max_length=50,default=None,blank=True)
    representative = models.CharField(max_length=50,default=None,blank=True)
    host = models.CharField(max_length=50,default=None,blank=True)
    source = models.CharField(max_length=50,default=None,blank=True)
    source_detail = models.CharField(max_length=200,default=None,blank=True)
    country = models.CharField(max_length=50,default=None,blank=True)
    date = models.CharField(max_length=10,blank=True,default=None)
    MLST = models.IntegerField(null=True,default=None)
    ncbi_genus = models.CharField(max_length=50,default=None,blank=True)
    ncbi_complex = models.CharField(max_length=50,default=None,blank=True)
    ncbi_species = models.CharField(max_length=50,default=None,blank=True)
    vf_summary = models.JSONField(null=True)
    amr_summary = models.JSONField(null=True)
    DST_test = models.BooleanField(default=False)
    n50_contigs = models.IntegerField(null=True,default=None)
    l50_contigs = models.IntegerField(null=True,default=None)
    gc_percentage = models.FloatField(null=True,default=None)
    assembly_total_length = models.IntegerField(null=True,default=None)
    checkm_completeness = models.FloatField(null=True,default=None)
    checkm_contamination = models.FloatField(null=True,default=None)
    ssu_count = models.IntegerField(null=True,default=None)
    trna_count = models.IntegerField(null=True,default=None)
    coding_density = models.FloatField(null=True,default=None)
    assembly_file = models.CharField(max_length=100,default=None,blank=True)
    def __str__(self):
        return self.accession


class AMR_Genes(models.Model):
    card_accession = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    number_of_strains = models.IntegerField(null=True,default=None)
    number_of_species = models.IntegerField(null=True,default=None)
    gene_name = models.CharField(max_length=50,default=None,blank=True)
    card_id = models.CharField(max_length=50,default=None,blank=True)
    Antibiotic_Efflux = 'AE'
    Antibiotic_Inactivation = 'AI'
    Antibiotic_Target_Protection = 'ATP'
    Antibiotic_Target_Alteration = 'ATA'
    Antibiotic_Target_Replacement = 'ATR'
    Reduced_Rermeability_To_Antibiotic = 'RP'
    mechanism_choices = [
        (Antibiotic_Efflux,'antibiotic efflux'),
        (Antibiotic_Inactivation,'antibiotic inactivation'),
        (Antibiotic_Target_Protection,'antibiotic target protection'),
        (Antibiotic_Target_Alteration,'antibiotic target alteration'),
        (Antibiotic_Target_Replacement,'antibiotic target replacement'),
        (Reduced_Rermeability_To_Antibiotic,'reduced permeability to antibiotic'),
    ]
    mechanism = models.CharField(max_length=50,choices=mechanism_choices,default=None)
    mechanism_ontology_id = models.CharField(max_length=50,default=None,blank=True)
    drug_class =  models.TextField(max_length=500,default=None,blank=True)
    card_drug_class =  models.TextField(max_length=500,default=None,blank=True)
    definition = models.TextField(max_length=500,default=None,blank=True)
    msa_file_path = models.CharField(max_length=100,default=None,blank=True)
    msa_stack_plot_path = models.CharField(max_length=100,default=None,blank=True)
    def __str__(self):
        return self.card_accession

class AMR_Sequences(models.Model):
    amr_seqid = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    strain =   models.ForeignKey(Strains,on_delete=models.PROTECT,max_length=50,db_index=True)
    card =  models.ForeignKey(AMR_Genes,on_delete=models.PROTECT,max_length=50,db_index=True)
    gene_name = models.CharField(max_length=50,default=None,blank=True)
    contig = models.CharField(max_length=50,default=None,blank=True)
    POSITIVE = "+"
    NEGATIVE = "-"
    strand_choices = [(POSITIVE,'positive'),(NEGATIVE,'negative')]
    strand = models.CharField(max_length=10,choices=strand_choices,default=None,blank=True)
    position = models.CharField(max_length=20,default=None,blank=True)
    coverage = models.DecimalField(max_digits=5,decimal_places=2,default=None)
    identity = models.DecimalField(max_digits=5,decimal_places=2,default=None)
    ref_strain = models.CharField(max_length=50,default=None,blank=True)    
    def __str__(self):
        return self.amr_seqid

class VF_Genes(models.Model):
    vfg_id = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    gene_name = models.CharField(max_length=50,default=None,blank=True)
    genbank_id = models.CharField(max_length=15,default=None,blank=True)
    vf_id = models.CharField(max_length=10,default=None,blank=True)
    vf_name = models.CharField(max_length=50,default=None,blank=True)
    vf_full_name = models.CharField(max_length=100,default=None,blank=True)
    vfc_id = models.CharField(max_length=10,default=None,blank=True)
    vfc_name = models.CharField(max_length=50,default=None,blank=True)
    source_organism = models.CharField(max_length=50,default=None,blank=True)
    source_strain = models.CharField(max_length=100,default=None,blank=True)
    number_of_strains = models.IntegerField(null=True,default=None)
    number_of_species = models.IntegerField(null=True,default=None)
    msa_file_path = models.CharField(max_length=100,default=None,blank=True)
    msa_stack_plot_path = models.CharField(max_length=100,default=None,blank=True)  
    def __str__(self):
        return self.vfg_id

class VF_Sequences(models.Model):
    vf_seqid = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    strain = models.ForeignKey(Strains,on_delete=models.CASCADE,max_length=50,db_index=True)
    vfg = models.ForeignKey(VF_Genes,on_delete=models.CASCADE,max_length=50,db_index=True)
    contig_name = models.CharField(max_length=50,default=None,blank=True)
    strand = models.CharField(max_length=50,default=None,blank=True)
    position = models.CharField(max_length=50,default=None,blank=True)
    coverage = models.DecimalField(max_digits=5,decimal_places=2,default=None)
    identity = models.DecimalField(max_digits=5,decimal_places=2,default=None)
    def __str__(self):
        return self.vf_seqid
    
class GPtree(models.Model):
    name = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    graph = models.JSONField(null=True)
    def __str__(self) -> str:
        return self.name

class DST(models.Model):
    strain = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    species = models.CharField(max_length=50,default=None,blank=True)
    Amikacin = models.JSONField(null=True)
    Amikacin_D3 = models.JSONField(null=True)
    Amikacin_D5 = models.JSONField(null=True)
    Amikacin_D11 = models.JSONField(null=True)
    Amikacin_D14 = models.JSONField(null=True)
    Arginine = models.JSONField(null=True)
    Azithromycin = models.JSONField(null=True)
    Azithromycin_D3 = models.JSONField(null=True)
    Bactrim = models.JSONField(null=True)
    Bedaquiline = models.JSONField(null=True)
    Capreomycin = models.JSONField(null=True)
    Cefoxitin = models.JSONField(null=True)
    Cefoxitin_D3 = models.JSONField(null=True)
    Cefoxitin_D5 = models.JSONField(null=True)
    Cefoxitin_D11 = models.JSONField(null=True)
    Cefoxitin_D14 = models.JSONField(null=True)
    Chloramphenicol = models.JSONField(null=True)
    Ciprofloxacin = models.JSONField(null=True)
    Clarithromycin = models.JSONField(null=True)
    Clarithromycin_D3 = models.JSONField(null=True)
    Clarithromycin_D4 = models.JSONField(null=True)
    Clarithromycin_D5 = models.JSONField(null=True)
    Clarithromycin_D11 = models.JSONField(null=True)
    Clarithromycin_D14 = models.JSONField(null=True)
    Clofazimine = models.JSONField(null=True)
    Clofazimine_D3 = models.JSONField(null=True)
    Clofazimine_D5 = models.JSONField(null=True)
    Clofazimine_D11 = models.JSONField(null=True)
    D_cycloserine = models.JSONField(null=True)
    Doxycycline = models.JSONField(null=True)
    Erythromycin = models.JSONField(null=True)
    Ethambutol = models.JSONField(null=True)
    Ethionamide = models.JSONField(null=True)
    Faropenem = models.JSONField(null=True)
    Imipenem = models.JSONField(null=True)
    Isoniazid = models.JSONField(null=True)
    Levofloxacin = models.JSONField(null=True)
    Linezolid = models.JSONField(null=True)
    Linezolid_D3 = models.JSONField(null=True)
    Linezolid_D5 = models.JSONField(null=True)
    Linezolid_D11 = models.JSONField(null=True)
    Linezolid_D14 = models.JSONField(null=True)
    Meropenem = models.JSONField(null=True)
    Minocycline = models.JSONField(null=True)
    Moxifloxacin = models.JSONField(null=True)
    Ofloxacin = models.JSONField(null=True)
    Phleomycin = models.JSONField(null=True)
    Rifabutin = models.JSONField(null=True)
    Rifampicin = models.JSONField(null=True)
    Rifamycin_SV = models.JSONField(null=True)
    Streptomycin = models.JSONField(null=True)
    Tetracycline = models.JSONField(null=True)
    Thiocarbohydrazide = models.JSONField(null=True)
    Thioridazine = models.JSONField(null=True)
    Tigecycline = models.JSONField(null=True)
    Tobramycin = models.JSONField(null=True)
    Trimethoprim = models.JSONField(null=True)
    def __str__(self) -> str:
        return self.strain

class Download_files(models.Model):
    species = models.CharField(max_length=50,primary_key=True,db_index=True,unique=True)
    taxid = models.CharField(max_length=55,db_index=True,unique=True,default=None)
    pan_genome_fasta = models.CharField(max_length=100,default=None,blank=True)
    core_fasta = models.CharField(max_length=100,default=None,blank=True)
    dispensable_fasta = models.CharField(max_length=100,default=None,blank=True)
    unique_fasta = models.CharField(max_length=100,default=None,blank=True)
    pan_gene_count = models.IntegerField(null=True,default=None)
    core_gene_count = models.IntegerField(null=True,default=None)
    dispensable_gene_count = models.IntegerField(null=True,default=None)
    unique_gene_count = models.IntegerField(null=True,default=None)
    VF_csv = models.CharField(max_length=100,default=None,blank=True)
    AMR_csv = models.CharField(max_length=100,default=None,blank=True)
    MLST_csv = models.CharField(max_length=100,default=None,blank=True)
    strains_count = models.IntegerField(default=None,blank=True)
    phylogenetic_tree_visualize = models.CharField(max_length=100,default=None,blank=True)
    def __str__(self) -> str:
        return self.species