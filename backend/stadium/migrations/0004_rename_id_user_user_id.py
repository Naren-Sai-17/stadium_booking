# Generated by Django 4.2.4 on 2023-10-30 13:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stadium', '0003_rename_user_id_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='id',
            new_name='user_id',
        ),
    ]
