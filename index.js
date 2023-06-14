const inquirer = require('inquirer');
const { getAllDepartments, addDepartment } = require('./lib/department.js');
const { getAllRoles, addRole } = require('./lib/role.js');
const { getAllEmployees, addEmployee, updateRole } = require('./lib/employee.js');
const connection = require('./db/connection.js');
// Prompt the user with a list of options to choose from
function promptUser() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]);
}

// Call the appropriate function based on the user's choice
async function handleUserChoice() {
  const { action } = await promptUser();

  switch (action) {
    case 'View all departments':
      // Call the function to get all departments
      const departments = await getAllDepartments();
      console.table(departments);
      break;

    case 'View all roles':
      // Call the function to get all roles
      const roles = await getAllRoles();
      console.table(roles);
      break;

    case 'View all employees':
      // Call the function to get all employees
      const employees = await getAllEmployees();
      console.table(employees);
      break;

    case 'Add a department':
      // Prompt the user to enter the department name
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
      });
      // Call the function to add the department
      await addDepartment(name);
      console.log(`Department ${name} added successfully!`);
      break;

    case 'Add a role':
      // Prompt the user to enter the role details
      const roleData = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?'
        },
        {
          type: 'number',
          name: 'salary',
          message: 'What is the salary of the role?'
        },
        {
          type: 'number',
          name: 'department_id',
          message: 'What is the department id for the role?'
        }
      ]);
      // Call the function to add the role
      await addRole(roleData);
      console.log(`Role ${roleData.title} added successfully!`);
      break;

    case 'Add an employee':
      // Prompt the user to enter the employee details
      const employeeData = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is the first name of the employee?'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the last name of the employee?'
        },
        {
          type: 'number',
          name: 'role_id',
          message: 'What is the role id of the employee?'
        },
        {
          type: 'number',
          name: 'manager_id',
          message: 'What is the manager id of the employee?'
        }
      ]);
      // Call the function to add the employee
      await addEmployee(employeeData);
      console.log(`Employee ${employeeData.first_name} ${employeeData.last_name} added successfully!`);
      break;

      case 'Update an employee role':
        // Prompt the user to enter the employee id and role id
        const { employee_id, role_id } = await inquirer.prompt([
          {
            type: 'number',
            name: 'employee_id',
            message: "What is the employee's id?"
          },
          {
            type: 'number',
            name: 'role_id',
            message: "What is the employee's new role id?"
          }
        ]);
        // Call the function to update the employee's role
        await updateRole(employee_id, role_id);
        console.log(`Employee role updated successfully!`);
        break;
  
      case 'Exit':
        // Exit the application
        process.exit(0);
        break;
    }
    await handleUserChoice();
  } 
  
  // Call the function to start the application
    handleUserChoice();