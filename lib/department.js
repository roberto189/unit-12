// Import connection
const connection = require('../db/connection');
// Department class
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    // static method, get all departments
    static getAllDepartments() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM departments', (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const departments = res.map(({id, name}) => new Department(id, name));
                    resolve(departments);
                }
            });
        });
    }

    // static method, add a department
    static addDepartment(name) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO departments (name) VALUES (?)', [name], (err,res) => {
                if (err) {
                    reject(err);
                } else {
                    const newDepartment = new Department(res.insertId, name);
                    resolve(newDepartment);
                }
            });
        });
    }
}

module.exports = Department;