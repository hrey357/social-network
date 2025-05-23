import { likeApi } from "../api/like.api";


export interface ToggleLikeResponse {
  data: string;
}


export interface Like {
    mensaje: number;
    count: string;
}

export interface GetLikesResponse {
  data: Like[];
}


export class LikeService {


  static getLikes = async():Promise<GetLikesResponse> => {

    try {
      const { data } = await likeApi.get<GetLikesResponse>('/');

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }


  static toggleLike = async(idPost: number):Promise<ToggleLikeResponse> => {

    try {
      const { data } = await likeApi.post<ToggleLikeResponse>('/'+idPost);
      console.log(data);
      
      return {
        data: data.data
      };

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }





  static getCurrentUser = async():Promise<GetLikesResponse> => {

    try {
      const { data } = await likeApi.get<GetLikesResponse>('/user');

      return data;

    } catch (error) {
      console.log(error);
      throw new Error('UnAuthorized');
    }
  }


}

