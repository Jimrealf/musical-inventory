const pool = require('../models/db');

// Handler for listing categories
const listCategories = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.render('categories/index', { categories: result.rows });
    } catch (err) {
        console.error(err);
        res.send('Error fetching categories');
    }
};

// Handler for showing a category
const showCategories = async (req, res) => {
    const { id } = req.params;
    try {
        const categoryResult = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [id]
        );
        if (categoryResult.rows.length === 0) {
            return res.send('Category not found');
        }
        const itemsResult = await pool.query(
            'SELECT * FROM items WHERE category_id = $1',
            [id]
        );
        res.render('categories/show', {
            category: categoryResult.rows[0],
            items: itemsResult.rows,
        });
    } catch (err) {
        console.error(err);
        res.send('Error fetching category details');
    }
};

// Display the form to create a new category
const newCategory = (req, res) => {
    res.render('categories/new');
};

// Handle the creation of a new category
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        await pool.query(
            'INSERT INTO categories (name, description) VALUES ($1, $2)',
            [name, description]
        );
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.send('Error creating category');
    }
};

// Display the form to edit a category
const editCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.send('Category not found');
        }
        res.render('categories/edit', { category: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send('Error fetching category');
    }
};

// Handle form submission to update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await pool.query(
            'UPDATE categories SET name = $1, description = $2 WHERE id = $3',
            [name, description, id]
        );
        res.redirect(`/categories/${id}`);
    } catch (err) {
        console.error(err);
        res.send('Error updating category');
    }
};

// Handle category deletion
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const { adminPassword } = req.body;
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.send('Incorrect admin password');
    }
    try {
        await pool.query('DELETE FROM categories WHERE id = $1', [id]);
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.send('Error deleting category   ');
    }
};

module.exports = {
    listCategories,
    showCategories,
    newCategory,
    createCategory,
    editCategory,
    updateCategory,
    deleteCategory,
};
