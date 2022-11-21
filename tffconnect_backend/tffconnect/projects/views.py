from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Project
from .serializers import ProjectSerializer


# /api/projects List, Create
class ProjectListCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# /api/projects/<int:pk> Retrieve, Update, Destroy
