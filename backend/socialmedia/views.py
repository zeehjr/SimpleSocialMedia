""" Modules """
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from django.utils import timezone
from .models import Post, Comment, Like
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
        return Comment.objects.filter(post_id=self.kwargs['post_pk'])


class LikeViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    serializer_class = serializers.LikeSerializer

    def get_queryset(self):
        post_pk = self.kwargs['post_pk']
        comment_pk = self.kwargs['comment_pk']

        if comment_pk is not None:
            return Like.objects.filter(comment_id=comment_pk)

        return Like.objects.filter(post_id=post_pk)
