/**
 * AI Signals API - AI 信号相关接口
 */

import { apiClient } from "./client";
import {
  Signal,
  SignalUsage,
  PaginatedResponse,
} from "@/lib/types";

export const signalsApi = {
  // 获取信号列表
  getSignals: (params?: {
    type?: "latest" | "popular" | "my";
    symbol?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<Signal>>("/signals", params),

  // 获取信号详情
  getSignalDetails: (signalId: string) =>
    apiClient.get<Signal>(`/signals/${signalId}`),

  // 生成信号
  generateSignal: (data: {
    symbol: string;
    timeframe: string;
    strategy?: string;
  }) => apiClient.post<Signal>("/signals/generate", data),

  // 保存信号
  saveSignal: (signalId: string) =>
    apiClient.post<void>(`/signals/${signalId}/save`),

  // 取消保存信号
  unsaveSignal: (signalId: string) =>
    apiClient.delete<void>(`/signals/${signalId}/save`),

  // 获取使用限制
  getUsageLimits: () => apiClient.get<SignalUsage>("/signals/usage"),

  // 获取可用品种列表
  getSymbols: () =>
    apiClient.get<{ symbol: string; name: string; category: string }[]>("/signals/symbols"),

  // 获取可用时间周期
  getTimeframes: () =>
    apiClient.get<{ value: string; label: string }[]>("/signals/timeframes"),
};
