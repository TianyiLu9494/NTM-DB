# Generated by Django 4.1.2 on 2023-06-20 13:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0055_download_files'),
    ]

    operations = [
        migrations.RenameField(
            model_name='download_files',
            old_name='core_fastafasta',
            new_name='core_fasta',
        ),
        migrations.RenameField(
            model_name='download_files',
            old_name='dispensable_fastafasta',
            new_name='dispensable_fasta',
        ),
    ]
