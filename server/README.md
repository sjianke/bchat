# BChat Server

BChat 即时通讯应用的后端服务器。

## 技术栈

- Node.js
- TypeScript
- Koa
- MySQL
- Prisma
- JWT

## 开始使用

1. 安装依赖
2. 配置环境
3. 开发模式运行
4. 构建生产版本
5. 运行生产版本

## 项目目录

├── src/ # 源代码目录
│ ├── config/ # 配置文件
│ │ ├── database.ts # 数据库配置
│ │ ├── jwt.ts # JWT 配置
│ │ └── index.ts # 配置统一导出
│ │
│ ├── core/ # 核心功能
│ │ ├── base/ # 基础类
│ │ │ ├── Controller.ts
│ │ │ ├── Model.ts
│ │ │ └── Service.ts
│ │ ├── constants/ # 常量定义
│ │ ├── exceptions/ # 异常类
│ │ ├── types/ # 类型定义
│ │ └── container.ts # 依赖注入容器
│ │
│ ├── middleware/ # 中间件
│ │ ├── authentication.ts
│ │ ├── errorHandler.ts
│ │ ├── logger.ts
│ │ └── validator.ts
│ │
│ ├── modules/ # 业务模块
│ │ ├── user/ # 用户模块
│ │ │ ├── constants/
│ │ │ ├── controller.ts
│ │ │ ├── model.ts
│ │ │ ├── service.ts
│ │ │ ├── schema.ts
│ │ │ ├── types.ts
│ │ │ ├── routes.ts
│ │ │ └── index.ts
│ │ └── chat/ # 聊天模块
│ │
│ ├── utils/ # 工具函数
│ │ ├── bcryptHash.ts
│ │ ├── jwtAuthenticator.ts
│ │ └── response.ts
│ │
│ ├── routes/ # 路由配置
│ │ └── index.ts
│ │
│ └── app.ts # 应用入口
│
├── prisma/ # Prisma 配置和迁移
│ ├── schema.prisma
│ └── migrations/
│
├── tests/ # 测试文件
│ ├── unit/
│ └── integration/
│
├── docs/ # 文档
│ ├── API.md
│ └── DATABASE.md
│
├── scripts/ # 脚本文件
│ ├── setup.sh
│ └── deploy.sh
│
├── .env.example # 环境变量示例
├── .eslintrc.js # ESLint 配置
├── .prettierrc # Prettier 配置
├── .gitignore # Git 忽略文件
├── nodemon.json # Nodemon 配置
├── package.json # 项目配置
├── tsconfig.json # TypeScript 配置
└── README.md # 项目说明文档
