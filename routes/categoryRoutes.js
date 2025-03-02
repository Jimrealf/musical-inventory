const express = require('express');
const router = express.Router();
const {
    listCategories,
    showCategories,
    newCategory,
    createCategory,
    editCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');

router.get('/', listCategories);
router.get('/new', newCategory);
router.post('/', createCategory);
router.get('/:id', showCategories);
router.get('/:id/edit', editCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
