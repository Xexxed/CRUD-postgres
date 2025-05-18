export const createRoleQuery = `   
 CREATE TYPE role_type AS ENUM (
    'Manager',
    'Developer',
    
    'Sales',
    'HR',
    'Intern'
);
`;

export const createEmployeeTableQuery = `
CREATE TABLE IF NOT EXISTS public.employee_details (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    age SMALLINT NOT NULL CHECK (age > 17),
    role role_type NOT NULL DEFAULT 'Intern',
    salary DECIMAL(10, 2) NOT NULL
);
`;

export const getAllEmployeesQuery = `
SELECT * FROM employee_details;
`;

export const createEmployeeQuery = `
INSERT INTO employee_details (name, email, age, role, salary)
VALUES ($1, $2, $3, COALESCE($4::role_type,'Intern'::role_type), $5)
RETURNING *;
`;

export const getEmployeeByIdQuery = `
SELECT * FROM employee_details WHERE id = $1;
`;

export const deleteEmployeeQuery = `
DELETE FROM employee_details WHERE id = $1 RETURNING *;
`;

export const updateEmployeeQuery = `
UPDATE employee_details
SET name = COALESCE($1, name),
    email = COALESCE($2, email),
    age = COALESCE($3, age),
    role = COALESCE($4::role_type, role),
    salary = COALESCE($5, salary)
WHERE id = $6
RETURNING *;
`;
