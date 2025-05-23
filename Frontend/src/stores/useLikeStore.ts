import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Like, LikeService } from "../services/like.service";

type LikeState = {
  likes: Record<number, number>;
  currentUser: number[];
  getLikes: () => void;
  toggleLike: (id: Like["mensaje"]) => void;
  getCurrentUser: () => void;
};

export const useLikeStore = create<LikeState>()(
  devtools(
    persist(
      (set) => ({
        likes: {},
        currentUser: [],
        getLikes: async () => {
          const auxLikes: Record<number, number> = {};
          const data = await LikeService.getLikes();
          console.log(data);
          if (data) {
            data.data.forEach((ele: Like) => {
              auxLikes[ele.mensaje] = +ele.count;
            });
          }
          if (data) {
            set({ likes: auxLikes });
          }
        },
        toggleLike: async (id) => {
          const resp = await LikeService.toggleLike(id);
          console.log(resp);

          // set((state) => ({
          //   likes: state.Likes.filter((Like) => Like.id !== id),
          // }));
        },
        getCurrentUser: async () => {
          const auxLikes: number[] = [];
          const data = await LikeService.getCurrentUser();
          console.log(data);
          if (data) {
            data.data.forEach((ele: Like) => {
              auxLikes.push(ele.mensaje);
            });
          }
          if (data) {
            set({ currentUser: auxLikes });
          }
        },
      }),
      {
        name: "Like-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
