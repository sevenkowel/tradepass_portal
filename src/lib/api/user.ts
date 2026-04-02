/**
 * User API - 用户相关接口
 */

import { apiClient } from "./client";
import {
  User,
  UserProfile,
  UserSecurity,
  LoginDevice,
  Ticket,
  TicketMessage,
  FAQ,
  Task,
  Promotion,
  Reward,
  Announcement,
  PaginatedResponse,
} from "@/lib/types";

export const userApi = {
  // 获取当前用户
  getCurrentUser: () => apiClient.get<User>("/user/me"),

  // 更新用户信息
  updateProfile: (data: Partial<UserProfile>) =>
    apiClient.patch<User>("/user/profile", data),

  // 修改密码
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post<void>("/user/change-password", data),

  // 启用/禁用 2FA
  toggle2FA: (enabled: boolean) =>
    apiClient.post<{ qrCode?: string; backupCodes?: string[] }>("/user/2fa", { enabled }),

  // 获取登录设备
  getLoginDevices: () => apiClient.get<LoginDevice[]>("/user/devices"),

  // 移除登录设备
  removeDevice: (deviceId: string) =>
    apiClient.delete<void>(`/user/devices/${deviceId}`),

  // 获取安全设置
  getSecuritySettings: () => apiClient.get<UserSecurity>("/user/security"),

  // KYC 相关
  getKycStatus: () => apiClient.get<{ status: string; submittedAt?: string; reviewedAt?: string }>("/user/kyc"),
  submitKyc: (data: FormData) => apiClient.upload<void>("/user/kyc", data),

  // 工单相关
  getTickets: (params?: { status?: string; page?: number }) =>
    apiClient.get<PaginatedResponse<Ticket>>("/user/tickets", params),
  getTicketDetails: (ticketId: string) =>
    apiClient.get<Ticket>(`/user/tickets/${ticketId}`),
  createTicket: (data: { subject: string; category: string; priority: string; content: string }) =>
    apiClient.post<Ticket>("/user/tickets", data),
  replyTicket: (ticketId: string, data: { content: string }) =>
    apiClient.post<TicketMessage>(`/user/tickets/${ticketId}/reply`, data),

  // FAQ
  getFAQs: (params?: { category?: string }) =>
    apiClient.get<FAQ[]>("/user/faqs", params),

  // 任务相关
  getTasks: () => apiClient.get<Task[]>("/user/tasks"),
  claimTaskReward: (taskId: string) =>
    apiClient.post<void>(`/user/tasks/${taskId}/claim`),

  // 活动相关
  getPromotions: () => apiClient.get<Promotion[]>("/user/promotions"),
  getRewards: (params?: { page?: number }) =>
    apiClient.get<PaginatedResponse<Reward>>("/user/rewards", params),

  // 公告
  getAnnouncements: () => apiClient.get<Announcement[]>("/user/announcements"),
  markAnnouncementRead: (id: string) =>
    apiClient.post<void>(`/user/announcements/${id}/read`),

  // 仪表盘数据
  getDashboardData: () => apiClient.get("/user/dashboard"),
};
