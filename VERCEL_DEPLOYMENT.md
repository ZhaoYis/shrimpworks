# Vercel 部署指南

## 架构概述

ShrimpWorks 采用微服务架构，包含三个主要服务：

```
┌─────────────────────────────────────────────────────────────────┐
│                     Vercel (Edge Network)                        │
│                                                                  │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │                 Web (Next.js 14)                         │  │
│    │              Static + SSR Pages                          │  │
│    └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTP API Calls
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              Railway / Fly.io / Render                          │
│                                                                  │
│    ┌───────────────────┐      ┌───────────────────┐            │
│    │  API (NestJS)     │──────│  Worker (BullMQ)  │            │
│    │  Port: 3001       │      │  Queue Consumer   │            │
│    └───────────────────┘      └───────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
         │                              │
         │                              │
         ▼                              ▼
┌─────────────────┐          ┌─────────────────┐
│   PostgreSQL    │          │      Redis      │
│ (Neon/Supabase) │          │   (Upstash)     │
└─────────────────┘          └─────────────────┘
```

## 部署方案

### 方案 A: Vercel + Railway（推荐）

| 服务 | 平台 | 成本 |
|------|------|------|
| Web | Vercel Hobby | 免费 |
| API | Railway | $5/月起 |
| Worker | Railway | $5/月起 |
| PostgreSQL | Neon | 免费额度 |
| Redis | Upstash | 免费额度 |

### 方案 B: Vercel + Fly.io

| 服务 | 平台 | 成本 |
|------|------|------|
| Web | Vercel Hobby | 免费 |
| API | Fly.io | ~$3/月 |
| Worker | Fly.io | ~$3/月 |
| PostgreSQL | Neon | 免费额度 |
| Redis | Upstash | 免费额度 |

---

## 部署步骤

### 第一步：准备数据库和 Redis

#### 1. 创建 Neon PostgreSQL

```bash
# 访问 https://neon.tech 创建账号
# 创建新项目，获取连接字符串
```

连接字符串格式：
```
postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

#### 2. 创建 Upstash Redis

```bash
# 访问 https://upstash.com 创建账号
# 创建 Redis 数据库
# 复制连接信息
```

---

### 第二步：部署 API 和 Worker

#### 选择 Railway（推荐）

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 创建项目
railway init

# 部署 API
railway up --config railway.toml

# 在另一个服务中部署 Worker
railway up --config railway.worker.toml
```

#### 或选择 Fly.io

```bash
# 安装 Fly CLI
curl -L https://fly.io/install.sh | sh

# 登录
fly auth login

# 部署 API
fly launch --config fly.api.toml

# 部署 Worker
fly launch --config fly.worker.toml
```

#### 配置环境变量

在 Railway/Fly.io 控制台设置：

```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
API_PORT=3001
API_PREFIX=api/v1
ANTHROPIC_API_KEY=sk-ant-...
LLM_PROVIDER=anthropic
LLM_MODEL=claude-sonnet-4-6
```

#### 运行数据库迁移

```bash
# Railway
railway run npx prisma migrate deploy

# Fly.io
fly ssh console -C "npx prisma migrate deploy"
```

---

### 第三步：部署 Web 到 Vercel

#### 1. 连接 Git 仓库

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New" → "Project"
3. 导入你的 Git 仓库

#### 2. 配置项目

| 设置 | 值 |
|------|-----|
| Root Directory | `./` |
| Framework Preset | Next.js |
| Build Command | `pnpm build:web` |
| Output Directory | `apps/web/.next` |
| Install Command | `pnpm install` |

#### 3. 设置环境变量

```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

#### 4. 部署

点击 "Deploy" 按钮，等待构建完成。

---

## 环境变量清单

### Web (Vercel)

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | API 地址 | `https://api.example.com/api/v1` |
| `NEXT_PUBLIC_APP_URL` | 应用地址 | `https://app.example.com` |

### API (Railway/Fly.io)

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `DATABASE_URL` | ✅ | PostgreSQL 连接字符串 |
| `REDIS_URL` | ✅ | Redis 连接字符串 |
| `JWT_SECRET` | ✅ | JWT 签名密钥 |
| `JWT_EXPIRES_IN` | ✅ | Token 过期时间 |
| `API_PORT` | ✅ | API 端口 |
| `API_PREFIX` | ✅ | API 路由前缀 |
| `ANTHROPIC_API_KEY` | ✅ | Claude API Key |
| `LLM_PROVIDER` | | LLM 提供商 |
| `LLM_MODEL` | | 使用的模型 |

### Worker (Railway/Fly.io)

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `DATABASE_URL` | ✅ | PostgreSQL 连接字符串 |
| `REDIS_URL` | ✅ | Redis 连接字符串 |
| `ANTHROPIC_API_KEY` | ✅ | Claude API Key |

---

## 自定义域名

### Vercel

1. 在项目设置中添加域名
2. 配置 DNS 记录
3. 自动启用 HTTPS

### Railway

```bash
railway domain add api.yourdomain.com
```

### Fly.io

```bash
fly certs add api.yourdomain.com
```

---

## 监控和日志

### Vercel Analytics

启用 Analytics 和 Speed Insights

### Railway

```bash
railway logs
```

### Fly.io

```bash
fly logs
```

---

## 成本估算

### Hobby/免费方案

| 服务 | 提供商 | 月成本 |
|------|--------|--------|
| Web | Vercel Hobby | $0 |
| API | Railway | $5 |
| Worker | Railway | $5 |
| PostgreSQL | Neon Free | $0 |
| Redis | Upstash Free | $0 |
| **总计** | | **~$10/月** |

### 生产方案

| 服务 | 提供商 | 月成本 |
|------|--------|--------|
| Web | Vercel Pro | $20 |
| API | Railway | $20 |
| Worker | Railway | $20 |
| PostgreSQL | Neon Pro | $19 |
| Redis | Upstash Pay-as-you-go | $10 |
| **总计** | | **~$90/月** |

---

## 故障排查

### 构建失败

```bash
# 本地测试构建
pnpm install
pnpm build
```

### 数据库连接问题

检查 `DATABASE_URL` 格式和 SSL 设置。

### Worker 无法连接 Redis

确保 `REDIS_URL` 正确，防火墙允许访问。

---

## 回滚

### Vercel

在 Vercel Dashboard 中选择之前的部署版本进行回滚。

### Railway

```bash
railway rollback
```

### Fly.io

```bash
fly deploy --rollback
```
