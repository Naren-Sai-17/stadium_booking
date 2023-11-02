# from django.http import HttpResponse, Http404
from rest_framework.exceptions import NotFound
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
        try:
            stadium_id = Event.objects.get(event_id = id).stadium_id
        except:
            raise NotFound("Event not found")
        event_data = EventSerializer(Event.objects.get(event_id = id)).data
        event_data['prices'] = SectorPriceSerializer(SectorPrice.objects.filter(event_id = id), many = True).data  
        return Response(event_data)

class getEvents(APIView):
    def get(request, self):
        date = timezone.now()
        all_events = Event.objects.all()
        if date:
            all_events = all_events.filter(date_time__gte=date)
        events_data = EventSerializer(all_events, many=True).data
        return Response(events_data)

