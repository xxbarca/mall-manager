import axios from "axios";
import { toast } from "sonner";

const http = axios.create({
  baseURL: "http://124.222.232.4:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器 (可用于添加 token)
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // 或在 Next.js 中使用 cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器 (可用于统一错误处理)
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const {data} = error.response
    if (error.response?.status === 401) {
      // 处理未授权错误，例如跳转到登录页
      console.error("Unauthorized!");
    }
    if (error.response?.status === 400) {
      toast.error(data.message[0]);
    }
    throw new Error(error);
    // return Promise.reject(error);
  },
);

export default http;
