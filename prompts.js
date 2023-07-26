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
    ]
}]

const addDepartmentPrompt = {
    type: "input",
    name: "department_name",
    message: "What's it gonna be?"
}

const addRolePrompt = (departmentChoices) => [{
    type: "input",
    name: "role_title",
    message: "What's it gonna be?",

},
{
    type:"list",
    name:"role_department",
    message:"Which department will this role belong to?",
    choices: departmentChoices
},
{
    type:"input",
    name: "role_salary",
    message:"What's the salary for this role?"
},
]

const addEmployeePrompt = (roleChoice, employeeManager) => [
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
    {
        type: "list",
        name: "employee_role",
        message: "What is the employee's role?",
        choices: roleChoices
    },
    {
        type: "list",
        name: "employee_Manager",
        message: "Who is the employee's manager?",
        choices: employeeManager
    }

]

module.exports = {menuPrompt,addDepartmentPrompt, addRolePrompt, addEmployeePrompt}