from .serializers import RefereesSerializer
from .models import Referees
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class RefereesList(generics.ListCreateAPIView):
     queryset = Referees.objects.all()
     serializer_class = RefereesSerializer
     permission_classes = [IsAuthenticatedOrReadOnly]
