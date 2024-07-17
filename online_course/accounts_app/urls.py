from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts_app.views import register_api_view, user_profile_view

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("register/", register_api_view, name="register"),
    path('user/', user_profile_view, name="user-info"),
]
