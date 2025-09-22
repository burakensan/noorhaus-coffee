from django.shortcuts import render
from django.contrib import messages
from .forms import ContactForm

# Create your views here.
def home(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def services(request):
    return render(request, 'services.html')


def work(request):
    return render(request, 'work.html')


def contact(request):
    form = ContactForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        # Hier könntest du per E‑Mail versenden – zunächst nur Erfolgsmeldung
        messages.success(request, 'Danke! Deine Nachricht wurde gesendet.')
        form = ContactForm() # Felder leeren
    return render(request, 'contact.html', {'form': form})


def brands(request):
    return render(request, 'brands.html')
