from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

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