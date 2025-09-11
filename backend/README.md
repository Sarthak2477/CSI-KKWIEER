# CSI KKWIEER Backend API

A comprehensive backend API for the CSI KKWIEER Event Management Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Event Management**: Complete CRUD operations for events
- **Registration System**: Student registration with validation
- **Payment Integration**: Payment tracking and status management
- **Gallery Management**: Image upload and categorization
- **Committee Management**: Committee member profiles and hierarchy
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Centralized error handling with detailed responses
- **Security**: Rate limiting, CORS, helmet security headers
- **Documentation**: Well-documented API endpoints

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/csi-kkwieer
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Admin Routes (`/api/admin`)
- `POST /register` - Register new admin
- `POST /login` - Admin login
- `GET /profile` - Get current admin profile
- `PUT /profile` - Update admin profile
- `GET /all` - Get all admins (Super Admin only)

#### Event Routes (`/api/events`)
- `GET /` - Get all events (with filtering and pagination)
- `GET /:id` - Get single event
- `POST /` - Create event (Auth required)
- `PUT /:id` - Update event (Auth required)
- `DELETE /:id` - Delete event (Auth required)
- `GET /admin/stats` - Get event statistics (Admin only)

#### Registration Routes (`/api/registrations`)
- `POST /` - Create registration
- `GET /event/:eventId` - Get event registrations (Auth required)
- `PUT /:id/status` - Update registration status (Auth required)

#### Payment Routes (`/api/payments`)
- `POST /` - Create payment
- `GET /registration/:registrationId` - Get payment by registration
- `PUT /:id/status` - Update payment status (Auth required)

#### Gallery Routes (`/api/gallery`)
- `GET /` - Get all gallery images
- `GET /:id` - Get single gallery image
- `POST /` - Create gallery image (Auth required)
- `PUT /:id` - Update gallery image (Auth required)
- `DELETE /:id` - Delete gallery image (Auth required)

#### Committee Member Routes (`/api/committee-members`)
- `GET /` - Get all committee members
- `GET /:id` - Get single committee member
- `POST /` - Create committee member (Auth required)
- `PUT /:id` - Update committee member (Auth required)
- `DELETE /:id` - Delete committee member (Auth required)

### Query Parameters

#### Pagination
```
?page=1&limit=10
```

#### Event Filtering
```
?category=workshop&status=published&featured=true&upcoming=true
```

#### Committee Member Filtering
```
?year=2025&position=President
```

#### Gallery Filtering
```
?category=workshop&eventName=hackathon
```

## 🗄️ Database Schema

### Admin
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (super_admin, admin, moderator),
  isActive: Boolean,
  timestamps: true
}
```

### Event
```javascript
{
  title: String,
  description: String,
  shortDesc: String,
  category: String (enum),
  status: String (enum),
  startDate: Date,
  endDate: Date,
  startTime: String,
  endTime: String,
  location: String,
  maxCapacity: Number,
  registrationDeadline: Date,
  image: String,
  images: [String],
  isActive: Boolean,
  isFeatured: Boolean,
  adminId: ObjectId (ref: Admin),
  timestamps: true
}
```

### Registration
```javascript
{
  status: String (enum),
  registeredAt: Date,
  eventId: ObjectId (ref: Event),
  studentId: String,
  studentName: String,
  studentEmail: String,
  studentPhone: String,
  year: String (enum),
  branch: String (enum),
  additionalInfo: String,
  timestamps: true
}
```

### Payment
```javascript
{
  amount: Number,
  method: String (enum),
  status: String (enum),
  transactionId: String (unique),
  paidAt: Date,
  registrationId: ObjectId (ref: Registration),
  paymentGatewayResponse: Mixed,
  timestamps: true
}
```

### GalleryImage
```javascript
{
  title: String,
  description: String,
  imageUrl: String,
  eventName: String,
  category: String (enum),
  isActive: Boolean,
  uploadedAt: Date,
  uploadedBy: ObjectId (ref: Admin),
  timestamps: true
}
```

### CommitteeMember
```javascript
{
  name: String,
  position: String (enum),
  year: String,
  email: String,
  linkedin: String,
  image: String,
  description: String,
  isActive: Boolean,
  timestamps: true
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: express-validator for request validation
- **Error Handling**: Secure error responses

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🚀 Deployment

1. **Set environment variables** for production
2. **Build and start**:
   ```bash
   npm start
   ```
3. **Use a process manager** like PM2:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "csi-api"
   ```

## 📊 API Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

### Pagination Response
```json
{
  "status": "success",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email csi.kkwieer@gmail.com or create an issue in the repository.