const bcrypt = require('bcryptjs');
const { toCamelCase } = require('../utils/miscUtils');
const { query } = require('../config/database');

class User {
  static async create({ email, firstName, lastName, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await query(
      `INSERT INTO users (email, first_name, last_name, hashed_password)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [email, firstName, lastName, hashedPassword]
    );
    return toCamelCase(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return toCamelCase(rows[0]);
  }

  static async findById(id) {
    const { rows } = await query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return toCamelCase(rows[0]);
  }

  static async verify(id) {
    const { rows } = await query(
      `UPDATE users 
       SET verified = true 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );
    return toCamelCase(rows[0]);
  }

  static async validatePassword(hashedPassword, password) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
