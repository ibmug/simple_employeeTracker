//Lets load dependencies
const inquirer = require('inquirer');
var mysql = require("mysql");



//Mysql Connection"
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "p0llock!",
    database: "employee_db"
  });
  
// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
 

//*
//View Employees, Add Employee, Remove Employee, Update Employee
//*
inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'option',
      choices: ["View Employees", "Add Employee","Update Employee","Update Employee"],
    },
  ])
  .then((response) =>{

    switch(response.option){
        case "View Employees":
            console.log(response.option)
            break;
        
        case "Add Employee":
            console.log(response.option)
            break;
        default:
            console.log("Incorrect option");
            break;
    }

 });


 function getEmployees(){
     //This guy gets the employees
 }

 function orderEmployees(){
     //this guy orders employees
 }

 function addEmployees(){
     //this guy adds an employee
 }

 function removeEmployee(){
     //this guy removes an employee
 }