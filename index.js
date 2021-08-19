// app functionality
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
const logo = require("asciiart-logo");

init();

// ASCII character generated logo by dependency
function init() {
  const mainLogo = logo({ name: "Employee Tracker" }).render();

  console.log(mainLogo);

  displayPrompt();
}

async function displayPrompt() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  // switch cases  to trigger functions depending on prompt selection
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();

    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();

    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();

    case "ADD_EMPLOYEE":
      return addEmployee();

    case "REMOVE_EMPLOYEE":
      return removeEmployee();

    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();

    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();

    case "VIEW_DEPARTMENTS":
      return viewDepartments();

    case "ADD_DEPARTMENT":
      return addDepartment();

    case "REMOVE_DEPARTMENT":
      return removeDepartment();

    case "VIEW_ROLES":
      return viewRoles();

    case "ADD_ROLE":
      return addRole();

    case "REMOVE_ROLE":
      return removeRole();

    default:
      return quit();
  }
}



// functions depending on previous switch case choice
async function viewEmployees() {
    const employees = await db.findAllEmployees();
  
    console.log("\n");
    console.table(employees);
  
    loadMainPrompts();
  }
  
  async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department employee's do you want to view?",
        choices: departmentChoices
      }
    ]);
  
    const employees = await db.findAllEmployeesByDepartment(departmentId);
  
    console.log("\n");
    console.table(employees);
  
    loadMainPrompts();
  }
  
  async function viewEmployeesByManager() {
    const managers = await db.findAllEmployees();
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which manager's team of employees do you want to view?",
        choices: managerChoices
      }
    ]);
  
    const employees = await db.findAllEmployeesByManager(managerId);
  
    console.log("\n");
  
    if (employees.length === 0) {
      console.log("This employee does not manage a team");
    } else {
      console.table(employees);
    }
  
    loadMainPrompts();
  }
  
  async function removeEmployee() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ]);
  
    await db.removeEmployee(employeeId);
  
    console.log("Employee removed");
  
    loadMainPrompts();
  }
  
  async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Wich role will this employee have? ",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Employee's role updated");
  
    loadMainPrompts();
  }
  
  async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const managers = await db.findAllPossibleManagers(employeeId);
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Which manager do you want to select for this employee?",
        choices: managerChoices
      }
    ]);
  
    await db.updateEmployeeManager(employeeId, managerId);
  
    console.log("Employee's manager updated");
  
    loadMainPrompts();
  }
  
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    loadMainPrompts();
  }
  
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "Role´s Name:"
      },
      {
        name: "salary",
        message: "Role´s Salary"
      },
      {
        type: "list",
        name: "department_id",
        message: "Role's Department:",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    loadMainPrompts();
  }
  
  async function removeRole() {
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role do you want to remove? (Warning: This will also remove employees)",
        choices: roleChoices
      }
    ]);
  
    await db.removeRole(roleId);
  
    console.log("Role removed");
  
    loadMainPrompts();
  }
  
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    loadMainPrompts();
  }
  
  async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "Department's Name:"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    loadMainPrompts();
  }
  
  async function removeDepartment() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
      choices: departmentChoices
    });
  
    await db.removeDepartment(departmentId);
  
    console.log(`Department removed`);
  
    loadMainPrompts();
  }
  
  async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "Employee´s First Name:"
      },
      {
        name: "last_name",
        message: "Employee's Last Name:"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "Employee's Role:",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Employee´s Manager:",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    loadMainPrompts();
  }
  
  function quit() {
    console.log("Team Completed");
    process.exit();
  }