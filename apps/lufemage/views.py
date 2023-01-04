from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView, View
from .models import ProductModel
from django.core.paginator import Paginator

class HomeView(View):
#    template_name = 'pages/home.html'
    def get(self, request, *args, **kwargs):
        products = ProductModel.objects.filter(active=True)
        if products:
            paginator = Paginator(products, 9)
            page_number = request.GET.get('page')
            digital_products_data = paginator.get_page(page_number)

        context = {
            'products':digital_products_data
        }
        return render(request, 'pages/home.html',context)

def home_page_view(request):
    return HttpResponse('Hello, World!')
