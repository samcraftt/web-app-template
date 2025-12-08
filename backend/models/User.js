const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

class User {
  static async create({ email, firstName, lastName, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { email, firstName, lastName, hashedPassword }
    });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async resetPassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { hashedPassword }
    });
  }

  static async verify(id) {
    return prisma.user.update({
      where: { id },
      data: { verified: true }
    });
  }

  static async validatePassword(hashedPassword, password) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
