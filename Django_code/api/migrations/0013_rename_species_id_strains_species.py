# Generated by Django 4.1.2 on 2023-03-14 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_strains_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='strains',
            old_name='species_id',
            new_name='species',
        ),
    ]
