from django.db import models

# Create your models here.
class Business(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    title = models.CharField(max_length=300)
    description = models.TextField()
    url = models.TextField()
    seller_financing = models.BooleanField()
    ebitda = models.FloatField()
    ff_e = models.FloatField()
    inventory = models.FloatField()
    state = models.CharField(max_length=30)
    county = models.CharField(max_length=50)
    established = models.FloatField()
    employee_count = models.CharField(max_length=100)
    website = models.TextField()
    created_at = models.DateTimeField(
        verbose_name=("Creation date"), auto_now_add=True, null=True
    )
    updated_at = models.DateTimeField(
        verbose_name=("Creation date"), auto_now_add=True, null=True
    )
    source_id = models.IntegerField()
    category_id = models.IntegerField()
    tag = models.CharField(max_length=300)
    last_price = models.ForeignKey(
        'Price_History',
        on_delete=models.CASCADE,
        db_column='last_price'
    )

    class Meta:
        db_table = "business"

    def __str__(self):
        return self.name

class Price_History(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    gross_revenue = models.FloatField()
    asking_price = models.FloatField()
    cash_flow = models.FloatField()
    multiple = models.FloatField()
    created_at = models.DateTimeField(
        verbose_name=("Creation date"), auto_now_add=True, null=True
    )
    business_id = models.IntegerField()

    class Meta:
        db_table = "price_history"

    def __str__(self):
        return self.name

class Source(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    title = models.CharField(max_length=50)

    class Meta:
        db_table = "source"

    def __str__(self):
        return self.id

class Category(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    title = models.CharField(max_length=100)

    class Meta:
        db_table = "category"

    def __str__(self):
        return self.id