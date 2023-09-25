from django.http import JsonResponse
import yfinance as yf
import datetime as dt
from rest_framework import generics
from .models import WalletModel
from .serializer import *
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

def patternStocks(stocks):
    stocks = stocks.upper().replace('_ACENTO_', '^').replace('_PONTO_','.').replace(',', '-').replace(' ', '-')
    lStocks = stocks.split('-')
    lStocks = [i for i in lStocks if i != '']
    return lStocks

def stocks(request, stocks: str, start, end):
    data =[]
    lStocks = patternStocks(stocks)
    print(lStocks)
    ticker = yf.Tickers(lStocks)
    df = ticker.history(start=start, end=end)
    print(df)
    for col in df.Close.columns:
        dic = {'stock': col}
        dic['close'] = list(df.Close[col].values)
        dic['open'] = list(df.Open[col].values)
        dic['date'] = list(df.index)
        dic['high'] = list(df.High[col].values)
        dic['low'] = list(df.Low[col].values)
        data.append(dic)
    # else:
    #     tickers = yf.Tickers(lStocks)
    #     df = tickers.history(start=start, end=end)
    #     df = (df.max()-df)/(df.max()-df.min())
    #     close_dic = {col:list(df.Close[col].values) for col in df.Close.columns}
    #     data['date'] = list(df.index)
    #     data.update(close_dic)
        
        
    
    
    return JsonResponse({'data': data})

def info_stocks(request, stocks):
    data = {}
    lista = []
    name_info = {'marketCap': 'Market Cap', 'totalDebt': 'Total Debt',
                     'enterpriseValue':'Enterprise Value',
                     'ebitda': 'EBITDA', 'trailingEps': 'Trailing Eps', 'floatShares': 'Float Shares',
                     'sharesOutstanding':'Shares Outstanding', 'previousClose':'Previous Close',
                     'governanceEpochDate': 'Governance Epoch Date'}
    stocksList = patternStocks(stocks)
    infos = []
    for stock in stocksList:
        if not str(stock).startswith('^'):
            ticker = yf.Ticker(stock)
            ticker.info['governanceEpochDate'] = dt.datetime.fromtimestamp(ticker.info.get('governanceEpochDate',11111111111)).strftime("%d/%m/%Y") if ticker.info.get('governanceEpochDate',False) else None
            infos.append((stock, ticker.info))
        
        
    for key, value in name_info.items():
        dic = {'info': value}
        for (stock, info) in infos:
            dic[stock]= f'{info.get(key):,}'  if (isinstance(info.get(key), int)|isinstance(info.get(key), float)) else info.get(key)
        lista.append(dic)
    data['data'] = lista
    return JsonResponse(data)

class ListWalletStocks(generics.ListAPIView): 
    def get_queryset(self):
        queryset = WalletModel.objects.filter(username_id=self.kwargs['pk'])
        return queryset
    # permission_classes = [IsAuthenticated]
    serializer_class = ListStockSerializer

class DeleteWalletStocks(generics.DestroyAPIView):
    serializer_class = ListStockSerializer
    
    def get_queryset(self):
        return super().get_serializer().Meta.model.objects.filter(username_id=self.kwargs['pk'])
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
