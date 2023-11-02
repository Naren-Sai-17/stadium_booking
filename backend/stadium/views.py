from django.http import HttpResponse
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.utils import timezone

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterAPI(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class showEvents(ListAPIView):
    queryset = Event.objects.all() 
    serializer_class = EventSerializer

class getEventById(APIView):
    def get(self,request,id):
        stadium_id = Event.objects.get(event_id=id).stadium_id
        event_data = EventSerializer(Event.objects.get(event_id=id)).data
        event_data['prices'] = SectorSerializer(Sector.objects.filter(stadium__stadium_id=stadium_id), many=True).data  
        event_data['minumum_price'] = SectorPriceSerializer(SectorPrice.objects.get(event__event_id=id, sector__sector_name="General")).data
        return Response(event_data)
        

class getEvents(APIView):
    # serializer_class = EventSerializer
    # queryset = Event.objects.all()
    # def get_queryset(self):
    #     date = timezone.now()

    #     events = Event.objects.all()
        
    #     if date:
    #         events = events.filter(date_time__gte=date)
    #     print('Events requested on:', date) 
        
    #     return events
    
    def get(request, self):
        date = timezone.now()
        all_events = Event.objects.all()
        if date:
            all_events = all_events.filter(date_time__gte=date)

        events_data = EventSerializer(all_events, many=True).data
        return Response(events_data)


