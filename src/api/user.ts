/**
 * 用户api
 */

import request from "@/utils/request.ts";
const prefix = "";
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
 * 查询用户信息
 */
export function reqGetUserInfo() {
  return request({
    url: `${prefix}/user/info`,
    method: "get"
  });
}
