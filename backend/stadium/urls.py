from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    # path('events/', views.EventList.as_view, name='events-list')
    path('events/', views.getEvents, name='get_events')
]