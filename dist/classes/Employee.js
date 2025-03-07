class employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.id = id;
    }
    printName() {
        console.log('Employee name: ' + this.first_name + ' ' + this.last_name);
    }
    printRole() {
        console.log('Employee role: ' + this.role_id);
    }
    printManager() {
        console.log('Employee manager: ' + this.manager_id);
    }
    updateName(newName) {
        this.first_name = newName;
        fetch('/api/employee/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name: newName }),
        });
    }
    updateRole(newRole) {
        this.role_id = newRole;
        fetch('/api/employee/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role_id: newRole }),
        });
    }
    updateManager(newManager) {
        this.manager_id = newManager;
        fetch('/api/employee/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ manager_id: newManager }),
        });
    }
}
export default employee;
