// Import connection
const connection = require('../db/connection');
// Role class
class Role {
    constructor({id, title, salary, department_id}) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
    // Static method, get all roles
    static getAllRoles() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM roles', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const roles = rows.map((row) => new Role(row));
                    resolve(roles);
                }
            });
        });
    }
    // Static method, get role by id
    static getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM roles WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows.length ===0) {
                    resolve(null);
                } else {
                    const role = new Role(rows[0]);
                    resolve(role);
                }
            });
        });
    }
    // Static method, get roles by department id
    static getByDepartment(departmentId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM roles WHERE department_id = ?', [departmentId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const roles = rows.map((row) => new Role(row));
                    resolve(rows);
                }
            });
        });
    }
    // static method, add a role
    static addRole(title, salary, departmentId) {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, departmentId], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const newRole = new Role({ id: res.insertId, title: title, salary: salary, department_id: departmentId });
                    resolve(newRole);
                }
            });
        });
    }
    
    // Update function
    static updateRole() {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ?', [this.title, this.salary, this.department_id, this.id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
}
module.exports = Role;