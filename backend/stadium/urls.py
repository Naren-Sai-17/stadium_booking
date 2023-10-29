from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import * 
from .serializers import * 

urlpatterns = [
    path('token/',TokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('register/', RegisterAPI.as_view(), name = 'register'),
    # path('dashboard/', views.dashboard, name='dashboard'),
    # path('events/', views.EventList.as_view, name='events-list')
    # path('events/', views.getEvents, name='get_events')
]