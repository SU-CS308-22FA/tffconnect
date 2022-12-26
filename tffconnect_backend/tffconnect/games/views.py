from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated


from .models import Games, GameComment
from .serializers import GamesSerializer, GameCommentSerializer


class AddGames(ListCreateAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer
    permission_classes = [AllowAny]


class ModifyGames(RetrieveUpdateDestroyAPIView):
    queryset = Games.objects.all()
    lookup_url_kwarg = 'id'
    serializer_class = GamesSerializer
    permission_classes = [AllowAny]


class GameCommentListCreateAPIView(ListCreateAPIView):

    serializer_class = GameCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GameComment.objects.filter(game_id=self.kwargs['id'])
