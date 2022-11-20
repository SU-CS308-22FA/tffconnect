from django.shortcuts import render
from django.http import HttpResponse

from .models import News

def index(request):
    model = News
    return HttpResponse("Hello, world. You're at the news index.")

    #def get_queryset(self):
        #return HttpResponse("Hello, world. You're at the news index.")
        #return News.objects.all()
