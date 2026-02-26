# 🌸 富士樱花路跑 Fuji Sakura Run

<div align="center">
  <img src="https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2076&auto=format&fit=crop" alt="Sakura" width="100%" height="300" style="object-fit: cover; border-radius: 10px;"/>
  
  <h3>「終點不會逃走，只有心會退縮」</h3>
  <p>專為櫻花季打造的線上路跑活動平台</p>
</div>

---

## 📋 目錄

- [專案簡介](#專案簡介)
- [功能特色](#功能特色)
- [技術架構](#技術架構)
- [UI 展示](#ui-展示)
- [專案結構](#專案結構)
- [安裝與執行](#安裝與執行)
- [n8n 自動化功能](#n8n-自動化功能)
- [測試](#測試)

---

## 🎯 專案簡介

**富士櫻花路跑**是一個結合櫻花季節與跑步運動的線上活動平台。此專案採用**完整前後端分離架構**，提供用戶追蹤跑步記錄、探索櫻花路線、參與社群互動等功能。

### 主要目標
- 🏃 記錄和追蹤個人跑步數據
- 🗺️ 發掘台灣各地的櫻花路線
- 👥 建立跑步愛好者社群
- 📊 提供數據可視化與統計分析
- 🎖️ 激勵系統（積分、徽章、打卡）
- 🤖 自動化數據同步與管理（n8n)

---

## ✨ 功能特色

### 🏠 首页功能
- **Hero 区块**：展示赛事资讯与奖牌介绍
- **Header 导航栏**：
  - 快速跳转至报名流程区块
  - 追樱路线 & 练跑基地导航
  - 留言区连结
  - 响应式设计，支持移动设备
- **报名流程**：清晰的四步骤报名指引
- **知识专区**：跑步训练指南、健康知识
- **路线地图**：
  - 台湾各地樱花路线推荐
  - GPS 路线查看功能
  - Google 地图整合，点击查看详细位置
  - 互动式地图 Modal
- **社群留言板**：跑友分享与互动
- **樱花返回顶部按钮**：
  - 固定在页面右下角
  - 带有樱花图标装饰
  - 平滑滚动动画

### 👤 个人专区 (自律表 Dashboard)

#### 登入体验
- **登入弹窗**：进入即显示精美的登入界面
- **报名确认弹窗**：登入後自动显示
  - 显示已报名的赛事资讯
  - 比赛日期：2026/03/14 - 03/19
  - 半马富士山路跑确认

#### 第一个标签：跑步路线
- **地区选择**：
  - 北部（台北市、新北市）
  - 中部（台中市、彰化县）
  - 南部（台南市、高雄市）
- **城市筛选**：按地区展示不同城市
- **路线卡片**：
  - 半透明设计，显示路线名称和预估公里数
  - 点击选择後卡片高亮显示
  - 支持多选路线
  - 精美的图片展示
- **流程控制**：
  - 必须先选择路线才能进入其他标签
  - 未选择路线时其他标签为 disabled 状态
  - 点击「下一步」按钮确认选择

#### 第二个标签：记录跑步时光
- **GPS 追踪功能**：
  - Start 按钮启动 GPS 追踪
  - 实时显示追踪时间
  - 停止後自动记录跑步数据
- **TATTA APP 连结**：提示可连接外部应用
- **我的路跑统计**：
  - 累积路跑里程
  - 总运动时数
  - 训练次数统计
- **今日打卡系统**：
  - 显示当前日期
  - 每日打卡按钮
  - 打卡後按钮变色显示已完成
- **智慧路跑管家**：
  - n8n 自动化整合
  - 同步跑步记录功能
  - 训练历程自动更新
- **训练历程列表**：
  - 显示每次跑步的详细记录
  - 路线名称、距离、时间、配速
  - 时间序排列

#### 第三个标签：数据分析
- **统计卡片**：
  - 平均配速
  - 总训练次数
  - 最长距离
  - 总卡路里消耗
- **数据可视化**（ECharts）：
  - **每日跑步里程折线图**：
    - 显示最近 7 天的跑步里程
    - 平滑曲线
    - 区域填充效果
    - 互动式 Tooltip
  - **配速分布饼图**：
    - 轻松跑、耐力跑、节奏跑分类
    - 环形图设计
    - 百分比显示
  - **月度训练统计柱状图**：
    - 每周累积里程展示
    - 渐变色柱状图
    - 清晰的数据对比

### 🌐 社群功能
- 发布路跑心得
- 查看其他跑者分享
- 评论与互动

---

## 🛠️ 技术架构

### 前端技术栈

#### React 技术（从基础到应用）

1. **基础技术**
   - React 18.3.1：核心框架
   - TypeScript 5.3.0：类型安全
   - React Hooks：
     - `useState`: 状态管理
     - `useEffect`: 副作用处理
     - `useRef`: DOM 引用

2. **状态管理**
   - React Context API：全局状态共享
   - Local State：组件内部状态
   - Props Drilling：组件间数据传递

3. **UI 组件开发**
   - 函数式组件设计
   - 组件化架构
   - Props 接口设计
   - 条件渲染
   - 列表渲染与 Key 优化

4. **进阶应用**
   - Modal 组件封装
   - 自定义 Hooks
   - 性能优化（避免不必要的重渲染）
   - 事件处理与表单控制

5. **样式技术**
   - **Tailwind CSS 3.4**：
     - Utility-first CSS 框架
     - 响应式设计（sm, md, lg, xl 断点）
     - 自定义配置
     - Dark mode 支持
     - 动画效果（transition, transform, animate）
   - **模块化样式**：
     - 组件级样式封装
     - 条件样式类名
     - 动态样式绑定

6. **图标系统**
   - Lucide React 0.563.0：
     - 丰富的图标库
     - Tree-shaking 优化
     - TypeScript 支持

7. **数据可视化**
   - **ECharts 5.5.1**：企业级图表库
   - **echarts-for-react 3.0.2**：React 封装
   - 图表类型：
     - 折线图（Line Chart）
     - 柱状图（Bar Chart）
     - 饼图（Pie Chart）
   - 特性：
     - 响应式设计
     - 互动式 Tooltip
     - 渐变色填充
     - 动画效果

8. **HTTP 通信**
   - Axios 1.6.0：HTTP 客户端
   - Fetch API：原生请求
   - RESTful API 整合

9. **构建工具**
   - **Vite 7.3.1**：
     - 极速的开发服务器
     - Hot Module Replacement (HMR)
     - 优化的生产构建
     - TypeScript 原生支持
     - ESM 优先

10. **测试框架**
    - Jest 29.7.0：测试运行器
    - React Testing Library 14.0.0：组件测试
    - 单元测试
    - 集成测试

### 後端技术栈（Python）

1. **Web 框架**
   - **FastAPI**：
     - 现代化的 Python Web 框架
     - 自动 API 文档生成（Swagger UI）
     - 基於 ASGI 的异步处理
     - 类型提示支持
     - 高性能

2. **数据验证**
   - **Pydantic**：
     - 数据模型定义
     - 自动验证
     - JSON Schema 生成
     - 类型安全

3. **HTTP 服务器**
   - **Uvicorn**：
     - ASGI 服务器
     - 支持异步处理
     - WebSocket 支持

4. **安全性**
   - Hashlib (SHA-256)：密码加密
   - CORS 跨域处理
   - HTTPBearer 认证

5. **数据库**
   - 开发环境：内存数据库（Python Dictionary）
   - 生产环境：可扩展至 PostgreSQL / MongoDB
   - ORM：SQLAlchemy（可选）

6. **测试**
   - **Pytest**：
     - 单元测试
     - API 端点测试
     - Fixture 支持

7. **API 设计**
   - RESTful API 架构
   - JSON 数据格式
   - 状态码规范
   - 错误处理机制

---

## 🤖 n8n 自动化功能

### n8n 整合说明

n8n 是一个开源的工作流自动化工具，在本专案中用於实现以下功能：

### 1. **智慧路跑管家**
- **功能描述**：自动同步跑步数据
- **实现方式**：
  - 通过 Webhook 触发 n8n 工作流
  - 自动抓取用户的跑步记录
  - 同步至平台数据库
  - 更新训练历程显示

### 2. **数据同步流程**
```
用户点击「立即同步」
    ↓
发送 HTTP POST 至 n8n Webhook
    ↓
n8n 处理数据（2秒模拟）
    ↓
返回同步结果
    ↓
前端更新显示
```

### 3. **自动化场景**
- **下班夜跑提醒**：
  - 定时任务触发
  - 推荐合适路线
  - 发送通知
- **GA4 数据导出**：
  - 自动追踪 GPS 数据
  - 导出至 Google Analytics 4
  - 生成训练报表
- **成就解锁通知**：
  - 监测里程达成
  - 自动发送成就通知

### 4. **n8n Workflow 设置**
```javascript
// Webhook 节点配置
{
  "method": "POST",
  "path": "/sync-run-data",
  "responseMode": "onReceived"
}

// HTTP Request 节点
{
  "url": "{{YOUR_N8N_WEBHOOK_URL}}",
  "method": "POST",
  "body": {
    "userId": "{{$json.userId}}",
    "runData": "{{$json.logs}}"
  }
}
```

### 5. **环境配置**
在 `.env` 文件中设置：
```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/YOUR_WEBHOOK_ID
```

---

## 🖼️ UI 展示

### 首页
![首页展示](./docs/screenshots/homepage.png)
- Hero 区块展示
- 响应式 Header 导航
- 樱花飘落动画效果

### 个人专区 - 路线选择
![路线选择](./docs/screenshots/routes.png)
- 地区与城市筛选
- 路线卡片展示
- 多选互动效果

### 个人专区 - 数据分析
![数据分析](./docs/screenshots/analytics.png)
- ECharts 折线图
- 饼图与柱状图
- 统计卡片展示

### GPS 地图 Modal
![GPS地图](./docs/screenshots/gps-modal.png)
- Google 地图整合
- 路线详细资讯
- 外部链接功能

---

## 📁 专案结构

```
fuji-sakura-run/
├── frontend/
│   ├── src/
│   │   ├── components/          # React 组件
│   │   │   ├── Header.tsx       # 导航栏组件
│   │   │   ├── SakuraFalling.tsx # 樱花动画
│   │   │   ├── Dashboard.tsx    # 仪表板（已弃用）
│   │   │   ├── Community.tsx    # 社群组件
│   │   │   ├── BoardSection.tsx # 留言板区块
│   │   │   ├── GPSTracker.tsx   # GPS 追踪器
│   │   │   └── ...
│   │   ├── pages/               # 页面组件
│   │   │   ├── HomePage.tsx     # 首页
│   │   │   ├── LoginPage.tsx    # 登入页
│   │   │   └── SelfDisciplinePage.tsx # 个人专区（重构後）
│   │   ├── services/            # API 服务
│   │   │   └── api.ts          # API 调用函数
│   │   ├── store/              # 状态管理
│   │   │   └── CommunityContext.tsx
│   │   ├── types/              # TypeScript 类型定义
│   │   │   ├── index.ts
│   │   │   └── globals.d.ts
│   │   ├── constants/          # 常量定义
│   │   │   └── index.ts
│   │   ├── assets/             # 静态资源
│   │   │   └── images/
│   │   ├── __tests__/          # 测试文件
│   │   ├── App.tsx             # 根组件
│   │   ├── index.tsx           # 入口文件
│   │   └── index.css           # 全局样式
│   ├── public/                 # 公共资源
│   ├── package.json            # 依赖配置
│   ├── tsconfig.json           # TypeScript 配置
│   ├── vite.config.ts          # Vite 配置
│   ├── tailwind.config.js      # Tailwind CSS 配置
│   ├── postcss.config.js       # PostCSS 配置
│   └── jest.config.ts          # Jest 测试配置
│
├── backend/
│   ├── main.py                 # API 路由定义与主应用
│   ├── models.py               # Pydantic 数据模型
│   ├── database.py             # 数据库操作
│   ├── test_main.py            # 後端 API 端点测试
│   ├── test_models.py          # 模型测试
│   ├── test_database.py        # 数据库测试
│   ├── requirements.txt        # Python 依赖
│   └── requirements-test.txt   # 测试依赖
│
├── README.md                   # 专案说明文档
├── REFACTOR_SUMMARY.md         # 重构总结
├── .env.example                # 环境变量范例
├── start.bat                   # Windows 启动脚本
└── start.sh                    # Unix/Linux 启动脚本
```

---

## 🚀 安装与执行

### 前置需求
- Node.js 18+ 
- Python 3.9+
- npm 或 yarn
- Git

### 1. 克隆专案
```bash
git clone https://github.com/your-username/fuji-sakura-run.git
cd fuji-sakura-run
```

### 2. 前端安装与启动

```bash
# 安装依赖
npm install

# 或使用 yarn
yarn install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

前端将在 `http://localhost:5173` 运行

### 3. 後端安装与启动

#### Windows
```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 启动服务器
python -m uvicorn main:app --reload
```

#### macOS / Linux
```bash
cd backend

# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 启动服务器
python -m uvicorn main:app --reload
```

後端将在 `http://localhost:8000` 运行

API 文档：`http://localhost:8000/docs`

### 4. 使用启动脚本（推荐）

#### Windows
```bash
.\start.bat
```

#### macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

启动脚本会自动：
- 检查 Python 和 Node.js 版本
- 创建虚拟环境
- 安装依赖
- 同时启动前後端服务器

---

## 🧪 测试

### 前端测试
```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm test -- --coverage

# 监视模式
npm test -- --watch
```

### 後端测试
```bash
cd backend

# 安装测试依赖
pip install -r requirements-test.txt

# 运行测试
pytest

# 生成覆盖率报告
pytest --cov=. --cov-report=html
```

---

## 📊 数据流程图

```
┌─────────────┐
│   用户界面   │
│  (React App) │
└──────┬──────┘
       │
       │ HTTP/REST
       │
┌──────▼──────┐      ┌──────────┐
│  FastAPI    │◄────►│ Database │
│   Backend   │      └──────────┘
└──────┬──────┘
       │
       │ Webhook
       │
┌──────▼──────┐      ┌──────────┐
│     n8n     │◄────►│   GA4    │
│  Automation │      │Analytics │
└─────────────┘      └──────────┘
```

---

## 🔧 环境配置

创建 `.env` 文件：

```env
# 前端环境变量
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=富士樱花路跑

# n8n Webhook URL（选填）
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/YOUR_ID

# Google Maps API Key（用於地图功能）
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**获取 Google Maps API Key**：
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新专案或选择现有专案
3. 启用 Maps JavaScript API 和 Maps Embed API
4. 创建 API 密钥
5. 设置 API 密钥限制（HTTP referrer）

---

## 🎨 设计特色

### 视觉设计
- **配色方案**：
  - 主色：Pink (#ec4899)
  - 辅助色：Indigo (#6366f1)
  - 中性色：Slate 系列
- **字体**：
  - 系统字体堆叠
  - 支持中文优化
- **动画效果**：
  - Tailwind 原生动画
  - 平滑过渡效果
  - Hover 互动反馈

### 响应式设计
- Mobile First 方法
- 断点设置：
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### 用户体验
- 直觉式导航
- 快速反馈
- 流畅的动画过渡
- 无障碍设计（Accessibility）

---

## 📝 开发规范

### TypeScript 规范
- 使用接口定义 Props
- 避免使用 `any` 类型
- 善用类型推导
- 组件 Props 必须定义类型

### React 规范
- 函数式组件优先
- Hooks 使用规范
- 避免不必要的重渲染
- 合理拆分组件

### 样式规范
- Tailwind Utility Classes
- 避免内联样式（除非动态）
- 保持样式一致性
- 响应式优先

---

## 🚧 未来规划

- [ ] 增加更多图表类型
- [ ] 实现实时 GPS 追踪
- [ ] 加入社交分享功能
- [ ] 开发移动端 App
- [ ] 多语言支持（i18n）
- [ ] PWA 支持
- [ ] 深色模式
- [ ] 用户成就系统
- [ ] 排行榜功能

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 此专案
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 授权条款

MIT License

---

## 📧 联系方式

专案维护者：[Your Name]
- Email: your.email@example.com
- GitHub: [@your-username](https://github.com/your-username)

---

## 🙏 致谢

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [ECharts](https://echarts.apache.org/)
- [Lucide Icons](https://lucide.dev/)
- [n8n](https://n8n.io/)
- [Unsplash](https://unsplash.com/) - 图片来源

---

<div align="center">
  <p>Made with ❤️ and 🌸</p>
  <p>© 2026 富士樱花路跑专案</p>
</div>
