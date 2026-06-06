# E-Commerce Backend API

A Node.js Express backend for an e-commerce application with user authentication, OTP verification, and product management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database](#database)

## Features

- **User Authentication**: Registration and login with JWT tokens
- **OTP Verification**: Email-based OTP generation and verification
- **Email Validation**: Deep email validation service
- **Password Security**: Bcrypt-based password hashing
- **CORS Support**: Configured for cross-origin requests
- **Database**: PostgreSQL with Prisma ORM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL
- **ORM**: Prisma v7.8.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs v3.0.3
- **Email Service**: Nodemailer v8.0.10
- **Email Validation**: deep-email-validator
- **Development**: Nodemon

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Setup](#environment-setup))

4. Set up the database:
```bash
npx prisma migrate dev
```

## Environment Setup

Create a `.env` file in the root directory:

```env
# Server
PORT=7400
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db

# JWT
JWT_SECRET=your_jwt_secret_key

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Running the Server

### Development Mode (with hot reload):
```bash
npm run dev
# or
npm run server
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:7400` (or the PORT specified in your `.env`)

## API Documentation

### Base URL
```
http://localhost:7400/api
```

### Authentication Endpoints

#### 1. Send OTP
- **Endpoint**: `POST /otp/send`
- **Description**: Sends an OTP to the user's email
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```
- **Response**: OTP sent successfully

#### 2. Verify OTP
- **Endpoint**: `POST /verification/verify`
- **Description**: Verifies the OTP code
- **Request Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
- **Response**: OTP verified

### User Endpoints

#### 1. Register User
- **Endpoint**: `POST /user/register`
- **Description**: Create a new user account
- **Middleware**: `authMiddleware`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```
- **Response**: User created successfully with JWT token

#### 2. Login User
- **Endpoint**: `POST /user/login`
- **Description**: Authenticate user and receive JWT token
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response**: JWT token and user information

## Project Structure

```
backend/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── controllers/                    # Business logic
│   │   ├── Otp/
│   │   │   ├── otp.create.js          # OTP generation
│   │   │   └── otp.verify.js          # OTP verification
│   │   ├── Product/                   # Product management (future)
│   │   └── User/
│   │       ├── create.user.js         # User registration
│   │       ├── login.user.js          # User login
│   │       └── verify.user.js         # User verification
│   ├── db/
│   │   └── prisma.js                  # Database connection
│   ├── middleware/
│   │   └── auth.middleware/
│   │       └── auth.middleware.js     # JWT authentication
│   ├── routes/                         # API routes
│   │   ├── otp/
│   │   │   └── otp.route.js
│   │   ├── user/
│   │   │   └── user.route.js
│   │   └── userVerifiyd/
│   │       └── user.verify.route.js
│   ├── service/                        # Utility services
│   │   ├── email_validator/
│   │   │   └── emailValid.service.js  # Email validation
│   │   └── emailSender/
│   │       └── emailler.service.js    # Email sending
│   └── utils/
│       └── otpgenerater/
│           └── otpgenrater.service.js # OTP generation
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── generated/                      # Prisma client (auto-generated)
├── server.js                           # Server entry point
├── package.json                        # Dependencies
└── .env                                # Environment variables (not in repo)
```

## Database

### Schema

The application uses PostgreSQL with Prisma ORM. Key models:

- **User**: Stores user account information with encrypted passwords
- **Otp**: Stores OTP codes for email verification with expiration

### Migrations

Run migrations:
```bash
npx prisma migrate dev --name <migration_name>
```

View database:
```bash
npx prisma studio
```

## Error Handling

- Standard HTTP status codes are used
- Errors return JSON with error message and status code
- Check server logs for detailed error information

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Email validation before OTP generation
- ✅ CORS configuration for frontend communication
- ✅ Environment variables for sensitive data

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
