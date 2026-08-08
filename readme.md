# ⚡ Secure Employee Management API

> A production-minded REST API built with Node.js, Express, MongoDB, JWT authentication, refresh-token rotation, HttpOnly cookies, and role-based authorization.

<p align="center">

  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Bcrypt-Password%20Hashing-003B57?style=for-the-badge" />

</p>

---

## 🧠 What is this?

This project is more than a CRUD API.

It is a **secure backend system** designed to simulate the architecture and security concerns found in real-world REST APIs.

The project started as a simple Express API using JSON files and progressively evolved into a backend application with:

- 🔐 Authentication
- 🎟️ Access & refresh tokens
- 🍪 HttpOnly cookies
- 🛡️ Role-based authorization
- 🔑 Password hashing
- 🗄️ MongoDB persistence
- 🧩 Middleware architecture
- 🚨 Centralized error handling
- 📝 Request & error logging
- 🌐 CORS protection
- 🧱 Modular REST architecture

The goal was not simply to make endpoints work.

The goal was to understand **how the pieces of a backend system work together.**

---

# 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         │  HTML / JavaScript  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Express       │
                         │       Server        │
                         └──────────┬──────────┘
                                    │
                     ┌──────────────┼──────────────┐
                     │              │              │
                     ▼              ▼              ▼
                Middleware       Routes        Error Handler
                     │              │
                     ▼              ▼
              Authentication     Controllers
                     │              │
                     ▼              ▼
                JWT / RBAC       Mongoose
                                    │
                                    ▼
                              ┌─────────────┐
                              │  MongoDB    │
                              │    Atlas    │
                              └─────────────┘
```

---

# 🔐 Authentication Flow

The authentication system uses short-lived access tokens and longer-lived refresh tokens.

```text
                    LOGIN
                      │
                      ▼
              Validate credentials
                      │
                      ▼
               Find user in DB
                      │
                      ▼
             bcrypt password check
                      │
             ┌────────┴────────┐
             │                 │
          Invalid            Valid
             │                 │
             ▼                 ▼
            401          Generate JWTs
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
              Access Token         Refresh Token
                    │                     │
                    │                     ▼
                    │              HttpOnly Cookie
                    │
                    ▼
                 Client
```

### Why two tokens?

**Access token**

- Short lifetime
- Used to access protected resources
- Sent with API requests

**Refresh token**

- Longer lifetime
- Stored in an HttpOnly cookie
- Used to obtain a new access token
- Persisted server-side

This prevents the application from relying on a long-lived access token for every request.

---

# 🛡️ Authorization

Authentication answers:

> **"Who are you?"**

Authorization answers:

> **"What are you allowed to do?"**

The API uses role-based authorization.

```text
Request
   │
   ▼
verifyJWT
   │
   │  Is the JWT valid?
   ▼
Authenticated User
   │
   ▼
verifyRoles
   │
   │  Does the user have permission?
   ▼
Protected Controller
```

Example roles:

```js
{
  User: 2001,
  Editor: 1984,
  Admin: 5150
}
```

Protected routes can then require specific roles.

---

# 🍪 Refresh Tokens & Cookies

Refresh tokens are stored in an:

```text
HttpOnly
```

cookie.

This prevents JavaScript running in the browser from directly reading the refresh token.

The browser automatically sends the cookie when appropriate, while the API controls the refresh process.

```text
Browser
   │
   │ HttpOnly Cookie
   ▼
Express
   │
   ▼
MongoDB
   │
   ▼
Refresh Token Validation
```

Logout invalidates the refresh token in the database and clears the cookie.

---

# 🗄️ Data Layer

The project originally used JSON files for persistence.

It was intentionally migrated to MongoDB to understand the difference between:

```text
File-based persistence
        ↓
JSON + fs.writeFile()
```

and:

```text
Database persistence
        ↓
Mongoose
        ↓
MongoDB
```

Current architecture:

```text
Controller
    ↓
Mongoose Model
    ↓
MongoDB Atlas
```

### Main models

#### User

```text
username
password
roles
refreshToken
```

#### Employee

```text
firstname
lastname
email
department
salary
hireDate
isActive
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint    | Description                 | Access         |
| ------ | ----------- | --------------------------- | -------------- |
| `POST` | `/regUsers` | Register a new user         | Public         |
| `POST` | `/login`    | Authenticate user           | Public         |
| `GET`  | `/refresh`  | Generate a new access token | Refresh cookie |
| `GET`  | `/logout`   | Invalidate refresh token    | Public         |

---

## Employees

| Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `GET`    | `/employees`     | Get all employees |
| `GET`    | `/employees/:id` | Get one employee  |
| `POST`   | `/employees`     | Create employee   |
| `PUT`    | `/employees/:id` | Update employee   |
| `DELETE` | `/employees/:id` | Delete employee   |

Protected endpoints require a valid access token and appropriate role.

---

# 🧩 Middleware Architecture

Middleware is one of the main concepts practiced in this project.

```text
Incoming Request
       │
       ▼
     Logger
       │
       ▼
     CORS
       │
       ▼
  Body Parsers
       │
       ▼
  Authentication
       │
       ▼
  Authorization
       │
       ▼
     Route
       │
       ▼
   Controller
       │
       ▼
    Response
```

Important middleware includes:

- Request logger
- CORS
- Credentials handling
- JWT verification
- Role verification
- Centralized error handling

---

# 🛠️ Tech Stack

| Technology        | Purpose                      |
| ----------------- | ---------------------------- |
| **Node.js**       | JavaScript runtime           |
| **Express.js**    | HTTP server & REST API       |
| **MongoDB Atlas** | Database                     |
| **Mongoose**      | MongoDB ODM                  |
| **JWT**           | Authentication               |
| **bcrypt**        | Password hashing             |
| **cookie-parser** | Cookie handling              |
| **CORS**          | Cross-origin request control |
| **dotenv**        | Environment configuration    |
| **date-fns**      | Date formatting              |
| **UUID**          | Unique identifiers           |
| **Nodemon**       | Development workflow         |

---

# 📁 Project Structure

```text
├── config/
│   ├── corsOptions.js
│   ├── dbConn.js
│   └── rolesList.js
│
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
│   ├── refreshTokenController.js
│   └── logoutController.js
│
├── middleware/
│   ├── credentials.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── logEvent.js
│   ├── verifyJWT.js
│   └── verifyRoles.js
│
├── models/
│   ├── User.js
│   └── Employee.js
│
├── routes/
│   └── api/
│       ├── employees.js
│       ├── login.js
│       ├── logout.js
│       ├── refresh.js
│       └── register.js
│
├── logs/
│
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/M-Chlihi/express-management-rest-api.git
cd RESTEMPLOYEESAPI
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
PORT=3500

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

⚠️ **Never commit your `.env` file.**

Use `.env.example` as a template.

---

## 4. Start the development server

```bash
npm run dev
```

Server:

```text
http://localhost:3500
```

---

# 🧪 Testing

The API can be tested using tools such as:

- Thunder Client
- Postman
- Browser
- Frontend JavaScript `fetch()`

A simple authentication workflow:

```text
1. Register
      ↓
2. Login
      ↓
3. Receive access token
      ↓
4. Access protected endpoint
      ↓
5. Access token expires
      ↓
6. Refresh token
      ↓
7. Receive new access token
      ↓
8. Logout
      ↓
9. Refresh token invalidated
```

---

# 🔒 Security Practices Implemented

This project intentionally practices several backend security concepts:

- Password hashing with bcrypt
- JWT authentication
- Short-lived access tokens
- Refresh tokens
- HttpOnly cookies
- CORS configuration
- Role-based authorization
- Protected routes
- Environment variables
- Token invalidation on logout
- Centralized error handling
- Request logging
- Separation of authentication and authorization

---

# 💡 Engineering Concepts Practiced

### Node.js

- CommonJS modules
- Built-in modules
- `fs` / `fs/promises`
- Async programming
- Environment variables
- Event-driven architecture

### Express

- Routing
- Middleware
- Route handlers
- Chained handlers
- `req`, `res`, `next`
- Error-handling middleware
- CORS
- Cookies

### REST API

- HTTP methods
- Status codes
- Route parameters
- Request bodies
- Resource-oriented endpoints
- CRUD operations

### Authentication

- Password hashing
- JWT
- Access tokens
- Refresh tokens
- Cookies
- Authentication middleware

### Authorization

- Roles
- Permissions
- Protected routes
- Role-based middleware

### Database

- MongoDB
- MongoDB Atlas
- Mongoose
- Schemas
- Models
- CRUD operations
- Persistent data

---

# 📈 Project Evolution

```text
                     ┌─────────────────┐
                     │ Basic Express   │
                     │      API        │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ JSON Persistence │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ REST Controllers│
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Authentication  │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ JWT + Cookies   │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ RBAC / Roles    │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ MongoDB Atlas   │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │ Security +     │
                     │ Refactoring    │
                     └─────────────────┘
```

## ⭐ If you found this project useful

Feel free to explore the code, open an issue, or suggest improvements.

---

<p align="center">

### Built with Node.js • Express • MongoDB • Mongoose • JWT

</p>
