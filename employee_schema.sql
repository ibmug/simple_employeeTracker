DROP DATABASE employee_db;
CREATE DATABASE employee_db;


USE employee_db;


CREATE TABLE department(
    department_id int AUTO_INCREMENT NOT NULL,
    name varchar(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE emp_role(
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
    FOREIGN KEY(role_id) REFERENCES emp_role(role_id),
    manager_id INT REFERENCES employee(emp_id), -- this can be null.
    PRIMARY KEY(emp_id)
);



-- Inserted a set of records into the table
INSERT INTO department (name)
VALUES ("Corporate");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Support");

select * FROM department;

UPDATE department
set name = "Support"
where department_id =3;

INSERT INTO role (title,salary)
VALUES ("Manager", 25, 3);

INSERT INTO role (title,salary)
VALUES ("CEO", 50, 0);

INSERT INTO role (title,salary)
VALUES ("Employee", 10, 3);