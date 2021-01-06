--This SQL should be run only once.
--Drop the DB if it exists.

--Create the DB
CREATE DATABASE employee_db;

--Use this db for the rest of the script
USE employee_db;

--Lets create the tables:
--Department

CREATE TABLE department(
    department_id int AUTO_INCREMENT NOT NULL,
    name varchar(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE role(
    role_id int AUTO_INCREMENT NOT NULL,
    title varchar(30),
    salary DECIMAL(6,2),
    department_id int NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id),
    PRIMARY KEY(role_id)
);

CREATE TABLE employee(
    emp_id int AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int NOT NULL,
    FOREIGN KEY(role_id) INT REFERENCES role(role_id),
    manager_id INT reference employee(emp_id), -- this can be null.
    PRIMARY KEY(emp_id)
);