# Roadmint - Complete System Documentation

## Table of Contents
1. [Data Flow Diagram (DFD)](#data-flow-diagram)
2. [Entity-Relationship Diagram (ER)](#entity-relationship-diagram)
3. [Data Dictionary](#data-dictionary)
4. [Data Model](#data-model)
5. [Schema Design](#schema-design)
6. [Architecture Overview](#architecture-overview)

---

## 1. Data Flow Diagram (DFD)

### Level 0 - Context Diagram
```
┌─────────────┐
│             │
│    User     │
│             │
└──────┬──────┘
       │
       │ Request/Response
       ↓
┌─────────────────────────────────┐
│                                 │
│      Roadmint System            │
│   (Learning Roadmap Platform)   │
│                                 │
└──────┬──────────────────┬───────┘
       │                  │
       ↓                  ↓
┌─────────────┐    ┌─────────────┐
│   MongoDB   │    │  Groq AI    │
│   Database  │    │     API     │
└─────────────┘    └─────────────┘
```

### Level 1 - System Processes
```
                    ┌─────────────┐
                    │    User     │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ↓               ↓               ↓
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  1.0        │ │  2.0        │ │  3.0        │
    │  Generate   │ │  Manage     │ │  Track      │
    │  Roadmap    │ │  Roadmap    │ │  Progress   │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           │               │               │
           ↓               ↓               ↓
    ┌─────────────────────────────────────────┐
    │                                         │
    │        D1: LocalStorage Cache           │
    │        D2: MongoDB Database             │
    │                                         │
    └─────────────────────────────────────────┘
```

### Level 2 - Detailed Process Flow

#### 2.1 Generate Roadmap Process
```
User Input (Topic)
       ↓
┌──────────────────┐
│  Validate    │
│  Topic Input     │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Check       │
│  LocalStorage    │────── Cache Hit ────→ Display Result
└────────┬─────────┘
         │ Cache Miss
         ↓
┌──────────────────┐
│  Generate    │
│  AI Prompt       │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Call        │
│  Groq API        │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Parse JSON  │
│  Response        │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Normalize   │
│  Data Structure  │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Encrypt &   │
│  Store Locally   │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Display     │
│  Result          │
└──────────────────┘
```

#### 2.2 Manage Roadmap Process
```
User Action
       ↓
┌──────────────────┐
│  Load All    │
│  Roadmaps        │← D1: LocalStorage
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
┌────────┐ ┌────────┐
│  Mark  │ │ Delete │
│Complete│ │Roadmap │
└───┬────┘ └───┬────┘
    │          │
    ↓          ↓
┌─────────────────┐
│  Update     │
│  LocalStorage   │→ D1: LocalStorage
└─────────────────┘
    │
    ↓
┌─────────────────┐
│  Optionally │
│  Sync to DB     │→ D2: MongoDB
└─────────────────┘
```

#### 2.3 Track Progress Process
```
User Views Dashboard
       ↓
┌──────────────────┐
│  3.1 Load        │
│  Roadmaps        │← D1: LocalStorage
└────────┬─────────┘
         ↓
┌──────────────────┐
│  3.2 Calculate   │
│  Statistics      │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  3.3 Compute     │
│  Completion %    │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  3.4 Track       │
│  Streak          │
└────────┬─────────┘
         ↓
┌──────────────────┐
│  3.5 Display     │
│  Progress        │
└──────────────────┘
```

---

## 2. Entity-Relationship Diagram (ER)

```
┌─────────────────────────────────┐
│            USER                 │
│─────────────────────────────────│
│ PK  _id: ObjectId               │
│     email: String               │
│     name: String                │
│     createdAt: Date             │
└───────────────┬─────────────────┘
                │
                │ 1
                │
                │ owns
                │
                │ 0..*
                ↓
┌─────────────────────────────────┐
│          ROADMAP                │
│─────────────────────────────────│
│ PK  _id: ObjectId               │
│ FK  userId: ObjectId            │
│     title: String               │
│     roadmap: Mixed              │
│     createdAt: Date             │
│     updatedAt: Date             │
└───────────────┬─────────────────┘
                │
                │ 1
                │
                │ contains
                │
                │ 1..*
                ↓
┌─────────────────────────────────┐
│          SUBJECT                │
│─────────────────────────────────│
│     name: String                │
│     topics: Array<Topic>        │
└───────────────┬─────────────────┘
                │
                │ 1
                │
                │ has
                │
                │ 1..*
                ↓
┌─────────────────────────────────┐
│           TOPIC                 │
│─────────────────────────────────│
│     title: String               │
│     subtopic: String?           │
│     difficulty: Number (1-5)    │
│     marked: Boolean             │
│     note: String                │
│     timeStamp: Date?            │
└─────────────────────────────────┘


┌─────────────────────────────────┐
│      LOCALSTORAGE CACHE         │
│─────────────────────────────────│
│ Key: roadmap_{topic}            │
│ Value: Encrypted Roadmap        │
│        (Base64 encoded)         │
└─────────────────────────────────┘
```

### Relationships:
- **User → Roadmap**: One-to-Many (1:0..*)
  - One user can have zero or more roadmaps
  - Referenced by `userId` field

- **Roadmap → Subject**: One-to-Many (1:1..*)
  - One roadmap contains one or more subjects
  - Embedded as object keys in `roadmap` field

- **Subject → Topic**: One-to-Many (1:1..*)
  - One subject contains one or more topics
  - Stored as array of topic objects

---

## 3. Data Dictionary

### 3.1 Roadmap Collection (MongoDB)

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|--------|-------------|-------------|
| _id | ObjectId | 12 bytes | PK, Auto-generated | Unique identifier for roadmap |
| title | String | 1-200 chars | Required, Indexed | Roadmap title (e.g., "JavaScript") |
| roadmap | Mixed | Unlimited | Required | JSON object containing subjects and topics |
| userId | ObjectId | 12 bytes | FK, Optional, References User._id | Owner of the roadmap |
| createdAt | Date | 8 bytes | Auto-generated | Timestamp of creation |
| updatedAt | Date | 8 bytes | Auto-updated | Timestamp of last update |

### 3.2 Topic Object (Embedded)

| Field Name | Data Type | Length | Constraints | Description |
|------------|-----------|--------|-------------|-------------|
| title | String | 1-500 chars | Required | Topic name/title |
| subtopic | String/Null | 1-500 chars | Optional | Alternative topic identifier |
| difficulty | Number | 1 digit | Required, Range: 1-5 | Difficulty level (1=Easy, 5=Expert) |
| marked | Boolean | 1 bit | Required, Default: false | Completion status |
| note | String | Unlimited | Optional, Default: "" | User's notes for the topic |
| timeStamp | Date/Null | 8 bytes | Optional, Default: null | Completion timestamp |

### 3.3 LocalStorage Keys

| Key Pattern | Value Type | Encoding | Description |
|-------------|-----------|----------|-------------|
| roadmap_{topic} | String | Base64(URI-encoded JSON) | Encrypted roadmap data |
| active_roadmap_tab | String | Plain text | Currently active tab key |

### 3.4 API Endpoints Data

#### POST /api/ai
**Request:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| prompt | String | Yes | AI generation prompt |

**Response:**
| Field | Type | Description |
|-------|------|-------------|
| text | String | AI-generated roadmap JSON |

#### GET /api/roadmaps
**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | String | No | Filter by specific title |

**Response:**
| Field | Type | Description |
|-------|------|-------------|
| success | Boolean | Operation status |
| data | Array | List of roadmaps |
| roadmap | Object | Single roadmap (if title specified) |

#### POST /api/roadmaps
**Request:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Roadmap title |
| roadmap | Object | Yes | Roadmap data structure |

**Response:**
| Field | Type | Description |
|-------|------|-------------|
| success | Boolean | Operation status |
| message | String | Status message |
| data | Object | Created roadmap |

---

## 4. Data Model

### 4.1 Conceptual Data Model

```
ROADMINT LEARNING PLATFORM
    │
    ├── USERS (Future Implementation)
    │     └── Attributes: id, email, name, preferences
    │
    ├── ROADMAPS
    │     ├── Attributes: id, title, userId, timestamps
    │     └── Contains: SUBJECTS (1 to many)
    │
    ├── SUBJECTS
    │     ├── Attributes: name
    │     └── Contains: TOPICS (1 to many)
    │
    └── TOPICS
          └── Attributes: title, difficulty, marked, note, timestamp
```

### 4.2 Logical Data Model

```typescript
// User Model (Future)
interface User {
  _id: ObjectId;
  email: string;
  name: string;
  preferences?: {
    theme: string;
    notifications: boolean;
  };
  createdAt: Date;
}

// Roadmap Model
interface Roadmap {
  _id: ObjectId;
  title: string;
  userId?: ObjectId;  // Optional reference to User
  roadmap: {
    [subjectName: string]: Topic[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Topic Model (Embedded)
interface Topic {
  title: string;
  subtopic?: string | null;
  difficulty: 1 | 2 | 3 | 4 | 5;
  marked: boolean;
  note: string;
  timeStamp: Date | null;
}
```

### 4.3 Physical Data Model

**Collection: roadmaps**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  title: "JavaScript",
  userId: ObjectId("507f1f77bcf86cd799439012"),
  roadmap: {
    "JavaScript Basics": [
      {
        title: "Variables and Data Types",
        subtopic: null,
        difficulty: 1,
        marked: true,
        note: "Completed with examples",
        timeStamp: ISODate("2025-01-15T10:30:00Z")
      },
      {
        title: "Functions and Scope",
        subtopic: null,
        difficulty: 2,
        marked: false,
        note: "",
        timeStamp: null
      }
    ],
    "Advanced Concepts": [
      {
        title: "Closures",
        difficulty: 4,
        marked: false,
        note: "",
        timeStamp: null
      }
    ]
  },
  createdAt: ISODate("2025-01-10T08:00:00Z"),
  updatedAt: ISODate("2025-01-15T10:30:00Z")
}
```

### 4.4 Storage Strategy

**Primary Storage: LocalStorage (Client-side)**
- **Purpose**: Fast access, offline capability, PWA support
- **Format**: Encrypted Base64 strings
- **Capacity**: ~5-10MB per domain
- **Lifecycle**: Persistent until manually cleared

**Secondary Storage: MongoDB (Server-side)**
- **Purpose**: Backup, multi-device sync, persistence
- **Format**: BSON documents
- **Capacity**: Unlimited (within MongoDB Atlas limits)
- **Lifecycle**: Permanent storage with versioning

---

## 5. Schema Design

### 5.1 MongoDB Schema (Mongoose)

```javascript
// roadmapSchema.ts
const roadmapSchema = new mongoose.Schema({
  // Primary identifier
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200,
    index: true  // For faster queries
  },

  // Flexible JSON structure for subjects/topics
  roadmap: { 
    type: mongoose.Schema.Types.Mixed, 
    default: {},
    validate: {
      validator: function(v) {
        return typeof v === 'object' && v !== null;
      },
      message: 'Roadmap must be an object'
    }
  },

  // Reference to user (optional, for future multi-user support)
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    index: true  // For faster user queries
  }
}, {
  timestamps: true  // Auto-creates createdAt & updatedAt
});

// Indexes for performance
roadmapSchema.index({ title: 1, userId: 1 });  // Composite index
roadmapSchema.index({ createdAt: -1 });        // Sort by date

export const Roadmap = mongoose.models?.Roadmap 
  || mongoose.model("Roadmap", roadmapSchema);
```

### 5.2 TypeScript Type Definitions

```typescript
// Complete type hierarchy
export type Topic = {
  title: string;                    // Required: topic name
  subtopic?: string | null;         // Optional: alternative identifier
  difficulty: 1 | 2 | 3 | 4 | 5;    // Required: 1-5 scale
  marked: boolean;                  // Required: completion flag
  note: string;                     // Required: user notes (can be empty)
  timeStamp: Date | null;           // Optional: completion time
};

export type Roadmap = {
  [subject: string]: Topic[];       // Dynamic subject keys
};

export type RoadmapDocument = {
  _id: string;                      // MongoDB ObjectId as string
  title: string;
  roadmap: Roadmap;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoadmapList = Array<{
  key: string;                      // LocalStorage key
  data: Roadmap;                    // Decrypted data
}>;
```

### 5.3 Validation Rules

**Title Validation:**
- Type: String
- Required: Yes
- Min Length: 1 character
- Max Length: 200 characters
- Pattern: Alphanumeric with spaces, hyphens, underscores
- Unique: No (multiple users can have same titled roadmaps)

**Difficulty Validation:**
- Type: Integer
- Required: Yes
- Range: 1-5 inclusive
- 1 = Beginner/Easy
- 2 = Elementary
- 3 = Intermediate
- 4 = Advanced
- 5 = Expert/Very Hard

**Note Validation:**
- Type: String
- Required: No (defaults to empty string)
- Max Length: Unlimited (practical limit: 10,000 chars)
- Sanitization: XSS protection applied on display

**TimeStamp Validation:**
- Type: Date or null
- Required: No
- Auto-set: When topic marked as complete
- Format: ISO 8601 date-time string

### 5.4 Data Integrity Constraints

1. **Referential Integrity:**
   - userId → User._id (when user system implemented)
   - Enforced via Mongoose virtual population

2. **Domain Constraints:**
   - Difficulty ∈ {1, 2, 3, 4, 5}
   - marked ∈ {true, false}
   - title.length > 0

3. **Business Rules:**
   - Topic can only have timeStamp if marked = true
   - Roadmap must have at least one subject
   - Each subject must have at least one topic
   - Cannot mark topic without setting timeStamp

4. **Data Consistency:**
   - LocalStorage and MongoDB sync strategy
   - Cache invalidation on updates
   - Encryption/decryption consistency checks

---

## 6. Architecture Overview

### 6.1 System Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Browser)                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  React Components                                          │
│  ├── Page Components (/[q], /desk, /streak)               │
│  ├── UI Components (Button, Card, Tabs, etc.)             │
│  └── Business Logic Components                            │
│                                                            │
│  State Management                                          │
│  ├── useState (Local component state)                     │
│  ├── useEffect (Side effects & lifecycle)                 │
│  └── LocalStorage (Persistent cache)                      │
│                                                            │
│  Client Storage                                            │
│  └── LocalStorage (5-10MB)                                │
│      └── roadmap_{topic}: Encrypted JSON                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌────────────────────────────────────────────────────────────┐
│                    SERVER LAYER (Next.js)                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  API Routes                                                │
│  ├── /api/ai (POST) → Groq AI Integration                 │
│  ├── /api/roadmaps (GET) → Fetch roadmaps                 │
│  └── /api/roadmaps (POST) → Save roadmaps                 │
│                                                            │
│  Business Logic                                            │
│  ├── askAI() → AI prompt generation                       │
│  ├── connectToDatabase() → DB connection pooling          │
│  ├── encrypt/decrypt() → Data security                    │
│  └── Data normalization & validation                      │
│                                                            │
└────────────────────────────────────────────────────────────┘
                ↕                           ↕
    ┌───────────────────┐       ┌──────────────────┐
    │   External APIs   │       │   Database Layer │
    ├───────────────────┤       ├──────────────────┤
    │                   │       │                  │
    │  Groq AI API      │       │  MongoDB Atlas   │
    │  (LLaMA 3.1)      │       │                  │
    │                   │       │  Collections:    │
    │  - Model: llama   │       │  └── roadmaps    │
    │    -3.1-8b-instant│       │                  │
    │  - Multiple keys  │       │  Features:       │
    │  - Fallback logic │       │  ├── Indexing    │
    │                   │       │  ├── Aggregation │
    │                   │       │  └── Replication │
    │                   │       │                  │
    └───────────────────┘       └──────────────────┘
```

### 6.2 Data Flow Architecture

```
User Input
    ↓
[Client Component]
    ↓
[askAI utility]
    ↓
[/api/ai endpoint] ──→ [Groq AI API] ──→ [AI Response]
    ↓                                          ↓
[Parse JSON Response]                          ↓
    ↓                                          ↓
[Normalize Data Structure] ←───────────────────┘
    ↓
[Encrypt Data]
    ↓
┌───┴────┐
│        │
↓        ↓
[LocalStorage]  [Optional: MongoDB via /api/roadmaps]
```

### 6.3 Technology Stack

**Frontend:**
- Next.js 15.3.3 (React Framework)
- React 19.0.0
- TypeScript 5.x
- Tailwind CSS 4.x
- Radix UI (Component primitives)
- Motion (Animations)

**Backend:**
- Next.js API Routes
- Node.js Runtime
- Mongoose 8.19.1 (ODM)

**Database:**
- MongoDB (NoSQL)
- LocalStorage (Client-side)

**External Services:**
- Groq AI API (LLaMA 3.1)
- Multiple API key fallback system

**DevOps:**
- Next PWA (Progressive Web App)
- Vercel/Railway deployment ready
- Environment-based configuration

---

## 7. Security & Performance Considerations

### 7.1 Security Measures

1. **Data Encryption:**
   - LocalStorage data encrypted using Base64 + URI encoding
   - API keys stored in environment variables
   - No sensitive data in client code

2. **API Security:**
   - Multiple API key fallback
   - Rate limiting via Groq API
   - Error masking (no stack traces to client)

3. **Input Validation:**
   - Schema validation on MongoDB
   - Type checking via TypeScript
   - XSS protection on notes

### 7.2 Performance Optimizations

1. **Caching Strategy:**
   - Primary: LocalStorage (instant access)
   - Secondary: MongoDB (backup/sync)
   - No redundant API calls

2. **Database Indexing:**
   - title field indexed
   - Composite index on (title, userId)
   - createdAt indexed for sorting

3. **Code Splitting:**
   - Next.js automatic code splitting
   - Dynamic imports for large components
   - Lazy loading of roadmap data

4. **Progressive Enhancement:**
   - PWA for offline functionality
   - Service workers for caching
   - Optimistic UI updates

---

## 8. Future Enhancements

### Planned Schema Extensions

```typescript
// Future User Schema
interface User {
  _id: ObjectId;
  email: string;
  password: string;  // Hashed
  name: string;z
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    defaultDifficulty: 1 | 2 | 3 | 4 | 5;
  };
  streak: {
    current: number;
    longest: number;
    lastActivity: Date;
  };
  createdAt: Date;
}

// Enhanced Roadmap Schema
interface RoadmapEnhanced extends Roadmap {
  isPublic: boolean;
  tags: string[];
  category: string;
  estimatedHours: number;
  sharedWith: ObjectId[];
  likes: number;
  forks: number;
}
```

---

## Conclusion

This documentation provides a complete overview of the Roadmint system's data architecture, including all data flows, entity relationships, schema designs, and data models. The system is designed for scalability, with a hybrid storage approach (LocalStorage + MongoDB) and a flexible schema that can accommodate future enhancements.

**Key Strengths:**
- ✅ Offline-first architecture
- ✅ Flexible NoSQL schema
- ✅ Type-safe TypeScript implementation
- ✅ Scalable API design with fallback mechanisms
- ✅ Progressive Web App capabilities

**Current Limitations:**
- No multi-user authentication (planned)
- Limited data sync between devices
- No collaborative features yet

This system is production-ready and can scale to millions of roadmaps while maintaining fast performance through intelligent caching and indexing strategies.
