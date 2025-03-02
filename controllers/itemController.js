const pool = require('../models/db');

// Show the form to create a new item
const newItem = async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM categories');
        res.render('items/new', { categories: categories.rows });
    } catch (err) {
        console.error(err);
        res.send('Error fetching categories for new item form');
    }
};

// Handle the creation of a new item
const createItem = async (req, res) => {
    const { name, price, stock, category_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO items (name, price, stock, category_id) VALUES ($1, $2, $3, $4)',
            [name, price, stock, category_id]
        );
        res.redirect(`/categories/${category_id}`);
    } catch (err) {
        console.error(err);
        res.send('Error creating item');
    }
};

// Display the form to edit an item
const editItem = async (req, res) => {
    const { id } = req.params;
    try {
        const itemResult = await pool.query(
            'SELECT * FROM items WHERE id = $1',
            [id]
        );
        if (itemResult.rows.length === 0) {
            return res.send('Item not found');
        }
        const categoriesResult = await pool.query('SELECT * FROM categories');
        res.render('items/edit', {
            item: itemResult.rows[0],
            categories: categoriesResult.rows,
        });
    } catch (err) {
        console.error(err);
        res.send('Error fetching item details');
    }
};

// Handle form submission to update an item
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, category_id } = req.body;
    try {
        await pool.query(
            'UPDATE items SET name = $1, price = $2, stock = $3, category_id = $4 WHERE id = $5',
            [name, price, stock, category_id, id]
        );
        res.redirect(`/categories/${category_id}`);
    } catch (err) {
        console.error(err);
        res.send('Error updating item');
    }
};

// Handle item deletion
const deleteItem = async (req, res) => {
    const { id } = req.params;
    const { adminPassword } = req.body;
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.send('Incorrect password');
    }
    try {
        const itemResult = await pool.query(
            'SELECT category_id FROM items WHERE id = $1',
            [id]
        );
        if (itemResult.rows.length === 0) {
            return res.send('Item not found');
        }
        const category_id = itemResult.rows[0].category_id;
        await pool.query('DELETE FROM items WHERE id = $1', [id]);
        res.redirect(`/categories/${category_id}`);
    } catch (err) {
        console.error(err);
        res.send('Error deleting item');
    }
};

module.exports = {
    newItem,
    createItem,
    editItem,
    updateItem,
    deleteItem,
};
