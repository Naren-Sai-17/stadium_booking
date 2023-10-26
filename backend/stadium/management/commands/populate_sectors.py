from django.core.management.base import BaseCommand
import random
from faker import Faker
from django.core.management.base import BaseCommand
from stadium.models import Stadium,Sector  # Replace 'yourapp' with the actual name of your Django app

class Command(BaseCommand):

    def handle(self, *args, **options):
        fake = Faker()  
        
        for obj in Stadium.objects.all():
            
            obj_sec= Sector(
                stadium=obj,
                sector_name ="General",
                sector_price = (random.randint(5,10))*500
            )
            obj_sec.save()
            
            obj_sec1= Sector(
                stadium=obj,
                sector_name ="Premium",
                sector_price = (random.randint(5,10))*2000
            )
            obj_sec1.save()
            
            obj_sec2= Sector(
                stadium=obj,
                sector_name ="VIP",
                sector_price = (random.randint(5,10))*5000
            )
            obj_sec2.save()
            
            

        self.stdout.write(self.style.SUCCESS('Stadium\'s Sectors POPULATED successfully!'))
