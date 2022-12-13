from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny


from .models import UserFavorites
from .serializers import FavoritesSerializer


class AddFavorites(ListCreateAPIView):
    queryset = UserFavorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes = [AllowAny]


class ModifyFavorites(RetrieveUpdateDestroyAPIView):
    queryset = UserFavorites.objects.all()
    lookup_url_kwarg = 'user_id'
    serializer_class = FavoritesSerializer
    permission_classes = [AllowAny]
