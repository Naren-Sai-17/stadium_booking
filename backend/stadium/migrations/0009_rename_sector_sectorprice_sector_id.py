# Generated by Django 4.2.4 on 2023-11-02 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stadium', '0008_rename_event_id_sectorprice_event_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sectorprice',
            old_name='sector',
            new_name='sector_id',
        ),
    ]
