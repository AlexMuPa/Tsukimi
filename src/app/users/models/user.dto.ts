export class UserDTO {
  id?: string;
  access_token?: string;
  userName: string;
  email: string;
  password: string;

  constructor(
    user_name: string,
    email: string,
    password: string
  ) {
    this.userName = user_name;
    this.email = email;
    this.password = password;
  }
}
