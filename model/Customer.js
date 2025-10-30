const fs= require('fs').promises;
const path = require('path');
const dataFile = path.join(__dirname, '../customers.json');

async function readData(){
    try{
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data);
    }catch (err){
        return [];
    }
}
async function writeData(customers){
    await fs.writeFile(dataFile, JSON.stringify(customers,null, 2))
}

class Customer {
    constructor(name, address, salary) {
        this.id = nextId++;
        this.name = name;
        this.address = address;
        this.salary = salary;
    }

    static async create(data) {
        let customers = await readData();
        const newCustomer = {
            id: customers.length ? customers[customers.length-1].id+1:1,
            name: data.name,
            address: data.address,
            salary: data.salary
        }
        customers.push(newCustomer);
        await writeData(customers);
        return newCustomer;
    }

    static async findAll() {
        console.log(await readData());
        return await readData();
    }

    static async findById(id) {
        let customers = await readData();
        return customers.find(c => c.id === id);
    }

    static async update(id, data) {
        let customers = await readData();
        let selectedIndex = customers.findIndex(c => c.id === id);
        if (selectedIndex=== -1) return null;
        customers[selectedIndex]={...customers[selectedIndex], ...data};
        await writeData(customers);
        return customers[selectedIndex];
    }

    static async delete(id){
        const customers = await readData();
        let selectedIndex = customers.findIndex(c=>c.id===id);
        if(selectedIndex===-1) return null;
        const deletedData = customers.splice(selectedIndex,1)[0];
        await writeData(customers);
        return deletedData;
    }
}

module.exports = Customer;