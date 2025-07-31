const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class User {
  static async create({ username, password, role = process.env.USER_ROLE }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, password, role) 
       VALUES ($1, $2, $3) RETURNING id, username, role`,
      [username, hashedPassword, role]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT id, username, password, role FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }

  static async generateToken(user) {
    return jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
  }

  static async verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static async isAdmin(userId) {
    const result = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0]?.role === process.env.ADMIN_ROLE;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, username, role FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = User;
