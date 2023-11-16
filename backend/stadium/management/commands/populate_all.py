from django.core.management.base import BaseCommand
import random
from faker import Faker
from django.utils import timezone
from django.core.management.base import BaseCommand
from stadium.models import *  # Replace 'yourapp' with the actual name of your Django app

class Command(BaseCommand):
    help = 'Populate Stadium model with Indian cities'

    def handle(self, *args, **options):
        
        stadiums = [
        {"stadium_name": "Eden Gardens", "city": "Kolkata"},
        {"stadium_name": "Wankhede Stadium", "city": "Mumbai"},
        {"stadium_name": "M. Chinnaswamy Stadium", "city": "Bangalore"},
        {"stadium_name": "Feroz Shah Kotla Ground", "city": "Delhi"},
        {"stadium_name": "Rajiv Gandhi International Cricket Stadium", "city": "Hyderabad"},
        {"stadium_name": "Sardar Vallabhbhai Patel Stadium (Motera Stadium)", "city": "Ahmedabad"},
        {"stadium_name": "M. A. Chidambaram Stadium", "city": "Chennai"},
        {"stadium_name": "Sawai Mansingh Stadium", "city": "Jaipur"},
        {"stadium_name": "DY Patil Stadium", "city": "Navi Mumbai"},
        {"stadium_name": "Greenfield International Stadium", "city": "Thiruvananthapuram"},
        {"stadium_name": "Jawaharlal Nehru Stadium", "city": "Kochi"},
        {"stadium_name": "Holkar Cricket Stadium", "city": "Indore"},
        {"stadium_name": "Barabati Stadium", "city": "Cuttack"},
        {"stadium_name": "PCA Stadium", "city": "Mohali"},
        {"stadium_name": "Vidarbha Cricket Association Stadium", "city": "Nagpur"},
        {"stadium_name": "JSCA International Stadium Complex", "city": "Ranchi"},
        {"stadium_name": "Nehru Stadium", "city": "Pune"},
        {"stadium_name": "Nehru Stadium", "city": "Guwahati"},
        {"stadium_name": "Kalinga Stadium", "city": "Bhubaneswar"},
        {"stadium_name": "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium", "city": "Visakhapatnam"}
        ]

        for stadium in stadiums:
            stadium_obj = Stadium(stadium_name=stadium["stadium_name"], city=stadium["city"])
            stadium_obj.save()
            
        #sectors
        for obj in Stadium.objects.all():
            
            obj_sec= Sector(
                stadium=obj,
                sector_name ="General",
                sector_capacity = (random.randint(5,10))*4000
            )
            obj_sec.save()
            
            obj_sec1= Sector(
                stadium=obj,
                sector_name ="Premium",
                sector_capacity = (random.randint(5,10))*2000
            )
            obj_sec1.save()
            
            obj_sec2= Sector(
                stadium=obj,
                sector_name ="VIP",
                sector_capacity = (random.randint(5,10))*200
            )
            obj_sec2.save()
            
            #events
        c = ["Australia", "England", "Indonesia", "United States", "Pakistan", "Brazil", "Spain"]
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
            
        #sector prices
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
                    
        ic = [
        "Popcorn",
        "Pretzels",
        "Hot Dogs",
        "Nachos",
        "Soft Pretzel Bites",
        "Cotton Candy",
        "Churros",
        "French Fries",
        "Chicken Tenders",
        "Cheese Fries",
        "Onion Rings",
        ]

        #populate foods
        n=0
        for obj in Stadium.objects.all():
            
            obj_food = FoodItem(
                stadium=obj,
                food_name = ic[n],
                food_price = (random.randint(7,15))*10
            )
            
            obj_food.save()
            obj2_food = FoodItem(
                stadium=obj,
                food_name = ic[(n + 1) % len(ic)],
                food_price = (random.randint(7,15))*10
            )           
            obj2_food.save()
            
            obj3_food = FoodItem(
                stadium=obj,
                food_name = ic[(n + 2) % len(ic)],
                food_price = (random.randint(7,15))*10
            )           
            obj3_food.save()
            
            obj4_food = FoodItem(
                stadium=obj,
                food_name = ic[(n + 3) % len(ic)],
                food_price = (random.randint(7,15))*10
            )           
            obj4_food.save()
            
            obj5_food = FoodItem(
                stadium=obj,
                food_name = ic[(n + 4) % len(ic)],
                food_price = (random.randint(7,15))*10
            )           
            obj5_food.save()
            
            
            n = (n + 1) % len(ic)
        

        self.stdout.write(self.style.SUCCESS('POPULATED ALL'))
