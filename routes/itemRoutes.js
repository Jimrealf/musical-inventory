const express = require('express');
const router = express.Router();
const {
    newItem,
    createItem,
    editItem,
    updateItem,
    deleteItem,
} = require('../controllers/itemController');

router.get('/new', newItem);
router.post('/', createItem);
router.get('/:id/edit', editItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
