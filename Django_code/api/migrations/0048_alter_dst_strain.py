# Generated by Django 4.1.2 on 2023-05-15 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0047_dst'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dst',
            name='strain',
            field=models.CharField(db_index=True, max_length=50, primary_key=True, serialize=False, unique=True),
        ),
    ]
