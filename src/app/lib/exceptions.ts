export class AuthError extends Error {
  constructor(message: string = 'There was an error with authentication.') {
    super(message);
    this.name = "AuthError";
  }
}