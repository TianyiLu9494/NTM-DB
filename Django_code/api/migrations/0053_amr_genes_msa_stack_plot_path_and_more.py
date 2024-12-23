# Generated by Django 4.1.2 on 2023-06-04 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0052_vf_genes_msa_file_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='amr_genes',
            name='msa_stack_plot_path',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
        migrations.AddField(
            model_name='vf_genes',
            name='msa_stack_plot_path',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
    ]
