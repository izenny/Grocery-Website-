
const router = require('express').Router();
const addressController = require('../Controllers/AddressController');


router.get('/:id', addressController.getAddressById);
router.post('/create/:id', addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;
