# Generated by Django 3.0.3 on 2020-03-17 07:49

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('surname', models.CharField(max_length=20)),
                ('email', django_mysql.models.ListTextField(models.CharField(max_length=25), size=None)),
                ('phone', django_mysql.models.ListTextField(models.CharField(max_length=13), size=None)),
            ],
        ),
    ]
