# E-Commerce Backend API

A Node.js Express backend for an e-commerce application with user authentication, OTP verification, and product management.

## 🎯 Features

- **User Authentication**: Registration and login with JWT tokens
- **OTP Verification**: Email-based OTP generation and verification
- **Email Validation**: Deep email validation service
- **Password Security**: Bcrypt-based password hashing
- **CORS Support**: Configured for cross-origin requests
- **Product Management**: (Foundation ready for expansion)
- **Order Management**: (Foundation ready for expansion)
- **PostgreSQL Database**: Reliable relational database
- **Prisma ORM**: Type-safe database access

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL
- **ORM**: Prisma v7.8.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs v3.0.3
- **Email Service**: Nodemailer v8.0.10
- **Email Validation**: deep-email-validator
- **Development**: Nodemon

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Setup](#environment-variables))

4. Set up the database:
```bash
npx prisma migrate dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=7400
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend
FRONTEND_URL=http://localhost:3000

# OTP
OTP_LENGTH=6
OTP_EXPIRE=600
```

## 🚀 Run Project

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

The server will run on `http://localhost:7400`

## 📚 Database Setup

### Generate Prisma Client:
```bash
npx prisma generate
```

### Run Migrations:
```bash
npx prisma migrate dev --name init
```

### View Database GUI:
```bash
npx prisma studio
```

## 📡 API Endpoints

### Base URL
```
http://localhost:7400/api
```

### OTP Routes (`/api/otp`)
- `POST /send` - Send OTP to email
- `POST /verify` - Verify OTP code

### User Routes (`/api/user`)
- `POST /register` - Register new user (requires auth middleware)
- `POST /login` - Login user

### Verification Routes (`/api/verification`)
- `POST /verify` - Verify OTP for email verification

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 📁 Folder Structure

```
backend/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── controllers/                    # Business logic
│   │   ├── Otp/
│   │   │   ├── otp.create.js
│   │   │   └── otp.verify.js
│   │   ├── Product/
│   │   └── User/
│   │       ├── create.user.js
│   │       ├── login.user.js
│   │       └── verify.user.js
│   ├── db/
│   │   └── prisma.js
│   ├── middleware/
│   │   └── auth.middleware/
│   │       └── auth.middleware.js
│   ├── routes/
│   │   ├── otp/
│   │   ├── product/
│   │   ├── user/
│   │   └── userVerifiyd/
│   ├── service/
│   │   ├── email_validator/
│   │   ├── emailSender/
│   │   └── ...
│   └── utils/
│       └── otpgenerater/
├── prisma/
│   ├── schema.prisma
│   └── generated/
├── server.js
├── package.json
├── .env (not in repo)
├── README.md
├── API_DOCUMENTATION.md
└── SETUP.md
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Email validation before OTP generation
- ✅ CORS configuration for frontend communication
- ✅ Environment variables for sensitive data
- ✅ Secure cookie handling

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup and installation guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Detailed API reference with examples

## 🐛 Troubleshooting

### Port already in use:
```bash
lsof -i :7400
kill -9 <PID>
```

### Database connection error:
```bash
# Verify DATABASE_URL in .env
# Check PostgreSQL is running
# Test connection with psql
psql -U postgres -d ecommerce_db
```

### OTP emails not sending:
- Verify Gmail app password
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Review server logs with `npm run dev`

### JWT authentication errors:
- Ensure JWT_SECRET is set in .env
- Clear browser cookies and try again

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development with hot reload
npm run server     # Alternative dev command
```

## 👤 Author

Arun Chauhan

## 📄 License

ISC

---

**For detailed setup instructions**, visit [SETUP.md](./SETUP.md)

**For API reference**, visit [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
