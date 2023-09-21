from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', UserView, basename='user')

urlpatterns =[
    path('', include(router.urls))
]