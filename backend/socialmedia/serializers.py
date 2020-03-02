""" MODULES """
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Post, Comment, Like
from django.utils import timezone


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


class LikeSerializer(serializers.ModelSerializer):
    """ Like Serializer """
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    date = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        author = self.context['request'].user
        post_id = self.context['view'].kwargs['post_pk']
        comment_id = self.context['view'].kwargs['comment_pk']

        if comment_id is not None:
            like, created = Like.objects.get_or_create(
                author=author, post_id=None, comment_id=comment_id)
            return like

        like, created = Like.objects.get_or_create(
            author=author, post_id=post_id, comment_id=comment_id)
        return like

    def update(self, validated_data):
        return self.create(validated_data)

    def delete(self):
        author = self.context['request'].user
        post_id = self.context['view'].kwargs['post_pk']
        comment_id = self.context['view'].kwargs['comment_pk']

        like = Like.objects.get(
            author=author, post_id=post_id, comment_id=comment_id)
        like.delete()

        return like

    class Meta:
        model = Like
        fields = ['author', 'date']


class CommentSerializer(serializers.ModelSerializer):
    """ Comment Serializer """
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    pub_date = serializers.DateTimeField(read_only=True,)

    likes = LikeSerializer(
        source='like_set', many=True, read_only=True)

    def create(self, validated_data):
        post_pk = self.context['view'].kwargs['post_pk']

        return Comment.objects.create(
            pub_date=timezone.now(),
            author=self.context['request'].user,
            post_id=post_pk,
            **validated_data
        )

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'pub_date', 'likes']
        depth = 1


class PostSerializer(serializers.ModelSerializer):
    """ PostSerializer """
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    pub_date = serializers.DateTimeField(read_only=True,)
    # comments = CommentSerializer(source='comment_set', many=True)
    likes = LikeSerializer(
        source='like_set', many=True, read_only=True)

    def create(self, validated_data):
        return Post.objects.create(
            pub_date=timezone.now(),
            author=self.context['request'].user,
            **validated_data
        )

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'pub_date', 'likes']
        depth = 1
