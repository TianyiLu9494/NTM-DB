from django.urls import path
from .views import index, test_page
from .views import browse_by_species
from .views import browse_by_strains
from .views import browse_by_genes_rs
from .views import browse_by_genes_vf
from .views import browse_dst
from .views import test_extends
from .views import species
from .views import strains
from .views import resistance_gene,virulence_gene
from .views import mlst,mlst_by_species
from .views import test_vf
from .views import test_aln_freq
from .views import test_pan_rs
from .views import test_pan_vf
from .views import test_pan_alternative
from .views import search_main
from .views import search_result 
from .views import documentation 
from .views import download 
from .views import download_files
from .views import download_assembly
from .views import ntmdb 

urlpatterns = [
    path('', ntmdb),
    path('browse/species/', browse_by_species, name='browse_by_species'),
    path('browse/strains/', browse_by_strains, name='browse_by_strains'),

    path('browse/genes_rs', browse_by_genes_rs, name='browse_by_genes_rs'),
    path('browse/genes_vf', browse_by_genes_vf, name='browse_by_genes_vf'),
    path('browse/dst', browse_dst, name='browse_by_dst'),

    path('species/M.<str:spec_name>/', species, name='species_page'),
    path('strains/<str:accession>', strains, name='strains_page'),
    path('gene/resistance_gene/card_id=<str:card_id>', resistance_gene),
    path('gene/virulence_gene/vfg_id=<str:vfg_id>', virulence_gene),
    # path('gene/vf_gene/<str:gene_name>', resistance_gene),

    path('mlst/', mlst,name='mlst_page'),
    path('mlst_by_species/', mlst_by_species,name="mlst_by_species"),

    path('testhtml', test_extends),
    path('test', test_page),
    path('test_aln', test_aln_freq),
    path('test_vf', test_vf),
    path('test/create', test_page),
    path('test_pan_rs', test_pan_rs),
    path('test_pan_vf', test_pan_vf),
    path('test_pan_alternative', test_pan_alternative),

    path('search/search_main', search_main),
    path('search/search_result', search_result),

    path('documentation', documentation),

    path('download', download,name='download_page'),
    path('download_file/species=M.<str:spec_name>/', download_files,name='download_files'),
    path('download_assembly/strain=<str:strain_accession>/', download_assembly,name='download_assembly')
]
