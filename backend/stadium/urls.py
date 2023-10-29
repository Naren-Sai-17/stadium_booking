from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    # path('events/', views.EventList.as_view, name='events-list')
    path('all/', views.showEvents, name='show_all_events'),
    path('events/', views.getEvents.as_view(), name='get_events'),
    path('get_event/', views.getEventById.as_view(), name='get_event_by_id'),
]