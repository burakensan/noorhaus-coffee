from django.shortcuts import render
from django.contrib import messages
from .forms import ContactForm

# Create your views here.
def home(request):
    return render(request, 'home.html')

def impressum_view(request):
    return render(request, "impressum.html")

def datenschutz_view(request):
    return render(request, "datenschutz.html")
