// Import connection
const connection = require('../db/connection');
// Employee class
class Employee {
    constructor({id, first_name, last_name, role_id, manager_id}) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    // Static method, get all employees
    static getAllEmployees() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employees', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const employees = rows.map((row) => new Employee (row));
                    resolve(employees);
                }
            });
        });
    }
    // Static method, get employee id
    static getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows.length === 0) {
                    resolve(null);
                } else {
                    const employee = new Employee(rows[0]);
                    resolve(employee);
                }
            });
        });
    }
    // Static method, get employee role id
    static getByRole(roleId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employees WHERE role_id = ?', [roleId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                  const employees = row.map((row) => new Employee(row));
                  resolve(employees);  
                }
            });
        });
    }
    // Static method, get employee manager id
    static getByManager(managerId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employees WHERE manager_id = ?', [managerId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const employees = rows.map((row) => new Employee(row));
                    resolve(employees);
                }
            });
        });
    }
    // Static method, add employee
    static addEmployee(employee) {
        return new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [employee.first_name, employee.last_name, employee.role_id, employee.manager_id],
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                const newEmployee = new Employee({
                  id: res.insertId,
                  first_name: employee.first_name,
                  last_name: employee.last_name,
                  role_id: employee.role_id,
                  manager_id: employee.manager_id
                });
                resolve(newEmployee);
              }
            }
          );
        });
      }
      
    // static method, update employee's role
    static updateRole(employeeId, roleId) {
        return new Promise((resolve, reject) => {
        connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, result) => {
            if (err) {
            reject(err);
            } else {
            resolve(result);
            }
        });
        });
    }
    
}
module.exports = Employee;