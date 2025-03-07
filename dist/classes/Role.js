class role {
    constructor(id, name, salary, department_id) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department_id = department_id;
        this.name = name;
        this.salary = salary;
        this.department_id = department_id;
    }
    printName() {
        console.log('Role name: ' + this.name);
    }
    printSalary() {
        console.log('Role salary: ' + this.salary);
    }
    printDepartment() {
        console.log('Role department: ' + this.department_id);
    }
    updateName(newName) {
        this.name = newName;
        fetch('/api/role/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        });
    }
    updateSalary(newSalary) {
        this.salary = newSalary;
        fetch('/api/role/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ salary: newSalary }),
        });
    }
    updateDepartment(newDepartment) {
        this.department_id = newDepartment;
        fetch('/api/role/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ department_id: newDepartment }),
        });
    }
}
export default role;
