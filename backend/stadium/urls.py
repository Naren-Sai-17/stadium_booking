from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .serializers import * 

urlpatterns = [
    path('all/', views.showEvents.as_view(), name='show_all_events'),
    path('events/', views.getEvents.as_view(), name='get_events'),
    path('get_event/<int:id>', views.getEventById.as_view(), name='get_event_by_id'),
    # path("get_stadium/<int:id>", views.getStadiumById.as_view(), name="get_stadium_by_id"),
    path('token/',views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('register/', views.RegisterAPI.as_view(), name = 'register'),
    path('buy/',views.buyAPI.as_view(),name = 'buy'),
    # path('payment/',views.PaymentView.as_view(),name = 'payment'),
    # path('dashboard/', views.dashboard, name='dashboard'),
    path('search/', views.searchEvents.as_view(), name='search_events'),
    # path('events/', views.EventList.as_view, name='events-list')
    # path('events/', views.getEvents, name='get_events')
]