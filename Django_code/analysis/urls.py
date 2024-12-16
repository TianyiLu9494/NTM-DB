from django.urls import path
from .views import view_results, analysis, download_result
from .views import test_results, test_analysis
app_name = "analysis"
urlpatterns = [
    path('', analysis, name='analysis'),
    path('query_id=<str:query_id>/result', view_results, name='results'),
    path('test', test_analysis, name='test_analysis'),
    path('test_result', test_results, name='test_results'),
    path('query_id=<str:query_id>/download/', download_result, name='download')
]
