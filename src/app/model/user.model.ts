export class UserToSignUp {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export interface User {
  uid: string;
  name: string;
}
