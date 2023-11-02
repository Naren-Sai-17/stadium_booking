from django.http import Http404
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
            event = Event.objects.get(event_id=id)
        except Event.DoesNotExist:
            raise Http404("Event does not exist")
        stadium_id = Event.objects.get(event_id = id).stadium_id
        event_data = EventSerializer(Event.objects.get(event_id = id)).data
        event_data['stadium'] = StadiumSerializer(Stadium.objects.get(stadium_id=stadium_id)).data
        event_data['prices'] = SectorSerializer(Sector.objects.filter(stadium = stadium_id), many = True).data  
        return Response(event_data)
        

# class getStadiumById(RetrieveAPIView):
#     queryset = Stadium.objects.all() 
#     serializer_class = StadiumSerializer
# @api_view(['GET'])
# def getStadiumById(request, id):
#     sid = Stadium.objects.get(stadium_id=id)
#     serializer = StadiumSerializer(sid)
#     return Response(serializer.data)  
# class getStadiumById(APIView):
#     def get(self,request,id):
#         stadium = Stadium.objects.get(stadium_id=id)
#         serializer = StadiumSerializer(stadium) 
#         sectors = Sector.objects.filter(stadium = id)
#         sectorserializer = SectorSerializer(sectors, many = True)
#         data = serializer.data 
#         data['sectors'] = sectorserializer.data
#         return Response(data)
    

class getEvents(ListAPIView):
    serializer_class = EventSerializer
    def get_queryset(self):
        query = self.request.GET.get('query', '')
        date = timezone.now()

        events = Event.objects.all()
        keywords = query.split()

        search_query = Q()

        for keyword in keywords:
            search_query |= Q(event_name__icontains=keyword) | Q(stadium__stadium_name__icontains=keyword)

        if search_query:
            events = events.filter(search_query)
        
        if date:
            events = events.filter(date_time__gte=date)
        print('Events requested on:', date) 
        
        return events


