from django.urls import path, include


from .views import UserAPIView, RegisterAPIView, LoginAPIView, UserListAPIView, CustomUserDetailView

urlpatterns = [
    path('user', UserAPIView.as_view()),
    path('users', UserListAPIView.as_view()),
    path('users/<int:pk>', CustomUserDetailView.as_view()),
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
]