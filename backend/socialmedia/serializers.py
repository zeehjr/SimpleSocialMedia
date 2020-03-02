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
    author = UserSerializer(read_only=True)
    date = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        author = self.context['request'].user
        post_id = self.context['view'].kwargs.get('post_pk', None)
        comment_id = self.context['view'].kwargs.get('comment_pk', None)

        if comment_id is not None:
            like, created = Like.objects.get_or_create(
                author=author, post_id=None, comment_id=comment_id, defaults={"date": timezone.now()})
            return like

        like, created = Like.objects.get_or_create(
            author=author, post_id=post_id, comment_id=None, defaults={"date": timezone.now()})
        return like

    def update(self, validated_data):
        return self.create(validated_data)

    def delete(self):
        author = self.context['request'].user
        post_id = self.context['view'].kwargs.get('post_pk', None)
        comment_id = self.context['view'].kwargs.get('comment_pk', None)

        likes = Like.objects.filter(
            author=author, post_id=post_id, comment_id=comment_id)
        likes.delete()

        return likes

    class Meta:
        model = Like
        fields = ['author', 'date']


class CommentSerializer(serializers.ModelSerializer):
    """ Comment Serializer """
    author = UserSerializer(read_only=True)
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
    author = UserSerializer(read_only=True)

    pub_date = serializers.DateTimeField(read_only=True,)
    # comments = CommentSerializer(source='comment_set', many=True)
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    # likes = LikeSerializer(
    #     source='like_set', many=True, read_only=True)

    def create(self, validated_data):
        return Post.objects.create(
            pub_date=timezone.now(),
            author=self.context['request'].user,
            **validated_data
        )

    class Meta:
        model = Post
        fields = ['id', 'author', 'content',
                  'pub_date', 'likes', 'comments', 'liked']
        depth = 1

    def get_likes(self, obj):
        return obj.like_set.count()

    def get_comments(self, obj):
        return obj.comment_set.count()

    def get_liked(self, obj):
        return obj.like_set.filter(author=self.context['request'].user).count() == 1
