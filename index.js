const mysql = require("mysql2");
const inquirer = require("inquirer")
const {menuPrompt,addDepartmentPrompt, addRolePrompt} = require("./prompts")

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_db",
    },
    console.log("connected to the employee db")
);

const viewAllDepartments = async () => {
    const [departmentRows,_] = await db.promise().query("SELECT * FROM department")
    console.log(departmentRows)
    mainMenu()
}

const viewAllRoles= async () => {
    const [roleRows,_] = await db.promise().query("SELECT * FROM role")
    console.log(roleRows)
    mainMenu()
}

const addToDepartments = async () => {
    try {
        const {department_name} = await inquirer.prompt(addDepartmentPrompt)
        console.log("got my prompt")
        await db.promise().query(`INSERT INTO department (name) VALUES ("${department_name}")`)
        console.log("Inserted my new department")
        viewAllDepartments()   
    } catch (error) {
        console.log(error)
    }
}
//need to format each object with a name and value key

const addToRoles = async() => {
    try {
        const {role_name} = await inquirer.prompt(addRolePrompt())
        console.log("got my prompt")
        await db.promise().query(`INSERT INTO role (tile) VALUES ("${role_title}")`)
        console.log("Inserted my new role")
        viewAllRoles()
    } catch (error) {
        console.log(error)
    }
}

const mainMenu = async () =>{
    try {
        inquirer.prompt(menuPrompt)
    } catch (error) {
        console.log(error)
    }
};

// mainMenu()


addToRoles()