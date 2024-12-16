# Generated by Django 4.1.2 on 2023-05-07 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Queries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('query_id', models.CharField(max_length=8)),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('build_tree', models.BooleanField(default=False)),
                ('build_tree_status', models.BooleanField(default=False)),
                ('mlst_identification', models.BooleanField(default=False)),
                ('mlst_identification_status', models.BooleanField(default=False)),
                ('resistance_annotation', models.BooleanField(default=False)),
                ('resistance_annotation_status', models.BooleanField(default=False)),
                ('virulence_annotation', models.BooleanField(default=False)),
                ('virulence_annotation_status', models.BooleanField(default=False)),
            ],
        ),
    ]