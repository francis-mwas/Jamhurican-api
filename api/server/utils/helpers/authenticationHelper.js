import bcrypt from 'bcrypt';

/**
 * Attempt authenticating password against a hsh
 * @param password {string} - String
 * @param instance {object} - Object that has password prooperty, which is itself a hash
 * @return {Promise<boolean>} - Return whether the password is valid or not
 */

export async function authenticate(password, instance) {
  const isMatch = await bcrypt.compare(password, instance.password);
  return !!isMatch;
}
