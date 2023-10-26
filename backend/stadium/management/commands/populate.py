from django.core.management.base import BaseCommand
import random
from faker import Faker
from django.core.management.base import BaseCommand
from stadium.models import Stadium  # Replace 'yourapp' with the actual name of your Django app

class Command(BaseCommand):
    help = 'Populate Stadium model with Indian cities'

    def handle(self, *args, **options):
        fake = Faker()  
        indian_cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Patna', 'Bhopal', 'Chandigarh', 'Kanpur', 'Indore', 'Agra', 'Nagpur', 'Varanasi', 'Amritsar', 'Rajkot', 'Surat', 'Vadodara']

        for city in indian_cities:
            stadium = Stadium(
                stadium_name=f"{city} Stadium",
                location=fake.street_name(),
                coordinates=str(fake.latitude()) + ", " + str(fake.longitude()),
                capacity=random.randint(20000, 80000),
                city=city
            )
            stadium.save()

        self.stdout.write(self.style.SUCCESS('Stadiums populated successfully!'))
