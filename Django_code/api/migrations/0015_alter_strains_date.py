# Generated by Django 4.1.2 on 2023-03-14 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_strains_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='strains',
            name='date',
            field=models.CharField(blank=True, default=None, max_length=10),
        ),
    ]
