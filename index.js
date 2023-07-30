const inquirer = require("inquirer")
const {menuPrompt,addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt} = require("./utils/prompts")
const db = require("./utils/connection")


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
        await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${role_title}","${role_salary}","${role_department}");`)
        viewAllRoles()
    } catch (error) {
        console.log(error)
    }
}

const addEmployee = async() => {
    try {
        const {employee_firstName, employee_lastName, employee_role, employee_manager} = await inquirer.prompt(addEmployeePrompt())
        await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee_firstName}","${employee_lastName}","${employee_role}", "${employee_manager}");`)
        console.log(`Added ${employee_firstName} ${employee_lastName} as ${employee_role} under manager ${employee_manager}`)
        viewAllEmployees()
    } catch (error) {
        console.log(error)
    }
}

// const updateEmployee = async() => {
//     try {
//         const {employee, employee_role} = await inquirer.prompt(updateEmployeePrompt())
//         await db.promise.query(`UDPATE employee SET`)
//         viewAllEmployees()
//     } catch (error) {
//         console.log(error)
//     }
// }

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

// viewAllEmployees()

// addEmployee()