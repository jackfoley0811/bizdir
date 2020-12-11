# serializers.py
from rest_framework import serializers
from django.db import models
from .models import Business, Category, Source, Price_History



class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')

class SourceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Source
        fields = ('id', 'title')


class BusinessSerializer(serializers.HyperlinkedModelSerializer):
    # source = SourceSerializer(required=False, allow_null=True)
    # category = CategorySerializer(required=False, allow_null=True)
    class Meta:
        model = Business
        fields = ('id', 'title', 'description', 'url', 'seller_financing', 'ebitda', 'ff_e', 'inventory', 'state', 'county', 'established', 'employee_count', 'website', 'created_at', 'updated_at', 'source_id', 'category_id', 'tag')
        # related_object = ['source', 'category']

class PriceHistorySerializer(serializers.HyperlinkedModelSerializer):
    # business = BusinessSerializer(required=False, allow_null=True)
    class Meta:
        model = Price_History
        fields = ('asking_price', 'cash_flow', 'multiple', 'created_at', 'business_id', 'gross_revenue')
        # business = ['business']

class BusinessPartSerializer(serializers.HyperlinkedModelSerializer):
    # source = SourceSerializer(required=False, allow_null=True)
    # category = CategorySerializer(required=False, allow_null=True)
    last_price = PriceHistorySerializer(required=False, allow_null=True)
    class Meta:
        model = Business
        fields = ('id', 'title', 'source_id', 'category_id', 'last_price', 'created_at', 'url')
        related_object = ['last_price']
