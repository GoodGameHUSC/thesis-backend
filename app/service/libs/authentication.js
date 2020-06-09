const bcrypt = require('bcrypt');
const saltRounds = 10;

export const Hashing = {
  encrypt: (password) => {
    if (password && typeof password == 'string') {
      return bcrypt.hash(password, saltRounds);
    }
    throw new Error('require password to encrypt')
  },
  check: (password, encryptedCode) => {
    return bcrypt.compare(password, encryptedCode);
  }
}