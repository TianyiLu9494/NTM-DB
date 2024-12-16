# Generated by Django 4.1.2 on 2023-03-14 14:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_strains_datasource'),
    ]

    operations = [
        migrations.RenameField(
            model_name='species',
            old_name='ncbi_specie',
            new_name='ncbi_species',
        ),
        migrations.RenameField(
            model_name='strains',
            old_name='specie',
            new_name='species_id',
        ),
    ]