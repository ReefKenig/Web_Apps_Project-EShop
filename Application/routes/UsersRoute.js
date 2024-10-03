const express = require('express');
const router = express.Router();
const UsersController=require('../controllers/UsersControllers')
router.post('/login', loginUser);
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
