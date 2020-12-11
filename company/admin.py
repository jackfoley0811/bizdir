from django.contrib import admin
from .models import Business, Category, Source, Price_History

admin.site.register(Business)
admin.site.register(Category)
admin.site.register(Source)
admin.site.register(Price_History)


# Register your models here.
