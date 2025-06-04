from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'main.html')  # Рендеринг шаблона main.html

def get_data(request):
    return JsonResponse({"message": "Data endpoint"})

def charts_period(request):
    return JsonResponse({"message": "Charts period endpoint"})

def export_csv(request):
    return JsonResponse({"message": "Export CSV endpoint"})