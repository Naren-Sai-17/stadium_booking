from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views, bills
from .serializers import *
from django.conf import settings
from django.conf.urls.static import static 
# from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    # ---------------------------- Authentication and tokens ----------------------------
    path('token/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('register/', views.RegisterAPI.as_view(), name = 'register'),

    # ---------------------------- API endpoints for stadium processes ----------------------------
    path('all/', views.showEvents.as_view(), name='show_all_events'),
    path('events/', views.getEvents.as_view(), name='get_events'),
    path('get_event/<int:id>', views.getEventById.as_view(), name='get_event_by_id'),
    path("get_stadium/<int:id>", views.getStadiumById.as_view(), name="get_stadium_by_id"),
    path('buy/', views.buyAPI.as_view(), name = 'buy'),
    path('get_username/<int:id>', views.getUsernameById.as_view(), name='get_username'),
    path('search/', views.searchEvents.as_view(), name='search_events'),
    path('get_ticket/<int:pk>', views.getTicketById.as_view(), name = 'get_ticket_by_id'),
    path('get_orders/', views.getOrders.as_view(), name='get_orders'),
    path('get_bill/<int:booking_id>', bills.billAPI.as_view(), name='get_bill'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # urlpatterns += staticfiles_urlpatterns()
