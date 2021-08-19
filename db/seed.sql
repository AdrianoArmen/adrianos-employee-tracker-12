-- seeds structure use employees;

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Steven', 'Hyde', 1, NULL),
    ('Donna', 'Pinciotti', 2, 1),
    ('Eric', 'Forman', 3, NULL),
    ('Fez', 'Chavez', 4, 3),
    ('Jackie', 'Burkhart', 5, NULL),
    ('Michael', 'Kelso', 6, 5),
    ('Red', 'Forman', 7, NULL),
    ('Leo', 'Hippy', 8, 7);

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Development'),
    ('Marketing'),
    ('HR');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 900000, 1),
    ('Salesperson', 85000, 1),
    ('Web Developer', 100000, 2),
    ('Software Engineer', 110000, 2),
    ('Account Manager', 70000, 3),
    ('Media Buyert', 80000, 3),
    ('Recruiter', 65000, 4),
    ('Staff Manager', 75000, 4);

