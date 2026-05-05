# AsoroTaskTab Backend

Backend API for the Task Reporting System built with Node.js, Express, and MongoDB.

## Features

- RESTful API for task report management
- CRUD operations for task reports
- File upload support for attachments
- CORS enabled for frontend integration
- MongoDB database integration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **File Upload:** Multer
- **Environment Variables:** dotenv

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/asorotasktab
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Database Seeding

To populate the database with sample data:
```bash
npm run seed
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Task Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report
- `POST /api/reports/:id/attachments` - Add attachment to report

## Request/Response Examples

### Create Report
```bash
POST /api/reports
Content-Type: application/json

{
  "date": "2026-01-11",
  "project": "Website Redesign",
  "taskDescription": "Updated homepage layout",
  "hoursSpent": 4.5,
  "status": "Completed"
}
```

### Add Attachment
```bash
POST /api/reports/:id/attachments
Content-Type: multipart/form-data

attachment: [file]
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── reportController.js # Business logic
├── middleware/
│   └── uploadMiddleware.js # File upload handling
├── models/
│   └── TaskReport.js       # Mongoose schema
├── routes/
│   └── reportRoutes.js     # API routes
├── utils/
│   └── seed.js             # Database seeder
├── uploads/                # Uploaded files (created automatically)
├── .env.example            # Environment variables template
├── package.json
└── server.js               # Entry point
```

## License

MIT
