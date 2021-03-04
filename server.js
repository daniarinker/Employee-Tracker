const inquirer = require("inquirer");
const mysql = require("mysql");
const consoletable = require("console.table");

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
      message: "Welcome! What can we do here?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Employee",
        "View Roles",
        "Update an Employee",
        "Delete Info",
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

        case "Update Employee":
          updateEmp();

          break;

        case "Delete Data":
          DeleteData();

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
      {
        name: "deptManager",
        type: "input",
        message: "Who is the manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.addDept,
          dept_manager: answer.deptManager,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen("Department created."));

          startAppApp();
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
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          roles: answer.addRole,
          dept_id: answer.deptId,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen("Role created."));

          startAppApp();
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
        message: "What Employee would you like to add?",
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
        "INSERT INTO employees SET ?",
        {
          full_name: answer.addEmp,
          role_id: answer.roleId,
          manager_id: answer.managerID,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen("Employee added."));

          startAppApp();
        }
      );
    });
}
function viewDept() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}
function viewEmp() {
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}
function viewRole() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}
function updateEmp() {
  connection.query("SELECT * FROM employees", function (err, employees) {
    if (err) throw err;
    connection.query("SELECT * FROM roles", function (err, roles) {
      if (err) throw err;
      const employeeChoices = employees.map((emp) => ({
        name: emp.full_name,
        value: emp,
      }));
      const rolesChoices = roles.map((role) => ({
        name: role.roles,
        value: role,
      }));
      inquirer
        .prompt([
          {
            name: "updateEmp",
            type: "list",
            message: "Which Employee ID would you like to update?",
            choices: employeeChoices,
          },
          {
            name: "updateRole",
            type: "list",
            message: "What is the new role?",
            choices: rolesChoices,
          },
        ])
        .then(function (answer) {
          connection.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [answer.updateRole.id, answer.updateEmp.id],
            function (err) {
              if (err) throw err;
              console.log(chalk.black.bgGreen("Employee updated."));
              startApp();
            }
          );
        });
    });
  });
}
function deleteData() {
  inquirer
    .prompt([
      {
        name: "deleteTable",
        type: "list",
        message: "What information would you like to delete?",
        choices: ["employees", "roles", "department"],
      },
    ])
    .then(function (answer) {
      console.log(answer);
      connection.query(
        "SELECT * FROM ?",
        [answer.deleteTable],
        function (err, results) {
          if (err) throw err;
          const deleteChoices = results.map((record) => ({
            name: record.full_name || record.dept_name || record.roles,
            value: record.id,
          }));
          inquirer
            .prompt([
              {
                name: "deleteRecord",
                type: "list",
                message: "Which record would you like to delete?",
                choices: deleteChoices,
              },
            ])
            .then(({ deleteRecord }) => {
              connection.query(
                "DELETE FROM ? WHERE id = ?",
                [answer.deleteTable, deleteRecord],
                function (err, deleteResults) {
                  if (err) throw err;

                  console.log("Information deleted.");
                  startApp();
                }
              );
            });
        }
      );
    });
}
