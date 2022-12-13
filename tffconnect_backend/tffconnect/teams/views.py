from rest_framework.generics import ListAPIView

from .serializers import TeamSerializer
from .models import Team


class ListTeamsView(ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
