from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny


from .models import Games
from .serializers import GamesSerializer


class AddGames(CreateAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer
    permission_classes = [AllowAny]


class ModifyGames(RetrieveUpdateDestroyAPIView):
    queryset = Games.objects.all()
    lookup_url_kwarg = 'id'
    serializer_class = GamesSerializer
    permission_classes = [AllowAny]
