# AI Chat Application

基于 Next.js 14 和 Deepseek API 构建的 AI 聊天应用。

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- OpenAI SDK (用于 Deepseek API 调用)

## 功能特点

- 实时 AI 对话
- 多轮对话支持
- 会话历史记录
- 响应式设计
- 优雅的 UI 界面

## 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd ai-chat
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env.local` 文件并添加:
```bash
DEEPSEEK_API_KEY=your_api_key_here
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问应用
打开 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
  ├── app/                 # Next.js 应用目录
  │   ├── page.tsx        # 主页面
  │   └── api/            # API 路由
  │       └── chat/       # 聊天 API 端点
  ├── components/         # React 组件
  │   └── ChatInterface.tsx
  ├── lib/               # 工具和状态管理
  │   └── store.ts
  └── types/             # TypeScript 类型定义
      └── chat.ts
```

## 环境要求

- Node.js 18+
- npm 或 yarn

## 开发说明

- 使用 `npm run dev` 启动开发服务器
- 使用 `npm run build` 构建生产版本
- 使用 `npm run start` 启动生产服务器

## License

MIT
