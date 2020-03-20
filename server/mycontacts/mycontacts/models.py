from django.db import models
from django_mysql.models import ListTextField

class Contact(models.Model):
    name = models.CharField(max_length=15)
    surname = models.CharField(max_length=20)
    email = ListTextField(base_field=models.CharField(max_length=25))
    phone = ListTextField(base_field=models.CharField(max_length=13))


