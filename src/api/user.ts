/**
 * @name 用户api
 */
// import type { AxiosResponse } from "axios";
import request from "@/utils/request.ts";
const prefix = "/admin";
/**
 * 用户登录
 * @param data
 */
export function reqUserLogin(data: { username: string; password: string }) {
  return request({
    url: `${prefix}/user/login`,
    method: "post",
    data
  });
}

/**
 * 用户登出
 * @returns
 */
export function reqUserLogout() {
  return request({
    url: `${prefix}/user/logout`,
    method: "post"
  });
}

/**
 * 用户注册
 * @param data
 */
export function reqUserRegister(data: { username: string; password: string }) {
  return request({
    url: `${prefix}/user/register`,
    method: "post",
    data
  });
}

/**
 * 重置密码
 * @param data
 */
export function reqUserResetPassword(data: { username: string; password: string }) {
  return request({
    url: `/user/resetPassword`,
    method: "patch",
    data
  });
}

/**
 * 刷新token
 */
export function reqRefreshToken(options: any) {
  return request({
    url: `/refresh/token`,
    method: "post",
    ...options
  });
}

/**
 * 查询用户列表
 */
export function reqSelectUserList(params: { username: string; nickname: string }) {
  return request({
    url: `${prefix}/user/list`,
    method: "get",
    params
  });
}

/**
 * 查询用户
 */
export function reqSelectUser() {
  return request({
    url: `${prefix}/user`,
    method: "get"
  });
}

export interface User {
  user_id?: number;
  username: string;
  nickname: string;
  avatar?: string;
  sex: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  state: 1 | 2; // 1 正常 2 禁用
  create_time?: string;
  update_time?: string;
  login_time?: string;
}
export type AddUser = Omit<User, "create_time" | "update_time" | "login_time">;

/**
 * 新增用户
 */
export function reqInsertUser(data: AddUser) {
  return request({
    url: `${prefix}/user`,
    method: "post",
    data
  });
}
/**
 * 修改用户
 */
export function reqUpdateUser(data: AddUser) {
  return request({
    url: `${prefix}/user`,
    method: "put",
    data
  });
}

/**
 * 删除用户
 */
export function reqDeleteUser(data: { ids: number[] }) {
  return request({
    url: `${prefix}/user`,
    method: "delete",
    data
  });
}
