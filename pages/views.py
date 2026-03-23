from django.shortcuts import render
from django.contrib import messages
from .forms import ContactForm

# Create your views here.
def home(request):
    return render(request, 'home.html')
