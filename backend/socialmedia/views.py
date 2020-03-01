""" Modules """
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .models import Post, Comment, PostLike, CommentLike
from . import serializers

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """ User ViewSet """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """ Group ViewSet """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer


class PostViewSet(viewsets.ModelViewSet):
    """ Post ViewSet """
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """ Comment ViewSet """
    # queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['post_pk'])


class PostLikeViewSet(viewsets.ModelViewSet):
    """ PostLike ViewSet """
    queryset = PostLike.objects.all()
    serializer_class = serializers.PostLikeSerializer


class CommentLikeViewSet(viewsets.ModelViewSet):
    """ CommentLike ViewSet """
    queryset = CommentLike.objects.all()
    serializer_class = serializers.CommentLikeSerializer
