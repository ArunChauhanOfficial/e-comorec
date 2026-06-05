# E-Commerce Backend API

## Overview

This is a Node.js, Express.js, PostgreSQL, and Prisma based E-Commerce Backend API.

## Features

* User Authentication
* JWT Authorization
* OTP Verification
* Product Management
* Order Management
* PostgreSQL Database
* Prisma ORM

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma
* JWT
* bcrypt

## Installation

```bash
git clone <repository-url>
cd backend
npm install
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=5000
```

## Run Project

```bash
npm run dev
```

## Database Migration

```bash
npx prisma migrate dev
npx prisma generate
```

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/verify-otp

### Products

* GET /api/products
* POST /api/products

## Folder Structure

```txt
src/
├── controllers
├── routes
├── middleware
├── services
├── prisma
└── utils
```

## Author

Arun Chauhan
