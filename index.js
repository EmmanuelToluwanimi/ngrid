const express = require('express');
const app = express();
const db = require('./db');
const redis = require('./redis');

app.use(express.json());

const x = {
  "data": [{ "emp_no": 10001, "first_name": "Georgi", "last_name": "Facello", "hire_date": "1986-06-26" }],
  "meta": { "page": 1, "limit": 10, "total": 300000 }
}
app.get('/employees', async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const offset = query.page ? (query.page - 1) * limit : 0;
  const employees = await db('employees').select('*').limit(limit).offset(offset);
  const employeesCount = await db('employees').count();

  const response = {
    data: employees,
    meta: {
      page: query.page || 1,
      limit: limit,
      total: employeesCount[0]['count(*)']
    }
  }

  redis.set('employees', employees, 30);
  res.status(200).json(response);
})

app.get('/employees:id', async (req, res) => {
  const id = req.params.id;
  const employee = await db('employees').where({ emp_no: id }).first();
  res.status(200).json(employee);
})

app.post('/employees', async (req, res) => {
  const x = {
    "first_name": "John",
    "last_name": "Doe",
    "gender": "M",
    "birth_date": "1990-01-01",
    "hire_date": "2020-06-01",
    "title": "Software Engineer",
    "salary": 65000
  };

  const emp_no = Date.now();

  const payload = { ...req.body, emp_no };
  if (!payload.first_name?.trim()) {
    res.status(404).json({ message: 'First name is required' });
    return
  } else if (!payload.last_name?.trim()) {
    res.status(404).json({ message: 'Last name is required' });
    return
  } else if (!payload.gender?.trim()) {
    res.status(404).json({ message: 'Last name is required' });
    return
  } else if (!payload.birth_date?.trim()) {
    res.status(404).json({ message: 'Last name is required' });
    return
  } else if (!payload.hire_date?.trim()) {
    res.status(404).json({ message: 'Last name is required' });
    return
  } else if (!payload.title?.trim()) {
    res.status(404).json({ message: 'Last name is required' });
    return
  } else if (!payload.salary) {
    res.status(404).json({ message: 'Salary is required' });
    return
  } else if (typeof (payload.salary) !== Number) {
    res.status(404).json({ message: 'Salary value must be a number' });
    return
  }

  // const newEmployee = await db('employees').insert(payload);
  // await db('salaries').insert({ emp_no: payload.emp_no, salary: payload.salary })
  // await db('titles').insert({ emp_no: payload.emp_no, title: payload.title })

  const from_date = payload.hire_date;
  const to_date = new Date();

  const data = await db.transaction(async (trx) => {
    const newEmp = await trx.insert(payload).into('employees');
    await db('salaries').insert({ emp_no: payload.emp_no, from_date, to_date, salary: payload.salary })
    await db('titles').insert({ emp_no: payload.emp_no, from_date, to_date, title: payload.title })
    return newEmp
  });
  res.status(201).json({ message: 'employee added successfully' });
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})