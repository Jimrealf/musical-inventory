const pool = require('./db');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        // Clear existing data
        await pool.query('DELETE FROM items');
        await pool.query('DELETE FROM categories');

        // Reset the categories id sequence
        await pool.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');

        // Insert categories with explicit IDs
        await pool.query(`
            INSERT INTO categories (id, name, description) VALUES
            (1, 'Guitars', 'Stringed instruments'),
            (2, 'Drums', 'Percussion instruments'),
            (3, 'Keyboards', 'Electronic keyboards')
        `);

        // Insert items with matching category_ids
        await pool.query(`
            INSERT INTO items (name, price, stock, category_id) VALUES
            ('Fender Stratocaster', 1200.00, 5, 1),
            ('Gibson Les Paul', 1500.00, 3, 1),
            ('Roland TD-50', 2500.00, 2, 2),
            ('Yamaha PSR-300', 500.00, 10, 3)
        `);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        pool.end();
        process.exit();
    }
};

seedDatabase();
