# Generated by Django 4.1.2 on 2023-05-16 07:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0048_alter_dst_strain'),
    ]

    operations = [
        migrations.AddField(
            model_name='strains',
            name='subspecies',
            field=models.ForeignKey(default=None, max_length=50, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='subspecies_strains', to='api.species'),
        ),
        migrations.AddField(
            model_name='strains',
            name='subspecies_name',
            field=models.CharField(blank=True, default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='strains',
            name='species',
            field=models.ForeignKey(max_length=50, on_delete=django.db.models.deletion.CASCADE, related_name='species_strains', to='api.species'),
        ),
    ]
