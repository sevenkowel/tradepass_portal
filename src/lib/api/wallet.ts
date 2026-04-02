/**
 * Wallet API - 资金相关接口
 */

import { apiClient } from "./client";
import {
  WalletOverview,
  Transaction,
  PaginatedResponse,
  DepositMethod,
  WithdrawMethod,
  CryptoAddress,
  BankAccount,
} from "@/lib/types";

export const walletApi = {
  // 获取钱包总览
  getOverview: () => apiClient.get<WalletOverview>("/wallet/overview"),

  // 获取资金记录
  getTransactions: (params: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
  }) => apiClient.get<PaginatedResponse<Transaction>>("/wallet/transactions", params),

  // 获取入金方式
  getDepositMethods: () => apiClient.get<DepositMethod[]>("/wallet/deposit-methods"),

  // 创建入金
  createDeposit: (data: {
    methodId: string;
    amount: number;
    currency: string;
    network?: string;
  }) => apiClient.post<{ id: string; address?: string; instructions?: string }>("/wallet/deposit", data),

  // 获取出金方式
  getWithdrawMethods: () => apiClient.get<WithdrawMethod[]>("/wallet/withdraw-methods"),

  // 创建出金
  createWithdraw: (data: {
    methodId: string;
    amount: number;
    currency: string;
    addressId?: string;
    bankAccountId?: string;
    cryptoAddress?: string;
  }) => apiClient.post<{ id: string; status: string }>("/wallet/withdraw", data),

  // 资金划转
  transfer: (data: {
    fromType: "wallet" | "account";
    toType: "wallet" | "account";
    fromId?: string;
    toId?: string;
    amount: number;
  }) => apiClient.post<{ id: string; status: string }>("/wallet/transfer", data),

  // 获取加密货币地址
  getCryptoAddresses: () => apiClient.get<CryptoAddress[]>("/wallet/crypto-addresses"),

  // 添加加密货币地址
  addCryptoAddress: (data: {
    currency: string;
    network: string;
    address: string;
    label?: string;
  }) => apiClient.post<CryptoAddress>("/wallet/crypto-addresses", data),

  // 删除加密货币地址
  deleteCryptoAddress: (id: string) => apiClient.delete<void>(`/wallet/crypto-addresses/${id}`),

  // 获取银行账户
  getBankAccounts: () => apiClient.get<BankAccount[]>("/wallet/bank-accounts"),

  // 添加银行账户
  addBankAccount: (data: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    swiftCode?: string;
    iban?: string;
    country: string;
    currency: string;
  }) => apiClient.post<BankAccount>("/wallet/bank-accounts", data),

  // 删除银行账户
  deleteBankAccount: (id: string) => apiClient.delete<void>(`/wallet/bank-accounts/${id}`),
};
