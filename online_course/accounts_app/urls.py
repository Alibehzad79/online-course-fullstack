from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)

from accounts_app.views import register_api_view, user_profile_view, logout

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("register/", register_api_view, name="register"),
    path("logout/", TokenBlacklistView.as_view(), name="logout"),
    path("user/", user_profile_view, name="user-info"),
]
