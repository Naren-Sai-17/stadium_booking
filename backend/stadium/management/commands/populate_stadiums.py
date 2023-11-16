from django.core.management.base import BaseCommand
import random
from faker import Faker
from django.core.management.base import BaseCommand
from stadium.models import Stadium  # Replace 'yourapp' with the actual name of your Django app

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

        self.stdout.write(self.style.SUCCESS('Stadiums populated successfully!'))
