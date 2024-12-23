# Generated by Django 4.1.2 on 2023-03-15 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_strains_mlst_alter_strains_source_detail'),
    ]

    operations = [
        migrations.CreateModel(
            name='AMR_Genes',
            fields=[
                ('card_accession', models.CharField(db_index=True, max_length=50, primary_key=True, serialize=False, unique=True)),
                ('count_by_strains', models.IntegerField(default=None, null=True)),
                ('gene_name', models.CharField(blank=True, default=None, max_length=50)),
                ('card_id', models.CharField(blank=True, default=None, max_length=50)),
                ('mechanism', models.CharField(blank=True, default=None, max_length=50)),
                ('drug_class', models.TextField(blank=True, default=None, max_length=500)),
                ('card_drug_class', models.TextField(blank=True, default=None, max_length=500)),
            ],
        ),
    ]
