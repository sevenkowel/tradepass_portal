/**
 * API Client - 基于 fetch 的 HTTP 客户端
 * 封装了请求拦截、错误处理、认证等功能
 */

import { ApiResponse, ApiError } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    method: string,
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
      ...options,
    };

    // 添加认证 token
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("token") 
      : null;
    
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      // 处理非 JSON 响应
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return null as T;
      }

      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          code: String(response.status),
          message: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
        throw error;
      }

      if (!data.success) {
        const error: ApiError = {
          code: "BUSINESS_ERROR",
          message: data.error || "Business logic error",
        };
        throw error;
      }

      return data.data;
    } catch (error) {
      if ((error as ApiError).code) {
        throw error;
      }
      
      const apiError: ApiError = {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Network error",
      };
      throw apiError;
    }
  }

  // GET 请求
  get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) {
    const queryString = params
      ? "?" + Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
          .join("&")
      : "";
    
    return this.request<T>("GET", `${endpoint}${queryString}`);
  }

  // POST 请求
  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>("POST", endpoint, {
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT 请求
  put<T>(endpoint: string, body?: unknown) {
    return this.request<T>("PUT", endpoint, {
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PATCH 请求
  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>("PATCH", endpoint, {
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE 请求
  delete<T>(endpoint: string) {
    return this.request<T>("DELETE", endpoint);
  }

  // 上传文件
  upload<T>(endpoint: string, formData: FormData) {
    return this.request<T>("POST", endpoint, {
      body: formData,
      headers: {}, // 让浏览器自动设置 Content-Type
    });
  }
}

// 导出单例实例
export const apiClient = new ApiClient();

// 导出类以便需要时创建新实例
export { ApiClient };
