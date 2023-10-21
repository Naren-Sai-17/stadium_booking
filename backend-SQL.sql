CREATE DATABASE eurekadb; 
USE eurekadb;
CREATE TABLE User_details(    
    user_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    username VARCHAR(60) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    email VARCHAR(80) NOT NULL,
    mobile_number INT,
    dob DATE,
    gender VARCHAR(30),
    pincode INT,
    city VARCHAR(60),
    state VARCHAR(60),
    PRIMARY KEY (user_id)
);

CREATE TABLE Stadium(
	stadium_id INT,
    stadium_name VARCHAR(60) NOT NULL,
    location VARCHAR(60),
    coordinates VARCHAR(30) NOT NULL,
    capacity INT NOT NULL,
    city VARCHAR(60) NOT NULL,
    PRIMARY KEY(stadium_id)
);

CREATE TABLE Stadium_prices(
	sector_id INT,
    stadium_id INT NOT NULL,
    sector_name VARCHAR(60) NOT NULL,
    sector_price INT NOT NULL,
    PRIMARY KEY(sector_id),
    FOREIGN KEY (stadium_id) REFERENCES Stadium(stadium_id)
);

CREATE TABLE Events_data(
	event_id INT,
    stadium_id INT NOT NULL,
    event_name VARCHAR(60) NOT NULL,
    date_time DATETIME NOT NULL,
    event_description VARCHAR(255),
	PRIMARY KEY(event_id),
    FOREIGN KEY (stadium_id) REFERENCES Stadium(stadium_id)

);

CREATE TABLE Food_prices(
	food_id INT,
    stadium_id INT NOT NULL,
    food_name VARCHAR(30) NOT NULL,
    food_price INT NOT NULL,
    PRIMARY KEY(food_id),
    FOREIGN KEY (stadium_id) REFERENCES Stadium(stadium_id)
);

CREATE TABLE Bookings(
	booking_id INT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    date_time DATETIME NOT NULL,
	PRIMARY KEY(booking_id),
    FOREIGN KEY (user_id) REFERENCES User_details(user_id),
    FOREIGN KEY (event_id) REFERENCES Events_data(event_id)
);

CREATE TABLE Tickets(
	booking_id INT,
    sector_id INT NOT NULL,
    ticket_id INT NOT NULL,
    PRIMARY KEY(ticket_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id),
    FOREIGN KEY (sector_id) REFERENCES Stadium_prices(sector_id)    
);
CREATE TABLE Food_tickets(
	booking_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (food_id) REFERENCES Food_prices(food_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)    
)


