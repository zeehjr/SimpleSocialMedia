from django.contrib.auth.models import User
from django.http.response import JsonResponse, HttpResponseNotModified
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes, api_view
from django.db.utils import IntegrityError


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        new_user = User.objects.create_user(
            request.data['username'], email=request.data['email'], password=request.data['password']
        )
        return JsonResponse({"created_id": new_user.id}, status=201)
    except IntegrityError:
        return HttpResponseNotModified()
    # return JsonResponse(e)
