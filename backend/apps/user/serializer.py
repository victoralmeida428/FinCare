from rest_framework import serializers
from django.contrib.auth.models import User
from apps.stocks.models import WalletModel
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data.get('username'), password = clean_data.get('password'))
        if user:
            return user
        raise ValidationError('User not found')
    






