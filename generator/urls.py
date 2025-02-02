from django.urls import path

from . import views

app_name = 'generator'

urlpatterns = [
    path('', views.index, name='index'),
    path('generate/', views.generate_script, name='generate_script'),
    path('saved-scripts/', views.get_saved_scripts, name='saved_scripts'),
] 