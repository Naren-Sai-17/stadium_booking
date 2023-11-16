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

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FoodItem
        fields = ['food_id','food_name','food_price']

class StadiumSerializer(serializers.ModelSerializer):
    fooditem_set = FoodItemSerializer(many = True)
    class Meta:
        model = Stadium
        fields = ['stadium_id', 'stadium_name', 'place_id','fooditem_set']

class SearchStadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = ['stadium_name', 'place_id']

class SearchEventSerializer(serializers.ModelSerializer):
    stadium = SearchStadiumSerializer()
    class Meta:
        model = Event
        fields = ['event_id', 'event_name', 'date_time', 'stadium']   
    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            sector_instance = SectorPrice.objects.filter(event_id=instance).order_by('event_price').first()
            data['minimum_cost'] = sector_instance.event_price

        except:
            pass

        return data

class EventSerializer(serializers.ModelSerializer):
    stadium = StadiumSerializer()
    class Meta:
        model = Event
        fields = '__all__'
    
class TicketSerializer(serializers.ModelSerializer):
    sector_name = serializers.StringRelatedField(source = 'sector.sector_id.sector_name')
    class Meta: 
        model = Ticket
        fields = ['ticket_id','sector_name'] 

class FoodCouponSerializer(serializers.ModelSerializer):
    food_name = serializers.StringRelatedField(source = 'food_item.food_name')
    class Meta: 
        model = FoodCoupon
        fields = ['food_name','quantity'] 

class BookingSerializer(serializers.ModelSerializer): 
    tickets = TicketSerializer(many = True)
    food_coupons = FoodCouponSerializer(many = True) 
    event_name = serializers.StringRelatedField(source = 'event.event_name')
    class Meta: 
        model = Booking
        fields = ['booking_id', 'event_name','tickets','food_coupons', 'booking_time']
