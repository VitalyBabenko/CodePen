export class Validate {
  static login(isError) {
    console.log('+');
    if (isError) {
      return 'The username or password you entered is incorrect, please try again.';
    }
  }

  static userName(value = '') {
    if (value.length < 4) return 'Min length of userName: 4';
    if (value.length > 16) return 'Max length of userName: 16';
  }

  static password(value = '') {
    if (value.length < 5) return 'Min length of password: 5';
    if (value.length > 32) return 'Max length of password: 32';
  }

  static confirmPassword(confirm, password) {
    if (password !== confirm) return 'Password mismatch';
  }
}
