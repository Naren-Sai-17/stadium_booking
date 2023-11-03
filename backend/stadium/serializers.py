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

class SearchStadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = ['stadium_name', 'location']

class SearchEventSerializer(serializers.ModelSerializer):
    stadium = SearchStadiumSerializer()
    class Meta:
        model = Event
        fields = ['event_id', 'event_name', 'date_time', 'stadium']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)

        try:
            sector_instance = SectorPrice.objects.get(event=instance, sector__sector_name="General")
            data['minimum_cost'] = sector_instance.event_price

        except:
            pass

        return data

class EventSerializer(serializers.ModelSerializer):
    stadium = StadiumSerializer()
    class Meta:
        model = Event
        fields = '__all__'
    