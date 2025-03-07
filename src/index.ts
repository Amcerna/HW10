import inquirer from "inquirer";

function startApp(): void {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View all employees', 'View all roles', 'View all departments', 'Add employee', 'Add role', 'Add department', 'Update employee role', 'Exit'],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Exit':
                    exit();
                    break;
            }
        });
}
function viewAllEmployees(): void {
    fetch('/api/employee')
        .then((response) => response.json())
        .then((data) => console.log(data));
        startApp()
}
function viewAllRoles(): void {
    fetch('/api/role')
        .then((response) => response.json())
        .then((data) => console.log(data));
        startApp()
}
function viewAllDepartments(): void {
    fetch('/api/department')
        .then((response) => response.json())
        .then((data) => console.log(data));
        startApp()
}
function addEmployee(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employee first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employee last name:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter employee role id:',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter employee manager id:',
            },
        ])
        .then((answers) => {
            fetch('/api/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
        });
        startApp();
    }
function addRole(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter role title:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter role salary:',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter role department id:',
            },
        ])
        .then((answers) => {
            fetch('/api/role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
        });
        startApp()
}
function addDepartment(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter department name:',
            },
        ])
        .then((answers) => {
            fetch('/api/department', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
        });
        startApp()
}
function updateEmployeeRole(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter employee id:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter new role id:',
            },
        ])
        .then((answers) => {
            fetch('/api/employee/' + answers.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role_id: answers.role_id }),
            });
        });
        startApp()
}
function exit(): void {
    process.exit();
}
startApp();