# Generated by Django 4.1.2 on 2023-06-24 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0060_download_files_core_gene_count_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='download_files',
            name='phylogenetic_tree_visualize',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
    ]