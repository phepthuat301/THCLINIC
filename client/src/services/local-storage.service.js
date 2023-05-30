export const readToken = () => {
  return localStorage.getItem('accessToken') || '';
};

export const deleteToken = () => { localStorage.removeItem('accessToken'); };

export const persistToken = (token) => {
  localStorage.setItem('accessToken', token);
};