import express, { Request,Response } from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import e from 'express';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get request to the root of the server
app.get('/api/department', (_req: Request, res: Response) => {
  pool.query('SELECT * FROM department', (err: any, result: QueryResult) : void => {
    if(err){
      res.status(500).json(err);
    }else{
    res.json(result.rows);
    }
});
});

app.get('/api/role', (_req: Request, res: Response) => {
    pool.query('SELECT role.id, title, name AS department, salary FROM role JOIN department ON role.department_id = department.id;', (err: any, result: QueryResult) : void => {
      if(err){
        res.status(500).json(err);
      }else{
      res.json(result.rows);
      }
  });
  });

  app.get('/api/employee', (_req: Request, res: Response) => {
    pool.query("SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id  JOIN employee AS manager ON employee.manager_id = manager.id;", (err: any, result: QueryResult) : void => {
      if(err){
        res.status(500).json(err);
      }else{
      res.json(result.rows);
      }
  });
  });

//Post request to add a department, role, or employee
app.post('/api/add-department', (req: Request, res: Response) => {
  const deparmentName = req.body.name;
  pool.query('INSERT INTO department (name) VALUES ($1)', [deparmentName], (err: any, result: QueryResult) : void => {
    if(err){
      res.status(500).json(err);
    }else{
    res.json(result.rows);
    }
});
});

app.post('/api/add-role', (req: Request, res: Response) => {
  const roleTitle = req.body.title;
  const roleSalary = req.body.salary;
  const roleDepartment = req.body.department;
  pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleTitle, roleSalary, roleDepartment], (err: any, result: QueryResult) : void => {
    if(err){
        res.status(500).json(err);
    }else{
      res.json(result.rows);
      }
});
});

app.post('/api/add-employee', (req: Request, res: Response) => {
  const employeeFirstName = req.body.first_name;
  const employeeLastName = req.body.last_name;
  const employeeRole = req.body.role;
  const employeeManager = req.body.manager;
  pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [employeeFirstName, employeeLastName, employeeRole, employeeManager], (err: any, result: QueryResult) : void => {
    if(err){
      res.status(500).json(err);
    }else{
    res.json(result.rows);
    }
});
});

//delete request to delete a department, role, or employee
app.delete('/api/department/:id', (req: Request, res: Response) => {
  const deleteId = req.params.id;
  pool.query('DELETE FROM department WHERE id = $1', [deleteId], (err: any, result: QueryResult) : void => {
    if(err){
      res.status(500).json(err);
    }
    if(result.rowCount){
      res.json("department deleted");
    }else{
    res.status(404).json("department not found"); 
    } 
});
});

app.delete('/api/role/:id', (req: Request, res: Response) => {
    const deleteId = req.params.id;
    pool.query('DELETE FROM role WHERE id = $1', [deleteId], (err: any, result: QueryResult) : void => {
      if(err){
        res.status(500).json(err);
      }
      if(result.rowCount){
        res.json("department deleted");
      }else{
      res.status(404).json("department not found"); 
      } 
});
});

app.delete('/api/employee/:id', (req: Request, res: Response) => {
    const deleteId = req.params.id;
    pool.query('DELETE FROM employee WHERE id = $1', [deleteId], (err: any, result: QueryResult) : void => {
      if(err){
        res.status(500).json(err);
      }
      if(result.rowCount){
        res.json("department deleted");
      }else{
      res.status(404).json("department not found"); 
      } 
});
});

//put request to update a department, role, or employee
app.put('/api/department/:id', (req: Request, res: Response) => {
  const updateId = req.params.id;
  const updateName = req.body.name;
  pool.query('UPDATE department SET name = $1 WHERE id = $2', [updateName, updateId], (err: any, result: QueryResult) : void => {
    if(err){
      res.status(500).json(err);
    }
    else if(result.rowCount){
      res.json("department updated");
    }else{
    res.status(404).json("department not found"); 
    } 
});
});

app.put('/api/role/:id', (req: Request, res: Response) => {
    const updateId = req.params.id;
    const updateTitle = req.body.title;
    const updateSalary = req.body.salary;
    const updateDepartment = req.body.department;
    pool.query('UPDATE role SET title = $1, salary = $2, department_id = $3 WHERE id = $4', [updateTitle, updateSalary, updateDepartment, updateId], (err: any, result: QueryResult) : void => {
      if(err){
        res.status(500).json(err);
      }
      else if(result.rowCount){
        res.json("role updated");
      }else{
      res.status(404).json("role not found"); 
      } 
  });
  });

  app.put('/api/employee/:id', (req: Request, res: Response) => {
    const updateId = req.params.id;
    const updateFirstName = req.body.first_name;
    const updateLastName = req.body.last_name;
    const updateRole = req.body.role;
    const updateManager = req.body.manager;
    pool.query('UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5', [updateFirstName, updateLastName, updateRole, updateManager, updateId], (err: any, result: QueryResult) : void => {
        if(err){
            res.status(500).json(err);
        }
        else if(result.rowCount){
            res.json("employee updated");
        }else{
        res.status(404).json("employee not found"); 
        }
    }
    );
  });

  app.put('/api/employee/:id', (req: Request, res: Response) => {
    const updateId = req.params.id;
    const updateFirstName = req.body.first_name;
    const updateLastName = req.body.last_name;
    const updateRole = req.body.role;
    const updateManager = req.body.manager;
    pool.query('UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5', [updateFirstName, updateLastName, updateRole, updateManager, updateId], (err: any, result: QueryResult) : void => {
      if(err){
        res.status(500).json(err);
      }
      else if(result.rowCount){
        res.json("employee updated");
      }else{
      res.status(404).json("employee not found"); 
      } 
  });
  });

app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
