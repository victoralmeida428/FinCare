from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import views, permissions, status, response
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, get_user_model, authenticate
from rest_framework.authentication import SessionAuthentication
from .serializer import *
from rest_framework.decorators import action
from rest_framework import viewsets


# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    model = User
    queryset = model.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        print('qs', qs.filter(username=self.request.user))
        return qs.filter(username=self.request.user)

class UserLogin(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        serializers = LoginUserSerializer(data=data)
        if serializers.is_valid(raise_exception=True):
            user = serializers.check_user(data)
            login(request, user)
            return response.Response(serializers.data, status=status.HTTP_200_OK)
        