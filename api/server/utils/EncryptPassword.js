import bcrypt from 'bcrypt';
import logger from '../config/logger.config';

export default class Util {
  hashPassword(password) {
    try {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          logger.debug('Unable to generate salt');
          throw err;
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            logger.warn(
              `There was an error when trying to hash user password: `,
              err
            );
            return res.status(500).json({
              status: false,
              message: 'Something went wrong. Please try that again.',
            });
          } else {
            logger.debug(`Hashed password: ${hash}`);
            logger.debug(`Password hashed successfully`);
          }
        });
      });
      return true;
    } catch (error) {
      logger.error('Error hashing the password');
      throw error;
    }
  }
}
