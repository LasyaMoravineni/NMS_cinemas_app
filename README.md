# 🎬 NMS Cinemas

A full-stack movie ticket booking platform built with **Angular**, **Spring Boot**, and **MySQL**, with a containerized backend and an automated **Jenkins CI/CD pipeline** deployed to **AWS EC2**.

NMS Cinemas supports two application flows:

- **Users** can browse movies and shows, select seats, make bookings, view booking history, and cancel bookings.
- **Administrators** can manage movies, theatres, shows, and view booking/analytics information.

The project was developed as a full-stack application and then taken through a complete containerized deployment workflow using Docker, Jenkins, Nginx, and AWS EC2.

---

## ✨ Features

### 👤 User

- User registration and login
- Browse available movies
- Search/filter movies
- View upcoming movies
- View movie and show details
- Select theatre and show
- Interactive seat selection
- Book selected seats
- Booking confirmation
- QR-code generation for booking confirmation
- Downloadable booking confirmation
- View booking history
- Cancel bookings

### 🛠️ Admin

- Separate admin authentication flow
- Admin dashboard
- Add, update, and delete movies
- Manage theatres
- Add, update, and delete shows
- Configure show date, price, and available seats
- View booking information
- View administrative analytics

### ⚙️ Backend

- RESTful Spring Boot APIs
- JPA/Hibernate persistence
- MySQL database
- Environment-driven database configuration
- BCrypt password hashing
- Booking and seat-availability validation

### 🚀 Deployment / DevOps

- Dockerized Spring Boot backend
- Jenkins CI/CD pipeline
- Automated Maven backend build
- Automated Docker image build
- Automated Angular production build
- Automated frontend deployment
- Automated backend container deployment
- Post-deployment backend API verification
- AWS EC2 deployment
- Nginx reverse proxy
- Persistent MySQL Docker volume
- Docker restart policies for application/database containers

---

## 🏗️ Architecture

### Application architecture

```text
                    ┌─────────────────────┐
                    │   Angular Frontend  │
                    │     TypeScript      │
                    └──────────┬──────────┘
                               │
                               │ /api/*
                               ▼
                    ┌─────────────────────┐
                    │        Nginx        │
                    │   Reverse Proxy     │
                    └──────────┬──────────┘
                               │
                               │ 127.0.0.1:8081
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │       Java 17       │
                    └──────────┬──────────┘
                               │
                         JPA / Hibernate
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL 8       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Persistent Docker   │
                    │       Volume        │
                    └─────────────────────┘
```

### CI/CD and deployment architecture

```text
                         GitHub
                           │
                           ▼
                        Jenkins
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       Backend Build              Frontend Build
       Maven + Tests*             npm + Angular
              │                         │
              ▼                         ▼
       Docker Image              Production Bundle
              │                         │
              └────────────┬────────────┘
                           ▼
                        AWS EC2
                           │
                         Nginx
                      ┌────┴────┐
                      │         │
                      ▼         ▼
                 Angular     /api/*
                              │
                              ▼
                         Spring Boot
                              │
                         Docker network
                              │
                              ▼
                            MySQL
```

\* The current Jenkins pipeline uses `./mvnw clean package -DskipTests`; the repository contains backend test infrastructure, but tests are intentionally skipped in the deployment build.

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Angular 21, TypeScript, HTML, CSS, Bootstrap |
| Backend | Java 17, Spring Boot 4, Spring MVC, Spring Data JPA |
| Database | MySQL 8 |
| Authentication | BCrypt password hashing, separate user/admin flows |
| Frontend utilities | Chart.js, jsPDF, QRCode |
| Build | Maven Wrapper, npm |
| Containerization | Docker |
| CI/CD | Jenkins |
| Web server / reverse proxy | Nginx |
| Cloud | AWS EC2 |

---

## 📁 Project Structure

```text
movie-booking-application/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/nms/moviebooking/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── Dockerfile
│   ├── Jenkinsfile
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── guards/
│   │   │   └── services/
│   │   ├── environments/
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── screenshots/
├── .gitignore
└── README.md
```

---

## 🔐 Authentication and Authorization

The application has separate authentication flows for users and administrators.

Passwords are stored using **BCrypt hashing** rather than plaintext passwords.

The Angular application also uses route guards to protect the administrator interface.

> **Security scope:** the current implementation does not use JWT-based authentication or Spring Security API authorization. Admin route protection is implemented at the frontend layer, while the backend provides the authentication endpoints and BCrypt password verification. Server-side authorization/JWT-based authentication would be a natural future enhancement.

---

## 🗄️ Database

The application uses **MySQL 8** with Spring Data JPA/Hibernate.

The backend supports environment-based database configuration:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/movie_booking_db}
spring.datasource.username=${DB_USERNAME:movieuser}
spring.datasource.password=${DB_PASSWORD:password}
```

The defaults are convenient for local development. Production values are supplied as environment variables when the Docker container is started.

Hibernate is configured with:

```properties
spring.jpa.hibernate.ddl-auto=update
```

### Production database

The deployed environment runs MySQL in a Docker container connected to the backend through a dedicated Docker network.

Database data is stored in a persistent Docker volume rather than only inside the container filesystem.

---

## 🐳 Docker

The Spring Boot backend is packaged into a Docker image using:

```text
eclipse-temurin:17-jdk
```

The resulting application container exposes Spring Boot's internal port `8080`.

In production, the container is bound only to the EC2 host's loopback interface:

```text
127.0.0.1:8081 → container:8080
```

This means the backend is not directly exposed to the public Internet.

The application is instead accessed through Nginx.

Both the backend and MySQL containers use:

```text
--restart unless-stopped
```

so they automatically restart after an EC2/Docker restart unless they were intentionally stopped.

---

## 🔄 Jenkins CI/CD

The repository contains a Jenkins pipeline at:

```text
backend/Jenkinsfile
```

The pipeline performs the following stages:

### 1. Verify Checkout

Confirms the workspace and repository contents.

### 2. Build Backend

- Configures Java 17
- Uses the Maven Wrapper
- Builds the Spring Boot application

```bash
./mvnw clean package -DskipTests
```

### 3. Build Backend Docker Image

Builds:

```text
nms-cinemas-backend:latest
```

from the backend Dockerfile.

### 4. Build Frontend

Runs:

```bash
npm ci
npm run build
```

using the Angular production configuration.

### 5. Deploy Frontend

Copies the generated Angular browser bundle into the Nginx web root:

```text
/var/www/nms-cinemas/browser
```

### 6. Deploy Backend

Jenkins retrieves the database password from the Jenkins credential:

```text
nms-db-password
```

and starts the backend container with environment variables for the production database connection.

The password is not stored in the repository.

### 7. Verify Deployment

The pipeline verifies:

- Docker containers are running
- The backend API responds successfully
- The deployed frontend contains `index.html`

The backend verification uses:

```text
http://127.0.0.1:8081/api/movies
```

---

## 🌐 Nginx Reverse Proxy

Nginx serves the Angular production build and proxies API requests to the Spring Boot container.

Conceptually:

```text
GET /
    ↓
Angular application

GET /api/movies
    ↓
Nginx
    ↓
127.0.0.1:8081
    ↓
Spring Boot
```

The frontend production environment therefore uses a relative API URL:

```typescript
apiUrl: '/api'
```

This avoids hard-coding the EC2 public IP into the Angular production build.

---

## ☁️ AWS EC2 Deployment

The production application is deployed to an AWS EC2 instance.

The deployed services are:

| Service | Role |
|---|---|
| Nginx | Public web server and API reverse proxy |
| Jenkins | CI/CD automation |
| Spring Boot | Backend REST API |
| MySQL | Persistent application database |
| Docker | Container runtime |

The public application is exposed through HTTP port `80`.

The Spring Boot backend is bound to:

```text
127.0.0.1:8081
```

and the AWS Security Group does **not** expose port `8081` publicly.

Jenkins runs separately on port `8080` with restricted access.

---

## 🔑 Configuration and Secrets

Production database credentials are not committed to Git.

The project ignores private key files such as:

```gitignore
*.pem
```

The production database password is stored in Jenkins Credentials and injected into the backend deployment at runtime.

For local development, configure the database connection using the environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

or use the development defaults defined in `application.properties`.

**Never commit real credentials, private keys, or production secrets to the repository.**

---

## 🧪 Testing and Verification

The repository contains backend test infrastructure and Angular unit-test configuration.

The production deployment was also manually verified end-to-end, including:

- User registration
- User login
- Movie browsing
- Show selection
- Seat selection
- Booking
- Booking confirmation
- Booking history
- Booking cancellation
- Admin login
- Movie management
- Theatre management
- Show management
- Admin dashboard/analytics
- Production API access through Nginx

The Jenkins deployment pipeline additionally performs a post-deployment API check.

---

## 🖼️ Screenshots

### Home / Movie Listing

<img src="https://github.com/user-attachments/assets/aa74fc06-0a2d-4aed-b920-ba990e02c670" alt="NMS Cinemas home page" />

### Booking Flow

<img src="https://github.com/user-attachments/assets/d501c1b5-0c68-4e1c-a2b1-d0ff9ff25fa8" alt="NMS Cinemas booking flow" />

### Booking Confirmation

<img src="https://github.com/user-attachments/assets/d561bdf1-33f5-4120-b1da-5cf86b9f268e" alt="NMS Cinemas booking confirmation" />

### Admin Dashboard

<img src="https://github.com/user-attachments/assets/831a076a-0bcf-4873-8b69-99bcfe78c609" alt="NMS Cinemas admin dashboard" />

---

## 💻 Local Development

### Prerequisites

- Java 17
- Node.js and npm
- MySQL 8
- Git

### Backend

```bash
cd backend
./mvnw clean package
./mvnw spring-boot:run
```

On Windows:

```powershell
cd backend
.\mvnw.cmd clean package
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

Configure the database through the environment variables described above if your local MySQL credentials differ from the development defaults.

### Frontend

```bash
cd frontend
npm ci
npm start
```

The Angular development server runs on:

```text
http://localhost:4200
```

The development environment points API requests to:

```text
http://localhost:8080/api
```

Production builds use:

```text
/api
```

so that Nginx can route API requests.

---

## 📌 API Areas

The backend exposes REST endpoints for the main application domains:

```text
/api/users
/api/admin
/api/movies
/api/theatres
/api/shows
/api/bookings
/api/admin/analytics
```

The controllers are organized by application responsibility, with JPA repositories and service classes handling persistence and business logic.

---

## 🔮 Future Enhancements

The current project is functional as deployed. Possible next improvements include:

- JWT-based authentication
- Server-side role/permission enforcement
- HTTPS/TLS with a domain name
- Payment gateway integration
- Stronger seat locking/concurrency handling
- Email booking confirmations
- Automated database migrations with Flyway or Liquibase
- Dedicated health/readiness endpoints
- Automated test execution as a required CI gate
- More robust deployment/rollback strategy
- Infrastructure-as-code with Terraform

These are intentionally listed as future enhancements rather than current capabilities.

---

## 🎯 Project Highlights

This project demonstrates experience across the full application lifecycle:

- Designed and implemented a full-stack Angular + Spring Boot application
- Built REST APIs and integrated them with an Angular frontend
- Implemented relational persistence using MySQL and JPA/Hibernate
- Added BCrypt password hashing
- Containerized the backend with Docker
- Built a Jenkins CI/CD pipeline from GitHub checkout through production verification
- Configured environment-driven production database credentials
- Deployed the application to AWS EC2
- Served the Angular application through Nginx
- Configured Nginx as a reverse proxy for backend APIs
- Used a persistent Docker volume for database storage
- Hardened the deployment by keeping the backend bound to localhost rather than exposing its application port publicly

---

## 📄 License

This project was developed as a capstone/full-stack application project.
