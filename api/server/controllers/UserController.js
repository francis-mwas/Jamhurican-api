import bcrypt from "bcrypt";
import userService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {
  static async createNewUser(res, req) {
    const { firstName, lastName, email, password } = req.body;
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === ''
    ) {
      util.setError(400, 'Please fill all the fields');
      return util.send(res);
    }

    const newUser = req.body;
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
               logger.debug(
                 `Password hashed successfully. Proceeding to create user account.`
               );

               const newUser = new User({
                 fullName,
                 phoneNumber: validPhone(phoneNumber),
                 idNumber,
                 email,
                 password: hash,
               });
               const userData = await newUser.save();

               const user = {
                 fullName: userData.fullName,
                 phoneNumber: userData.phoneNumber,
                 idNumber: userData.idNumber,
                 email: userData.email,
                 isVerified: userData.isVerified,
                 id: userData._id,
                 role: userData.role,
                 createdAt: userData.createdAt,
               };

               if (userData) {
                 const userPayload = {
                   id: userData._id,
                   role: userData.role,
                 };

                 logger.info(
                   `User successfully saved to the database. Proceeding to send email for verification.`
                 );
                 jwt.sign(
                   userPayload,
                   process.env.SECRET_KEY,
                   { expiresIn: '24h' },
                   async (err, token) => {
                     if (err) {
                       logger.warn(
                         'An error occurred when generating jwt for user account verification'
                       );
                       throw error;
                     }
                     // send email
                     try {
                       const subject =
                         '[IMPORTANT!] E-Warranty Email Verification.';
                       const message = `Thank you ${email} for using e-warranty\n.\nPlease click the link below to verify your account\n${api.FRONTEND_URL}/user/email/verify/?token=${token}`;
                       logger.debug(
                         `Attempting to send email verification to newly created account.`
                       );

                       await sendEmail({
                         from: process.env.EMAIL,
                         email,
                         subject,
                         message,
                       });

                       logger.info(
                         `New user account created successfully. Account not yet verified.`
                       );
                       logger.debug(
                         `Email verification message sent to user account.`
                       );

                       return res.status(201).json({
                         status: true,
                         Message: `Account ${email} created successfully, check your email to verify account`,
                         user,
                       });
                     } catch (err) {
                       logger.warn(
                         `Email verification could not be sent to the user account: `,
                         err
                       );
                       return res.status(400).json({
                         status: false,
                         message: `An error occurred while sending email: ${err}`,
                       });
                     }
                   }
                 );
               }
             }
           });
         });






     
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async createUser(req, res) {
    // let phoneNumber = validPhone(req.body.phoneNumber);

    const { fullName, idNumber, phoneNumber, email, password } = req.body;

    if (validateID(idNumber)) {
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
              logger.debug(
                `Password hashed successfully. Proceeding to create user account.`
              );

              const newUser = new User({
                fullName,
                phoneNumber: validPhone(phoneNumber),
                idNumber,
                email,
                password: hash,
              });
              const userData = await newUser.save();

              const user = {
                fullName: userData.fullName,
                phoneNumber: userData.phoneNumber,
                idNumber: userData.idNumber,
                email: userData.email,
                isVerified: userData.isVerified,
                id: userData._id,
                role: userData.role,
                createdAt: userData.createdAt,
              };

              if (userData) {
                const userPayload = {
                  id: userData._id,
                  role: userData.role,
                };

                logger.info(
                  `User successfully saved to the database. Proceeding to send email for verification.`
                );
                jwt.sign(
                  userPayload,
                  process.env.SECRET_KEY,
                  { expiresIn: '24h' },
                  async (err, token) => {
                    if (err) {
                      logger.warn(
                        'An error occurred when generating jwt for user account verification'
                      );
                      throw error;
                    }
                    // send email
                    try {
                      const subject =
                        '[IMPORTANT!] E-Warranty Email Verification.';
                      const message = `Thank you ${email} for using e-warranty\n.\nPlease click the link below to verify your account\n${api.FRONTEND_URL}/user/email/verify/?token=${token}`;
                      logger.debug(
                        `Attempting to send email verification to newly created account.`
                      );

                      await sendEmail({
                        from: process.env.EMAIL,
                        email,
                        subject,
                        message,
                      });

                      logger.info(
                        `New user account created successfully. Account not yet verified.`
                      );
                      logger.debug(
                        `Email verification message sent to user account.`
                      );

                      return res.status(201).json({
                        status: true,
                        Message: `Account ${email} created successfully, check your email to verify account`,
                        user,
                      });
                    } catch (err) {
                      logger.warn(
                        `Email verification could not be sent to the user account: `,
                        err
                      );
                      return res.status(400).json({
                        status: false,
                        message: `An error occurred while sending email: ${err}`,
                      });
                    }
                  }
                );
              }
            }
          });
        });
      } catch (e) {
        logger.debug(`Failed to save the user: ${e}`);
        return res.status(400).json({
          status: false,
          Message: 'An error occurred while saving the user',
        });
      }
    } else {
      logger.debug('Invalid user user national Id');
      return res.status(400).json({
        status: false,
        Message: 'Please provide a valid national Id number',
      });
    }
  }
}

export default UserController;
