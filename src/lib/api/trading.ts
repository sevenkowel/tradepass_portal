/**
 * Trading API - 交易相关接口
 */

import { apiClient } from "./client";
import {
  TradingAccount,
  AccountDetails,
  Position,
  Order,
  TradeHistory,
  CreateAccountRequest,
  PaginatedResponse,
} from "@/lib/types";

export const tradingApi = {
  // 获取账户列表
  getAccounts: (params?: { type?: string }) =>
    apiClient.get<TradingAccount[]>("/trading/accounts", params),

  // 获取账户详情
  getAccountDetails: (accountId: string) =>
    apiClient.get<AccountDetails>(`/trading/accounts/${accountId}`),

  // 创建账户
  createAccount: (data: CreateAccountRequest) =>
    apiClient.post<TradingAccount>("/trading/accounts", data),

  // 重置账户密码
  resetAccountPassword: (accountId: string) =>
    apiClient.post<{ password: string }>(`/trading/accounts/${accountId}/reset-password`),

  // 获取持仓列表
  getPositions: (accountId?: string) =>
    apiClient.get<Position[]>("/trading/positions", accountId ? { accountId } : undefined),

  // 获取订单列表
  getOrders: (params?: { accountId?: string; status?: string }) =>
    apiClient.get<Order[]>("/trading/orders", params),

  // 取消订单
  cancelOrder: (orderId: string) =>
    apiClient.post<void>(`/trading/orders/${orderId}/cancel`),

  // 获取交易历史
  getTradeHistory: (params: {
    accountId?: string;
    startDate?: string;
    endDate?: string;
    symbol?: string;
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<TradeHistory>>("/trading/history", params),

  // 获取 MT5 服务器信息
  getMT5Servers: () =>
    apiClient.get<{ id: string; name: string; type: string; address: string }[]>("/trading/mt5-servers"),
};
