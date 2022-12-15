from .serializers import RefereesSerializer
from .models import Referees
from rest_framework import generics
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import AllowAny


class RefereesList(generics.ListCreateAPIView):
    # define queryset (selects objects)
    queryset = Referees.objects.all()
    # specify serializer to be used (selects fields)
    serializer_class = RefereesSerializer
    permission_classes = [AllowAny]


class RefereesListDelete(generics.RetrieveUpdateDestroyAPIView):
     queryset = Referees.objects.all()
     serializer_class = RefereesSerializer
     permission_classes = [AllowAny]
