-- Active: 1740443663810@@127.0.0.1@5432@deparment_db
DROP DATABASE IF EXISTS department_db;
CREATE DATABASE deparment_db;

\c department_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id)
  FOREIGN KEY (manager_id) REFERENCES employee(id)
  ON DELETE SET NULL
);

SELECT role.id, title, name AS department, salary FROM role JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id  JOIN employee AS manager ON employee.manager_id = manager.id;