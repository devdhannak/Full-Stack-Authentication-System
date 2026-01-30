# 🔐 Full-Stack Authentication System  
**Spring Boot & React | JWT & OAuth2**

A secure full-stack authentication and authorization system built using **Spring Boot (backend)** and **React.js (frontend)**.  
The application supports **JWT-based authentication**, **OAuth2 social login**, **role-based access control**, and secure session handling.

---

## 🚀 Features

### Backend (Spring Boot)
- User registration & login APIs  
- JWT-based authentication (stateless)  
- OAuth2 social login (Google/GitHub)  
- Password encryption using BCrypt  
- Spring Security filter chain  
- Protected REST APIs  
- CORS configuration for frontend integration  

### Frontend (React)
- Login & Signup UI  
- OAuth2 login integration  
- Protected routes (Private Routing)  
- Axios interceptors for JWT  
- Automatic logout on token expiry  
- Secure token storage  
- Responsive UI  

---

## 🛠 Tech Stack

### Backend
- Java 17  
- Spring Boot  
- Spring Security  
- JWT  
- OAuth2  
- Hibernate / JPA  
- MySQL  

### Frontend
- React.js  
- Axios  
- React Router  
- Tailwind CSS / CSS  
- Vite / CRA
- Shadcn UI  

---

## 🧩 Architecture

---

## 🔄 Authentication Flow

1. User logs in via Email/Password or Google/GitHub  
2. Backend validates credentials  
3. JWT token is generated  
4. Token sent to frontend  
5. Frontend stores token  
6. Token attached to every request  
7. Spring Security validates token  

---

## ⚙️ Setup Instructions

### Backend Setup

```bash
git clone https://github.com/yourusername/auth-app.git
cd backend


##  Configure application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/authdb
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your_secret_key
app.auth.frontend.success-redirect=http://localhost:5173/oauth/success

## Backend runs on:
http://localhost:8083

## Frontend Setup:
cd frontend
npm install
npm run dev

## Frontend runs on:
http://localhost:5173
