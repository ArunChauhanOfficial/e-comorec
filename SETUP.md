# Setup & Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14 or higher ([Download](https://nodejs.org/))
- **npm**: v6 or higher (comes with Node.js)
- **PostgreSQL**: v12 or higher ([Download](https://www.postgresql.org/))
- **Git**: ([Download](https://git-scm.com/))

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd backend
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

## Step 3: Setup PostgreSQL Database

### Option A: Using PostgreSQL CLI

1. Start PostgreSQL service:
```bash
# macOS
brew services start postgresql

# Ubuntu/Linux
sudo systemctl start postgresql

# Windows
# PostgreSQL should be running as a service
```

2. Create a database:
```bash
psql -U postgres
```

3. In PostgreSQL shell:
```sql
CREATE DATABASE ecommerce_db;
```

4. Exit:
```sql
\q
```

### Option B: Using GUI Tools

Use pgAdmin or DBeaver to create a new database named `ecommerce_db`.

## Step 4: Create Environment File

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=7400
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Email Configuration (Other providers)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# OTP Configuration
OTP_LENGTH=6
OTP_EXPIRE=600

# API Configuration
API_BASE_URL=http://localhost:7400/api
```

### Getting Gmail App Password

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. Use this password as `EMAIL_PASSWORD` in your `.env`

## Step 5: Setup Database Schema

Run Prisma migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (if seed file exists)
npx prisma db seed
```

Verify the database was created:

```bash
npx prisma studio
```

This will open a web interface to view your database.

## Step 6: Start Development Server

```bash
npm run dev
```

You should see:
```
server is running http://localhost:7400
```

## Step 7: Test the API

Test a basic endpoint using curl:

```bash
curl -X POST http://localhost:7400/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Or use Postman/Insomnia to test endpoints.

---

## Troubleshooting

### Issue: `Cannot find module 'dotenv'`

**Solution:**
```bash
npm install dotenv
```

### Issue: `DATABASE_URL is not set`

**Solution:**
Ensure your `.env` file is in the root directory and contains `DATABASE_URL`.

### Issue: PostgreSQL connection refused

**Solution:**
1. Check if PostgreSQL is running:
```bash
# macOS
brew services list

# Linux
sudo systemctl status postgresql
```

2. Verify DATABASE_URL format:
```
postgresql://username:password@localhost:5432/database_name
```

3. Test connection:
```bash
psql -U postgres -d ecommerce_db -h localhost
```

### Issue: OTP emails not sending

**Solution:**
1. Verify Gmail credentials in `.env`
2. Check Gmail app-specific password setup
3. Allow "Less secure apps" in Gmail settings (if not using app password)
4. Check email service logs: `NODE_ENV=development npm run dev`

### Issue: JWT errors or authentication issues

**Solution:**
1. Regenerate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. Clear browser cookies and localStorage
3. Try login again with new token

### Issue: Port 7400 already in use

**Solution:**
1. Kill process on that port:
```bash
# macOS/Linux
lsof -i :7400
kill -9 <PID>

# Windows
netstat -ano | findstr :7400
taskkill /PID <PID> /F
```

2. Or change PORT in `.env`:
```env
PORT=8000
```

---

## Development Workflow

### Directory Structure

```
backend/
├── src/
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── services/        # Utility services
│   ├── utils/           # Helper functions
│   └── db/              # Database config
├── prisma/              # Prisma ORM config
├── .env                 # Environment variables
├── package.json
└── server.js            # Entry point
```

### Adding a New Route

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Import route in `src/app.js`
4. Add to express app: `app.use("/api/path", route)`

### Running in Production

1. Build: `npm run build` (if applicable)
2. Set environment: `NODE_ENV=production`
3. Start server: `npm start`

---

## Useful Commands

```bash
# Development with hot reload
npm run dev

# Production
npm start

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (DB GUI)
npx prisma studio

# Run migrations
npx prisma migrate dev

# Check migration status
npx prisma migrate status

# Reset database (development only!)
npx prisma migrate reset
```

---

## Next Steps

1. Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoint details
2. Explore the codebase structure
3. Set up frontend to communicate with backend
4. Deploy to production when ready

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs: `npm run dev`
3. Create an issue in the repository
4. Contact the development team

