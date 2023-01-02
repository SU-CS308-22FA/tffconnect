from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny


from .models import UserVotes
from .serializers import VotesSerializer


class ViewVotes(ListCreateAPIView):
    queryset = UserVotes.objects.all()
    serializer_class = VotesSerializer
    permission_classes = [AllowAny]
