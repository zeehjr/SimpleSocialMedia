""" Modules """
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    """ Post model """
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    pub_date = models.DateTimeField('published date')

    def __str__(self):
        return self.content


class Comment(models.Model):
    """ Comment model """
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    pub_date = models.DateTimeField('published date')

    def __str__(self):
        return self.content


class PostLike(models.Model):
    """ PostLike model """
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField('date')

    def __str__(self):
        return self.author.username


class CommentLike(models.Model):
    """ CommentLike model """
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    date = models.DateTimeField('date')
