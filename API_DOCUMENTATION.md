# API Documentation

## Overview

This document provides detailed information about all available API endpoints for the e-commerce backend.

## Base URL

```
http://localhost:7400/api
```

## Authentication

JWT tokens are used for authenticated endpoints. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### OTP Service (`/api/otp`)

#### Generate and Send OTP

**POST** `/api/otp/send`

Sends a one-time password to the user's email address.

**Request:**
```bash
curl -X POST http://localhost:7400/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP sent successfully to your email",
  "data": {
    "email": "user@example.com",
    "expiresIn": 600
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid email address"
}
```

---

### User Authentication (`/api/user`)

#### Register User

**POST** `/api/user/register`

Create a new user account with email and password.

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Request:**
```bash
curl -X POST http://localhost:7400/api/user/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address |
| password | string | Yes | Minimum 8 characters |
| name | string | Yes | User's full name |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "jwt-token-here"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

#### Login User

**POST** `/api/user/login`

Authenticate user and receive JWT token.

**Request:**
```bash
curl -X POST http://localhost:7400/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email |
| password | string | Yes | User password |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "jwt-token-here"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### User Verification (`/api/verification`)

#### Verify OTP

**POST** `/api/verification/verify`

Verify OTP code sent to user's email.

**Request:**
```bash
curl -X POST http://localhost:7400/api/verification/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email |
| otp | string | Yes | 6-digit OTP |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "verified": true,
    "token": "verification-token"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required or failed |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional details if available"
  }
}
```

---

## Rate Limiting

- OTP requests are limited to 3 requests per hour per email
- Login attempts are limited to 5 attempts per 15 minutes per IP

---

## Pagination

For endpoints that return lists (future implementation):

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## Examples

### Complete Registration Flow

1. **Send OTP:**
```bash
POST /api/otp/send
{"email": "user@example.com"}
```

2. **Verify OTP:**
```bash
POST /api/verification/verify
{"email": "user@example.com", "otp": "123456"}
```

3. **Register User:**
```bash
POST /api/user/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

4. **Login:**
```bash
POST /api/user/login
{"email": "user@example.com", "password": "securePassword123"}
```

---

## Support

For API support, please contact the development team or create an issue in the repository.
