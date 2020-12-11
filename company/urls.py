from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

from . import views

router = routers.DefaultRouter()
router.register(r'business', views.BusinessViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'source', views.SourceViewSet)
router.register(r'price_history', views.PriceHistoryViewSet)

schema_view = get_swagger_view(title='BizDir API')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('send_excel/', views.SendExcelView.as_view()),
    path('company_enrich/', views.CompanyEnrich.as_view()),
    # path('saved_searches/', views.SavedSearchFilter.as_view()),
    path('company/<int:pk>', views.CompanyDetailView.as_view()),
    # path('company_multi_param/', views.CompanyMultiParam.as_view()),
    path('load_static/', views.LoadStaticData.as_view()),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('doc/', schema_view),
]