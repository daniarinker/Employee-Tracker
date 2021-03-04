INSERT INTO department
    (name)
VALUES
    ("Marketing"),
    ("Admin"),
    ("Engineering"),
    ("Legal"),
    ("Sales");

INSERT INTO  role
    (title, salary, department_id)
VALUES
    ("Sales", "1000.00", "100"),
    ("Lead", "2000.00", "200"),
    ("Director", "5000.00", "300");

INSERT INTO  employee
    (first_name, last_name, role_id)
VALUES
    ("John", "Doe", "1"),
    ("Sarah", "Lourd", "2"),
    ("Kevin", "Tupik", "3");

INSERT INTO  manager
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Tom", "Allen", "4"),
    ("Malia", "Brown", "5"),
    ("Mike", "Chan", "6");