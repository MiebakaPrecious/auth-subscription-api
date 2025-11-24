// Augment Express Request type to include `user` set by auth middleware
declare namespace Express {
  export interface Request {
  user?: { id: string }; // user object with id
  }
}