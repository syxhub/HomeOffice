export class UserToSignUp {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export interface User {
  id: string;
  name: string;
}
