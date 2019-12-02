"""Online_Organizer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from apps.app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.IndexView.as_view(),name = 'index'),# index page
    path('login', views.LoginView.as_view(),name = 'login'),# login page
    path('register', views.RegisterView.as_view(),name = 'register'), # register page
    path('index', views.IndexView.as_view(),name = 'index'),# index page
    path('single_page/<itemID>', views.SingleStandardPage.as_view(),name = 'single_page'),# single_page page
    path('write_blog/<itemID>', views.WriteBlog.as_view(),name = 'write_blog'),# write_blog page
    path('search/<essay>', views.SearchResultPage.as_view(),name = 'search'),# write_blog page
    path('add_friends', views.AddFriends.as_view(),name = 'add_friends'),# my_collections page
    path('your_friends', views.YourFriends.as_view(),name = 'your_friends'),# your_friends page
    path('share_space', views.BlogPosts.as_view(),name = 'share_space'),# your_friends page
    path('logout', views.LogoutView.as_view(),name = 'logout'),# logout page
]
