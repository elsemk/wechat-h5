# wechat-h5

微信风格 H5 登录/注册示例项目（React + Node.js + SQLite）。

## 功能

- 账号密码注册
- 账号密码登录
- JWT 鉴权（`/api/auth/profile`）
- 移动端样式适配（H5）

## 技术栈

- 前端：React + Vite + Axios
- 后端：Node.js + Express + SQLite + JWT
- 测试：Jest + Supertest

## 目录结构

```bash
wechat-h5/
  client/   # React 前端
  server/   # Node.js 后端
```

## 本地开发

```bash
# 安装依赖（已分别安装）
cd client && npm i
cd ../server && npm i

# 启动后端（3000）
cd ../server
cp .env.example .env
npm run dev

# 启动前端（开发模式）
cd ../client
npm run dev -- --host
```

## 生产构建与运行

```bash
# 在项目根目录
npm run build
npm start
```

启动后访问：

- 本机：`http://127.0.0.1:3000`
- 外网（本次部署示例）：`http://187.124.10.209:3000`

## API 简要

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`（Bearer Token）
- `GET /api/health`

## 测试

```bash
npm test
```

## 版本

- `v1.0.0`：完成登录/注册、鉴权、自测、外网部署。