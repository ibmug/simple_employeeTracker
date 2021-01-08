//Lets load dependencies
const inquirer = require('inquirer');
var mysql = require("mysql");
const utils = require("utils");



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
function  menu(){

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ["View Employees", "Add Employee","Update Employee","Remove Employee"],
      },
    ])
    .then((response) =>{
  
      switch(response.option){
          case "View Employees":
              //getEmployees();
              showEmployees();
              break;
          
          case "Add Employee":
              addEmployees();
              break;
          default:
              console.log("Incorrect option");
              break;
      }
  
   });
}


const getEmployees = () => {
     //This guy gets the employees
    
     
    return new Promise ((resolve, reject)=>{
      connection.query("SELECT * FROM employee", (err,result)=>{
        if(err)reject(err);
        resolve(result);
      });
      
    });
 }


const showEmployees = () => {
  
  getEmployees().then((result)=>{
    for(var emp in result){
    //Get only the title.

    console.log(emp+1 + " "+ result[emp].first_name);
  }
  }).catch((err)=>{
    console.log(err);
  });

  

}


 function orderEmployees(){
     //this guy orders employees
 }

 function addEmployees(){

    let first_name;
    let last_name;
    let chosen_Role;
    let chosen_roleID = 0;

    let emp_roles = [];


    //Lets get all the roles so we can list them in inquirer.
    connection.query("SELECT * FROM emp_role", function(err, result) {
      if (err) throw err;
      //console.log(result);
      for(var res in result){
        //Get only the title.
        emp_roles[res] = result[res].title;
      }
  });

    inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the first name?',
      name: 'fname',
    },
    {
        type: 'input',
        message: 'What is the last name?',
        name: 'lname',
      },
      {
        type: 'list',
        message: 'Whats the employee role?',
        name: 'emp_role',
        choices: emp_roles,
      },
  ])
  .then((response) =>{
    first_name = response.fname;
    last_name = response.lname;
    chosen_Role = response.emp_role;
    for(x=0; x< emp_roles.length; x++){
      if(emp_roles[x] === chosen_Role)
      chosen_roleID = x+1;
    }
    
    //Lets create an insert statement here...
    var query = `INSERT INTO employee(first_name,last_name,role_id) values ("${first_name}","${last_name}","${chosen_roleID}")`
    console.log("Q: ", query)
connection.query(query, function(err, result) {
      if (err) throw err;
  });
     menu();
 });
}

 function removeEmployee(){
     //this guy removes an employee
    //We need to find the employee to delete.
    //We can ask for the user of the id...
    //For that we can display the id of the users(This can be done with display employees)
    getEmployees();
    inquirer
    .prompt([
      {
        type: 'number',
        message: 'Which employee ID would you like to delete?',
        name: 'employee',
      },
    ])
    .then((response) =>{
            //Nested Inquirer HAHAHA
            //Confirm and then continue.
            let employeeTODelete = response.employee;
            inquirer
              .prompt([
                {
                  type: 'list',
                  message: 'Are you sure you want to delete employee' + employeeTODelete+'?',
                  choices: ["Yes", "No"],
                  name: 'confirm',
                },
              ])
              .then((response) =>{

                //Perform delete code:
              //   var q = "DELETE FROM employee WHERE";

              //  connection.query(q, function(err, result) {
              //   if (err) throw err;

              //   for(var res in result){
              //     //Get only the title.
              //     emp_list[res] = result[res];
              //     console.log(res+1 + " "+ emp_list[res].first_name);
              //   }
              //   menu();

     });


     
  });
 }

 menu();