from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError('The username must be set')
        if not email:
            raise ValueError('The email must be set')
        if not password:
            return ValueError('The password must be set')
        email = self.normalize_email(email)
        user = self.model(username = username, email = email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self,username,email,password,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(username, email, password, **extra_fields)
    
class User(AbstractBaseUser,PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True) 
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def __str__(self):
        return self.username
    
class Stadium(models.Model):
    stadium_id = models.AutoField(primary_key=True)
    stadium_name = models.CharField(max_length=255, default="User")
    location = models.CharField(max_length=255)
    coordinates = models.CharField(max_length=255, blank=True, null=True)
    capacity = models.IntegerField()
    city = models.CharField(max_length=255)

    def __str__(self):
        return self.stadium_name

class Event(models.Model):
    event_id = models.AutoField(primary_key=True)
    stadium = models.ForeignKey(Stadium, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=255)
    date_time = models.DateTimeField()
    event_description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.event_name + ', ' + self.stadium.stadium_name

class Sector(models.Model):
    sector_id = models.AutoField(primary_key=True)
    stadium = models.ForeignKey(Stadium, on_delete=models.CASCADE)
    sector_name = models.CharField(max_length=255)
    sector_price = models.IntegerField(default=1000)

    def __str__(self):
        return self.sector_name + ', ' + self.stadium.stadium_name

class FoodItem(models.Model):
    food_id = models.AutoField(primary_key=True)
    food_name = models.CharField(max_length=255)
    stadium = models.ForeignKey(Stadium, on_delete=models.CASCADE)
    food_price = models.IntegerField()
    
    def __str__(self):
        return self.food_name

class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    booking_time = models.DateTimeField()
    food_items = models.ManyToManyField(FoodItem, through='FoodCoupon')
    total_amount = models.BigIntegerField()

    def __str__(self):
        return f'Booking #' + str(self.booking_id)

class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    # booking = models.ManyToManyField(Booking)
    # I was wrong, we need to use ManyToMany fields only when they are required. 
    # Example: a stadium being assigned an array of its upcoming events.
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='tickets')
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)

    def __str__(self):
        return f'Ticket #' + str(self.ticket_id)
    
# Coupon for a single food type.
class FoodCoupon(models.Model):
    coupon_id = models.AutoField(primary_key=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='food_coupons') 
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.food_item.food_name + ' coupon #' + str(self.coupon_id)

