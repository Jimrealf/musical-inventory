# Musical Inventory App

A simple inventory management application for a musical instrument store, built with Express.js and PostgreSQL. Users can create, read, update, and delete (CRUD) categories and items, with cascading deletes for categories and basic admin password protection for destructive actions.

## Features
- View a list of instrument categories (e.g., Guitars, Drums, Keyboards).
- See items within each category, including name, price, and stock.
- Add new categories and items.
- Edit existing categories and items.
- Delete categories (and their items) or individual items, with admin password confirmation.
- Responsive design with basic CSS styling.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS templates
- **Dependencies**: `pg`, `dotenv`, `method-override`

## Local Setup
1. **Prerequisites**:
   - Node.js (v20.x or later)
   - PostgreSQL installed and running locally
   - Git

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/musical-inventory.git
   cd musical-inventory