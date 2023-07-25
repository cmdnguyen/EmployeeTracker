const mysql = require("mysql2");
const inquirer = require("inquirer")

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_db",
    },
    console.log("connected to the employee db")
);

function init(){
    inquirer.prompt([{
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
        ]
    }])
    .then((response) => {
        db.query
    }
    )
    .catch((error) => {
        console.error(error);
        console.log("\nOops! Something went wrong.")
    })
};

init()
