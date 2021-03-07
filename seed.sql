INSERT INTO department
    (dept_name)
VALUES
    ("Marketing"),
    ("Admin"),
    ("Engineering"),
    ("Legal"),
    ("Sales");

INSERT INTO  roles
    (title, salary, dept_id)
VALUES
    ("Sales", "1000.00", "1"),
    ("Lead", "2000.00", "2"),
    ("Supervisor", "5000.00", "3");

INSERT INTO  employee
    (first_name, last_name, role_id)
VALUES
    ("John", "Doe", "1"),
    ("Sarah", "Lourd", "2"),
    ("Kevin", "Tupik", "3");

INSERT INTO  employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Tom", "Allen", "1", "1"),
    ("Malia", "Brown", "1", "2"),
    ("Mike", "Chan", "1", "3");
