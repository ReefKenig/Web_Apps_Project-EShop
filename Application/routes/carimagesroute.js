const express = require('express');
const router = express.Router();
const carImageController = require('../controllers/carimagescontroller');

router.post('/images', carImageController.addCarImage);
router.get('/images', carImageController.getCarImages);
router.put('/images/:carid', carImageController.updateCarImage);
router.delete('/images/:carid', carImageController.deleteCarImage);

module.exports = router;
