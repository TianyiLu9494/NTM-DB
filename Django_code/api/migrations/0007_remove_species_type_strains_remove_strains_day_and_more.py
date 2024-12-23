# Generated by Django 4.1.2 on 2023-03-14 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_species_parent_taxid_alter_species_taxid_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='species',
            name='type_strains',
        ),
        migrations.RemoveField(
            model_name='strains',
            name='day',
        ),
        migrations.RemoveField(
            model_name='strains',
            name='month',
        ),
        migrations.RemoveField(
            model_name='strains',
            name='year',
        ),
        migrations.AddField(
            model_name='species',
            name='other_type_strains',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AddField(
            model_name='species',
            name='representative_genome',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AddField(
            model_name='species',
            name='type_strain_genome',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AddField(
            model_name='strains',
            name='date',
            field=models.DateField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='species',
            name='lpsn_address',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='species',
            name='name',
            field=models.CharField(max_length=55, unique=True),
        ),
        migrations.AlterField(
            model_name='species',
            name='ncbi_complex',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AlterField(
            model_name='species',
            name='ncbi_genus',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AlterField(
            model_name='species',
            name='ncbi_specie',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AlterField(
            model_name='species',
            name='parent_taxid',
            field=models.CharField(db_index=True, default=None, max_length=55),
        ),
        migrations.AlterField(
            model_name='species',
            name='pathogenicity',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AlterField(
            model_name='species',
            name='risk_group',
            field=models.CharField(blank=True, default=None, max_length=5),
        ),
        migrations.AlterField(
            model_name='species',
            name='tax_level',
            field=models.CharField(blank=True, default=None, max_length=55),
        ),
        migrations.AlterField(
            model_name='species',
            name='taxid',
            field=models.CharField(db_index=True, max_length=55, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='strains',
            name='accession',
            field=models.CharField(db_index=True, max_length=50, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='strains',
            name='country',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='strains',
            name='datasource',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='strains',
            name='host',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='strains',
            name='source',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='strains',
            name='source_detail',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='strains',
            name='specie',
            field=models.ForeignKey(max_length=50, on_delete=django.db.models.deletion.CASCADE, to='api.species'),
        ),
    ]
