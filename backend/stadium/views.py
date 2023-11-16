# from django.http import HttpResponse, Http404
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from .bills import *
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.utils.html import strip_tags

import environ
env = environ.Env()
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

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

        html_content = render_to_string('welcome_email.html', {'username': user.username, 'frontend_link': env('CALL_BACK_URL')})
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
    def get(self, request, id):
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

class buyAPI(APIView):
    def post(self,request): 
        # try:
            data = request.data
            # {'user_id': 10, 'event_id': '3', 'seats': {'3': 1}, 'food': {}}
            user_id = data['user_id'] 
            event_id = data['event_id']
            seats = data['seats'] 
            food = data['food'] 

            if(len(seats) == 0):
                return Response({"status": "failure", "detail": "No seats selected."})
            
            valid = True 
            for (seat,quantity) in seats.items():
                if quantity > SectorPrice.objects.get(sector_id = seat, event_id = event_id).remaining_seats:
                    valid = False
            
            if valid: 
                # create a new booking 
                user = User.objects.get(id = user_id)
                event = Event.objects.get(event_id = event_id)
                booking_time = timezone.now()
                booking_instance = Booking(
                    user = user,
                    event = event,
                    booking_time = booking_time
                ) 

                booking_instance.save()
                auto_generated_booking_id = booking_instance.booking_id 
                
                for (seat,quantity) in seats.items(): 
                    for i in range(quantity): 
                        Ticket.create_ticket(booking_id=auto_generated_booking_id,event_id=event_id,sector_id=seat)  
                    
                for (food_item,quantity) in food.items(): 
                    FoodCoupon.create_food_ticket(booking_id=booking_instance,food_id=food_item, quantity=quantity)
                
                # Upon successful order, email a bill to the related user.
                email_booking_confirmation(
                    request = request,
                    user = user,
                    booking_id = auto_generated_booking_id
                )
                
                return Response({"status": "success"})
            
            else: 
                return Response({"seats": "Someone booked the seats before you did."}) 
        
        # except:
        #     print("failure")
        #     return Response({"status": "failure", "user_data": data})
        
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
#   razor_key = settings.RAZOR_KEY_ID
# razor_secret = settings.RAZOR_SECRET_ID
# print(razor_key, razor_secret)
# razorpay_client = razorpay.Client(auth=(razor_key, razor_secret))

# class PaymentView(APIView):
#     def post(self,request): 
#         name = "Swapnil Pawar"
#         amount = 400
#         razorpay_order = razorpay_client.order.create(
#             {"amount": int(amount) * 100, "currency": "INR", "payment_capture": "1"}
#         )
#         data = {
#             "name" : name,
#             "merchantId": "RAZOR_KEY",
#             "amount": amount,
#             "currency" : 'INR' ,
#             "orderId" : razorpay_order["id"],
#             }
#         return Response(data)
        # return Response(data, status=status.HTTP_200_OK)





