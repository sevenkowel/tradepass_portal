/**
 * TradePass Portal 类型定义
 * 包含所有模块的核心数据类型
 */

// ============================================================================
// 基础类型
// ============================================================================

export type AccountType = "Real" | "Demo";
export type TransactionType = "deposit" | "withdraw" | "transfer" | "fee" | "commission";
export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled";
export type OrderType = "market" | "limit" | "stop" | "stop_limit";
export type OrderStatus = "open" | "closed" | "cancelled" | "pending";
export type PositionType = "buy" | "sell";
export type SignalDirection = "BUY" | "SELL";
export type KycStatus = "unverified" | "pending" | "verified" | "rejected";
export type UserRole = "trader" | "ib" | "sub_ib" | "admin";

// ============================================================================
// 用户相关
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  country: string;
  phone?: string;
  role: UserRole;
  kycStatus: KycStatus;
  createdAt: string;
  lastLoginAt: string;
  twoFactorEnabled: boolean;
  language: string;
  timezone: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phone?: string;
  avatar?: string;
}

export interface UserSecurity {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginDevices: LoginDevice[];
}

export interface LoginDevice {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

// ============================================================================
// 钱包相关
// ============================================================================

export interface Wallet {
  userId: string;
  balance: number;
  equity: number;
  available: number;
  frozen: number;
  currency: string;
  updatedAt: string;
}

export interface WalletOverview {
  balance: number;
  equity: number;
  available: number;
  frozen: number;
  totalDeposit: number;
  totalWithdraw: number;
  totalProfit: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  fromAccount?: string;
  toAccount?: string;
  method?: string;
  network?: string;
  txHash?: string;
  fee: number;
  description?: string;
  createdAt: string;
  completedAt?: string;
}

export interface DepositMethod {
  id: string;
  type: "crypto" | "wire" | "card";
  name: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
  feeType: "fixed" | "percentage";
  processingTime: string;
  currencies: string[];
  networks?: string[];
  isActive: boolean;
}

export interface WithdrawMethod {
  id: string;
  type: "crypto" | "wire";
  name: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
  feeType: "fixed" | "percentage";
  processingTime: string;
  currencies: string[];
  networks?: string[];
  isActive: boolean;
}

export interface CryptoAddress {
  id: string;
  userId: string;
  currency: string;
  network: string;
  address: string;
  label?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  swiftCode?: string;
  iban?: string;
  country: string;
  currency: string;
  isDefault: boolean;
  createdAt: string;
}

// ============================================================================
// 交易账户相关
// ============================================================================

export interface TradingAccount {
  id: string;
  userId: string;
  accountNumber: string;
  type: AccountType;
  server: string;
  leverage: number;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  currency: string;
  profit: number;
  isActive: boolean;
  createdAt: string;
  lastTradeAt?: string;
}

export interface AccountDetails extends TradingAccount {
  openPositions: number;
  pendingOrders: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  averageProfit: number;
  averageLoss: number;
  largestProfit: number;
  largestLoss: number;
}

export interface CreateAccountRequest {
  type: AccountType;
  leverage: number;
  currency: string;
  server: string;
}

// ============================================================================
// 持仓与订单
// ============================================================================

export interface Position {
  id: string;
  accountId: string;
  ticket: number;
  symbol: string;
  type: PositionType;
  volume: number;
  openPrice: number;
  currentPrice: number;
  sl?: number;
  tp?: number;
  swap: number;
  profit: number;
  openTime: string;
  comment?: string;
}

export interface Order {
  id: string;
  accountId: string;
  ticket: number;
  symbol: string;
  type: OrderType;
  direction: PositionType;
  volume: number;
  price: number;
  sl?: number;
  tp?: number;
  status: OrderStatus;
  createdAt: string;
  expiredAt?: string;
  comment?: string;
}

export interface TradeHistory {
  id: string;
  accountId: string;
  ticket: number;
  symbol: string;
  type: PositionType;
  volume: number;
  openPrice: number;
  closePrice: number;
  sl?: number;
  tp?: number;
  swap: number;
  commission: number;
  profit: number;
  openTime: string;
  closeTime: string;
  comment?: string;
}

// ============================================================================
// 跟单交易
// ============================================================================

export interface Trader {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  bio?: string;
  strategy: string;
  roi: number;
  totalReturn: number;
  monthlyReturn: number;
  drawdown: number;
  maxDrawdown: number;
  followers: number;
  copiers: number;
  totalVolume: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  tradesCount: number;
  avgTradeDuration: string;
  isActive: boolean;
  createdAt: string;
  rank?: number;
}

export interface TraderPerformance {
  traderId: string;
  period: string;
  roi: number;
  drawdown: number;
  trades: number;
  winRate: number;
}

export interface CopyTrade {
  id: string;
  userId: string;
  traderId: string;
  trader: Trader;
  allocatedFunds: number;
  currentValue: number;
  profit: number;
  profitPercent: number;
  status: "active" | "paused" | "stopped";
  copyMode: "fixed" | "proportional";
  fixedVolume?: number;
  multiplier?: number;
  maxDrawdown?: number;
  stopLoss?: number;
  takeProfit?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CopyTradeHistory {
  id: string;
  copyTradeId: string;
  traderId: string;
  action: "start" | "stop" | "pause" | "resume" | "modify";
  details: string;
  createdAt: string;
}

// ============================================================================
// AI 信号
// ============================================================================

export interface Signal {
  id: string;
  symbol: string;
  direction: SignalDirection;
  entry: number;
  sl: number;
  tp: number;
  confidence: number;
  timeframe: string;
  strategy: string;
  analysis: string;
  createdAt: string;
  expiredAt?: string;
  status: "active" | "expired" | "triggered" | "cancelled";
  result?: "win" | "loss" | "breakeven";
  actualProfit?: number;
}

export interface SignalUsage {
  userId: string;
  dailyQuota: number;
  usedToday: number;
  totalUsed: number;
  resetTime: string;
  plan: "free" | "basic" | "pro";
}

export interface SignalGenerationRequest {
  symbol: string;
  timeframe: string;
  strategy?: string;
}

// ============================================================================
// IB / 代理
// ============================================================================

export interface IBOverview {
  userId: string;
  totalEarnings: number;
  pendingCommission: number;
  activeClients: number;
  totalClients: number;
  subIBs: number;
  conversionRate: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
}

export interface IBClient {
  id: string;
  userId: string;
  email: string;
  name: string;
  country: string;
  status: "active" | "inactive";
  joinedAt: string;
  lastActiveAt: string;
  totalDeposit: number;
  totalVolume: number;
  commissionGenerated: number;
}

export interface CommissionRecord {
  id: string;
  userId: string;
  clientId: string;
  clientName: string;
  type: "spread" | "rebate" | "bonus";
  amount: number;
  currency: string;
  source: string;
  description?: string;
  createdAt: string;
  status: "pending" | "paid";
}

export interface SubIB {
  id: string;
  userId: string;
  name: string;
  email: string;
  joinedAt: string;
  clientsCount: number;
  totalCommission: number;
}

export interface ReferralLink {
  id: string;
  userId: string;
  code: string;
  url: string;
  qrCode: string;
  clicks: number;
  conversions: number;
  createdAt: string;
}

export interface MarketingMaterial {
  id: string;
  type: "banner" | "landing" | "video" | "image";
  name: string;
  thumbnail: string;
  url: string;
  size?: string;
  language: string;
  createdAt: string;
}

// ============================================================================
// 活动与任务
// ============================================================================

export interface Task {
  id: string;
  type: "kyc" | "deposit" | "trade" | "invite";
  title: string;
  description: string;
  reward: string;
  rewardAmount?: number;
  progress: number;
  target: number;
  status: "pending" | "in_progress" | "completed" | "claimed";
  icon?: string;
  href?: string;
  expiresAt?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: "deposit_bonus" | "trading_bonus" | "rebate" | "contest";
  image?: string;
  startDate: string;
  endDate: string;
  terms: string;
  isActive: boolean;
}

export interface Reward {
  id: string;
  userId: string;
  type: "bonus" | "rebate" | "prize";
  title: string;
  amount: number;
  currency: string;
  source: string;
  status: "pending" | "credited" | "withdrawn";
  createdAt: string;
  creditedAt?: string;
}

// ============================================================================
// 支持工单
// ============================================================================

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  lastReplyAt?: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  sender: "user" | "support";
  content: string;
  attachments?: string[];
  createdAt: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
}

// ============================================================================
// 公告
// ============================================================================

export interface Announcement {
  id: string;
  type: "update" | "promo" | "maintenance" | "alert";
  title: string;
  content: string;
  isImportant: boolean;
  createdAt: string;
  expiresAt?: string;
}

// ============================================================================
// 仪表盘数据
// ============================================================================

export interface DashboardData {
  wallet: WalletOverview;
  accounts: TradingAccount[];
  positions: Position[];
  signals: Signal[];
  topTraders: Trader[];
  tasks: Task[];
  announcements: Announcement[];
  stats: {
    totalBalance: number;
    totalProfit: number;
    openPositions: number;
    winRate: number;
  };
}

// ============================================================================
// API 响应类型
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
