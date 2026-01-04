# API Documentation

Complete API reference for Local Transport Finder backend.

**Base URL**: `http://localhost:5000/api` (development)

---

## Table of Contents
1. [Authentication](#authentication)
2. [Routes Endpoints](#routes-endpoints)
3. [Response Format](#response-format)
4. [Error Codes](#error-codes)

---

## Authentication

Most endpoints work without authentication, but authenticated requests get additional features.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## Routes Endpoints

### 1. Search Routes

Search for routes between two locations.

**Endpoint**: `GET /routes/search`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| from | string | Yes | Starting location name |
| to | string | Yes | Destination location name |
| transportType | string | No | Filter by type (Shared Auto, Private Bus, City Bus, E-rickshaw) |

**Example Request**:
```bash
curl "http://localhost:5000/api/routes/search?from=Railway%20Station&to=Medical%20College"
```

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "from": {
      "name": "Railway Station",
      "coords": { "lat": 23.6831, "lng": 86.9826 }
    },
    "to": {
      "name": "Medical College",
      "coords": { "lat": 23.6920, "lng": 87.0050 }
    },
    "transportType": "Shared Auto",
    "identifier": {
      "color": "Green",
      "localName": "Medical College Auto"
    },
    "fare": {
      "min": 20,
      "max": 25,
      "studentDiscount": true
    },
    "timings": {
      "firstService": "06:00",
      "lastService": "21:00",
      "frequency": "Every 10 mins"
    },
    "metadata": {
      "upvotes": 45,
      "downvotes": 2,
      "verifiedVotes": 23,
      "status": "verified"
    },
    "stops": [
      {
        "name": "Market",
        "coords": { "lat": 23.6850, "lng": 86.9900 }
      }
    ]
  }
]
```

---

### 2. Get Single Route

Get detailed information about a specific route.

**Endpoint**: `GET /routes/:id`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Route ID |

**Example Request**:
```bash
curl "http://localhost:5000/api/routes/507f1f77bcf86cd799439011"
```

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "from": { ... },
  "to": { ... },
  "transportType": "Shared Auto",
  "identifier": { ... },
  "fare": { ... },
  "timings": { ... },
  "tips": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "John Doe",
        "avatar": "https://..."
      },
      "text": "Crowded after 5 PM",
      "votes": 12,
      "createdAt": "2026-01-01T10:00:00.000Z"
    }
  ],
  "metadata": { ... },
  "createdBy": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Jane Smith",
    "avatar": "https://..."
  },
  "createdAt": "2025-11-15T08:30:00.000Z",
  "updatedAt": "2025-12-28T14:20:00.000Z"
}
```

---

### 3. Create Route

Submit a new route to the platform.

**Endpoint**: `POST /routes`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

**Request Body**:
```json
{
  "from": {
    "name": "Railway Station",
    "coords": { "lat": 23.6831, "lng": 86.9826 }
  },
  "to": {
    "name": "College",
    "coords": { "lat": 23.7200, "lng": 87.1200 }
  },
  "transportType": "Shared Auto",
  "identifier": {
    "color": "Green",
    "localName": "College Auto"
  },
  "stops": [
    {
      "name": "Market",
      "coords": { "lat": 23.6900, "lng": 87.0000 }
    }
  ],
  "fare": {
    "min": 20,
    "max": 25,
    "studentDiscount": true
  },
  "timings": {
    "firstService": "06:00",
    "lastService": "21:00",
    "frequency": "Every 10 mins"
  }
}
```

**Response** (201 Created):
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "from": { ... },
  "to": { ... },
  "metadata": {
    "upvotes": 0,
    "downvotes": 0,
    "verifiedVotes": 0,
    "status": "pending"
  },
  "createdAt": "2026-01-01T12:00:00.000Z"
}
```

---

### 4. Vote on Route

Upvote or downvote a route's accuracy.

**Endpoint**: `POST /routes/:id/vote`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

**Request Body**:
```json
{
  "type": "up"  // or "down"
}
```

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "metadata": {
    "upvotes": 46,
    "downvotes": 2,
    "verifiedVotes": 24,
    "status": "verified"
  }
}
```

---

### 5. Add Local Tip

Add a helpful tip for travelers on a route.

**Endpoint**: `POST /routes/:id/tips`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

**Request Body**:
```json
{
  "text": "Ask for 'Engineering College', not just 'College'"
}
```

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "tips": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "text": "Ask for 'Engineering College', not just 'College'",
      "votes": 0,
      "createdAt": "2026-01-01T12:00:00.000Z"
    }
  ]
}
```

---

### 6. Get Popular Routes

Get the most upvoted and verified routes.

**Endpoint**: `GET /routes/popular`

**Query Parameters**: None

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "from": { ... },
    "to": { ... },
    "metadata": {
      "upvotes": 52,
      "status": "verified"
    }
  }
]
```

---

### 7. Get Nearby Routes

Get routes near a specific location.

**Endpoint**: `GET /routes/nearby`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| lat | number | Yes | Latitude |
| lng | number | Yes | Longitude |
| radius | number | No | Search radius in meters (default: 5000) |

**Example Request**:
```bash
curl "http://localhost:5000/api/routes/nearby?lat=23.6831&lng=86.9826&radius=3000"
```

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "from": { ... },
    "to": { ... }
  }
]
```

---

## Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Search | 100 requests / 15 min |
| Create | 10 requests / hour |
| Vote | 50 requests / 15 min |
| General | 100 requests / 15 min |

---

## Data Types

### Route Object
```typescript
{
  _id: string
  from: {
    name: string
    placeId?: string
    coords: { lat: number, lng: number }
  }
  to: {
    name: string
    placeId?: string
    coords: { lat: number, lng: number }
  }
  transportType: 'Shared Auto' | 'Private Bus' | 'City Bus' | 'E-rickshaw'
  identifier: {
    color: 'Green' | 'Blue' | 'Red' | 'Yellow' | 'White' | 'Orange'
    localName: string
    routeNumber?: string
  }
  stops: Array<{
    name: string
    coords: { lat: number, lng: number }
  }>
  fare: {
    min: number
    max: number
    peakHourSurcharge?: number
    studentDiscount?: boolean
  }
  timings: {
    firstService: string  // HH:mm format
    lastService: string   // HH:mm format
    frequency?: string
  }
  tips: Array<{
    _id: string
    userId?: string
    text: string
    votes: number
    createdAt: Date
  }>
  metadata: {
    upvotes: number
    downvotes: number
    verifiedVotes: number
    lastVerified?: Date
    status: 'pending' | 'verified' | 'flagged'
  }
  createdBy?: string
  createdAt: Date
  updatedAt: Date
}
```

---

## Examples

### Complete Flow: Search → View → Vote

```bash
# 1. Search for routes
curl "http://localhost:5000/api/routes/search?from=Station&to=College"

# 2. Get detailed route info
curl "http://localhost:5000/api/routes/507f1f77bcf86cd799439011"

# 3. Vote on the route
curl -X POST "http://localhost:5000/api/routes/507f1f77bcf86cd799439011/vote" \
  -H "Content-Type: application/json" \
  -d '{"type":"up"}'
```

---

## Notes

- All timestamps are in ISO 8601 format
- Coordinates use decimal degrees
- Distance calculations use Haversine formula
- Routes auto-verify after 10 upvotes
- Unverified routes still appear in search results

---

For support, open an issue on [GitHub](https://github.com/yourusername/local-transport-finder/issues).
