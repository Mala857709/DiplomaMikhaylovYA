from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Рендеринг main.html
    path('get-data/', views.get_data, name='get_data'),
    path('charts-period/', views.charts_period, name='charts_period'),
    path('export-csv/', views.export_csv, name='export_csv'),
]