from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _

# Create your models here.


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, verbose_name=_("Email Address"))

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("username",)

    def __str__(self):
        return self.email
