# from django.http import HttpResponse, Http404
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.utils.html import strip_tags
from datetime import datetime
import razorpay
import environ
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

env = environ.Env()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterAPI(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        subject = 'Welcome to Sports League!'
        recipient_list = [user.email]

        html_content = render_to_string('email.html', {'username': user.username, 'frontend_link': env('CALL_BACK_URL')})
        plain_message = strip_tags(html_content)
        
        email = EmailMultiAlternatives(
            subject,
            plain_message,
            settings.EMAIL_HOST_USER,  # From email address
            recipient_list,  # To email address(es)
        )

        email.attach_alternative(html_content, 'text/html')

        # Send the email
        email.send()

        return Response({'message': 'Email was sent successfully.'})

class showEvents(ListAPIView):
    queryset = Event.objects.all() 
    serializer_class = EventSerializer

class getEventById(APIView):
    def get(self,request,id):
        try:
            stadium_id = Event.objects.get(event_id = id).stadium_id
        except:
            raise NotFound("Event not found")
        event_data = EventSerializer(Event.objects.get(event_id = id)).data
        event_data['prices'] = SectorPriceSerializer(SectorPrice.objects.filter(event_id = id), many = True).data  
        return Response(event_data)

class getUsernameById(APIView):
    def get(self,request,id):
        username = ''
        try:
            username = User.objects.get(id = id).username
        except:
            raise NotFound("User not found")
        return Response({'username': username}) 

class searchEvents(APIView):
    def get(request, self):
        date = timezone.now()
        all_events = Event.objects.all()
        if date:
            all_events = all_events.filter(date_time__gte=date)

        events_data = SearchEventSerializer(all_events, many=True).data
        return Response(events_data)

class getEvents(APIView):
    def get(request, self):
        date = timezone.now()
        all_events = Event.objects.all()
        if date:
            all_events = all_events.filter(date_time__gte=date)
        events_data = EventSerializer(all_events, many=True).data
        return Response(events_data)


# class ordersAPI(APIView): 
#     def post(self,request): 
#         # data = request.data 
#         # user_id = data['user_id']
#         user_id = 3
#         booking_instances = Booking.objects.filter(user = User.objects.get(user_id = user_id)) 
class getStadiumById(APIView):
    def get(self,request,id):
        # try: 
        ticket = StadiumSerializer(Stadium.objects.get(stadium_id = id)) 
        return Response(ticket.data) 
        # except:
            # raise NotFound("Stadium not found")
        
    
class getTicketById(APIView): 
    def get(self,request,pk): 
        try: 
            ticket = TicketSerializer(Ticket.objects.get(ticket_id = pk))
            return Response(ticket.data)
        except:
            raise NotFound("Ticket not found") 
        
class getOrders(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BookingSerializer
    def get_queryset(self):
        user = self.request.user
        booking_instances = Booking.objects.filter(user = user) 
        return booking_instances 

# class changePassword(APIView): 
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated] 
#     def post(self): 
#         user = self.request.user 
        
# class getOrders(APIView):
#     def post(self,request): 
#         data = request.data 
#         user_id = data['user_id']
#         user = User.objects.get(id = user_id)
#         booking_instances = Booking.objects.filter(user = user)
#         data = BookingSerializer(booking_instances,many = True).data 
#         return Response(data) 

# class getOrders(APIView): 
    # def get(self,request): 
# 

# -------------------razorpay integration----------------------------------

class makePaymentAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request): 
        user = request.user 
        data = request.data
        event_id = data['event_id']
        seats = data['seats'] 
        food = data['food'] 
        total_cost = 0
        for (seat,quantity) in seats.items():
            total_cost = total_cost + quantity * SectorPrice.objects.get(sector_id = seat, event_id = event_id).event_price
        for (food_item,quantity) in food.items():
            total_cost = total_cost + quantity*FoodItem.objects.get(food_id = food_item).food_price
        client = razorpay.Client(auth=("rzp_test_iVdpfYzSydqANx","TELeW3gJIgALXGlWSHmLjzoT"))
        DATA = {
            "amount": total_cost*100,
            "currency": "INR",
        }
        payment = client.order.create(data =DATA)
        return Response(payment) 
            # client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))
            # DATA = {
            #     "amount": 100 * total_cost,
            #     "currency": "INR",
            #     "notes": {
            #         "booking_id": auto_generated_booking_id
            #     }
            # }
            # payment = client.order.create(data =DATA)
            # return Response(payment) 
        
class paymentSuccessAPI(APIView): 
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request): 
        user = request.user 
        data = request.data
        print(data) 
        event_id = data['event_id']
        seats = data['seats'] 
        food = data['food'] 
        booking_instance = Booking(user = user, event = Event.objects.get(event_id = event_id)) 
        booking_instance.save()
        auto_generated_booking_id = booking_instance.booking_id 
        for (seat,quantity) in seats.items(): 
            for i in range(quantity): 
                Ticket.create_ticket(booking_id=auto_generated_booking_id,event_id=event_id,sector_id=seat)  
        for (food_item,quantity) in food.items(): 
            FoodCoupon.create_food_ticket(booking_id=booking_instance,food_id=food_item, quantity=quantity)
        return Response() 

    
