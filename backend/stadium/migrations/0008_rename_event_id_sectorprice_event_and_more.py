# Generated by Django 4.2.4 on 2023-11-02 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stadium', '0007_alter_sectorprice_remaining_seats'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sectorprice',
            old_name='event_id',
            new_name='event',
        ),
        migrations.RenameField(
            model_name='sectorprice',
            old_name='sector_id',
            new_name='sector',
        ),
    ]