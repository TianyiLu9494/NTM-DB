# Generated by Django 4.1.2 on 2023-03-14 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_species_type_strains_remove_strains_day_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='species',
            name='other_type_strains',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
    ]