from django.urls import path, include
from .views import *

urlpatterns =[
    path('stocks/<stocks>/<start>/<end>', stocks, name='stocks'),
    path('info_stocks/<stocks>', info_stocks, name='info_stocks'),
    path('user/stocks',ListWalletStocks.as_view())
]