from django.http import JsonResponse
import yfinance as yf
import datetime as dt
from rest_framework.generics import ListAPIView
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
    data ={}
    lStocks = patternStocks(stocks)
    if len(lStocks)==1:
        ticker = yf.Ticker(lStocks[0])
        df = ticker.history(start=start, end=end)
        data['close'] = list(df.Close.values)
        data['date'] = list(df.index)
        data['open'] = list(df.Open.values)
        data['high'] = list(df.High.values)
        data['low'] = list(df.Low.values)
    else:
        tickers =yf.Tickers(lStocks)
        df = tickers.history(start=start, end=end)
        df = (df.max()-df)/(df.max()-df.min())
        close_dic = {col:list(df.Close[col].values) for col in df.Close.columns}
        data['date'] = list(df.index)
        data.update(close_dic)
        
        
    
    
    return JsonResponse(data)

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
        ticker = yf.Ticker(stock)
        ticker.info['governanceEpochDate'] = dt.datetime.fromtimestamp(ticker.info.get('governanceEpochDate')).strftime("%d/%m/%Y")
        infos.append((stock, ticker.info))
        
        
    for key, value in name_info.items():
        dic = {'info': value}
        for (stock, info) in infos:
            dic[stock]= f'{info.get(key):,}'  if (isinstance(info.get(key), int)|isinstance(info.get(key), float)) else info.get(key)
        lista.append(dic)
    data['data'] = lista
    return JsonResponse(data)

class ListWalletStocks(ListAPIView):
    
    def get_queryset(self):
        queryset = WalletModel.objects.filter(username_id=self.kwargs['pk'])
        return queryset
    # permission_classes = [IsAuthenticated]
    serializer_class = ListStockSerializer
