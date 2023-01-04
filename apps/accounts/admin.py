from django.contrib import admin
from .models import UserLibrary, UserModel

# Register your models here.
admin.site.register(UserLibrary)
admin.site.register(UserModel)