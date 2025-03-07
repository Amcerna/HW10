class employee {
    constructor(public id: number, public first_name: string, public last_name: string, public role_id: number, public manager_id: number) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.id = id;
    }
    printName(): void {
        console.log('Employee name: ' + this.first_name + ' ' + this.last_name);
    }
    printRole(): void {
        console.log('Employee role: ' + this.role_id);
    }
    printManager(): void {
        console.log('Employee manager: ' + this.manager_id);
    }
    updateName(newName: string): void {
        this.first_name = newName;
        fetch('/api/employee/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name: newName }),
        })
    }
    updateRole(newRole: number): void {
        this.role_id = newRole;
        fetch('/api/employee/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role_id: newRole }),
        })
    }
    updateManager(newManager: number): void {
        this.manager_id = newManager;
        fetch('/api/employee/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ manager_id: newManager }),
        })
    }
}
export default employee;