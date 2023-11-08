# from django.http import HttpResponse, Http404
from rest_framework.exceptions import NotFound
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.utils import timezone
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings

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
        data = request.data
        user_id = data['user_id'] 
        event_id = data['event_id']
        seats = data['seats'] 
        valid = True 
        for (seat,quantity) in seats.items():

            if quantity > SectorPrice.objects.get(sector_id = seat, event_id = event_id).remaining_seats:
                valid = False; 
        if valid: 
            # create a new booking 
            booking_instance = Booking(user = User.objects.get(id = user_id), event = Event.objects.get(event_id = event_id)) 
            booking_instance.save()
            auto_generated_booking_id = booking_instance.booking_id 
            for (seat,quantity) in seats.items(): 
                for i in range(quantity): 
                    Ticket.create_ticket(booking_id=auto_generated_booking_id,event_id=event_id,sector_id=seat)  
            return Response({"status": "success"})
        else: 
            return Response({"seats":"Someone booked the seats before you"}) 
        
# class ordersAPI(APIView): 
#     def post(self,request): 
#         # data = request.data 
#         # user_id = data['user_id']
#         user_id = 3
#         booking_instances = Booking.objects.filter(user = User.objects.get(user_id = user_id)) 
        
class getTicketById(APIView): 
    def get(self,request,pk): 
        try: 
            ticket = TicketSerializer(Ticket.objects.get(ticket_id = pk))
            return Response(ticket.data)
        except:
            raise NotFound("Ticket not found") 
        
class getOrders(APIView):
    def post(self,request): 
        data = request.data 
        user_id = data['user_id']
        user = User.objects.get(id = user_id)
        booking_instances = Booking.objects.filter(user = user)
        data = BookingSerializer(booking_instances,many = True).data 
        return Response(data) 

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





