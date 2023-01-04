from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from .models import Project, ProjectComment, ProjectFavorite
from .serializers import ProjectSerializer, ProjectCommentSerializer, ProjectFavoriteSerializer


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


class ProjectCommentRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = ProjectComment.objects.all()
    serializer_class = ProjectCommentSerializer
    permission_classes = [AllowAny]

# /api/projects/favorites List, Create
class ProjectFavoriteListCreateView(ListCreateAPIView):
    queryset = ProjectFavorite.objects.all()
    serializer_class = ProjectFavoriteSerializer
    permission_classes = [AllowAny]

class ProjectFavoriteRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = ProjectFavorite.objects.all()
    serializer_class = ProjectFavoriteSerializer
    permission_classes = [AllowAny]
