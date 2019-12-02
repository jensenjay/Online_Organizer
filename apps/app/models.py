from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Users(AbstractUser,models.Model):
    '''this class is used to store the information about the users'''
    class Meta:
        db_table = 'user_information'
        verbose_name = 'user_information'
        verbose_name_plural = verbose_name


class UserCard(models.Model):
    title = models.CharField(max_length=100,default="")
    description = models.TextField()
    time = models.DateTimeField(auto_now=True)
    created_user = models.ForeignKey('Users',on_delete=models.CASCADE)
    is_shared = models.IntegerField(default=0)

    class Meta:
        db_table = 'user_card'
        verbose_name = 'user_card'
        verbose_name_plural = verbose_name

class FriendsList(models.Model):
    userID = models.ForeignKey('Users',on_delete=models.CASCADE)
    friends_list = models.TextField()

    class Meta:
        db_table = 'FriendsList'
        verbose_name = 'FriendsList'
        verbose_name_plural = verbose_name