# Generated by Django 4.1.2 on 2023-03-15 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_vf_sequences'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vf_genes',
            name='count_by_strains',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
