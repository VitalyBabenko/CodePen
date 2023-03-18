export const askToLogin = () => {
  const unAuthMessage = `
    You’ll have to Log In or Sign Up  to save your Pen.
    Don’t worry! All your work will be saved to your account.`;

  // eslint-disable-next-line no-restricted-globals
  return confirm(unAuthMessage);
};
