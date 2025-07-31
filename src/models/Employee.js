const { pool } = require('../config/db');

class Employee {
  static async create({ first_name, last_name, email, position, salary, created_by }) {
    const result = await pool.query(
      `INSERT INTO employees 
       (first_name, last_name, email, position, salary, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, email, position, salary, created_by]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM employees');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, { first_name, last_name, email, position, salary }) {
    const result = await pool.query(
      `UPDATE employees SET 
       first_name = $1, last_name = $2, email = $3, 
       position = $4, salary = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $6 RETURNING *`,
      [first_name, last_name, email, position, salary, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Employee;
