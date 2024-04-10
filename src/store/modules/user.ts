/**
 * 用户
 */
import { defineStore } from "pinia";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";

import { reqGetUserInfo } from "@/api/user";

interface UserProps {
  authorization: string;
  userInfo?: any;
}

export const useUserStore = defineStore({
  id: "peak-blog-user",
  state: (): UserProps => ({
    authorization: "",
    userInfo: {
      token: "",
      userId: null,
      username: "",
      password: "",
      realName: "",
      avatar: "",
      sex: "",
      age: 0,
      address: "",
      phone: "",
      email: "",
      roles: [],
      login_time: ""
    }
  }),
  actions: {
    setToken({ authorization }: UserProps) {
      this.authorization = authorization;
    },

    /**
     * 登录成功后 获取用户信息
     * @returns
     */
    async getUserInfo() {
      try {
        let result = await reqGetUserInfo();
        this.userInfo = result.data;
        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(false);
      }
    },

    /**
     * 重置用户数据
     */
    resetUser() {
      // 重置数据
      this.authorization = "";
      this.userInfo = {};
    }
  },
  getters: {},
  persist: {
    enabled: true, // 开启数据存储
    strategies: [
      {
        key: "peak-user",
        storage: localStorage
      }
    ]
  } as PersistedStateOptions
});
