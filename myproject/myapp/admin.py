from django.contrib import admin
from .models import ProcessData

@admin.register(ProcessData)
class ProcessDataAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'electricity', 'water', 'heat', 'gas')