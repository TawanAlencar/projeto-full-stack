export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}
