from django.core.management.base import BaseCommand
import random
from datetime import datetime
from faker import Faker
from django.utils import timezone
from django.core.management.base import BaseCommand
from stadium.models import Stadium,Event  # Replace 'yourapp' with the actual name of your Django app

class Command(BaseCommand):

    def handle(self, *args, **options):
        fake = Faker()  
        c = ["Australia", "England", "Indonesia", "United States", "Pakistan","Brazil","Spain"]
        s = len(c)
        n=s-1
        for obj in Stadium.objects.all():
            
            obj_eve= Event(
                stadium=obj,
                event_name=f"Cricket India vs {c[n%s]}",
                #  datetime(year, month, day, hour, minute)
                # date_time = datetime(random.randint(2024, 2024), random.randint(1, 12), random.randint(1, 28), random.randint(0, 23), 30*(random.randint(0,1)))
                date_time = timezone.make_aware(timezone.datetime(random.randint(2024, 2024), random.randint(1, 12), random.randint(1, 28), random.randint(0, 23), 30*(random.randint(0,1))))
            )
            obj_eve.save()
            
            obj2_eve= Event(
                stadium=obj,
                event_name=f"Badminton India vs {c[(n+1)%s]}",
                #  datetime(year, month, day, hour, minute)
                date_time = timezone.make_aware(timezone.datetime(random.randint(2024, 2024), random.randint(1, 12), random.randint(1, 28), random.randint(0, 23), 30*(random.randint(0,1))))
            )
            obj2_eve.save()
            
            obj3_eve= Event(
                stadium=obj,
                event_name=f"Football India vs {c[(n+2)%s]}",
                #  datetime(year, month, day, hour, minute)
               date_time = timezone.make_aware(timezone.datetime(random.randint(2024, 2024), random.randint(1, 12), random.randint(1, 28), random.randint(0, 23), 30*(random.randint(0,1))))
            )
            obj3_eve.save()
            
            obj4_eve= Event(
                stadium=obj,
                event_name=f"Basketball India vs {c[(n+3)%s]}",
                #  datetime(year, month, day, hour, minute)
                date_time = timezone.make_aware(timezone.datetime(random.randint(2024, 2024), random.randint(1, 12), random.randint(1, 28), random.randint(0, 23), 30*(random.randint(0,1))))
            )
            obj4_eve.save()
            
            n = (n+1)%s
            
            
            

        self.stdout.write(self.style.SUCCESS('Stadium\'s Events POPULATED successfully!'))
