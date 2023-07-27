const inquirer = require("inquirer")
const {menuPrompt,addDepartmentPrompt, addRolePrompt, addEmployeePrompt} = require("./prompts")
const db = require("./dbConnection")


const viewAllDepartments = async () => {
    const [departmentRows,_] = await db.promise().query(`SELECT * FROM department`)
    console.log(departmentRows)
    mainMenu()
}

const viewAllRoles= async () => {
    const [roleRows,_] = await db.promise().query("SELECT * FROM role")
    console.log(roleRows)
    mainMenu()
}

const viewAllEmployees= async () => {
    const [employeeRows,_] = await db.promise().query("SELECT * FROM employee")
    console.log(employeeRows)
    mainMenu()
}

const addToDepartments = async () => {
    try {
        const {department_name} = await inquirer.prompt(addDepartmentPrompt)
        console.log("got my prompt")
        await db.promise().query(`INSERT INTO department (name) VALUES ("${department_name}")`)
        console.log(`added ${department_name} to database`)
        viewAllDepartments()   
    } catch (error) {
        console.log(error)
    }
}
//need to format each object with a name and value key

const addToRoles = async() => {
    try {
        const {role_title, role_department, role_salary} = await inquirer.prompt(addRolePrompt())
        await db.promise().query(`INSERT INTO role (title, salary) VALUES ("${role_title}","${role_salary}");`)
        console.log(`Inserted ${role_title} in the ${role_department} department with the salary of ${role_salary} into database`)
        viewAllRoles()
    } catch (error) {
        console.log(error)
    }
}

const addEmployee = async() => {
    try {
        const {employee_firstName, employee_lastName, employee_role, employee_manager} = await inquirer.prompt(addEmployeePrompt())
        await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)) VALUES ("${employee_firstName}","${employee_lastName}","${employee_role}", "${employee_manager}");`)
        console.log(`Added ${employee_firstName} ${employee_lastName} as ${employee_role} in the ${role_department} department under manager ${employee_manager}`)
        viewAllRoles()
    } catch (error) {
        console.log(error)
    }
}

const mainMenu = async () =>{
    try {
        const menuAnswer = await inquirer.prompt(menuPrompt)
            if (menuAnswer === "View All Departments"){
                viewAllDepartments();
            }
            if (menuAnswer === "Exit"){
                db.end
            }
        }catch (error) {
            console.log(error)
        }
    };

//mainMenu()


viewAllRoles()