# Generated by Django 4.1.2 on 2023-03-16 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_rename_count_by_strains_vf_genes_number_of_strains'),
    ]

    operations = [
        migrations.AddField(
            model_name='vf_genes',
            name='number_of_species',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
