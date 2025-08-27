# Full SQL CRUD Backend (Node.js + Express + Sequelize + MySQL)

A production-style REST API demonstrating **CRUD** operations with **authentication**, built using **Node.js**, **Express**, **Sequelize**, and **MySQL**.

> This project uses **JWT tokens stored in HTTP-only cookies** for auth. Only the creator of a product can update/delete it.

---

## 🚀 Features

* User **Signup/Login** with JWT (cookie-based auth)
* Products **Create/Read/Update/Delete**
* Ownership guard: users can only see & modify **their own** products
* Sequelize models, migrations & associations (`User hasMany Products`, `Product belongsTo User`)
* Environment-based configuration

---

## 🧰 Tech Stack

* **Runtime:** Node.js (ES Modules)
* **Framework:** Express.js
* **Database:** MySQL
* **ORM:** Sequelize + sequelize-cli
* **Auth:** JWT (HTTP-only cookies)
* **Testing:** Postman 

---

## 📂 Folder Structure (key files)

```
full-sqlCrud/
├─ config/
│  ├─ db.config.js          # Sequelize instance & DB connection
│  └─ config.json           # (sequelize-cli) environments
├─ controllers/
│  ├─ userController.js
│  └─ productsController.js
├─ migrations/              # Tables + add userId to products
├─ models/
│  ├─ index.js              # exports { User, Product } + associations
│  ├─ userModel.js
│  └─ productModel.js
├─ routes/
│  ├─ authRoutes.js
│  └─ productRoutes.js
├─ app.js or server.js      # App entry (listens on PORT)
├─ package.json
└─ README.md
```

> If your entry file is `server.js`, use that in the commands below. If it is `app.js`, swap accordingly.

---

## ✅ Prerequisites

* **Node.js 18+ (recommended 20+)**
* **MySQL 8+** running locally

---

## ⚙️ Setup & Run (Step‑by‑Step)

1. **Clone the repository**

```bash
git clone https://github.com/MNoman431/crud_backend_project-SQL-.git
cd crud_backend_project-SQL-/full-sqlCrud
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in `full-sqlCrud/` (example):

```env
PORT=1000
NODE_ENV=development
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=crud_project
DB_DIALECT=mysql
JWT_SECRET=super_secret_change_me
```

4. **Configure Sequelize**

* In `config/config.json` or `db.config.js`, ensure values match your `.env`.
* Create database if not exists:

```sql
CREATE DATABASE IF NOT EXISTS crud_project;
```

5. **Run migrations**

```bash
npx sequelize-cli db:migrate
```

6. **Start the server**

```bash
# pick the one that matches your entry file
node server.js
# or
node app.js
# (if using nodemon)
npx nodemon server.js
```

Expected log:

```
✅ Database connected successfully
🚀 Server running on http://localhost:1000
```

---

## 🔐 Authentication (Cookies)

* On successful **login**, server sets a cookie named e.g. `token` (HTTP-only, SameSite=Strict).
* For subsequent requests, the browser/Postman will automatically send the cookie; **no `Authorization` header** is required.
* Protected routes use `authenticate` middleware which reads `req.cookies.token` and verifies JWT.

> In Postman: enable **"Automatically follow redirects"** and check the **Cookies** tab after login to confirm `token` is stored.

---

## 📡 REST API Endpoints

### Auth

**Register**

```
POST /api/auth/register
Content-Type: application/json
{
  "username": "noman",
  "email": "noman@gmail.com",
  "password": "000000"
}
```

**Login** (sets auth cookie)

```
POST /api/auth/login
Content-Type: application/json
{
  "email": "noman@gmail.com",
  "password": "000000"
}
```

Response sets `token` cookie. Use this cookie for all protected routes below.

---

### Products (Protected)

> All product routes require a valid login (token cookie present). Each user only sees/edits **their own** products.

**Create**

```
POST /api/products/
Content-Type: application/json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 1200
}
```

Server will attach `userId: req.user.id` automatically.

**Get all (mine)**

```
GET /api/products/
```

Returns only products where `userId === req.user.id`.

**Get by id (mine)**

```
GET /api/products/:id
```

Returns 404 if not found or 403 if not owned by the logged-in user.

**Update (only owner)**

```
PUT /api/products/:id
Content-Type: application/json
{
  "name": "Laptop Pro",
  "price": 1500,
  "description": "Updated specs"
}
```

If `product.userId !== req.user.id` → `403 Forbidden`.

**Delete (only owner)**

```
DELETE /api/products/:id
```

---

## 🔗 Sequelize Associations (Important)

```js
// models/index.js
User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId' });
```

**Migration snippet** (adding `userId` to `products`):

```js
await queryInterface.addColumn('products', 'userId', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: { model: 'users', key: 'id' },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
```

---

## 🧪 Postman Quick Test Flow

1. `POST /api/auth/register` → create user
2. `POST /api/auth/login` → get `token` cookie
3. `POST /api/products/` → create product (no userId in body)
4. `GET /api/products/` → should show **only your** products
5. Try another user: login with different account → **should not** see first user’s products
6. `PUT /api/products/:id` or `DELETE /api/products/:id` → allowed only for the owner

---

## ❗ Common Errors & Fixes

* **ECONNREFUSED 127.0.0.1:5000** → Wrong port in Postman. Use the one from logs (e.g., `http://localhost:1000`).
* **MySQL 1175 (safe update mode)** → Use proper `WHERE` with key column or `SET SQL_SAFE_UPDATES = 0;`.
* **Foreign key constraint fails** when migrating or inserting products →

  * Ensure table names are lowercase: `users`, `products` in references.
  * Ensure a matching `users.id` exists for `products.userId` (login + create product attaches the correct user automatically).
  * If old test rows exist, `TRUNCATE TABLE products;` before adding FK.
* **403 Forbidden on update** → Product doesn’t belong to logged-in user; confirm `userId` saved on create and JWT contains `{ id }`.

---




Happy Coding bro! 
