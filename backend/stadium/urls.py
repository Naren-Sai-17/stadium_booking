from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import * 
from .serializers import * 

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('all/', views.showEvents, name='show_all_events'),
    path('events/', views.getEvents.as_view(), name='get_events'),
    path('get_event/', views.getEventById.as_view(), name='get_event_by_id'),
    path('get_stadium/', views.getStadiumbyEventId.as_view(), name='get_stadium_by_event_id'),
    path('token/',MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('register/', RegisterAPI.as_view(), name = 'register'),
    # path('dashboard/', views.dashboard, name='dashboard'),
    # path('events/', views.EventList.as_view, name='events-list')
    # path('events/', views.getEvents, name='get_events')
]