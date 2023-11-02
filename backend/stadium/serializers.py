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
        fields = ['sector_id','sector_name','sector_price']
    
class SectorPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectorPrice
        fields = '__all__'

class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    stadium = StadiumSerializer()
    class Meta:
        model = Event
        fields = '__all__'
    