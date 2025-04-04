/* This function generates a random string of a specified length.
 * It uses the crypto.getRandomValues method to generate secure random values.
 * The generated string is composed of uppercase letters, lowercase letters, and digits.
 */
export const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

/*
 * This function is used to generate a code challenge from the code verifier.
 * It uses SHA-256 hashing and base64 URL encoding.
 * The code challenge is used in the PKCE authorization flow.
 */
export const generateCodeChallenge = async (codeVerifier) => {
    const hashed = await sha256(codeVerifier);
    return base64encode(hashed);
  }