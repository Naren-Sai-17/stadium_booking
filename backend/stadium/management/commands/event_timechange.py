from django.core.management.base import BaseCommand
import random
from datetime import datetime
from faker import Faker
from django.utils import timezone
from django.core.management.base import BaseCommand
from stadium.models import Event 

class Command(BaseCommand):

    def handle(self, *args, **options):
        # fake = Faker()  
        # c = ["Australia", "England", "Indonesia", "United States", "Pakistan"]
        # s = len(c)
        # n=s-1
        for obj in Event.objects.all():
            obj.date_time = timezone.make_aware(timezone.datetime(random.randint(2024, 2024), random.randint(1, 12), random.randint(1, 28), random.randint(0, 23), 30*(random.randint(0,1))))
            obj.save()
            
            
            
            
            

        self.stdout.write(self.style.SUCCESS('Stadium\'s Events\' TIME CHANGED successfully!'))
