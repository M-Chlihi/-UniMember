import axios from "axios";

import { attachAccessToken } from "./interceptors/authinterceptors";
import { createAuthRefreshInterceptor } from "./interceptors/authRefreshInterceptor";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(attachAccessToken);
createAuthRefreshInterceptor(apiClient);
export default apiClient;
