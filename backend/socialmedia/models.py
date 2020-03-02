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


class Like(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    def __str__(self):
        if self.post is not None:
            return f"{self.author.username} - {self.post}"

        return f"{self.author.username} - {self.comment}"
