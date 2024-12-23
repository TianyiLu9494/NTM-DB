# Generated by Django 4.1.2 on 2023-06-15 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analysis', '0003_queries_amr_file_path_queries_vfg_file_path_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='queries',
            name='AMR_file_path',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='queries',
            name='VFG_file_path',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='queries',
            name='mlst_file_path',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='queries',
            name='tree_file_path',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='queries',
            name='tree_visual_path',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]
