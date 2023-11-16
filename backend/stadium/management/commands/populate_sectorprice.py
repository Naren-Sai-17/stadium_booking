from django.core.management.base import BaseCommand
import random
from datetime import datetime
from faker import Faker
from django.utils import timezone
from django.core.management.base import BaseCommand
from stadium.models import *  # Replace 'yourapp' with the actual name of your Django app

class Command(BaseCommand):

    def handle(self, *args, **options):
        fake = Faker()  
        c = ["Australia", "England", "Indonesia", "United States", "Pakistan","Brazil","Spain"]
        s = len(c)
        #n=s-1
        for obj in Event.objects.all():
            stadium=obj.stadium
            sectors = Sector.objects.filter(stadium=stadium)
            
            for sector in sectors:
                x=0
                if sector.sector_name == "VIP":
                    x=random.randint(5,10)*5000
                elif sector.sector_name == "Premium":
                    x=random.randint(5,10)*2000
                else:
                    x=random.randint(5,10)*500
                
                sector_instance = SectorPrice(
                        sector_id = sector,
                        event_id = obj,
                        event_price=x,
                )
                
                sector_instance.save()
        self.stdout.write(self.style.SUCCESS('Stadium\'s Events POPULATED successfully!'))
