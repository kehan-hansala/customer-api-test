const Customer = require('../model/Customer');

const getAllCustomers = async (req, resp) => {
    resp.status(200).json(await Customer.findAll());
};
const getCustomerById = async (req, resp) => {
    let selectedCustomer = await Customer.findById(parseInt(req.params.id));
    if (!selectedCustomer) return resp.status(404).json({message: 'customer not found'});
    resp.status(200).json(selectedCustomer);
};
const createNewCustomer = async (req, resp) => {
    const {name, address, salary} = req.body;
    let createdCustomer = await Customer.create({name, address, salary});
    resp.status(201).json(createdCustomer);
};
const updateCustomer = async (req, resp) => {
    let id = parseInt(req.params.id);
    const updatedCustomer = await Customer.update(id, req.body);
    if (!updatedCustomer) return resp.status(404).json({message: 'customer not found'});
    resp.status(201).json(updatedCustomer);
};
const deleteCustomer = async (req, resp) => {
    let id = parseInt(req.params.id);
    let deletedCustomer = await Customer.delete(id);
    if (!deletedCustomer) return resp.status(404).json({message: 'customer not found'});
    resp.status(204).json({message: 'Deleted!'});
};

module.exports = {
    getAllCustomers, getCustomerById, createNewCustomer, updateCustomer, deleteCustomer
}