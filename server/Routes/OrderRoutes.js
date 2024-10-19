const { addToOrder, placeOrder, fetchPlacedOrders } = require('../Controllers/OrderController')

const router = require('express').Router()

router.post('/addorder/:id',addToOrder)
router.put('/placeorder/:orderId', placeOrder);
router.get('/fetchplacedorders/:id',fetchPlacedOrders)
module.exports = router