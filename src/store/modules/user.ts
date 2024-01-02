/**
 * 用户
 */
import { defineStore } from "pinia";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";

interface UserProps {
  access_token: string;
  refresh_token: string;
  userInfo?: object;
}

export const useUserStore = defineStore({
  id: "peak-blog-user",
  state: (): UserProps => ({
    access_token: "", // 访问令牌
    refresh_token: "", // 刷新令牌
    userInfo: {
      avatar: "http://119.91.22.164:8085/images/11411538250643115avatar.jpg", // 头像
      nickname: "Peak", // 昵称
      perms: ["sys:user:edit", "sys:user:delete", "sys:user:add"], //权限字段
      roles: ["admin"], // 角色
      userId: "1" // 用户id
    }
  }),
  actions: {
    setToken({ access_token, refresh_token }: UserProps) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
    },

    /**
     * 重置用户数据
     */
    resetUser() {
      // 重置数据
      this.access_token = "";
      this.refresh_token = "";
      this.userInfo = {
        avatar: "", // 头像
        nickname: "", // 昵称
        perms: [], //权限字段
        roles: [], // 角色
        userId: "" // 用户id
      };
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
