/**
 * 用户信息相关 mock接口
 */

import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
// import { dayjs } from "element-plus";
import { errorResponse, successResponse } from "../util";

/**
 * 生成用户数据
 * @returns
 */
export function createFakeUserList() {
  return [
    {
      token: "peak-vue3-admin-token-peak",
      userId: 1,
      username: "peak",
      password: "123456",
      realName: "PeakVue3Admin",
      avatar: "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
      sex: "男",
      age: 24,
      address: "郑州",
      phone: "1666666666",
      email: "1666666666@163.com",
      // loginTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      roles: ["admin"],
      login_time: Mock.Random.datetime("yyyy-MM-dd A HH:mm:ss")
    },
    {
      token: "peak-vue3-admin-token-mengyi",
      userId: 2,
      username: "mengyi",
      password: "123456",
      realName: "蒙毅",
      avatar: "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
      sex: "男",
      age: 25,
      address: "郑州",
      phone: "1666666666",
      email: "1666666666@163.com",
      roles: ["common"],
      loginTime: Mock.Random.datetime("yyyy-MM-dd A HH:mm:ss")
    }
  ];
}

export default [
  /**
   * 登录
   */
  {
    url: "/mock/user/login",
    method: "post",
    timeout: 300,
    response: ({ body }) => {
      let { username, password } = body;
      if (!username) errorResponse(null, "用户名不能为空", 400);
      if (!password) return errorResponse(null, "密码不能为空", 400);
      const userInfo = createFakeUserList().find(
        (item) => username === item.username && password === item.password
      );
      if (userInfo) {
        return successResponse({ authorization: userInfo.token }, "登录成功", 200);
      }
      return errorResponse(null, "账号或者密码错误", 400);
    }
  },

  /**
   * 退出
   */
  {
    url: "/mock/user/logout",
    method: "post",
    timeout: 300,
    response: () => {
      return successResponse();
    }
  },

  /**
   * 获取用户信息接口
   */
  {
    url: "/mock/user/info",
    method: "get",
    timeout: 300,
    response: ({ headers }) => {
      if (!headers?.authorization) return errorResponse(null, "请先登录", 401);
      const accessToken = headers.authorization;
      let data = createFakeUserList().find((item) => item.token === accessToken);

      if (!data) return errorResponse(null, "用户信息不存在", 404);
      return successResponse(data, "请求成功", 200);
    }
  }
] as MockMethod[];
