# Generated by Django 4.1.2 on 2023-03-15 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_vf_genes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vf_genes',
            name='source_strain',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='vf_genes',
            name='vf_full_name',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
    ]