from django.core.management.base import BaseCommand
import random
from faker import Faker
from django.core.management.base import BaseCommand
from stadium.models import Stadium,FoodItem  # Replace 'yourapp' with the actual name of your Django app

class Command(BaseCommand):
    help = 'Populate Stadium model with Indian cities'

    def handle(self, *args, **options):
        fake = Faker()  
        
        ic = [
            "Popcorn",
            "Pretzels",
            "Hot Dogs",
            "Nachos",
            "Pretzel Bites",
            "Cotton Candy",
            "Churros",
            "French Fries",
            "Chicken Tenders",
            "Cheese Fries",
            "Onion Rings",
        ]

       
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

        self.stdout.write(self.style.SUCCESS('Stadiums food populated successfully!'))
