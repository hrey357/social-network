


export interface User {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  alias?: string;
  dateofbirth?: string;

}

export interface UserRegister {
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  alias: string;
  dateofbirth: Date | null;
}