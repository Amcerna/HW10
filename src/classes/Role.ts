class role {
    constructor(public id: number, public name: string, public salary: number, public department_id: number) {
        this.name = name;
        this.salary = salary;
        this.department_id = department_id;
    }
    printName(): void {
        console.log('Role name: ' + this.name);
    }
    printSalary(): void {
        console.log('Role salary: ' + this.salary);
    }
    printDepartment(): void {
        console.log('Role department: ' + this.department_id);
    }
    updateName(newName: string): void {
        this.name = newName;
        fetch('/api/role/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        })
    }
    updateSalary(newSalary: number): void {
        this.salary = newSalary;
        fetch('/api/role/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ salary: newSalary }),
        })
    }
    updateDepartment(newDepartment: number): void {
        this.department_id = newDepartment;
        fetch('/api/role/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ department_id: newDepartment }),
        })
    }
}
export default role;