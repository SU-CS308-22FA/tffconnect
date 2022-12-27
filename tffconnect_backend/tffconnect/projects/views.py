from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from .models import Project, ProjectComment
from .serializers import ProjectSerializer, ProjectCommentSerializer


# /api/projects List, Create
class ProjectListCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


# /api/projects/<int:pk> Retrieve, Update, Destroy
class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

class ProjectCommentListCreateView(ListCreateAPIView):
    queryset = ProjectComment.objects.all()
    serializer_class = ProjectCommentSerializer
    permission_classes = [AllowAny]
