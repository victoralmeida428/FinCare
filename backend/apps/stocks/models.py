from django.db import models
from django.contrib.auth.models import User

class WalletModel(models.Model):
    username = models.ForeignKey(User, related_name='users',  on_delete=models.CASCADE)
    stock = models.CharField(max_length=50)

    def __str__(self) -> str:
        return {self.id: self.stock}

