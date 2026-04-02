/**
 * Copy Trading API - 跟单交易相关接口
 */

import { apiClient } from "./client";
import {
  Trader,
  CopyTrade,
  CopyTradeHistory,
  PaginatedResponse,
} from "@/lib/types";

export const copyTradingApi = {
  // 获取交易员列表
  getTraders: (params?: {
    sortBy?: "roi" | "drawdown" | "followers" | "winRate";
    order?: "asc" | "desc";
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<Trader>>("/copy-trading/traders", params),

  // 获取交易员详情
  getTraderDetails: (traderId: string) =>
    apiClient.get<Trader>(`/copy-trading/traders/${traderId}`),

  // 获取交易员业绩
  getTraderPerformance: (traderId: string, period: string) =>
    apiClient.get<{ period: string; roi: number; drawdown: number; trades: number }[]>(
      `/copy-trading/traders/${traderId}/performance`,
      { period }
    ),

  // 获取我的跟单列表
  getMyCopies: () => apiClient.get<CopyTrade[]>("/copy-trading/my-copies"),

  // 开始跟单
  startCopy: (data: {
    traderId: string;
    allocatedFunds: number;
    copyMode: "fixed" | "proportional";
    fixedVolume?: number;
    multiplier?: number;
    maxDrawdown?: number;
    stopLoss?: number;
    takeProfit?: number;
  }) => apiClient.post<CopyTrade>("/copy-trading/start", data),

  // 停止跟单
  stopCopy: (copyId: string) =>
    apiClient.post<void>(`/copy-trading/${copyId}/stop`),

  // 暂停跟单
  pauseCopy: (copyId: string) =>
    apiClient.post<void>(`/copy-trading/${copyId}/pause`),

  // 恢复跟单
  resumeCopy: (copyId: string) =>
    apiClient.post<void>(`/copy-trading/${copyId}/resume`),

  // 修改跟单设置
  updateCopy: (copyId: string, data: Partial<CopyTrade>) =>
    apiClient.patch<CopyTrade>(`/copy-trading/${copyId}`, data),

  // 获取跟单历史
  getCopyHistory: (copyId: string) =>
    apiClient.get<CopyTradeHistory[]>(`/copy-trading/${copyId}/history`),

  // 申请成为交易员
  applyAsTrader: (data: {
    strategy: string;
    description: string;
  }) => apiClient.post<{ status: string }>("/copy-trading/apply", data),

  // 获取交易员管理信息
  getTraderManagement: () =>
    apiClient.get<{
      isTrader: boolean;
      status: string;
      followers: number;
      totalCopiers: number;
      commissionEarned: number;
    }>("/copy-trading/trader-management"),
};
