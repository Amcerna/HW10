class department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.name = name;
        this.id = id;
    }
    printName() {
        console.log('Department name: ' + this.name);
    }
    updateName(newName) {
        this.name = newName;
        fetch('/api/department/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        });
    }
}
export default department;
