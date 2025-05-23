import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Post, DraftPost } from "../interfaces/post.interface";
import { PostService } from "../services/post.service";

type PostState = {
  posts: Post[];
  activeId: Post["id"];
  getPosts: () => void;
  addPost: (data: DraftPost) => void;
  deletePost: (id: Post["id"]) => void;
  getPostById: (id: Post["id"]) => void;
  updatePost: (data: Post) => void;
};

export const usePostStore = create<PostState>()(
  devtools(
    persist(
      (set) => ({
        posts: [],
        activeId: 0,
        getPosts: async () => {
          const data  = await PostService.getPosts();
          if(data){
          set({ posts: [...data.data] });
          }
        },
        addPost: async (data) => {
          const { post } = await PostService.addPost(data.mensaje);
          if (post) {
            set((state) => ({
              posts: [...state.posts, post],
            }));
          }
        },
        deletePost: async (id) => {
          await PostService.deletePost(id);
          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
          }));
        },
        getPostById: async (id) => {
          const { post } = await PostService.getPostById(id);
          if (post) {
            set(() => ({
              activeId: id,
            }));
          }
        },
        updatePost: async (data) => {
          const { post } = await PostService.updatePost(data);
          if (post) {
            set((state) => ({
              posts: state.posts.map((post) =>
                post.id === state.activeId
                  ? { ...data, id: state.activeId }
                  : post
              ),
              activeId: 0,
            }));
          }
        },
      }),
      {
        name: "post-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
