export const getUserIdFromJwt = (jwtToken) => {
  if (jwtToken) {
    const base64Url = jwtToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)).sub.id;
  } else {
    console.error(`jwt error: ${jwtToken}`);
  }
};
