DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT NOT NULL ,
  dept_name VARCHAR
    (30) NOT NULL,
  dept_manager VARCHAR
    (30) NOT NULL,
  primary key
    (id),
);

    CREATE TABLE roles
    (
        id INT NOT NULL
        AUTO_INCREMENT,
  roles VARCHAR
        (30) NOT NULL,
  dept_id INT NOT NULL
  primary key
        (id),
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
  emp_name VARCHAR
            (30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  primary key
            (id),
);

            INSERT INTO department
                (dept_name)
            VALUES
                ("Department");

            INSERT INTO roles
                (roles)
            VALUES
                ("Specific_Job");

            INSERT INTO employees
                (emp_name)
            VALUES
                ("Name");
