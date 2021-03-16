const express = require('express');

const router = express.Router();

const shopController = require('../controller/shop');

router.get('/', shopController.homePage);
router.get('/products' , shopController.productPage);
router.get('/addProducts' , shopController.addProducts);
router.post('/addProducts', shopController.postAddProducts);

module.exports = router;