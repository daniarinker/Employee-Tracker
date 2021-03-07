const inquirer = require("inquirer");
const mysql = require("mysql");
const consoletable = require("console.table");
const chalk = require("chalk");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Potato23",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

function startApp() {
  inquirer
    .prompt({
      name: "addInfo",
      type: "list",
      message: "Welcome! How can we help?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Employee",
        "View Roles",
        "Update an Employee",
        "Delete an Employee",
        "Delete a Role",
        "Delete a Department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.addInfo) {
        case "Add Department":
          addDept();

          break;

        case "Add Role":
          addRole();

          break;

        case "Add Employee":
          addEmp();

          break;

        case "View Employee":
          viewEmp();

          break;

        case "View Roles":
          viewRole();

          break;
        case "View Department":
          viewDept();

          break;

        case "Update an Employee":
          updateEmp();

          break;

        case "Delete an Employee":
          deleteEmp();

          break;

        case "Delete a Role":
          deleteRole();

          break;

        case "Delete a Department":
          deleteDept();

          break;

        case "Exit":
          connection.end();

          break;
      }
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        name: "addDept",
        type: "input",
        message: "Which department are we adding?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.addDept,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen("Department created."));

          startApp();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What Role would you like to add?",
      },
      {
        name: "deptId",
        type: "input",
        message: "What is this Department ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID can only be numbers.";
          } else {
            return true;
          }
        },
      },
      {
        name: "salary",
        type: "input",
        message: "How much salary do they make?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "Salary can only be numbers.";
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.addRole,
          dept_id: answer.deptId,
          salary: answer.salary,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen("Role created."));

          startApp();
        }
      );
    });
}
function addEmp() {
  inquirer
    .prompt([
      {
        name: "addEmp",
        type: "input",
        message:
          "What is the first name of the Employee you would you like to add?",
      },
      {
        name: "addEmp2",
        type: "input",
        message:
          "What is the last name of the Employee you would you like to add?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the role ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID must only contain numbers.";
          } else {
            return true;
          }
        },
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the manager ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID must only contain numbers.";
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.addEmp,
          last_name: answer.addEmp2,
          role_id: answer.roleId,
          manager_id: answer.managerID,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen("Employee added."));

          startApp();
        }
      );
    });
}
function viewDept() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    console.log(chalk.black.bgGreen("Listing all departments."));
    startApp();
  });
}
function viewEmp() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    console.log(chalk.black.bgGreen("Listing all employees."));
    startApp();
  });
}
function viewRole() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    console.table(results);
    console.log(chalk.black.bgGreen("Listing all roles."));
    startApp();
  });
}

function updateEmp() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee;",
    function (err, res) {
      if (err) throw err;
      const empSelect = res.map((array) => {
        var object = {
          name: `${array.first_name} ${array.last_name}`,
          value: array.id,
        };
        return object;
      });
      inquirer
        .prompt({
          name: "update",
          type: "list",
          message: "Which employee are we updating?",
          choices: empSelect,
        })
        .then(function (response) {
          connection.query("SELECT id, title FROM roles;", function (err, res) {
            if (err) throw err;
            const empRole = res.map((array) => {
              var object = {
                name: array.title,
                value: array.id,
              };
              return object;
            });
            inquirer
              .prompt({
                name: "roleUpdate",
                type: "list",
                message: "What is the employees new role?",
                choices: empRole,
              })
              .then(function (answer) {
                let values = [answer.roleUpdate, response.update];
                connection.query(
                  "UPDATE employee SET role_id = ? WHERE id=?",
                  values,
                  function (err, res) {
                    if (err) throw err;

                    connection.query(
                      "SELECT * FROM employee WHERE id=?",
                      response.update,
                      function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log(chalk.black.bgGreen("Employee updated."));
                        startApp();
                      }
                    );
                  }
                );
              });
          });
        });
    }
  );
}

function deleteEmp() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee;",
    function (err, res) {
      if (err) throw err;
      const employeeChoice = res.map((array) => {
        var empList = {
          name: `${array.first_name} ${array.last_name}`,
          value: array.id,
        };
        return empList;
      });
      inquirer
        .prompt({
          name: "empDelete",
          type: "list",
          message: "Please select which employee you would like to delete",
          choices: employeeChoice,
        })
        .then(function (response) {
          connection.query(
            "DELETE FROM employee WHERE id=?;",
            [response.delete],
            function (err, res) {
              if (err) throw err;
              console.log(chalk.black.bgGreen("Employee deleted."));
              startApp();
            }
          );
        });
    }
  );
}

function deleteRole() {
  connection.query("SELECT id, title FROM roles;", function (err, res) {
    if (err) throw err;
    const roleChoice = res.map((array) => {
      var roleList = {
        name: `${array.title}`,
        value: array.id,
      };
      return roleList;
    });
    inquirer
      .prompt({
        name: "roleDelete",
        type: "list",
        message: "Please select what role you would like to delete",
        choices: roleChoice,
      })
      .then(function (response) {
        connection.query(
          "DELETE FROM roles WHERE id=?;",
          [response.delete],
          function (err, res) {
            if (err) throw err;
            console.log(chalk.black.bgGreen("Role Deleted."));
            startApp();
          }
        );
      });
  });
}

function deleteDept() {
  connection.query(
    "SELECT id, dept_name FROM department;",
    function (err, res) {
      if (err) throw err;
      const deptChoice = res.map((array) => {
        var deptList = {
          name: `${array.dept_name}`,
          value: array.id,
        };
        return deptList;
      });
      inquirer
        .prompt({
          name: "deptDelete",
          type: "list",
          message: "Please select what department you would like to delete",
          choices: deptChoice,
        })
        .then(function (response) {
          connection.query(
            "DELETE FROM department WHERE id=?;",
            [response.delete],
            function (err, res) {
              if (err) throw err;
              console.log(chalk.black.bgGreen("Department deleted."));
              startApp();
            }
          );
        });
    }
  );
}
