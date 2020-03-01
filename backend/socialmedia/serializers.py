""" MODULES """
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Post, Comment, PostLike, CommentLike


class UserSerializer(serializers.ModelSerializer):
    """ User Serializer """
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    """ Group Serializer """
    class Meta:
        model = Group
        fields = ['url', 'name']


class PostLikeSerializer(serializers.ModelSerializer):
    """ PostLikeSerializer """
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = PostLike
        fields = ['author', 'date']


class CommentLikeSerializer(serializers.ModelSerializer):
    """ PostLikeSerializer """
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = CommentLike
        fields = ['author', 'date']


class CommentSerializer(serializers.ModelSerializer):
    """ Comment Serializer """
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    likes = CommentLikeSerializer(
        source='commentlike_set', many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'pub_date', 'likes']
        depth = 1


class PostSerializer(serializers.ModelSerializer):
    """ PostSerializer """
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    # comments = CommentSerializer(source='comment_set', many=True)
    likes = PostLikeSerializer(
        source='postlike_set', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'pub_date', 'likes']
        depth = 1
