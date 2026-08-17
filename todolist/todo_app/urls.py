from django.urls import path
from .views import register_user, task_list_create, task_detail

urlpatterns = [
    path('register/', register_user, name='register'),
    path('tasks/', task_list_create, name='task-list-create'),
    path('tasks/<int:pk>/', task_detail, name='task-detail'),
]