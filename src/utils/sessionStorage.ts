import jwt_decode from 'jwt-decode';

const JWT_KEY = 'jwtToken';

export function getLocalStorageToken() {
  return sessionStorage.getItem(JWT_KEY);
}

export function setLocalStorageToken(token: string) {
  return sessionStorage.setItem(JWT_KEY, JSON.stringify(token));
}

export function removeLocalStorageToken() {
  return sessionStorage.removeItem(JWT_KEY);
}

export function decodeJwtToken(token: string) {
  return jwt_decode(token);
}
