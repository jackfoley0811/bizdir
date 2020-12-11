from django.shortcuts import render

from datetime import date
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import generics
from .serializers import BusinessSerializer, CategorySerializer, SourceSerializer, PriceHistorySerializer, BusinessPartSerializer
from .models import Business, Category, Source, Price_History# from django.db.models import Q
from django.conf import settings
from django.core.mail import EmailMessage
from io import BytesIO
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
import json
import xlwt
import math


class BusinessViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,) 
    queryset = Business.objects.all().order_by('id')[:100]
    serializer_class = BusinessPartSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,) 
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer

class SourceViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,) 
    queryset = Source.objects.all().order_by('id')
    serializer_class = SourceSerializer

class PriceHistoryViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,) 
    queryset = Price_History.objects.all().order_by('id')[:10]
    serializer_class = PriceHistorySerializer

class CompanyEnrich(generics.GenericAPIView):
    """
    """
    serializer_class = BusinessPartSerializer
    # permission_classes = (IsAuthenticated,) 
    
    def post(self, request, format=None):
        """
        """
        print(request.data)
        query = None
                
        startFrom = request.data['startFrom']
        limit = request.data['limit']

        companies = Business.objects.all()
        if 'order_by' in request.data:
            if request.data['order'] == 'asc':
                direction = ''
            else:
                direction = '-'
            if request.data['order_by'] == 'asking_price' or request.data['order_by'] == 'cash_flow' or request.data['order_by'] == 'gross_revenue' or request.data['order_by'] == 'multiple' or request.data['order_by'] == 'created_at':
                companies = companies.order_by('{}last_price__{}'.format(direction, request.data['order_by']))
            else:
                companies = companies.order_by('{}{}'.format(direction, request.data['order_by']))
        current_year = date.today().year
        for attr, value in request.data.items():
            if attr == 'keyword':
                companies = companies.filter(title__icontains = value)
            elif attr == 'source':
                companies = companies.filter(source_id = value['id'])
            elif attr == 'category':
                if len(value) > 0:
                    companies = companies.filter(category_id__in = value)
            elif attr == 'state':
                companies = companies.filter(state = value) 
            elif attr == 'county':
                companies = companies.filter(county = value) 
            elif attr == 'internet':
                if value == True:
                    companies = companies.filter(source_id__gte = 3) 
                else:
                    companies = companies.filter(source_id__lte = 2) 
            elif attr == 'lists_cashflow':
                if value == True:
                    companies = companies.filter(last_price__cash_flow__isnull = False) 
            elif attr == 'lists_revenue':
                if value == True:
                    companies = companies.filter(last_price__gross_revenue__isnull = False)
            elif attr == 'minAge':
                companies = companies.filter(established__lte = current_year - value)
            elif attr == 'seller_financing':
                if value == True:
                    companies = companies.filter(seller_financing = True)
            elif attr == 'asking_price':
                if 'max' in value and value['max']:
                    companies = companies.filter(last_price__asking_price__lte = value['max'])
                if 'min' in value and value['min']:
                    companies = companies.filter(last_price__asking_price__gte = value['min'])
            elif attr == 'gross_revenue':
                if 'max' in value and value['max']:
                    companies = companies.filter(last_price__gross_revenue__lte = value['max'])
                if 'min' in value and value['min']:
                    companies = companies.filter(last_price__gross_revenue__gte = value['min'])
            elif attr == 'cash_flow':
                if 'max' in value and value['max']:
                    companies = companies.filter(last_price__cash_flow__lte = value['max'])
                if 'min' in value and value['min']:
                    companies = companies.filter(last_price__cash_flow__gte = value['min'])
            elif attr == 'multiple':
                if 'max' in value and value['max']:
                    companies = companies.filter(last_price__multiple__lte = value['max'])
                if 'min' in value and value['min']:
                    companies = companies.filter(last_price__multiple__gte = value['min'])
        
        count = companies.count()
        companies = companies[startFrom:startFrom + limit]

        serializer = BusinessPartSerializer(companies, many = True)
        return Response({'total_count': count, 'startFrom': startFrom, 'data': serializer.data})

class CompanyDetailView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, pk, format=None):
        business = Business.objects.get(id=pk)
        price_history = Price_History.objects.all().filter(business_id=pk)
        return Response({"company": BusinessSerializer(business).data, "price_history": PriceHistorySerializer(price_history, many = True).data})

class LoadStaticData(generics.GenericAPIView):
    """
    """
    permission_classes = (IsAuthenticated,) 
    
    def get(self, request, format=None):
        """
        """
        categories = Category.objects.all()
        sources = Source.objects.all()
        return Response({
            'categories': CategorySerializer(categories, many = True).data,
            'sources': SourceSerializer(sources, many = True).data
        })

# class CompanyMultiParam(generics.GenericAPIView):
#     """
    
#     """
#     serializer_class = CompanyInputSerializer 
#     permission_classes = (IsAuthenticated,) 

#     def post(self, request, format=None):
#         """
#         """
#         companies = Company.objects.all().order_by('company_id')
#         for attr, value in request.data.items():
#             if attr == 'company_name':
#                 companies = companies.filter(company_name = value)
#             elif attr == 'address':
#                 companies = companies.filter(address = value)
#             elif attr == 'phone':
#                 companies = companies.filter(phone = value)
#             elif attr == 'website':
#                 companies = companies.filter(website = value)
#             elif attr == 'latitude':
#                 companies = companies.filter(latitude = value)
#             elif attr == 'longitude':
#                 companies = companies.filter(longitude = value)
#             elif attr == 'employee_range':
#                 companies = companies.filter(total_employees__gte = value[0]).filter(total_employees__lte = value[1])
#             elif attr == 'sales_volume_range':
#                 companies = companies.filter(sales_volume__gte = value[0]).filter(sales_volume__lte = value[1])
#             elif attr == 'sic_code':
#                 companies = companies.filter(sic_code_id = value)

#         serializer = CompanyListSerializer(companies, many = True)
#         return Response(serializer.data)

# class CompanyViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = Company.objects.all().order_by('company_id')[:10]
#     serializer_class = CompanySerializer

# class IndustryViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = Industry.objects.all().order_by('industry_id')
#     serializer_class = IndustrySerializer

# class SiccodeViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = Sic_code.objects.all().order_by('code')
#     serializer_class = SiccodeSerializer

# class LocationViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = Location.objects.all().order_by('location_id')
#     serializer_class = LocationSerializer

# class SavedSearchViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = SavedSearch.objects.all().order_by('search_id')
#     serializer_class = SavedSearchSerializer

# class StateViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = State.objects.all()
#     serializer_class = StateSerializer

# class CountyViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = County.objects.all()
#     serializer_class = CountySerializer

# class CityViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
#     queryset = City.objects.all()
#     serializer_class = CitySerializer

# class SavedSearchFilter(generics.GenericAPIView):
#     """
#     """
#     serializer_class = SavedSearchSerializer
#     permission_classes = (IsAuthenticated,) 
    
#     def post(self, request, format=None):
#         """
#         """
#         print(request.data)
#         if 'user_id' in request.data:
#             query = Q(user_id=request.data['user_id'])

#         savedSearches = SavedSearch.objects.all().order_by('search_id').filter(query)
#         serializer = SavedSearchSerializer(savedSearches, many = True)
#         return Response(serializer.data)

# def getContactsFromCompanies(companies):
#     contacts = []
#     for company in companies:
#         company_contacts = json.loads(company['contacts'])
#         for contact in company_contacts:
#             tmp_contact = contact
#             tmp_contact['company_id'] = company['company_id']
#             tmp_contact['company_name'] = company['company_name']
#             contacts.append(tmp_contact); 
#     return contacts

# class SendExcelView(APIView):
#     """
#     """
#     permission_classes = (IsAuthenticated,) 
#     def post(self, request):
#         """
#         """
#         wb = xlwt.Workbook(encoding='utf-8')
#         if 'companies' in request.data:
#             ws = wb.add_sheet('Companies')
#             row_num = 0
#             columns = ['Company ID', 'Company Name', 'Address', 'City', 'County', 'State', 'Zipcode', 'Latitude', 'Longitude', 'Phone', 'Fax', 'Website', 'Total Employees', 'Employee Range', 'Sales Volume', 'Sales Volume Range', 'SIC', 'SIC Description', 'Industry', 'NAICS']
#             keys = ['company_id', 'company_name', 'address', 'city', 'county', 'state', 'zip', 'latitude', 'longitude', 'phone', 'fax_number', 'website', 'total_employees', 'employee_range', 'sales_volume', 'sales_volume_range', 'code', 'description', 'industry', 'naics_number']
#             font_style = xlwt.XFStyle()
#             font_style.font.bold = True
#             for col_num in range(len(columns)):
#                 ws.write(row_num, col_num, columns[col_num], font_style)
#             font_style = xlwt.XFStyle()
#             for row in request.data['companies']:
#                 row_num += 1
#                 for col_num in range(len(columns)):
#                     ws.write(row_num, col_num, row[keys[col_num]], font_style)

#             contacts = getContactsFromCompanies(request.data['companies'])
#             ws = wb.add_sheet('Contacts')
#             row_num = 0
#             columns = ['Company ID', 'Company Name', 'First Name', 'Last Name', 'Full Name', 'Gender', 'Title']
#             keys = ['company_id', 'company_name', 'first_name', 'last_name', 'full_name', 'gender', 'title']
#             font_style = xlwt.XFStyle()
#             font_style.font.bold = True
#             for col_num in range(len(columns)):
#                 ws.write(row_num, col_num, columns[col_num], font_style)
#             font_style = xlwt.XFStyle()
#             for row in contacts:
#                 row_num += 1
#                 for col_num in range(len(columns)):
#                     ws.write(row_num, col_num, row[keys[col_num]], font_style)


#         if 'sheetname' in request.data:
#             ws = wb.add_sheet(request.data['sheetname'])
#             row_num = 0
#             if request.data['sheetname'] == 'SIC Codes':
#                 columns = ['Code', 'Description']
#                 keys = ['code', 'description']
#             elif request.data['sheetname'] == 'Industry':
#                 columns = ['ID', 'Industry']
#                 keys = ['industry_id', 'industry']
#             elif request.data['sheetname'] == 'Accounts':
#                 columns = ['Email', 'First Name', 'Last Name', 'Joined At', 'Token', 'Token Created At']
#                 keys = ['email', 'first_name', 'last_name', 'date_joined', 'key', 'created']
#             elif request.data['sheetname'] == 'State':
#                 columns = ['State Code', 'State Name']
#                 keys = ['code', 'name']
#             elif request.data['sheetname'] == 'County':
#                 columns = ['County Code', 'County Name', 'State Code']
#                 keys = ['code', 'name', 'state']
#             elif request.data['sheetname'] == 'City':
#                 columns = ['ID', 'City Name', 'State Code', 'County', 'Latitude', 'Longitude']
#                 keys = ['id', 'name', 'state', 'county', 'latitude', 'longitude']
#             font_style = xlwt.XFStyle()
#             font_style.font.bold = True
#             for col_num in range(len(columns)):
#                 ws.write(row_num, col_num, columns[col_num], font_style)
#             font_style = xlwt.XFStyle()
#             for row in request.data['items']:
#                 row_num += 1
#                 for col_num in range(len(columns)):
#                     if (keys[col_num] == 'key' or keys[col_num] == 'created') and ('token' in row and 'key' in row['token']):
#                         ws.write(row_num, col_num, row['token'][keys[col_num]], font_style)
#                     else:
#                         ws.write(row_num, col_num, row[keys[col_num]], font_style)

#         output = BytesIO()
#         wb.save(output)
#         mail = EmailMessage('Data from BizIntel', 'Please download this file.', "admin@bizintel.com", [request.data['email']])
#         mail.attach('{}.xlsx'.format(request.data['filename']), output.getvalue() , 'application/vnd.ms-excel')
#         mail.send()
#         return Response({})