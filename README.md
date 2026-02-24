# 🎬 Movie Booking Application

A full-stack Movie Ticket Booking platform with role-based access for Admin and Users.  
The application allows administrators to manage movies and show schedules, while users can browse listings, book tickets, and cancel reservations through a seamless workflow.

---

## 🚀 Features

### 👤 User Side
- Browse available movies and show timings
- Select seats and book tickets
- Cancel booked tickets
- Clean and intuitive booking flow

### 🛠 Admin Side
- Add, update, and delete movies (CRUD operations)
- Manage show timings and availability
- View booking records

---

## 🏗 Architecture Overview

Frontend (Angular)  
⬇  
REST APIs (Spring Boot)  
⬇  
MySQL Database  
⬇  
Deployed on AWS EC2 (Dockerized)

---

## 🧰 Tech Stack

### Frontend
- Angular
- HTML5 / CSS3
- TypeScript

### Backend
- Java
- Spring Boot
- RESTful APIs
- Maven

### Database
- MySQL

### DevOps / Deployment
- Docker
- AWS EC2
- Jenkins (CI/CD exposure)

---

## 📸 Sample Screenshots 

### 🏠 Home Page
<img width="3446" height="1828" alt="image" src="https://github.com/user-attachments/assets/aa74fc06-0a2d-4aed-b920-ba990e02c670" />

### 🎟 Booking Flow
<img width="3448" height="1820" alt="image" src="https://github.com/user-attachments/assets/d501c1b5-0c68-4e1c-a2b1-d0ff9ff25fa8" />

### Booking Confirmation
<img width="1716" height="905" alt="success" src="https://github.com/user-attachments/assets/d561bdf1-33f5-4120-b1da-5cf86b9f268e" />

### 🛠 Admin Dashboard
<img width="3442" height="1818" alt="image" src="https://github.com/user-attachments/assets/831a076a-0bcf-4873-8b69-99bcfe78c609" />

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run

Backend runs on:  http://localhost:8080

Make sure MySQL is running and database credentials are configured properly in application.properties.

**🔹 Frontend Setup**
cd frontend
npm install
ng serve

Frontend runs on:  http://localhost:4200


**🌐 Deployment**

The application can be deployed on AWS EC2 using Docker.

Example Docker commands:

docker build -t movie-booking-app .
docker run -p 8080:8080 movie-booking-app



## 🔐 Role-Based Access

Admin credentials manage movie data

Users interact only with booking interface

Backend enforces API-level access control



## 🧠 Key Learning Outcomes

Designed and implemented RESTful APIs

Built full-stack integration between Angular and Spring Boot

Implemented role-based system logic

Deployed containerized application on AWS EC2

Worked with CI/CD workflows



## 🚀 Future Enhancements

Payment gateway integration

JWT authentication

Seat availability locking mechanism

Email confirmation service

Production-ready deployment pipeline




