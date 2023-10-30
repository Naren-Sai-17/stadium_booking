from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('all/', views.showEvents, name='show_all_events'),
    path('events/', views.getEvents.as_view(), name='get_events'),
    path('get_event/', views.getEventById.as_view(), name='get_event_by_id'),
    path('get_stadium/', views.getStadiumbyEventId.as_view(), name='get_stadium_by_event_id'),
]