# Sports League - Online Stadium Seat Booking
Project under CS 257, Database and Information Systems, IIT Indore.

## Team Details
* Naren Kumar Sai Kaja (220001049)
* S Ruthvik (220001064)
* P C Uma Mahesh (220001052)
* Neerupam (220001050)
* Jay Solanki(220001033)

## Localhost
Clone this repository using: `git clone https://github.com/Naren-Sai-17/stadium_booking.git` <br>
Navigate to the root directory: `cd stadium_booking`

### Frontend
```
  cd frontend
  npm i --force
  npm install
```

### Backend
```
  cd backend
  python -m venv venv
  venv\scripts\activate
  pip install -r requirements.txt
  python manage.py runserver
```

### Create an Admin User
By default, an admin user exists in the database with the username `admin` and password `1234`. <br>
You can create new admin users with the same access rights using the following (in the `stadium_booking/backend/` directory):
```
python manage.py createsuperuser
```
You will be prompted to enter your admin user credentials. Upon entering them, the new admin user will be created. You can access the administration page using the links that follow, by logging in with the username and password that were given during the creation of the superuser.
<br> 

Open the 
* local website in your browser at [frontend link](http://localhost:3000)
* backend for administration at [admin](http://localhost:8000/admin)
* API URLs at [api](http://localhost:8000/api)
