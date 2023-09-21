from rest_framework.serializers import ModelSerializer, ReadOnlyField
from django.contrib.auth.models import User
from .models import WalletModel

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class WalletSerializer(ModelSerializer):
    class Meta:
        model = WalletModel
        fields = '__all__'

class ListStockSerializer(ModelSerializer):
    username = ReadOnlyField(source = 'username.username')
    class Meta:
        model = WalletModel
        fields = ['username', 'stock']
