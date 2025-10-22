# PeerPay - Full Stack Application

A platform connecting students with employers for part-time job opportunities.

## 🚀 Quick Start Guide

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or Express)
- Visual Studio 2022 or VS Code

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ../PeerPayBackend
   ```

2. **Update database connection string** (if needed)
   Edit `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=PeerPayDB;Trusted_Connection=true;"
   }
   ```

3. **Run database migrations**
   ```bash
   dotnet ef database update
   ```

4. **Run the backend**
   ```bash
   dotnet run --project PeerPayBackend
   ```
   
   Backend will be available at: `https://localhost:7255`
   Swagger UI: `https://localhost:7255/swagger`

### Frontend Setup

1. **Install dependencies** (in this directory)
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at: `http://localhost:5173`

## 📱 Testing the Application

### 1. Register a New Account

**Student Registration:**
- Navigate to: `http://localhost:5173/register/student`
- Fill in the form with your details

**Employer Registration:**
- Navigate to: `http://localhost:5173/register/employer`
- Fill in your company details

### 2. Login

- Navigate to: `http://localhost:5173/login`
- Use your email/phone and password
- You'll be redirected to the appropriate dashboard

### 3. Access Dashboards

**Student Dashboard:** `http://localhost:5173/student/dashboard`
- View available jobs
- Track your applications
- Check notifications
- View ratings and earnings

**Employer Dashboard:** `http://localhost:5173/employer/dashboard`
- View posted jobs
- Check applications
- Manage job posts
- View payment summary

**Admin Dashboard:** `http://localhost:5173/admin/dashboard`
- Manage all users
- Verify accounts
- Monitor platform activity

## 🔧 Available API Endpoints

### Authentication
- `POST /api/user/login` - User login
- `POST /api/student/register` - Student registration
- `POST /api/employer/register` - Employer registration

### User Management
- `GET /api/user/{id}` - Get user details
- `PUT /api/user/{id}/profile` - Update profile
- `GET /api/user` - Get all users (Admin)

### Jobs
- `GET /api/job` - Get all jobs
- `POST /api/job` - Create new job
- `GET /api/job/{id}` - Get job details
- `POST /api/job/{id}/apply` - Apply for job
- `GET /api/job/employer/{employerId}` - Get employer's jobs

### Notifications
- `GET /api/notification/user/{userId}` - Get user notifications
- `PUT /api/notification/{id}/read` - Mark as read
- `GET /api/notification/user/{userId}/unread-count` - Get unread count

### Messages
- `POST /api/message` - Send message
- `GET /api/message/conversation/{conversationId}` - Get conversation messages
- `POST /api/conversation` - Create conversation

### Ratings
- `POST /api/rating` - Create rating
- `GET /api/rating/user/{userId}` - Get user ratings
- `GET /api/rating/user/{userId}/stats` - Get rating statistics

### Payments
- `POST /api/payment/create` - Create payment
- `POST /api/payment/confirm` - Confirm payment
- `GET /api/payment/student/{studentId}` - Get student payments
- `GET /api/payment/employer/{employerId}` - Get employer payments

## 🌐 Environment Configuration

### Frontend (.env.development)
```env
VITE_API_BASE_URL=https://localhost:7255/api
VITE_APP_TITLE=PeerPay
VITE_ENVIRONMENT=development
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your SQL Server connection string"
  },
  "JwtSettings": {
    "Secret": "your-secret-key",
    "Issuer": "PeerPay",
    "Audience": "PeerPayUsers",
    "ExpiryMinutes": 60
  },
  "Stripe": {
    "SecretKey": "your-stripe-secret-key",
    "PublishableKey": "your-stripe-publishable-key"
  }
}
```

## 🔐 CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)

## 📝 Development Workflow

1. **Start Backend First**
   ```bash
   cd PeerPayBackend
   dotnet run --project PeerPayBackend
   ```

2. **Then Start Frontend** (in another terminal)
   ```bash
   cd peerpayfrontend
   npm run dev
   ```

3. **Test Features**
   - Register new accounts
   - Login and access dashboards
   - Create and apply for jobs
   - Test notifications
   - Test messaging system

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
```bash
dotnet ef database update
```

**CORS Error:**
- Verify CORS is enabled in `Program.cs`
- Check frontend URL matches CORS policy

### Frontend Issues

**API Connection Error:**
- Ensure backend is running on `https://localhost:7255`
- Check `.env.development` has correct API URL

**Module Not Found:**
```bash
npm install
```

## 📚 Tech Stack

### Backend
- .NET 8.0 Web API
- Entity Framework Core
- SQL Server
- MediatR (CQRS Pattern)
- Stripe.net

### Frontend
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Zustand (State Management)

## 🎯 Implemented Features

✅ **Authentication System** - Login, Registration, JWT tokens
✅ **Job Management** - Post, browse, apply for jobs
✅ **Notification System** - Real-time notifications
✅ **Messaging System** - Direct messaging
✅ **Rating & Review System** - Rate users
✅ **Payment Integration** - Stripe payments
✅ **Student Dashboard** - Complete with stats and job listings
✅ **Employer Dashboard** - Job management and applications
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
