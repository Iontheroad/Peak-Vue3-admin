/**
 *
 */
import Mock from "mockjs";
// 成功响应
export const successResponse = (data: any = null, message = "请求成功", code = 200) => {
  return Mock.mock({
    data,
    code,
    message
  });
};
// 错误响应
export const errorResponse = (data: any, message: string, code = 500) => {
  return Mock.mock({
    data,
    message,
    code
  });
};
