/**
 * 封装axios
 */
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import router from "@/router";

interface ICodeMessage {
  [propName: number]: string;
}
const StatusCodeMessage: ICodeMessage = {
  200: "服务器成功返回请求的数据",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）",
  204: "删除数据成功",
  400: "请求错误(400)",
  401: "未授权，请重新登录(401)",
  403: "拒绝访问(403)",
  404: "请求出错(404)",
  408: "请求超时(408)",
  500: "服务器错误(500)",
  501: "服务未实现(501)",
  502: "网络错误(502)",
  503: "服务不可用(503)",
  504: "网络超时(504)"
};

// 1.创建实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 默认地址请求地址，可在 .env.*** 文件中修改
  timeout: 50000, // 设置超时时间（10s）
  withCredentials: true // 跨域时候允许携带凭证
  // headers: { "Content-Type": "application/json;charset=utf-8" }, // 自定义请求头
});

// 2.请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      // 预期的'config'和'config.headers' 不可未定义
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    // 获取用户token
    const userStore = useUserStore();
    if (userStore.authorization) {
      // token 添加到请求头 Bearer
      config.headers.Authorization = `${userStore.authorization}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  async (response) => {
    const { code, message, msg } = response.data;
    if (code === 200) return response.data; // 请求成功200 直接返回数据

    // 抛出错误
    return Promise.reject(new Error(msg || message || "Error"));
  },
  async (error: AxiosError) => {
    // 捕获错误
    const { response } = error;
    const { code, message, msg } = response?.data as {
      code: number;
      message?: string;
      msg?: string;
    };

    // authorization 过期的单独处理
    if ([401].includes(code)) {
      const userStore = useUserStore();
      userStore.resetUser(); // 清空 token
      router.replace("/login"); // 跳转登录页
      return Promise.reject(
        new Error(msg || message || StatusCodeMessage[code] || error.message)
      );
    }

    ElMessage.error(
      msg || message || StatusCodeMessage[code] || error.message || "系统出错"
    );
    return Promise.reject(
      new Error(msg || message || StatusCodeMessage[code] || error.message)
    );
  }
);

// 导出 axios 实例
export default service;
