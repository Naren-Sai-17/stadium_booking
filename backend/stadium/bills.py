from django.http import HttpResponse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.views import APIView
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Image
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import tempfile, environ, pytz
from django.templatetags.static import static
from .models import Booking, Ticket, FoodCoupon
from django.utils.html import strip_tags
from django.conf import settings
env = environ.Env()

# Helper function to generate a bill, into `temp_file`. 
def generate_bill(request, temp_file, booking_data, tickets_data, summary):
        
        # Use the passed temporary file.
        # temp_file = tempfile.NamedTemporaryFile(delete=False)
        doc = SimpleDocTemplate(temp_file.name, pagesize=letter, topMargin=35)
        elements = []

        # Draw logo
        logo_path = static('logo.png')  # Image file path
        logo = Image(request.build_absolute_uri(logo_path), width=110, height=50, hAlign="CENTER")
        elements.append(logo)

        # Define styles
        custom_style = ParagraphStyle(
            'CustomStyle',
            parent=getSampleStyleSheet()['BodyText'],
            spaceBefore=14,  # Margin before the paragraph
            spaceAfter=40,   # Margin after the paragraph
            alignment=1,    # 0=left, 1=center, 2=right
            fontSize=16,    # Larger text size
            fontName='Helvetica-Bold',  # Different font
        )

        bold_custom_style = ParagraphStyle(
        'BoldCustomStyle',
        parent=getSampleStyleSheet()['BodyText'],
        spaceBefore=25,  # Margin before the paragraph
        spaceAfter=14,   # Margin after the paragraph
        alignment=0,    # 0=left, 1=center, 2=right
        fontSize=14,    # Larger text size
        fontName='Helvetica-Bold',  # Different font
        )

        style = TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ])  
        
        elements.append(Paragraph("Booking Invoice", custom_style))

        # Print data from the booking data dictionary
        elements.append(Paragraph("BOOKING DETAILS:", bold_custom_style))
        booking_data = [["Particulars", "Details"]] + [(key, value) for key, value in booking_data.items()]
        table = Table(booking_data, hAlign="LEFT")
        # Add style to the table
        table.setStyle(style)
        elements.append(table)

        # Print data from the ticket details
        elements.append(Paragraph("TICKETS:", bold_custom_style))
        tickets_data = [["Ticket ID", "Category"]] + tickets_data  # Assuming 'table_data' is a list of lists
        table = Table(tickets_data, colWidths=[1 * inch, 1 * inch], hAlign="LEFT")
        table.setStyle(style)
        elements.append(table)

        # Print data from the summary dictionary
        elements.append(Paragraph("SUMMARY:", bold_custom_style))
        summary = [["Particulars", "Price"]] + [(key, f'Rs. {value}') for key, value in summary.items()]
        table = Table(summary, hAlign="LEFT")
        # Add style to the table
        table.setStyle(style)
        elements.append(table)
        
        # Draw QR code
        qr_path = static('qr.png')  # QR code path
        qr = Image(request.build_absolute_uri(qr_path), width=150, height=150, hAlign="RIGHT")
        elements.append(qr)

        # Build the PDF document
        doc.build(elements)

# Helper function to send an email for a newly created booking.
def email_booking_confirmation(request, user, booking_id):
    CHUNK_SIZE = 4096
    # Gather data from the booking id
    # booking data 
    booking_instance = Booking.objects.get(booking_id = booking_id) 
    event_instance = booking_instance.event 
    stadium_instance = event_instance.stadium
    tickets = Ticket.objects.filter(booking = booking_instance)
    booking_data = {
        "booking_time": booking_instance.booking_time.strftime('%d-%m-%Y %H:%M %Z'),
        "booking_id": booking_id, 
        "event_name": event_instance.event_name,
        "event_time": event_instance.date_time, 
        "stadium": stadium_instance.stadium_name,
        "number_of_tickets": tickets.count()
    }

    # tickets data 
    tickets_data = [] 
    for ticket in tickets: 
        tickets_data.append([ticket.ticket_id, ticket.sector.sector_id.sector_name])
    
    # summary
    summary = {
        "No. of Food Add-ons": 0,
        "Seats Price": 0,
        "Food Add-ons": 0,
        "Grand Total": 0 
    }
    food_coupons = FoodCoupon.objects.filter(booking_id = booking_id) 
    for food_coupon in food_coupons:
        qty = food_coupon.quantity 
        summary['No. of Food Add-ons'] += qty 
        summary['Food Add-ons'] += qty * food_coupon.food_item['Food Add-ons']
    for ticket in tickets: 
        summary['Seats Price'] += ticket.sector.event_price 
    summary['Grand Total'] = summary['Food Add-ons'] + summary['Seats Price'] 

    # Proceed to send email with the gathered data

    subject = f'Your Order # {booking_id} - Sports League'
    recipient_list = [user.email]

    html_content = render_to_string('booking_email.html', {'username': user.username, 'frontend_link': env('CALL_BACK_URL')})
    plain_message = strip_tags(html_content)
    
    email = EmailMultiAlternatives(
        subject,
        plain_message,
        settings.EMAIL_HOST_USER,  # From email address
        recipient_list,  # To email address(es)
    )

    temp_file = tempfile.NamedTemporaryFile(delete=False)
    generate_bill(
        request = request,
        temp_file = temp_file,
        booking_data = booking_data,
        tickets_data = tickets_data,
        summary = summary
    )

    email.attach_alternative(html_content, 'text/html')
    # Attach the bill 
    # with open(temp_file.name, 'rb') as pdf_file:
    #     email.attach('booking_bill.pdf', pdf_file.read(), 'application/pdf')

    with open(temp_file.name, 'rb') as pdf_file:
        email.attach('booking_bill.pdf', pdf_file.read(), 'application/pdf')
    # Send the email
    email.send()
    # Delete the temporary PDF
    temp_file.close()

# To handle the API call from the orders page.
class billAPI(APIView):
    def get(self, request, booking_id):
        # Example data
        # booking_data = {
        #     "booking_time": "2023-01-01T12:00Z",
        #     "booking_id": "12",
        #     "event_name": "Sample Event",
        #     "stadium": "Stadium X",
        #     "event_time": "2023-01-15T15:00Z",
        #     "number_of_tickets": "3",
        # }

        # tickets_data = [
        #     ["1", "Premium"],
        #     ["8", "General"],
        #     ["9", "General"],
        # ]

        # summary = {
        #     "No. of Food Add-ons": "3",
        #     "Seats Price": "$50",
        #     "Food Add-ons": "$30",
        #     "Grand Total": "$80",
        # }

        # Do whatever you want with this id.
        
        # booking data 
        booking_instance = Booking.objects.get(booking_id = booking_id) 
        event_instance = booking_instance.event 
        stadium_instance = event_instance.stadium
        tickets = Ticket.objects.filter(booking = booking_instance)
        source_timezone = pytz.timezone('UTC')  # Assuming the original datetime is in UTC
        target_timezone = pytz.timezone('Asia/Kolkata')  # Change this to your desired time zone

        # Convert the datetime to the target time zone
        event_time_ist = event_instance.date_time.replace(tzinfo=source_timezone).astimezone(target_timezone).strftime('%d-%m-%Y %H:%M %Z')
        booking_time_ist = booking_instance.booking_time.replace(tzinfo=source_timezone).astimezone(target_timezone).strftime('%d-%m-%Y %H:%M %Z')

        booking_data = {
            "Booking Time": booking_time_ist,
            "Order ID": booking_id, 
            "Event": event_instance.event_name,
            "Event Time": event_time_ist,
            "Stadium": stadium_instance.stadium_name,
            "No. of Tickets": tickets.count()
        }

        # tickets data 
        tickets_data = [] 
        for ticket in tickets: 
            tickets_data.append([ticket.ticket_id, ticket.sector.sector_id.sector_name])
        
        # summary
        summary = {
            "No. of Food Add-ons": 0,
            "Seats Price": 0,
            "Food Add-ons": 0,
            "Grand Total": 0 
        }
        food_coupons = FoodCoupon.objects.filter(booking_id = booking_id) 
        for food_coupon in food_coupons:
            qty = food_coupon.quantity 
            summary['No. of Food Add-ons'] += qty 
            summary['Food Add-ons'] += qty * food_coupon.food_item['Food Add-ons']
        for ticket in tickets: 
            summary['Seats Price'] += ticket.sector.event_price 
        summary['Grand Total'] = summary['Food Add-ons'] + summary['Seats Price'] 

        # Create a temporary PDF document
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        
        # Generate the bill, store it in temp_file
        generate_bill(request, temp_file, booking_data, tickets_data, summary)

        # Return response to the frontend
        with open(temp_file.name, 'rb') as pdf_file:
            response = HttpResponse(pdf_file, content_type='application/pdf')
            # The temporary file is closed automatically when the response is sent
            response['Content-Disposition'] = 'inline; filename="booking_bill.pdf"'
            return response