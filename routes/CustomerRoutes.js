const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/CustomerController');

router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomerById);
router.post('/', CustomerController.createNewCustomer);
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;