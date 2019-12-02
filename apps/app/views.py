import re
from audioop import reverse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, QueryDict
from django.shortcuts import render, redirect

# Create your views here.
# /app/register
from django.views.generic import TemplateView
from apps.app.models import UserCard, Users, FriendsList

class RegisterView(TemplateView):
    '''register page '''
    def get(self, request):
        '''show the register page'''
        return render(request, 'register.html')

    def post(self, request):
        '''process the registration request'''

        # recieve the data and get the data
        username = request.POST.get('user_name')
        password = request.POST.get('pwd')
        comfirmed_password = request.POST.get('rpwd')
        print(password)
        print(comfirmed_password)
        if not all([username, password, comfirmed_password]):
            # if the data is not complete,return the error information
            return JsonResponse({"res": 0, "error_msg": "Data not complete."})
        # check the password whether they are the same
        if password != comfirmed_password:
            return JsonResponse({"res": 0, "error_msg": "the passwords are not match."})
        # check if the user already exists.
        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            # if user does not exist in the database ,set the the user as None
            user = None

        if user:
            # if user already exists, return the error message
            return JsonResponse({"res": 0, "error_msg": username + ' has been registered.'})

        # if user does not exist, do the next step,do the registration
        user = Users.objects.create_user(username, password=password)
        user.is_active = 1
        user.save()
        login(request, user)
        FriendsList(userID=request.user).save()
        return JsonResponse({"res": 1})


class IndexView(LoginRequiredMixin, TemplateView):
    '''index page'''
    def get(self, request):
        '''return the user's favortie stop list'''
        # get the stop information from the database

        user_card = UserCard.objects.filter(created_user=request.user)
        cards = list(user_card)
        return render(request, 'index.html', {"content":cards})

    def delete(self, request):
        '''remove the stop from the favorite list'''

        # get the stop info
        DELETE = QueryDict(request.body)
        itemID = DELETE.get('itemID')
        UserCard.objects.get(id=itemID,created_user=request.user).delete()
        return JsonResponse({"res": 1})

class BlogPosts(LoginRequiredMixin, TemplateView):
    '''index page'''
    def get(self, request):
        user_list = FriendsList.objects.get(userID=request.user).friends_list.split(',')
        user_list.remove('')
        user_list.append(request.user.id)
        user_cards = UserCard.objects.filter(created_user__in=user_list, is_shared=1)
        return render(request, 'share_space.html', {"content":user_cards})


class SingleStandardPage(LoginRequiredMixin, TemplateView):
    '''index page'''
    def get(self, request,itemID):
        print(itemID)
        content = UserCard.objects.get(id=itemID)
        return render(request, 'single_blog.html',{"content":content})

    def post(self,request,itemID):
        item = UserCard.objects.get(id=itemID)
        if item.is_shared == 1:
            return JsonResponse({"res": 0})
        else:
            item.is_shared = 1
            item.save()
            return JsonResponse({"res": 1})



class SearchResultPage(LoginRequiredMixin, TemplateView):
    '''Search result page'''
    def get(self, request, essay):
        content = UserCard.objects.filter(created_user=request.user)
        list=[]
        for item in content:
            if item.title.find(essay) != -1:
                list.append(item)
        friend_list = FriendsList.objects.get(userID=request.user).split(',')
        friend_list.remove('')
        content2 = UserCard.objects.filter(created_user__in=friend_list,is_shared=1)
        for item in content2:
            if item.title.find(essay) != -1:
                list.append(item)

        return render(request, 'search_result.html',{"content":list})


class AddFriends(LoginRequiredMixin, TemplateView):
    '''your friends page'''
    def get(self, request):

        user = FriendsList.objects.get(userID=request.user)
        list = []
        user_list = user.friends_list.split(',')
        user_list.remove('')
        for i in range(len(user_list)):
            user_list[i] = int(user_list[i])
        user_list.append(request.user.id)
        users = Users.objects.all()
        for each_user in users:
            if each_user.id not in user_list:
                list.append(each_user)
        return render(request, 'add_friends.html', {"content":list})

    def post(self,request):
        userID = request.POST.get('userID')
        user = FriendsList.objects.get(userID=request.user)

        user_list = user.friends_list
        user.friends_list = user_list+","+userID
        user.save()
        return JsonResponse({"res": 1})

class YourFriends(LoginRequiredMixin, TemplateView):
    '''your friends page'''
    def get(self, request):
        user = FriendsList.objects.get(userID=request.user)
        user_list = user.friends_list.strip().split(',')
        user_list.remove('')
        if user_list:
            for i in range(len(user_list)):
                user_list[i] = int(user_list[i])
        users = Users.objects.filter(id__in=user_list)
        return render(request, 'your_friends.html', {"content":users})

    def post(self,request):
        userID = request.POST.get('userID')
        user = FriendsList.objects.get(userID=request.user)
        user_list = user.friends_list.split(',')
        user_list.remove('')
        user_list.remove(userID)
        user.friends_list = ','.join(user_list)
        user.save()
        return JsonResponse({"res": 1})





# /user/logout
class LogoutView(TemplateView):
    '''login out'''

    def get(self, request):
        '''login out'''
        # clear user's session information
        logout(request)

        # go to index page
        return render(request, 'login.html')



class WriteBlog(LoginRequiredMixin,TemplateView):
    '''index page'''
    def get(self, request,itemID):
        if itemID == "0":
            return render(request, 'writeblog.html')
        else:
            content = UserCard.objects.get(id=itemID)
            return render(request, 'writeblog.html',{"content":content})

    def post(self, request,itemID):
        '''store the essay'''
        # get the user data
        title = request.POST.get('title')
        description = request.POST.get('description')
        if description.startswith('<div>'):
            description = description[5:-7]
        if not all([title, description]):
            return JsonResponse({"res": 0, "error_msg": 'Title or Content can not be empty'})
        if itemID=="0":
            UserCard(description = description, title=title, created_user = request.user).save()
        else:
            content = UserCard.objects.get(id=itemID)
            content.title = title
            content.description = description
            content.save()
        return JsonResponse({"res": 1})

# /user/login
class LoginView(TemplateView):
    '''login page'''
    def get(self, request):
        '''show the login page'''
        return render(request, 'login.html')

    def post(self, request):
        '''process the login'''

        # get the user data
        username = request.POST.get('username')
        password = request.POST.get('pwd')
        # verify the data,check if they are complete
        if not all([username, password]):
            return JsonResponse({"res": 0, "error_msg": 'Data is not complete'})
       # login verification
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"res": 1})
        else:
            return JsonResponse({"res": 0, 'error_msg': 'username or password wrong'})



