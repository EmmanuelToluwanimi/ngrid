# Employee Management API

This is a **Node.js** backend application using **Express.js**, **Knex.js (MySQL)**, and **Redis** for caching.

## 🚀 Features
- **GET /employees** - Fetch paginated employee data with Redis caching (30s expiration).
- **GET /employees/:id** - Retrieve full employee details including title and salary.
- **POST /employees** - Add a new employee with validation and transactional database insertion.

## 🛠 Technologies
- Node.js
- Express.js
- Knex.js (MySQL)
- Redis
- dotenv (Environment Variables)

## ⚙️ Setup Instructions
### 1️⃣ Clone the repository

git clone <https://github.com/EmmanuelToluwanimi/ngrid.git>

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Configure db variables
Open the db.js file and update the configs:

```
host
port
user
password
database
```


### 5️⃣ Run the server
```
node index.js
```

## 📖 API Endpoints

### 🔹 GET /employees
Fetch paginated employees (default: 10 per page).

**Example Request:**
```sh
GET /employees?page=1&limit=10
```

### 🔹 GET /employees/:id
Retrieve an employee’s full details.

**Example Request:**
```sh
GET /employees/10001
```

### 🔹 POST /employees
Add a new employee.

**Example Request:**
```
POST /employees
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "gender": "M",
  "birth_date": "1990-01-01",
  "hire_date": "2020-06-01",
  "title": "Software Engineer",
  "salary": 65000
}
```