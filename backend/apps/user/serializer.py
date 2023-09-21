from rest_framework.serializers import ModelSerializer, StringRelatedField
from django.contrib.auth.models import User
from apps.stocks.models import WalletModel

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


