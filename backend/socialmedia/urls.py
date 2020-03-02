""" Modules """
from django.urls import path, include
from rest_framework_nested import routers
from . import views

ROUTER = routers.DefaultRouter()

ROUTER.register(r'users', views.UserViewSet)
ROUTER.register(r'groups', views.GroupViewSet)
ROUTER.register(r'posts', views.PostViewSet)
# ROUTER.register(r'posts/<int:post>/comments', views.CommentViewSet)
# ROUTER.register(r'postlikes', views.PostLikeViewSet)
# ROUTER.register(r'commentlikes', views.CommentLikeViewSet)

POSTS_ROUTER = routers.NestedDefaultRouter(ROUTER, r'posts', lookup='post')

POSTS_ROUTER.register(r'comments', views.CommentViewSet,
                      basename='comments')

POSTS_ROUTER.register(r'likes', views.LikeViewSet, basename='like')

COMMENTS_ROUTER = routers.NestedDefaultRouter(
    POSTS_ROUTER, r'comments', lookup='comment')
COMMENTS_ROUTER.register(
    r'likes', views.LikeViewSet, basename='like')

urlpatterns = [
    path('', include(ROUTER.urls)),
    path('', include(POSTS_ROUTER.urls)),
    path('', include(COMMENTS_ROUTER.urls))
]
