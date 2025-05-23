import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { AuthStatus, User, UserRegister } from "../interfaces";
import { AuthService } from "../services/auth.service";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  users?: User[];
  usersID: Record<string, User>;
  loginUser: (email: string, password: string) => Promise<void>;
  signUpUser: (usr: UserRegister) => Promise<void>;
  getPerfil: () => Promise<void>;
  getUsers: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "pending",
  token: undefined,
  user: undefined,
  users: undefined,
  usersID: {},
  loginUser: async (email, password) => {
    try {
      const { token, user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user });
    } catch (error) {
      console.log(error);
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  signUpUser: async (usr) => {
    try {
      const { token, user } = await AuthService.signUp(usr);
      set({ status: "authorized", token, user });
    } catch (error) {
      console.log(error);
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  getPerfil: async () => {
    try {
      if (get().user?.alias === null || get().user?.alias === undefined) {
        const { user } = await AuthService.getPerfil();
        set({ user });
      }
    } catch (error) {
      console.log(error);
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  getUsers: async () => {
    try {
      const objAux: Record<string, User> = {};
      const { users } = await AuthService.getUsers();
      if (users) {
        users.forEach((ele: User) => {
          objAux[ele.id + ""] = ele;
        });
      }
      set({ users, usersID: objAux });
    } catch (error) {
      console.log(error);
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
