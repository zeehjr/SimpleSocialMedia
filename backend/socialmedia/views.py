""" Modules """
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .serializers import PostSerializer, CommentSerializer, UserSerializer, GroupSerializer, PostLikeSerializer, CommentLikeSerializer
from .models import Post, Comment, PostLike, CommentLike

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """ User ViewSet """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """ Group ViewSet """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PostViewSet(viewsets.ModelViewSet):
    """ Post ViewSet """
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """ Comment ViewSet """
    # queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['post_pk'])


class PostLikeViewSet(viewsets.ModelViewSet):
    """ PostLike ViewSet """
    queryset = PostLike.objects.all()
    serializer_class = PostLikeSerializer


class CommentLikeViewSet(viewsets.ModelViewSet):
    """ CommentLike ViewSet """
    queryset = CommentLike.objects.all()
    serializer_class = CommentLikeSerializer
