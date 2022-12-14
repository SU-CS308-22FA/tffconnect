from .serializers import RefereesSerializer
from .models import Referees
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import AllowAny

# Create your views here.

class RefereesList(generics.ListCreateAPIView):
     #define queryset
    queryset = Referees.objects.all() #selects objects
     #specify serializer to be used
    serializer_class = RefereesSerializer #selects fields
    permission_classes = [AllowAny]


class RefereesListDelete(generics.RetrieveUpdateDestroyAPIView):
     queryset = Referees.objects.all()
     serializer_class = RefereesSerializer #selects fields
     permission_classes = [AllowAny]

