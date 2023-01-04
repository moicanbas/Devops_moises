from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from apps.lufemage.models import ProductModel, PurchaseProductModel

# Create your models here.
class UserModel(AbstractUser):
    stripe_customer_id = models.CharField(max_length=50)

class UserLibrary(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='library')
    products = models.ManyToManyField(ProductModel, blank=True)

    def __str__(self):
        return self.user.email

def post_save_user_receiver(sender, instance, created, **kwargs):
    if created:
        library = UserLibrary.objects.create(user=instance)
        purchase_product= PurchaseProductModel.objects.filter(email= instance.email)
        for purchased_product in purchase_product:
            library.products.add(purchased_product.product)

post_save.connect(post_save_user_receiver, sender=UserModel)