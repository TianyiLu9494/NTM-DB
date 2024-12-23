# Generated by Django 4.1.2 on 2023-05-11 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_species_grapetree_graph_path_species_rs_graph_path_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='strains',
            name='assembly_total_length',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='strains',
            name='gc_percentage',
            field=models.FloatField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='strains',
            name='l50_contig',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='strains',
            name='n50_contig',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
