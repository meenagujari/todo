# Todo API

A production-ready RESTful API for managing todo items with MongoDB, Express, and Node.js.

## Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete todos
- ✅ **Advanced Filtering** - Filter by status, priority, search terms
- ✅ **Pagination** - Handle large datasets efficiently
- ✅ **Search** - Full-text search across title, description, and tags
- ✅ **Bulk Operations** - Update multiple todos at once
- ✅ **Statistics** - Get todo statistics and analytics
- ✅ **Validation** - Comprehensive input validation
- ✅ **Error Handling** - Proper error responses
- ✅ **MongoDB Integration** - Robust database operations
- ✅ **Archiving** - Archive/restore todos
- ✅ **Due Date Management** - Track overdue items

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Get All Todos
```http
GET /todos
```

**Query Parameters:**
- `status` - Filter by status (pending, in-progress, completed, cancelled)
- `priority` - Filter by priority (low, medium, high, urgent)
- `search` - Search in title, description, and tags
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order (asc, desc)
- `archived` - Show archived todos (true/false)

**Example:**
```bash
GET /api/todos?status=pending&priority=high&page=1&limit=5
```

### 2. Get Single Todo
```http
GET /todos/:id
```

### 3. Create Todo
```http
POST /todos
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the Node.js API project",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "tags": ["work", "urgent"]
}
```

### 4. Update Todo
```http
PUT /todos/:id
```

**Request Body:** (all fields optional)
```json
{
  "status": "completed",
  "priority": "medium"
}
```

### 5. Delete Todo
```http
DELETE /todos/:id
```

### 6. Bulk Update Todos
```http
PATCH /todos/bulk
```

**Request Body:**
```json
{
  "ids": ["id1", "id2", "id3"],
  "updates": {
    "status": "completed",
    "priority": "low"
  }
}
```

### 7. Get Statistics
```http
GET /todos/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "byStatus": [
      { "_id": "pending", "count": 5 },
      { "_id": "completed", "count": 3 }
    ],
    "byPriority": [
      { "_id": "high", "count": 2 },
      { "_id": "medium", "count": 4 }
    ],
    "overdue": 1
  }
}
```

## Todo Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  status: String (pending, in-progress, completed, cancelled),
  priority: String (low, medium, high, urgent),
  dueDate: Date,
  completedAt: Date,
  tags: [String],
  isArchived: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 1,
  "total": 10,
  "page": 1,
  "totalPages": 2
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

3. **Start Server**
   ```bash
   node server.js
   ```

## Testing Examples

### Create a Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete the Node.js tutorial",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

### Get All Todos
```bash
curl http://localhost:5000/api/todos
```

### Update Todo
```bash
curl -X PUT http://localhost:5000/api/todos/:id \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Features in Detail

### Search Functionality
Search across title, description, and tags:
```bash
GET /api/todos?search=project
```

### Pagination
Handle large datasets:
```bash
GET /api/todos?page=2&limit=5
```

### Filtering
Combine multiple filters:
```bash
GET /api/todos?status=pending&priority=high&archived=false
```

### Sorting
Sort by any field:
```bash
GET /api/todos?sortBy=dueDate&order=asc
```

This API is production-ready with comprehensive error handling, validation, and advanced features for managing todo items efficiently.

