from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['username', 'email', 'password']

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user 
    
class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ['sector_id','sector_name']
    
class SectorPriceSerializer(serializers.ModelSerializer):
    sector = SectorSerializer()
    class Meta:
        model = SectorPrice
        fields = ['sector', 'remaining_seats', 'event_price']

class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    stadium = StadiumSerializer()
    class Meta:
        model = Event
        fields = '__all__'
    