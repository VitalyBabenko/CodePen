export class Validator {
  static validateLogin(login) {
    if (login) {
      return login.length >= 4 && login.length <= 16;
    }
    return false;
  }

  static validatePassword(password) {
    if (password) {
      return password.length >= 5 && password.length <= 32;
    }
    return false;
  }
}
