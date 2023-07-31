//Import Node packages and paths
const inquirer = require("inquirer")
const table = require("as-table")
const {menuPrompt,addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt} = require("./utils/prompts")
const db = require("./utils/connection")


//Views all departments in the database
const viewAllDepartments = async () => {
    const [departmentRows,_] = await db.promise().query(`SELECT * FROM department`)
    //Creates a table for departments in the terminal
    const departmentTable = table(departmentRows)
    console.log(`\n`)
    console.log(departmentTable)
    console.log(`\n`)
    //Takes you back to the main menu
    mainMenu()
}
//Views all roles in the database with id, title, department and salary as the columns
const viewAllRoles= async () => {
    const [roleRows,_] = await db.promise().query(
    `SELECT role.id, title, name AS department, salary
     FROM role 
     JOIN department ON role.department_id = department.id;`
    )
    //Creates a table for roles in the terminal
    const roleTable = table(roleRows)
    console.log(`\n`)
    console.log(roleTable)
    console.log(`\n`)
    //Takes you back to the main menu
    mainMenu()
}

const viewAllEmployees= async () => {
    const [employeeRows,_] = await db.promise().query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager 
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`)

    //Creates a table for employees in the terminal
    const employeeTable = table(employeeRows)
    console.log(`\n`)
    console.log(employeeTable)
    console.log(`\n`)
    //Takes you back to the main menu
    mainMenu()
}

//Adds a department in the database 
//It asks the user the name of the department
const addToDepartments = async () => {
    try {
        const {department_name} = await inquirer.prompt(addDepartmentPrompt)
        await db.promise().query(
        `INSERT INTO department (name) 
        VALUES ("${department_name}")`
        )
        //After adding a department, this will show you all the departments in the database
        viewAllDepartments()
        console.log(`Added ${department_name} to database`)
    } catch (error) {
        console.log(error)
    }
}

//Adds a role in the database
//It asks the user for the title, department it belongs to, and the salary
const addToRoles = async() => {
    try {
        const {role_title, role_department, role_salary} = await inquirer.prompt(addRolePrompt())
        await db.promise().query(
            `INSERT INTO role (title, salary, department_id) 
            VALUES ("${role_title}","${role_salary}","${role_department}");`)
        //After adding a role, this will show you all the roles in the database
        viewAllRoles()
        console.log(`Added ${role_title} to database`)
    } catch (error) {
        console.log(error)
    }
}

//Adds an employee to the database
//It asked for the first & last name of the employee, role and manager
const addEmployee = async() => {
    try {
        const {employee_firstName, employee_lastName, employee_role, employee_manager} = await inquirer.prompt(addEmployeePrompt())
        await db.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ("${employee_firstName}","${employee_lastName}","${employee_role}", "${employee_manager}");`)
        //After adding the employee, this will show you all the employees in the database
        viewAllEmployees()
        console.log(`Added ${employee_firstName} ${employee_lastName} to the database`)
    } catch (error) {
        console.log(error)
    }
}

//Updates a role for an employee existing in the database
// Ask for which employee and their new role
const updateEmployee = async() => {
    try {
        const {employee, employee_role} = await inquirer.prompt(updateEmployeePrompt())
        await db.promise().query(
            `UPDATE employee 
            SET role_id = "${employee_role}" 
            WHERE employee.id = "${employee}";`)
        //After updating the employee, this will show you all the employees in the database
        viewAllEmployees()
    } catch (error) {
        console.log(error)
    }
}

//Takes you the main menu and each option will take you to a different function
const mainMenu = async () =>{
    try {
        const {choices} = await inquirer.prompt(menuPrompt);
            if (choices === "ALL_DEPARTMENTS"){
                viewAllDepartments();
            }
            if (choices === "ALL_ROLES"){
                viewAllRoles();
            }
            if (choices === "ALL_EMPLOYEES"){
                viewAllEmployees();
            }
            if (choices === "ADD_DEPARTMENT"){
                addToDepartments();
            }
            if (choices === "ADD_ROLE"){
                addToRoles();
            }
            if (choices === "ADD_EMPLOYEE"){
                addEmployee();
            }
            if (choices === "UDPATE_EMPLOYEE"){
                updateEmployee();
            }
            if (choices === "EXIT"){
                db.end();
            }
        }catch(error) {
            console.log(error)
        }
    };

mainMenu()