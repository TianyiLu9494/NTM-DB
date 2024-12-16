from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('species/', views.getSpecies),
    path('strains/', views.getStrains),
    path('vfgenes/', views.getVFgenes),
    path('amrgenes/', views.getAMRgenes),
    path('gptree/Test',views.getGPtree),
    path('DST/',views.getDST),
]