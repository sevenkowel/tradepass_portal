/**
 * IB / Referral API - 代理相关接口
 */

import { apiClient } from "./client";
import {
  IBOverview,
  IBClient,
  CommissionRecord,
  SubIB,
  ReferralLink,
  MarketingMaterial,
  PaginatedResponse,
} from "@/lib/types";

export const ibApi = {
  // 获取代理总览
  getOverview: () => apiClient.get<IBOverview>("/ib/overview"),

  // 获取客户列表
  getClients: (params?: {
    status?: string;
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<IBClient>>("/ib/clients", params),

  // 获取客户详情
  getClientDetails: (clientId: string) =>
    apiClient.get<IBClient>(`/ib/clients/${clientId}`),

  // 获取佣金记录
  getCommissionRecords: (params?: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<CommissionRecord>>("/ib/commission", params),

  // 获取下级代理列表
  getSubIBs: (params?: { page?: number; pageSize?: number }) =>
    apiClient.get<PaginatedResponse<SubIB>>("/ib/sub-ibs", params),

  // 获取推广链接
  getReferralLinks: () => apiClient.get<ReferralLink[]>("/ib/referral-links"),

  // 创建推广链接
  createReferralLink: (data: { code?: string }) =>
    apiClient.post<ReferralLink>("/ib/referral-links", data),

  // 获取推广素材
  getMarketingMaterials: (params?: { type?: string; language?: string }) =>
    apiClient.get<MarketingMaterial[]>("/ib/marketing-materials", params),
};
