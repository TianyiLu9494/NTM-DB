from django.contrib import admin

# Register your models here.
from .models import Species, Strains
admin.site.register(Species)
admin.site.register(Strains)