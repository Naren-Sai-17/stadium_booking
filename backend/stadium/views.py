from django.http import HttpResponse
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.utils import timezone

def dashboard(request):
    return HttpResponse("Hi, stadium.")

@api_view(['GET'])
def showEvents(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    
    return Response(serializer.data)

class getEventById(ListAPIView):
    serializer_class = EventSerializer
    def get(self, request):
        id = self.request.GET.get('id', '')
        event = Event.objects.all().get(event_id=id)

        # print("The event retrieved is:", event)
        serializer = EventSerializer(event)
        return Response(serializer.data)

class getStadiumbyEventId(ListAPIView):
    serializer_class = EventSerializer
    def get(self, request):
        id = self.request.GET.get('id', '')
        stadium = Event.objects.all().get(event_id=id).stadium
        
        serializer = StadiumSerializer(stadium)
        return Response(serializer.data)

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
    