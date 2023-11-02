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
    sector_id = SectorSerializer()
    class Meta:
        model = SectorPrice
        fields = ['event_price','remaining_seats','sector_id']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.update(ret.pop('sector_id', {}))
        return ret

class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    stadium = StadiumSerializer()
    class Meta:
        model = Event
        fields = '__all__'
    