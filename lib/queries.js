// Import the database connection
const connection = require('./connection');
// Define queries object
const queries = {};
// Get departments, roles, employees 
queries.getAllDepartments = () => {
    return connection.promise().query('SELECT * FROM departments');
};

queries.getAllRoles = () => {
    return connection.promise().query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;');
};

queries.getAllEmployees = () => {
    return connection.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`);
};
// Add department, roles, employees
queries.addDepartment = (department) => {
    return connection.promise().query('INSERT INTO departments SET ?', department);
};

queries.addRole = (role) => {
    return connection.promise().query('INSERT INTO roles SET ?', role);
};

queries.addEmployee = (employee) => {
    return connection.promise().query('INSERT INTO employees SET ?', employee);
};
// Update an employee role 
queries.updateEmployeeRole = (employeeId, roleId) => {
    return connection.promise().query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
};

module.exports = queries;