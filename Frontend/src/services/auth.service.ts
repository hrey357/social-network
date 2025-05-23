import { AxiosError } from 'axios';
import { userApi } from '../api/user.api';
import { User, UserRegister } from '../interfaces';


export interface LoginResponse {
  user?: User;
  users?: User[];
  token?: string;
}


export class AuthService {


  static login = async( email: string, password: string):Promise<LoginResponse> => {

    try {
      const resp = await userApi.post('/login', { email, password });
      console.log(resp);

      return { 
        token: resp.headers.authorization,
        user: {...resp.data.data} as User
      };

    } catch (error) {
      if ( error instanceof AxiosError ) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error('Unable to login')
    }
  }

  static signUp = async( usr: UserRegister):Promise<LoginResponse> => {

    try {
      const { data } = await userApi.post<LoginResponse>('/register', { ...usr });
      console.log(data);

      return data;

    } catch (error) {
      if ( error instanceof AxiosError ) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error('Unable to login')
    }
  }


  static getPerfil = async():Promise<LoginResponse> => {

    try {
      const { data } = await userApi.get<LoginResponse>('/');

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }


  static getUsers = async():Promise<LoginResponse> => {

    try {
      const { data } = await userApi.get('/users');

      return {
        users: data.data
      };

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }


}

