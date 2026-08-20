# 🎓 CS Club Course Voting & Notification Platform

> A production-minded full-stack platform for a Computer Science engineering club to create course polls, collect one-vote-per-member decisions, calculate results, and automatically notify organizers when a poll closes.

<p align="center">

  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Joi-Validation-8A2BE2?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Resend-Email%20Delivery-000000?style=for-the-badge" />

</p>

---

## 🧠 What is this?

This project is more than a voting CRUD API.

It is a **domain-driven backend platform** built around a real problem from a Computer Science engineering community: deciding which course the club should organize next.

An administrator creates a poll with 3–4 course options. Members authenticate, discover the active poll, vote once, and later inspect their voting history. When the voting window ends, the platform calculates the results and creates a notification for the poll organizer. The notification subsystem then delivers the result through an email provider with retry, idempotency, and failure recovery mechanisms.

The project evolved deliberately from a learning REST API into a realistic application architecture.

The goal is not simply to make endpoints work.

The goal is to understand **how authentication, authorization, validation, data modeling, database performance, business rules, background processing, reliability, and external services fit together inside one backend system.**

---

# 🚀 Product Workflow

```text
                         ADMIN / EDITOR
                               │
                               ▼
                        Create course poll
                               │
                               ▼
                            Add options
                               │
                               ▼
                             Publish
                               │
                               ▼
                           SCHEDULED
                               │
                        startsAt is reached
                               ▼
                              OPEN
                               │
                     ┌─────────┴─────────┐
                     │                   │
                 Members vote       Admin monitors
                     │
                     ▼
               One vote / poll
                     │
                     │ endsAt is reached
                     ▼
                    CLOSED
                     │
              ┌──────┴──────┐
              ▼             ▼
        Aggregate results  Create notification
                              │
                              ▼
                           PENDING
                              │
                              ▼
                          PROCESSING
                              │
                     ┌────────┴────────┐
                     ▼                 ▼
                   SENT             FAILED
                                         │
                                    Retry / Recovery
                                         │
                                         ▼
                                      PROCESSING
```

---

# 🏗️ System Architecture

```text
┌───────────────────────────────────────────────────────────────────┐
│                         React Frontend                             │
│             Member UI / Admin Dashboard / Auth                    │
└───────────────────────────────┬───────────────────────────────────┘
                                │ HTTPS / REST
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                         Express API                                │
│                                                                   │
│  Middleware                                                       │
│  ├── CORS / Credentials                                           │
│  ├── JWT Authentication                                           │
│  ├── Role Authorization                                            │
│  ├── Joi Request Validation                                        │
│  └── Centralized Error Handling                                    │
│                                                                   │
│  Routes                                                           │
│      ↓                                                            │
│  Controllers                                                      │
│      ↓                                                            │
│  Services / Business Logic                                        │
│      ↓                                                            │
│  Mongoose Models                                                  │
└───────────────┬──────────────────────────────────┬────────────────┘
                │                                  │
                ▼                                  ▼
        ┌───────────────┐                  ┌─────────────────┐
        │ MongoDB Atlas │                  │ Notification    │
        │               │                  │ Providers       │
        │ Users         │                  │                 │
        │ Polls         │                  │ Email → Resend  │
        │ Options       │                  │ WhatsApp later  │
        │ Votes         │                  └─────────────────┘
        │ Notifications │
        └───────────────┘
```

### Application layers

```text
HTTP
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model / Database / Provider
```

The architecture intentionally separates **transport concerns**, **business rules**, **persistence**, and **external infrastructure**.

---

# 🔐 Authentication Flow

Authentication answers:

> **"Who are you?"**

The platform uses a short-lived access token and a longer-lived refresh token.

```text
                        LOGIN
                          │
                          ▼
                    Joi validation
                          │
                          ▼
                    Find User in DB
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
                     ┌────────────┴────────────┐
                     │                         │
                     ▼                         ▼
                Access Token            Refresh Token
                     │                         │
                     │                         ▼
                     │                  HttpOnly Cookie
                     │                         │
                     ▼                         ▼
                  Protected API          MongoDB persistence
```

### Access token

- Short-lived
- Sent with protected API requests
- Carries authenticated identity and roles

### Refresh token

- Longer-lived
- Stored in an HttpOnly cookie
- Persisted server-side
- Used to issue new access tokens
- Invalidated during logout

---

# 🛡️ Authorization & RBAC

Authentication and authorization are intentionally separate.

```text
Request
   │
   ▼
verifyJWT
   │
   ▼
Authenticated User
   │
   ▼
verifyRoles(...allowedRoles)
   │
   ▼
Protected Business Operation
```

Current roles:

```js
{
  User: 2001,
  Editor: 1984,
  Admin: 5150
}
```

---

# 🍪 Secure Session Handling

Refresh tokens are stored in an HttpOnly cookie.

```text
Browser
   │
   │ HttpOnly Cookie
   ▼
Express
   │
   ▼
Refresh-token validation
   │
   ▼
MongoDB
```

Logout performs two operations:

```text
Invalidate server-side refresh token
              +
Clear browser cookie
```

The project also separates access-token lifetime from refresh-token lifetime so protected requests do not depend on a long-lived access token.

---

# 🧩 Request Validation

The API uses **Joi schemas as an explicit request boundary**.

```text
Incoming Request
       │
       ▼
Joi schema
       │
   ┌───┴────┐
   │        │
 Invalid   Valid
   │        │
   ▼        ▼
  400    Controller
            │
            ▼
         Service
```

Validation covers authentication, poll creation/update, option management, voting, and query parameters.

The important design rule is:

> **Joi validates the request shape; services enforce business rules.**

For example, Joi can validate that `endsAt` is a date, while the service decides whether the poll's current lifecycle state allows that date to be changed.

---

# 🗄️ Data Model

The system models the business domain around independent entities rather than one giant document.

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Poll            Vote
 │               │
 │               ├──────► PollOption
 │               │
 └────► PollOption
```

### User

```text
_id
username
email
password
roles
refresh/session data
createdAt
updatedAt
```

### Poll

```text
_id
title
description
status
startsAt
endsAt
createdBy
createdAt
updatedAt
```

### PollOption

```text
_id
pollId
title
description
createdAt
updatedAt
```

### Vote

```text
_id
pollId
optionId
userId
createdAt
updatedAt
```

### Notification

```text
_id
pollId
recipientId
type
channel
status
attempts
lastAttemptAt
nextAttemptAt
processingStartedAt
sentAt
error
createdAt
updatedAt
```

---

# 🔗 Data Relationships

### Poll → User

A poll references the user who created it:

```text
Poll.createdBy → User._id
```

### Poll → PollOption

```text
Poll
 ├── PollOption
 ├── PollOption
 └── PollOption
```

### Vote → User / Poll / PollOption

```text
Vote
 ├── userId   → User
 ├── pollId   → Poll
 └── optionId → PollOption
```

This allows the system to keep growing relationships without duplicating large business objects across documents.

---

# 🗳️ Voting Integrity

One of the most important business rules is:

> **A member can vote only once in a given poll.**

The application checks for an existing vote, but the database also enforces the rule.

```js
voteSchema.index(
  {
    pollId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);
```

This creates a second line of defense against race conditions:

```text
Application check
       +
Database unique constraint
       ↓
One vote / member / poll
```

---

# 🔄 Poll Lifecycle

Polls are modeled as a state machine instead of a simple `isActive` flag.

```text
                 ┌──────────────┐
                 │    DRAFT     │
                 └──────┬───────┘
                        │ publish
                        ▼
                 ┌──────────────┐
                 │  SCHEDULED   │
                 └──────┬───────┘
                        │ startsAt
                        ▼
                 ┌──────────────┐
                 │     OPEN     │
                 └──────┬───────┘
                        │ endsAt
                        ▼
                 ┌──────────────┐
                 │    CLOSED    │
                 └──────────────┘

DRAFT / SCHEDULED / OPEN ─────► CANCELLED
```

Important domain rules include:

- Draft/scheduled polls can be edited.
- Open polls are locked against structural edits.
- Closed polls are immutable.
- Votes are accepted only while a poll is open and not expired.
- Publishing requires the configured number of choices.
- Cancellation does not delete historical votes.

---

# 📊 Results & MongoDB Aggregation

Results are not calculated by downloading every vote into Node.js.

MongoDB performs aggregation work close to the data.

```text
Poll Options
    │
    ▼
$lookup Votes
    │
    ▼
Count votes
    │
    ▼
Project result shape
    │
    ▼
Sort
    │
    ▼
Application calculates percentages / winner
```

The result layer handles:

- Total votes
- Vote counts per option
- Percentages
- Zero-vote options
- Winner detection
- Tie detection

An important product rule is preserved:

```text
Tie
 ↓
No arbitrary winner
```

---

# 📈 MongoDB Performance Engineering

The project deliberately goes beyond CRUD MongoDB usage.

### Indexing concepts practiced

- Single-field indexes
- Unique indexes
- Compound indexes
- Query-driven index design
- Prefix behavior of compound indexes
- Index trade-offs
- Notification worker indexes

### Query analysis

Queries are inspected using:

```js
.explain("executionStats")
```

The project has explicitly compared:

```text
COLLSCAN
   vs
IXSCAN + FETCH
```

and evaluated:

```text
nReturned
totalKeysExamined
totalDocsExamined
executionTimeMillis
winningPlan
```

The engineering principle is:

> **Indexes are designed from real query patterns and verified with measurements, not added blindly.**

---

# 🔔 Notification Architecture

The notification system was designed as an independent subsystem rather than putting email code inside poll controllers.

```text
Poll closes
    │
    ▼
Create Notification
    │
    ▼
PENDING
    │
    ▼
Notification Worker
    │
    ▼
Atomic Claim
    │
    ▼
PROCESSING
    │
    ├───────────────┐
    ▼               ▼
  SENT            FAILED
                     │
                     ▼
                nextAttemptAt
                     │
                     ▼
                   Retry
```

---

# ⚙️ Notification Reliability

The notification subsystem deliberately models delivery as a state machine:

```text
PENDING
   ↓
PROCESSING
   ↓
SENT
```

or:

```text
PENDING
   ↓
PROCESSING
   ↓
FAILED
   ↓
backoff
   ↓
PROCESSING
   ↓
SENT / FAILED
```

Implemented reliability concepts include:

- Atomic notification claiming
- Retry attempts
- Exponential backoff
- Jitter
- `nextAttemptAt`
- `processingStartedAt`
- Stuck-worker recovery
- Maximum-attempt protection
- Notification uniqueness constraints
- Provider idempotency

### Concurrency-safe claiming

Workers do not simply read a notification and assume ownership.

They atomically transition an eligible notification:

```text
FAILED / PENDING
        │
        │ findOneAndUpdate()
        ▼
   PROCESSING
```

If two workers race for the same notification:

```text
Worker A → PROCESSING ✅
Worker B → no match ❌
```

This prevents duplicate processing at the application layer.

---

# 📧 External Provider Isolation

The domain never directly depends on Resend.

```text
Notification Service
       │
       ▼
Email Provider Interface
       │
       ▼
Resend
```

The provider receives:

```text
to
subject
html
idempotencyKey
```

This makes the delivery infrastructure replaceable without rewriting poll, voting, or lifecycle logic.

A future WhatsApp channel can follow the same boundary:

```text
Notification Service
       ├── Email Provider
       └── WhatsApp Provider
```

---

# 🧱 API Architecture

The backend uses a layered REST design:

```text
HTTP Request
     │
     ▼
Route
     │
     ▼
Middleware
     │
     ├── Authentication
     ├── Authorization
     └── Validation
     │
     ▼
Controller
     │
     ▼
Service
     │
     ├── MongoDB / Mongoose
     ├── Aggregation
     └── External Provider
     │
     ▼
DTO / Response Contract
     │
     ▼
HTTP Response
```

Controllers stay focused on HTTP concerns while business rules live in services.

---

# 📡 API Surface

## Authentication

| Method | Endpoint                | Purpose                    | Access         |
| ------ | ----------------------- | -------------------------- | -------------- |
| `POST` | `/api/v1/auth/register` | Register member            | Public         |
| `POST` | `/api/v1/auth/login`    | Authenticate member        | Public         |
| `POST` | `/api/v1/auth/refresh`  | Issue new access token     | Refresh cookie |
| `POST` | `/api/v1/auth/logout`   | Invalidate refresh session | Authenticated  |

## Polls

| Method   | Endpoint                        | Purpose                     |
| -------- | ------------------------------- | --------------------------- | -------------- |
| `GET`    | `/api/v1/polls`                 | List polls                  | Admin / Editor |
| `GET`    | `/api/v1/polls/:pollId`         | Poll details                | Authenticated  |
| `POST`   | `/api/v1/polls`                 | Create poll                 | Admin / Editor |
| `PATCH`  | `/api/v1/polls/:pollId`         | Update draft/scheduled poll | Admin / Editor |
| `DELETE` | `/api/v1/polls/:pollId`         | Delete draft                | Admin / Editor |
| `POST`   | `/api/v1/polls/:pollId/cancel`  | Cancel poll                 | Admin / Editor |
| `POST`   | `/api/v1/polls/:pollId/publish` | Publish poll                | Admin / Editor |
| `POST`   | `/api/v1/polls/:pollId/close`   | Close open poll             | Admin / Editor |

## Poll Options

| Method   | Endpoint                                  | Purpose                     |
| -------- | ----------------------------------------- | --------------------------- | -------------- |
| `POST`   | `/api/v1/polls/:pollId/options`           | Add course option           | Admin / Editor |
| `PATCH`  | `/api/v1/polls/:pollId/options/:optionId` | Edit option where allowed   | Admin / Editor |
| `DELETE` | `/api/v1/polls/:pollId/options/:optionId` | Remove option where allowed | Admin / Editor |

## Member Voting

| Method | Endpoint                        | Purpose                 |
| ------ | ------------------------------- | ----------------------- | ------------- |
| `GET`  | `/api/v1/polls/active`          | Get current open poll   | Authenticated |
| `POST` | `/api/v1/polls/:pollId/votes`   | Cast vote               | Authenticated |
| `GET`  | `/api/v1/polls/:pollId/my-vote` | Get current user's vote | Authenticated |
| `GET`  | `/api/v1/polls/history`         | Voting history          | Authenticated |

## Results

| Method | Endpoint                        | Purpose                   |
| ------ | ------------------------------- | ------------------------- | ---------- |
| `GET`  | `/api/v1/polls/:pollId/results` | Calculate/display results | Authorized |

## Notifications

| Method | Endpoint                                | Purpose                 | Access |
| ------ | --------------------------------------- | ----------------------- | ------ |
| `GET`  | `/api/v1/notifications`                 | Notification operations | Admin  |
| `GET`  | `/api/v1/notifications/:notificationId` | Notification detail     | Admin  |

---

# 🧩 Project Structure

```text
src/
│
├── config/
│   ├── db.js
│   ├── cors.js
│   └── roles.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── poll.controller.js
│   ├── vote.controller.js
│   └── notification.controller.js
│
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   ├── validate.js
│   ├── errorHandler.js
│   └── logger.js
│
├── models/
│   ├── User.js
│   ├── Poll.js
│   ├── PollOption.js
│   ├── Vote.js
│   └── Notification.js
│
├── routes/
│   ├── auth.routes.js
│   ├── poll.routes.js
│   ├── vote.routes.js
│   └── notification.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── poll.service.js
│   ├── pollLifecycle.service.js
│   ├── pollResult.service.js
│   ├── vote.service.js
│   ├── notification.service.js
│   ├── notificationClaim.service.js
│   ├── notificationRetry.service.js
│   ├── notificationContent.service.js
│   └── providers/
│       └── email.provider.js
│
├── jobs/
│   ├── pollLifecycle.job.js
│   ├── notificationWorker.job.js
│   └── notificationRecovery.job.js
│
├── validation/
│   ├── auth.schemas.js
│   ├── poll.schemas.js
│   ├── vote.schemas.js
│   └── notification.schemas.js
│
├── utils/
│   ├── retryPolicy.js
│   ├── notificationConstants.js
│   ├── pollState.js
│   └── pollMapper.js
│
├── app.js
└── server.js
```

---

# 🛠️ Tech Stack

| Technology        | Purpose                              |
| ----------------- | ------------------------------------ |
| **Node.js**       | JavaScript runtime                   |
| **Express.js**    | HTTP server and REST API             |
| **MongoDB Atlas** | Persistent database                  |
| **Mongoose**      | MongoDB ODM                          |
| **JWT**           | Access / refresh authentication      |
| **bcrypt**        | Password hashing                     |
| **Joi**           | Request validation and normalization |
| **cookie-parser** | Cookie handling                      |
| **CORS**          | Cross-origin request control         |
| **dotenv**        | Environment configuration            |
| **Resend**        | Transactional email delivery         |

---

# 🧪 Verification Strategy

The product has been developed ticket-by-ticket with explicit acceptance criteria and manual API verification.

Examples of scenarios already exercised include:

```text
Authentication
├── Register
├── Login
├── Refresh
└── Logout

Authorization
├── Admin access
├── Editor access
└── Member restrictions

Voting
├── Valid vote
├── Duplicate vote
├── Invalid option
├── Wrong poll option
└── Expired poll

Poll lifecycle
├── DRAFT → SCHEDULED
├── SCHEDULED → OPEN
├── OPEN → CLOSED
└── Invalid transitions

Notifications
├── PENDING → PROCESSING → SENT
├── Provider failure
├── Retry
├── Maximum attempts
├── Atomic claim
└── Stuck PROCESSING recovery
```

Automated unit/integration testing is a planned next engineering phase; current manual verification is not presented as a substitute for a production test suite.

---

# 🔒 Security Practices Implemented

The platform intentionally practices multiple backend security concepts:

- Password hashing with bcrypt
- Short-lived access tokens
- Refresh-token authentication
- HttpOnly cookies
- Role-based authorization
- Protected routes
- Request validation with Joi
- Server-side ownership checks
- Database-level uniqueness constraints
- CORS configuration
- Environment-based secrets
- Token invalidation on logout
- Controlled response contracts
- No client-supplied identity for sensitive ownership operations

Further hardening is planned around rate limiting, security headers, CSRF considerations, NoSQL injection defense, auditing, and broader OWASP API review.

---

# 🧠 Engineering Concepts Practiced

## Node.js / Express

- Async programming
- Modules
- Middleware
- Routing
- Controllers
- Error middleware
- Cookies
- CORS
- Background jobs

## REST API Design

- Resource-oriented endpoints
- HTTP methods and status codes
- Route parameters
- Query parameters
- Request bodies
- Pagination
- Filtering
- Sorting
- Response contracts

## Authentication & Authorization

- Password hashing
- JWT
- Access / refresh token model
- HttpOnly cookies
- RBAC
- Ownership checks
- Protected resources

## MongoDB / Mongoose

- Schemas and models
- References
- `populate()`
- Aggregation pipelines
- Unique indexes
- Compound indexes
- Query-driven indexes
- `lean()`
- `explain()`
- `COLLSCAN` vs `IXSCAN`
- Database constraints

## Reliability Engineering

- State machines
- Background workers
- Atomic claims
- Race-condition prevention
- Retry policies
- Exponential backoff
- Jitter
- Idempotency
- Failure states
- Stuck-worker recovery

## Architecture

- Controllers vs services
- Provider abstraction
- DTO / mapper layer
- Domain rules
- Infrastructure isolation
- Separation of concerns

---

# 📈 Project Evolution

```text
┌───────────────────────────────┐
│ Basic Employee REST API       │
│ Express + JSON files          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ MongoDB + Mongoose             │
│ Persistent data model          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Authentication                │
│ JWT + bcrypt + cookies        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Authorization                 │
│ RBAC + protected operations   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Request Validation             │
│ Joi + reusable middleware      │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Query Engineering             │
│ Filtering + sorting + paging  │
│ Indexes + explain()            │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ CS Club Domain                │
│ Polls + options + votes       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Business State Machine        │
│ Draft → Scheduled → Open      │
│ → Closed / Cancelled          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Results & Aggregation          │
│ Counts + percentages + ties    │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Notification Subsystem         │
│ Provider + retries + recovery  │
└───────────────────────────────┘
```

---

# 🧭 Development Model

The application has been developed as an engineering exercise using small, explicit tickets rather than one large rewrite.

Each feature follows:

```text
Ticket
  ↓
Goal
  ↓
Acceptance Criteria
  ↓
Implementation
  ↓
Manual / API Verification
  ↓
Refactor
  ↓
Commit
```

This project intentionally separates:

```text
Feature complete
      ≠
Production hardened
```

The current backend is **production-oriented**, while automated testing, security hardening, containerization, CI/CD, deployment, observability, and scaling infrastructure remain planned engineering phases.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create `.env` from `.env.example`.

Example:

```env
PORT=3500

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender
```

⚠️ Never commit `.env` to Git.

## 4. Start development server

```bash
npm run dev
```

---

# 🤝 Engineering Philosophy

The central idea behind the project is simple:

> **A backend is not a collection of endpoints. It is a system of rules, boundaries, data, and failure-handling mechanisms.**

The project therefore focuses on understanding why features exist:

```text
Authentication
      ↓
Who is calling?

Authorization
      ↓
What are they allowed to do?

Validation
      ↓
Is the request acceptable?

Domain rules
      ↓
Is the operation valid now?

Database constraints
      ↓
Can the rule survive races and bugs?

Indexes
      ↓
Can the query scale?

Background processing
      ↓
Can work happen reliably outside HTTP?

Retries / idempotency
      ↓
What happens when infrastructure fails?
```

---

<p align="center">

### Built with Node.js • Express • MongoDB • Mongoose • JWT • Joi • Resend

</p>
