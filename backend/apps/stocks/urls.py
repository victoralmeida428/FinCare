from django.urls import path, include
from .views import *
from rest_framework import routers

urlpatterns =[
    path('stocks/<stocks>/<start>/<end>', stocks, name='stocks'),
    path('info_stocks/<stocks>', info_stocks, name='info_stocks'),
    path('user/<pk>/stocks',ListWalletStocks.as_view())
]