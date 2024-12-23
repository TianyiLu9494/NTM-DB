# Generated by Django 4.1.2 on 2023-02-13 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_species_parent_taxid_alter_species_specie_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='species',
            old_name='specie_name',
            new_name='name',
        ),
        migrations.AddField(
            model_name='species',
            name='tax_level',
            field=models.CharField(default=None, max_length=255),
        ),
        migrations.AlterField(
            model_name='species',
            name='parent_taxid',
            field=models.IntegerField(db_index=True, default=None),
        ),
    ]
