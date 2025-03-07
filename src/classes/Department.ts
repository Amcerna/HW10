class department {
    constructor(public id: number, public name: string) {
        this.name = name;
        this.id = id;
    }
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    updateName(newName: string): void {
        this.name = newName;
        fetch('/api/department/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        })
    }
}
export default department ;