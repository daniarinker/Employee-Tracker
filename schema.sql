DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT NOT NULL ,
        dept_name VARCHAR
    (30) NOT NULL,
        primary key
    (id)
);

    CREATE TABLE roles
    (
        id INT NOT NULL
        AUTO_INCREMENT,
        title VARCHAR
        (30) NOT NULL,
        salary DECIMAL
        (10, 2) NOT NULL,
        dept_id INT,
        primary key
        (id),
        FOREIGN KEY
        (dept_id)
            REFERENCES department
        (id)
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
        first_name VARCHAR
            (30) NOT NULL,
        last_name VARCHAR
            (30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT,
        primary key
            (id), 
        FOREIGN KEY
            (role_id) REFERENCES roles
            (id),
        FOREIGN KEY
            (manager_id)
            REFERENCES employee
            (id)
);