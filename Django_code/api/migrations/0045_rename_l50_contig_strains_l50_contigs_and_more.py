# Generated by Django 4.1.2 on 2023-05-11 13:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_strains_assembly_total_length_strains_gc_percentage_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='strains',
            old_name='l50_contig',
            new_name='l50_contigs',
        ),
        migrations.RenameField(
            model_name='strains',
            old_name='n50_contig',
            new_name='n50_contigs',
        ),
    ]
