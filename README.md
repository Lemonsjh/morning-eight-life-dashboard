# 早八人续命看板

React + Tailwind CSS + shadcn UI 风格组件的单页前端原型。当前页面连接 Supabase 真表，支持：

- 选择饮品并点击“记录一杯”，写入 `caffeine_logs`
- 新增搬砖任务
- 勾选任务并更新 `todos.is_completed`
- 根据真实日志与任务状态联动顶部数据卡片
- 只输入用户名即可登录；若用户不存在会自动创建，并按 `user_id` 同步个人数据

## 运行

```bash
npm install
npm run dev
```

## Supabase

建表、RLS 原型策略和初始真实数据在 `supabase_schema.sql`。首次连接前，请先在 Supabase SQL Editor 执行该文件。

前端 Supabase 配置通过 `.env` 读取，`.env.example` 只作为模板：

```env
VITE_SUPABASE_URL=你的 Supabase URL
VITE_SUPABASE_PUBLISHABLE_KEY=你的 publishable key
```

当前是前端原型，SQL 中的 RLS 策略允许匿名读写这三张原型表，方便演示。正式上线前需要换成基于 Supabase Auth 的用户隔离策略。

当前登录是原型级“用户名进入工作舱”，不会校验密码；正式上线前需要接入 Supabase Auth。
