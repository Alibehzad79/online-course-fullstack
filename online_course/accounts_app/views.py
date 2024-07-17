from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts_app.serializers import RegisterSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.auth.hashers import make_password

# Create your views here.


@api_view(["POST"])
def register_api_view(request):
    serializer = RegisterSerializer(data=request.data)
    if get_user_model().objects.filter(email=request.data["email"]).exists():
        return Response(
            data={"message": "email is already exists."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    if serializer.is_valid():
        password = request.data["password"]
        hash_password = make_password(password=password)
        new_user = get_user_model().objects.create(
            username=request.data["email"],
            email=request.data["email"],
            password=hash_password,
            first_name=request.data["first_name"],
            last_name=request.data["last_name"],
        )
        if new_user:
            new_user.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_profile_view(request):
    user = request.user
    serializer = UserProfileSerializer(user, many=False)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
