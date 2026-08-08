# Employee Management REST API

A RESTful API built with **Node.js** and **Express.js** to manage employee records.  
This project demonstrates backend fundamentals including routing, controllers, middleware, CRUD operations, and REST API design.

---

## Features

- Get all employees
- Get employee by ID
- Create a new employee
- Update employee information
- Delete an employee
- Custom logger middleware
- Centralized error handling
- CORS configuration
- Environment variable support

---

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES6)
- CORS
- dotenv

---

## Project Structure

```
employee-rest-api/
│
├── config/
├── controllers/
├── data/
├── middleware/
├── routes/
│   └── api/
├── utils/
├── server.js
└── package.json
```

---

## API Endpoints

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/employees`     | Get all employees  |
| GET    | `/employees/:id` | Get employee by ID |
| POST   | `/employees`     | Create employee    |
| PUT    | `/employees/:id` | Update employee    |
| DELETE | `/employees/:id` | Delete employee    |

---

## Installation

```bash
git clone https://github.com/your-username/employee-management-rest-api.git

cd employee-management-rest-api

npm install

npm start
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=3500
```

---

## Future Improvements

- JSON file persistence
- MongoDB integration
- JWT Authentication
- Role-Based Authorization
- Input Validation
- Unit & Integration Testing

---

## Author

**MAHY**

