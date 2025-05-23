import { AxiosError } from 'axios';
import { Post } from '../interfaces';
import { postApi } from '../api/post.api';


export interface PostResponse {
  posts?: Array<Post>;
  post?:  Post;
  data?: unknown
}


export class PostService {


  static addPost = async( mensaje: string):Promise<PostResponse> => {

    try {
      const { data } = await postApi.post<PostResponse>('/', { mensaje });
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


  static getPosts = async() => {

    try {
      const { data } = await postApi.get('/');

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }


  static deletePost = async(id: number):Promise<PostResponse> => {

    try {
      const { data } = await postApi.delete<PostResponse>('/'+id);

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }

  static getPostById = async(id: number):Promise<PostResponse> => {

    try {
      const { data } = await postApi.get<PostResponse>('/'+id);

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }

  static updatePost = async(postUpdate: Post):Promise<PostResponse> => {

    try {
      const { data } = await postApi.put<PostResponse>('/'+postUpdate.id, { postUpdate });

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }


}

