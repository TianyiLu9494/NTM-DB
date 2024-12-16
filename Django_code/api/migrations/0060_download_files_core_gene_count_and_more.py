# Generated by Django 4.1.2 on 2023-06-23 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0059_alter_species_growth_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='download_files',
            name='core_gene_count',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='download_files',
            name='dispensable_gene_count',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='download_files',
            name='pan_gene_count',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='download_files',
            name='unique_gene_count',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
