# Generated by Django 4.1.2 on 2023-06-29 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0061_download_files_phylogenetic_tree_visualize'),
    ]

    operations = [
        migrations.AddField(
            model_name='strains',
            name='assembly_file',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
    ]