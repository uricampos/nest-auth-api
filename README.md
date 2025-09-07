# 🔐 Auth API – NestJS

This project implements an **authentication module** in NestJS using **JWT**.  
It provides endpoints for user registration, login, and protected routes.

---

## 📌 Features
- User registration (`/signup`)  
- User login with email and password (`/signin`)  
- JWT generation and return on login  
- Token validation with `AuthGuard`  
- Protected route `/me` returning user information from the token  

---

## 🛠 Module Structure

### **UserEntity / DTOs**
- `UserEntity` → user representation  
- `SignUpDTO`  
- `SignInDTO`  

### **AuthController**
- `POST /auth/signup` → registers a new user  
- `POST /auth/signin` → authenticates user and returns JWT  
- `GET /auth/me` → returns the authenticated user data (**protected**)  

### **AuthService**
- `signup()` → creates a new user  
- `signin()` → validates credentials, generates JWT  
- `me()` → retrieves user info from token  

### **AuthGuard**
- `canActivate()` → validates JWT and authorizes access to protected routes  

---

## 🔄 Flow Overview

### **Sign Up (`/signup`)**
1. User sends name, email, and password  
2. Service hashes password and stores user  
3. Returns confirmation  

### **Sign In (`/signin`)**
1. User sends email and password  
2. Service validates credentials  
3. Returns JWT token  

### **Access Protected Route (`/me`)**
1. Request includes `Authorization: Bearer <token>`  
2. `AuthGuard` validates JWT  
3. Returns user information from token  

---

## 📊 System Diagram
You can visualize the flow in the diagram below (created with Excalidraw):

![Auth Flow Diagram](https://github.com/uricampos/nest-auth-api/blob/main/images/auth-flow-diagram.png?raw=true)

---

## 📦 Tech Stack
- [NestJS](https://nestjs.com/)  
- [JWT](https://jwt.io/)  
- TypeScript  

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start development server
npm run start:dev
