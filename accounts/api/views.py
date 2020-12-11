# accounts/api/views.py

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from datetime import datetime

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, TokenSerializer


class UserAPIView(generics.RetrieveAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class UserListAPIView(generics.GenericAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    serializer_class = UserSerializer
    
    def get(self, request, *args, **kwargs):
        users = User.objects.all().order_by('username')
        serializer = UserSerializer(users, many = True)
        tokens = Token.objects.all()
        token_serializer = TokenSerializer(tokens, many = True)
        
        return Response({'users': serializer.data, 'tokens': token_serializer.data})
    
class CustomUserDetailView(APIView):
    # permission_classes = [permissions.IsAuthenticated,]

    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        customuser = self.get_object(pk)
        serializer = UserSerializer(customuser)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        password = None
        if 'regenerateToken' in request.data:
            token = Token.objects.get(user_id=pk)
            token.delete()
            return Response({'token': TokenSerializer(Token.objects.create(user=self.get_object(pk))).data})
        elif 'activate' not in request.data:
            form = request.data
            if 'password' in request.data and request.data['password'] != "":
                password = request.data['password']
                # del request.data['password']
            else:
                form['password'] = request.data['password_old']
                del request.data['password_old']
            serializer = UserSerializer(user, data=request.data)
            print(request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

                print (password)
                if password and password != "":
                    user = self.get_object(pk)
                    user.set_password(password)
                    user.save()
                return Response({'user': UserSerializer(self.get_object(pk)).data})
        else:
            user.is_active = True
            user.date_joined = datetime.now()
            user.save()
            

            return Response({'token': TokenSerializer(Token.objects.create(user=self.get_object(pk))).data})
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        customuser = self.get_object(pk)
        customuser.is_active = False
        customuser.save()
        token = Token.objects.get(user_id=pk)
        token.delete()

        return Response({"pk": pk})

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user = UserSerializer(user, context=self.get_serializer_context())
        
        
        token = {}
        if 'is_active' not in request.data or request.data['is_active'] == True:
            token = TokenSerializer(Token.objects.create(user=User.objects.get(username=user.data['username']))).data
            tmp_user = user.data
        else:
            tmp_user = User.objects.get(username=request.data['username'])
            tmp_user.is_active = request.data['is_active']
            tmp_user.save()
            tmp_user = user.data
            tmp_user['is_active'] = False
        return Response({
            "user": tmp_user,
            "token": token
        })


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user = UserSerializer(user, context=self.get_serializer_context())
        token = TokenSerializer(Token.objects.get(user=User.objects.get(username=user.data['username']))).data
        return Response({
            "user": user.data,
            "token": token
        })