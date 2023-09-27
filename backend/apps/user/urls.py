from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', UserView, basename='user')
# router.register('login', UserLogin, basename='login')

urlpatterns =[
    path('', include(router.urls)),
    path('login', UserLogin.as_view(), name='login')
]