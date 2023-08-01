//Import path for database connection
const db = require("../config/connection")

//Prompts the main menu
const menuPrompt = [{
    type:"list",
    name:"choices",
    message:"What do you like to do?",
    choices: [ 
        {name:"View All Departments", value: "ALL_DEPARTMENTS"},
        {name:"View All Roles", value: "ALL_ROLES"},
        {name:"View All Employees", value: "ALL_EMPLOYEES"},
        {name:"Add a Department", value: "ADD_DEPARTMENT"},
        {name:"Add a Role", value: "ADD_ROLE"},
        {name:"Add an Employee", value: "ADD_EMPLOYEE"},
        {name:"Update an Employee Role", value: "UDPATE_EMPLOYEE"},
        {name: "Exit", value: "EXIT"}            
    ]
}]

//Question to add department
const addDepartmentPrompt = {
    type: "input",
    name: "department_name",
    message: "What is the name of the department?"
}

//Questions for adding roles
const addRolePrompt = (departmentChoices) => [{
    type: "input",
    name: "role_title",
    message: "What is the name of the role?",

},
//Shows the department names and takes the department id for the value
{
    type:"list",
    name:"role_department",
    message:"Which department will this role belong to?",
    choices: departmentChoices = async () => {
        const departmentQuery = `SELECT id AS value, name FROM department;`;
        const departments = await db.promise().query(departmentQuery);
        return departments[0];
        }
},
{
    type:"input",
    name: "role_salary",
    message:"What's the salary for this role?"
},
]

//Questions for adding employees
const addEmployeePrompt = (roleChoices, employeeManager) => [
    {
        type: "input",
        name: "employee_firstName",
        message: "What is the employee's first name?"
    },
    {
        type:"input",
        name:"employee_lastName",
        message: "What is the employee's last name?"
    },
    //Shows the role titles, takes the role id as the value
    {
        type: "list",
        name: "employee_role",
        message: "What is the employee's role?",
        choices: roleChoices = async () => {
            const roleQuery = `SELECT id AS value, title AS name FROM role;`;
            const roles = await db.promise().query(roleQuery);
            return roles[0];
            }
    },
    //Shows all employees to select as manager, takes the employee id as value
    {
        type: "list",
        name: "employee_manager",
        message: "Who is the employee's manager?",
        choices: employeeManager = async () => {
            const managerQuery = `SELECT id AS value, CONCAT(first_name,' ', last_name) AS name FROM employee;`;
            const manager = await db.promise().query(managerQuery);
            return manager[0];
            }
    }]

//Questions to update existing employee
const updateEmployeePrompt = (employeeChoice, roleChoices) => [
    //Asks which employee to update
    {
        type:"list",
        name:"employee",
        choices: employeeChoice = async () => {
            const employeeQuery = `SELECT id AS value, CONCAT(first_name,' ', last_name) AS name FROM employee`
            const employee = await db.promise().query(employeeQuery);
            return employee[0]
        }
    },
    //Asks for their new role
    {
        type: "list",
        name: "employee_role",
        message: "What is the employee's role?",
        choices: roleChoices = async () => {
            const roleQuery = `SELECT id AS value, title AS name FROM role;`;
            const roles = await db.promise().query(roleQuery);
            return roles[0];
            }
    }
]

module.exports = {menuPrompt,addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt}