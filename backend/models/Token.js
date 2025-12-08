const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const prisma = require('../config/prisma');

class Token {
  static async create(userId) {
    await prisma.token.deleteMany({ where: { userId } });
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    await prisma.token.create({
      data: { userId, hashedToken }
    });
    return token;
  }

  static async validate(userId, token) {
    const row = await prisma.token.findFirst({
      where: {
        userId,
        createdAt: { gt: new Date(Date.now() - 60 * 60 * 1000) }
      }
    });
    if (!row) return false;
    const isValid = await bcrypt.compare(token, row.hashedToken);
    if (isValid) await query('DELETE FROM tokens WHERE id = $1', [row.id]);
    return isValid;
  }
}

module.exports = Token;
