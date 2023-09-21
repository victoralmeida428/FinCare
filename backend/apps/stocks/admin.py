from django.contrib import admin
from .models import WalletModel
# Register your models here.
@admin.register(WalletModel)
class WalletList(admin.ModelAdmin):
    list_display = ('id', 'username', 'stock')
    search_fields = ('username'),