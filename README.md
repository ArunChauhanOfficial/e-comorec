# E-Commerce Backend API

A robust Node.js Express backend for an e-commerce application with comprehensive user authentication, OTP verification, product management, and admin controls.

## 🎯 Features

- **User Authentication**: Registration and login with JWT tokens
- **OTP Verification**: Email-based OTP generation and verification for secure authentication
- **Email Validation**: Deep email validation service with comprehensive checks
- **Password Security**: bcryptjs-based password hashing and encryption
- **CORS Support**: Configured for cross-origin requests
- **Product Management**: Full CRUD operations for products
- **Order Management**: Order tracking and management
- **Admin Panel**: Admin verification and management capabilities
- **User Profile Management**: Address, phone, and account management
- **File Upload**: Multer integration for file uploads
- **PostgreSQL Database**: Reliable relational database
- **Prisma ORM**: Type-safe database access with migrations

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
- `POST /delete` - Delete OTP for user

### User Routes (`/api/user`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /` - Get user profile (auth required)
- `PUT /address` - Update user address (auth required)
- `PUT /phone` - Update user phone (auth required)
- `DELETE /` - Delete user account (auth required)

### Verification Routes (`/api/verifition`)
- `POST /verify` - Verify OTP for email verification

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /verify` - Admin verification

### Product Routes (`/api/product`)
- `POST /create` - Create new product (admin auth required)
- `GET /list` - Get all products
- `PUT /update/:id` - Update product (admin auth required)
- `DELETE /delete/:id` - Delete product (admin auth required)

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 📁 Folder Structure

```
backend/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── controllers/                    # Business logic
│   │   ├── admin/
│   │   │   ├── admin.verify.js
│   │   │   └── login.admin.js
│   │   ├── Otp/
│   │   │   ├── otp.create.js
│   │   │   ├── otp.verify.js
│   │   │   └── userDelete.otp.js
│   │   ├── Product/
│   │   │   ├── create.product.js
│   │   │   ├── delete.product.js
│   │   │   ├── list.product.js
│   │   │   └── update.product.js
│   │   ├── User/
│   │   │   ├── address.user.js
│   │   │   ├── create.user.js
│   │   │   ├── delete.user.js
│   │   │   ├── login.user.js
│   │   │   ├── phone.user.js
│   │   │   └── verify.user.js
│   │   └── orders/
│   ├── db/
│   │   └── prisma.js                   # Prisma client initialization
│   ├── middleware/
│   │   ├── auth.middleware/
│   │   │   └── auth.middleware.js      # JWT authentication middleware
│   │   └── delete.auth.middleware/
│   │       └── delete.middleware.js
│   ├── routes/
│   │   ├── admin/
│   │   │   └── admin.route.js
│   │   ├── otp/
│   │   │   └── otp.route.js
│   │   ├── product/
│   │   │   └── product.route.js
│   │   ├── user/
│   │   │   └── user.route.js
│   │   └── userVerifiyd/
│   │       └── user.verify.route.js
│   ├── service/
│   │   ├── email_validator/
│   │   │   └── emailValid.service.js
│   │   ├── emailSender/
│   │   │   └── emailler.service.js
│   │   └── multer.service/
│   │       ├── upload.multer.js
│   │       └── cloudestore/
│   └── utils/
│       └── otpgenerater/
│           └── otpgenrater.service.js
├── prisma/
│   ├── schema.prisma                   # Database schema definition
│   └── generated/                      # Prisma client generated files
├── cloudestore/                        # File storage directory
├── .env                                # Environment variables
├── package.json                        # Dependencies
├── server.js                           # Server entry point
└── API_DOCUMENTATION.md                # Complete API documentation
```

## 🔐 Authentication

This backend uses **JWT (JSON Web Tokens)** for authentication:

1. Users register and login to receive a JWT token
2. JWT tokens are sent in the `Authorization` header as: `Bearer <token>`
3. Protected routes require valid JWT tokens
4. Tokens expire after 7 days (configurable via `JWT_EXPIRE`)

## 🔑 Key Technologies

- **Express.js**: Fast and minimalist web framework
- **Prisma**: Type-safe ORM with automatic migrations
- **PostgreSQL**: Reliable relational database
- **JWT**: Secure token-based authentication
- **Nodemailer**: Email sending service
- **Multer**: File upload middleware
- **bcryptjs**: Password hashing and encryption

## 📝 Development Workflow

1. Create/modify files in the `src/` directory
2. Use `npm run dev` for development with hot reload
3. Environment changes require server restart
4. Database schema changes use Prisma migrations

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file or kill process using port 7400
kill -9 $(lsof -t -i:7400)
```

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env` is correct
- Check PostgreSQL credentials

### Prisma Client Errors
```bash
npx prisma generate
npx prisma migrate dev
```

## 📞 Support & Documentation

- **API Docs**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Setup Guide**: See [SETUP.md](./SETUP.md)
- **Issues**: Check server logs in terminal

## 📄 License

ISC License - See package.json for details
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
