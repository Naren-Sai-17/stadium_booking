from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def dashboard(request):
    return HttpResponse("Hi stadium")

@api_view(['GET'])
def getEvents(request):
    events = [
        {
            'Name': 'Cricket',
            'Place': 'Vadodara'
        },
        {
            'Name': 'Football',
            'Place': 'Ludhiana'
        },
    ]
    return Response(events)