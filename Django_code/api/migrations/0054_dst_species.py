# Generated by Django 4.1.2 on 2023-06-18 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0053_amr_genes_msa_stack_plot_path_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='dst',
            name='species',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
    ]
