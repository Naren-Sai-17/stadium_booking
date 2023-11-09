from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stadium.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    path(r'^accounts/', include('allauth.urls'), name='socialaccount_signup'),
]
