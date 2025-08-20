const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { query } = require('../config/database');

class Token {
  static async create(userId) {
    await query('DELETE FROM tokens WHERE user_id = $1', [userId]);
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    await query(
      `INSERT INTO tokens (user_id, hashed_token)
       VALUES ($1, $2)`,
      [userId, hashedToken]
    );
    return token;
  }

  static async validate(userId, token) {
    const { rows } = await query(
      `SELECT * FROM tokens 
       WHERE user_id = $1 
       AND created_at > NOW() - INTERVAL '1 hour'`,
      [userId]
    );
    if (!rows[0]) return false;
    const isValid = await bcrypt.compare(token, rows[0].hashed_token);
    if (isValid) await query('DELETE FROM tokens WHERE id = $1', [rows[0].id]);
    return isValid;
  }
}

module.exports = Token;
