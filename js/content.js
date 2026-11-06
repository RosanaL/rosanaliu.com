/* Everything personal on the site lives in this file.
   To add a project: copy one block in ITEMS, give it a zone and a spot on the map.
   To publish an article: set `article` to a page in /notes and change rarity to "note". */

const SITE = {
  name: "Rosana Liu",
  links: {
    github: "https://github.com/RosanaL",
    linkedin: "https://www.linkedin.com/in/rosana-liu-2a8050228/",
    email: "ineed@rosanafixes.it",
  },

  zones: {
    ml: { label: { en: "ML", zh: "ML" }, blurb: { en: "Models, agents and the evals that keep them honest.", zh: "模型、agent，以及让它们说实话的评测。" } },
    aesthetic: { label: { en: "Aesthetic", zh: "Aesthetic" }, blurb: { en: "Things I made mostly because they should look this cute.", zh: "主要是因为它们就该这么可爱才做的东西。" } },
    writing: { label: { en: "Writing", zh: "文章" }, blurb: { en: "Notes from building things for real people.", zh: "给真实的人做东西时记下的笔记。" } },
  },

  rarities: {
    live: { stars: "★★★", label: { en: "Live", zh: "已上线" } },
    soon: { stars: "★★", label: { en: "Launching soon", zh: "即将上线" } },
    proto: { stars: "★★", label: { en: "Prototype", zh: "原型" } },
    study: { stars: "★", label: { en: "Study", zh: "课程/研究" } },
    draft: { stars: "✎", label: { en: "Drafting", zh: "写作中" } },
    note: { stars: "✎", label: { en: "Note", zh: "文章" } },
  },

  /* Signposts. The purple letters spell something if you visit all five. */
  signs: [
    { id: "home", x: 1190, y: 1250, parts: ["Ho", "m", "e Beach"], zh: "出生点" },
    { id: "ml", x: 950, y: 890, parts: ["Model ", "I", "sle"], zh: "ML 岛" },
    { id: "aesthetic", x: 1590, y: 960, parts: ["", "A", "esthetic Garden"], zh: "Aesthetic 花园" },
    { id: "writing", x: 1405, y: 590, parts: ["Notebook ", "T", "ower"], zh: "文章塔" },
    { id: "mail", x: 1400, y: 1590, parts: ["M", "a", "il Dock"], zh: "邮件码头" },
  ],
  eggMessage: "m i a t a <3",

  intro: {
    en: ["Hi, I'm Idow. I look grumpy, but I'm just round.", "This is Rosana's island. Everything Rosana has built is hidden around here as a collectible card."],
    zh: ["你好，我是 Idow。看着不高兴，其实只是圆。", "这是 Rosana 的小岛。Rosana 做过的东西都变成了卡片，藏在岛上。"],
  },

  about: {
    title: { en: "Hi, I'm Rosana.", zh: "你好，我是 Rosana。" },
    body: {
      en: "I build software and train models, and I like both better when they have a personality. My work moves between machine learning, small AI agents and cute things people want to keep. On the side I run Rosana Fixes It, helping small businesses in Orange County get their tech out of the way.",
      zh: "我写软件，也训练模型，并且觉得它们有点性格才好。我做的东西在机器学习、小型 AI agent 和让人想留着的可爱玩意儿之间来回跑。业余还在经营 Rosana Fixes It，帮橙县的小商家解决技术上的麻烦。",
    },
    /* Optional. Sections stay hidden while these are empty.
       timeline entries look like: { when: "2024", what: { en: "...", zh: "..." } } */
    timelineTitle: { en: "So far", zh: "经历" },
    timeline: [],
    skillsTitle: { en: "Tools I reach for", zh: "常用工具" },
    skills: [],
    alsoTitle: { en: "Also built", zh: "其他也做过" },
    also: [
      { name: "eBay Listing Assistant", note: { en: "Browser extension and web form that fill in eBay listings", zh: "帮 eBay 上架自动填表的浏览器扩展和网页表单" } },
      { name: "Vaccination System", note: { en: "Java and SQL scheduling system", zh: "Java 和 SQL 写的预约系统" }, url: "https://github.com/RosanaL/CSE414-vaccination-system" },
      { name: "Texas Hold'em", note: { en: "Course project", zh: "课程项目" }, url: "https://github.com/RosanaL/MATH381-Texas-Hold-em-project" },
    ],
  },

  contact: {
    title: { en: "Send a message in a bottle", zh: "往漂流瓶里塞封信" },
    body: { en: "Hiring, collaborating, or you just have a good seal fact. All welcome.", zh: "招人、合作，或者你只是知道一个很棒的海豹冷知识，都欢迎。" },
    copied: { en: "Copied", zh: "已复制" },
    copy: { en: "Copy", zh: "复制" },
  },

  ui: {
    start: { en: "Let's roll", zh: "出发" },
    skip: { en: "Just show me the work", zh: "直接看作品" },
    next: { en: "Next", zh: "继续" },
    binder: { en: "Card binder", zh: "卡册" },
    all: { en: "All", zh: "全部" },
    open: { en: "Open", zh: "打开" },
    close: { en: "Close", zh: "关闭" },
    prev: { en: "Previous card", zh: "上一张" },
    nextCard: { en: "Next card", zh: "下一张" },
    collected: { en: "collected", zh: "已收集" },
    got: { en: "GOT", zh: "已集" },
    about: { en: "About", zh: "关于我" },
    aboutSpot: { en: "Rosana's hut", zh: "Rosana 的小屋" },
    contact: { en: "Contact", zh: "联系我" },
    contactSpot: { en: "Mailbox", zh: "邮箱" },
    did: { en: "What I did", zh: "我做了什么" },
    hintKeys: { en: "WASD or arrows to move · E to open · Space to roll", zh: "WASD 或方向键移动 · E 打开 · 空格翻滚" },
    hintTouch: { en: "Tap anywhere to roll there", zh: "点哪儿就滚到哪儿" },
    sound: { en: "Sound", zh: "声音" },
    backToIsland: { en: "Back to the island", zh: "回到岛上" },
    secret: { en: "Secret word", zh: "隐藏词" },
    lang: "中文",
    langOther: "EN",
    tagline: { en: "builder of models and cute things", zh: "做模型，也做可爱的东西" },
  },
};

/* Rarity is the project's real status: live, prototype, study, draft. */
const ITEMS = [
  /* ───────── ML ───────── */
  {
    id: "wallet-orb", zone: "ml", rarity: "live", x: 650, y: 590, art: "orb",
    title: { en: "Wallet Orb", zh: "Wallet Orb" },
    flavor: { en: "Person or bot? Ask the orb.", zh: "是人还是机器人？问问水晶球。" },
    summary: {
      en: "Paste a crypto wallet address and read its on-chain story: profit and loss, holdings, activity and the odds it's a bot.",
      zh: "贴一个加密钱包地址，就能读到它的链上故事：盈亏、持仓、活跃情况，以及它是机器人的概率。",
    },
    did: {
      en: ["Trained a Random Forest bot classifier, with rule-based pseudo-labels standing in where no ground truth exists", "Pulled Solana, Ethereum and Bitcoin wallet activity from Dune into a FastAPI backend", "Designed the pixel-art orb and wallet interface"],
      zh: ["训练随机森林机器人分类器，没有真实标签的地方用规则生成伪标签", "用 Dune 拉取 Solana、以太坊和比特币的钱包数据，由 FastAPI 后端提供", "设计了像素风水晶球和钱包界面"],
    },
    stack: ["Python", "scikit-learn", "FastAPI", "Dune", "Next.js"],
    links: [{ label: "wallet-orb.vercel.app", url: "https://wallet-orb.vercel.app" }, { label: "GitHub", url: "https://github.com/RosanaL/wallet-orb" }, { label: "API", url: "https://github.com/RosanaL/wallet-orb-api" }],
    shots: ["assets/shot-walletorb.webp"],
  },
  {
    id: "chirpi", zone: "ml", rarity: "live", x: 880, y: 680, art: "img:assets/chirpi.webp",
    title: { en: "Chirpi", zh: "Chirpi" },
    flavor: { en: "Less planning. More playing.", zh: "少点计划，多打球。" },
    summary: {
      en: "A tiny golf buddy for the group chat. Mention it and it collects everyone's availability, runs a vote and points you to the booking page. An early prototype: the public demo runs on rules in your browser and doesn't send messages or book anything.",
      zh: "住在群聊里的高尔夫小搭子。@ 它，它就收集大家的时间、发起投票、给出订位入口。目前是早期原型：公开演示只在浏览器里按规则运行，不会真的发消息或订位。",
    },
    did: {
      en: ["Split the work so the agent picks actions while deterministic code owns availability, votes, permissions and deadlines", "Built a TypeScript tool harness on Google ADK with strict schemas, call budgets and traces", "Wrote offline regression gates for multi-turn scheduling, cross-chat isolation and forged tool arguments"],
      zh: ["让 agent 只负责选动作，时间、投票、权限和截止时间都由确定性代码掌管", "基于 Google ADK 用 TypeScript 写工具 harness，包含严格 schema、调用预算和 trace", "写了离线回归测试，覆盖多轮排期、跨群隔离和伪造工具参数"],
    },
    stack: ["TypeScript", "Google ADK", "Claude", "Vitest"],
    links: [{ label: "heychirpi.com", url: "https://www.heychirpi.com" }],
    shots: ["assets/shot-chirpi.webp"],
  },
  {
    id: "swing-coach", zone: "ml", rarity: "proto", x: 560, y: 860, art: "swing",
    title: { en: "Swing Coach", zh: "挥杆教练" },
    flavor: { en: "Watches every swing and talks you through it.", zh: "盯着你的每一杆，再开口讲给你听。" },
    summary: {
      en: "A voice coach that watches your golf swing through a laptop camera, works out what happened and tells you about it out loud.",
      zh: "用电脑摄像头看你挥杆的语音教练，看懂发生了什么，然后说给你听。",
    },
    did: {
      en: ["Used MediaPipe pose tracking to spot a swing live and locate takeaway, top, impact and finish", "Computed tempo, hip sway, spine tilt and head movement, then flagged faults with rules that still need calibrating on real data", "Kept the analysis core separate from the voice channel so either can be swapped"],
      zh: ["用 MediaPipe 姿态追踪实时识别挥杆，定位起杆、顶点、击球和收杆", "计算节奏、髋部侧移、脊柱侧倾和头部移动，再用规则判断毛病，阈值还待用真实数据校准", "把分析核心和语音通道解耦，两边都能替换"],
    },
    stack: ["Python", "NumPy", "MediaPipe", "Guava"],
    links: [],
  },
  {
    id: "hisho", zone: "ml", rarity: "proto", x: 320, y: 880, art: "hisho",
    title: { en: "Hisho", zh: "Hisho 秘书" },
    flavor: { en: "A car assistant built to be measured.", zh: "一个生来就要被评测的车载助手。" },
    summary: {
      en: "A hands-free work agent for the commute that handles calendar, email and coursework by voice. It's also an evaluation project: the benchmark and the product run the same agent.",
      zh: "通勤路上用的免手持工作 agent，用语音处理日历、邮件和课业。它同时也是评测项目：benchmark 和产品跑的是同一个 agent。",
    },
    did: {
      en: ["Made it impossible for a consequential action to run without a recorded grant, with the spoken confirmation generated by code instead of the model", "Built a 24-task benchmark on deterministic mock tools, with confidence intervals across versions", "Added an advisory mode as the control arm for the confirmation gate"],
      zh: ["让重要操作必须有记录在案的授权才能执行，确认语由代码生成，而不是模型", "基于确定性模拟工具搭了 24 个任务的 benchmark，版本之间带置信区间对比", "加入 advisory 模式，作为确认机制的对照组"],
    },
    stack: ["Python", "OpenAI", "pytest"],
    links: [],
  },

  /* ───────── Aesthetic ───────── */
  {
    id: "idow", zone: "aesthetic", rarity: "proto", x: 1950, y: 590, art: "img:assets/idow-icon.webp",
    title: { en: "Idow", zh: "Idow" },
    flavor: { en: "Type Chinese. Get English. Meet the seal.", zh: "打中文，出英文，顺便认识一只海豹。" },
    summary: {
      en: "A keyboard for iPhone and a floating helper for Mac: type what you mean in Chinese and pick the English that fits. The round seal started as my own sketch, and now it sleeps on the filing cabinet in my office.",
      zh: "一个 iPhone 键盘加一个 Mac 悬浮小助手：用中文打出你想说的，再挑一句合适的英文。这只圆海豹来自我自己的手稿，现在睡在我办公室的文件柜上。",
    },
    did: {
      en: ["Sketched the seal and developed it into the app icon", "Built the iOS keyboard extension and the Mac bubble that follows your text field", "Let people bring their own model: Claude, DeepSeek, OpenAI, Kimi or Qwen"],
      zh: ["画了海豹的手稿，再一步步发展成 App 图标", "写了 iOS 键盘扩展，以及跟着输入框走的 Mac 小圆点", "支持自带模型：Claude、DeepSeek、OpenAI、Kimi、通义千问"],
    },
    stack: ["Swift", "SwiftUI", "AppKit"],
    links: [],
    shots: ["assets/idow-sketch.webp"],
  },
  {
    id: "rousong", zone: "aesthetic", rarity: "proto", x: 1780, y: 880, art: "rousong",
    title: { en: "Rousong Bing", zh: "肉松饼" },
    flavor: { en: "Shoulders up. Drink some water.", zh: "喝口水，脑袋会亮一点点。" },
    summary: {
      en: "A desktop pet that floats beside your work, reminds you to take a break, and reacts while your coding agents run. When Claude Code or Codex needs permission, the request pops up as a little card.",
      zh: "飘在桌面上的小宠物，提醒你休息，也会跟着你的编程 agent 一起动。Claude Code 或 Codex 需要授权时，请求会变成一张小卡片弹出来。",
    },
    did: {
      en: ["Designed the pet and its animated moods: idle, typing, thinking, happy, alerting and error", "Built the desktop app with Tauri and React, with hooks into Claude Code and Codex", "Wrote a credit system backend with regression tests"],
      zh: ["设计宠物和它的动画情绪：发呆、打字、思考、开心、提醒和出错", "用 Tauri 和 React 做桌面 App，接入 Claude Code 和 Codex 的 hook", "写了额度系统后端和回归测试"],
    },
    stack: ["Tauri", "React", "TypeScript", "Node"],
    links: [],
  },
  {
    id: "curipo", zone: "aesthetic", rarity: "live", x: 1720, y: 680, art: "curipo",
    title: { en: "Curipo", zh: "Curipo" },
    flavor: { en: "Find your AI crew.", zh: "找到你的 AI 小队。" },
    summary: {
      en: "A binder for AI agents with real personalities. Meet one, save it like a trading card, then recommend it to a friend the way you'd recommend a person.",
      zh: "一本收集 AI agent 的卡册，它们都有自己的性格。认识一个，像球星卡一样存起来，再像推荐朋友那样推荐给别人。",
    },
    did: {
      en: ["Shaped the product around a card binder instead of another AI directory", "Designed the agent cards and their characters", "Built it with Next.js, Supabase and Claude"],
      zh: ["把产品做成卡册，而不是又一个 AI 工具导航站", "设计了 agent 卡片和他们的人设", "用 Next.js、Supabase 和 Claude 开发"],
    },
    stack: ["Next.js", "Supabase", "Claude", "Motion"],
    links: [{ label: "curipo-three.vercel.app", url: "https://curipo-three.vercel.app" }, { label: "GitHub", url: "https://github.com/RosanaL/Curipo" }],
    shots: ["assets/shot-curipo.webp"],
  },
  {
    id: "catchpon", zone: "aesthetic", rarity: "proto", x: 2180, y: 680, art: "catchpon",
    title: { en: "Catchpon", zh: "Catchpon" },
    flavor: { en: "Making business fun, one pack at a time.", zh: "把商业行为变得好玩，一包一包来。" },
    summary: {
      en: "Lets local shops publish their own collectible card packs. Customers open a pack with each purchase and collect the store's set, with no sign-up or wallet needed.",
      zh: "让线下小店发布自己的抽卡收藏系统。顾客每消费一次开一包，集一套这家店的卡，不用注册，也不用钱包。",
    },
    did: {
      en: ["Set a cel-shaded style: hard offset shadows and flat color, with no blur anywhere", "Built layered cards so frame, foil and rarity tilt separately from the merchant's art", "Made the top rarity change the paper itself, so you can spot it even as a thumbnail"],
      zh: ["定下赛璐璐画风：硬边偏移阴影、平涂色块，全程不用模糊", "把卡牌分层，让卡框、闪箔、稀有度能和商家的画面分开运动", "最高稀有度直接换卡纸，缩略图大小也认得出来"],
    },
    stack: ["Next.js", "Drizzle", "Tailwind"],
    /* Put back with rarity "live" once catchpon.com stops showing "Request failed":
       links: [{ label: "catchpon.com", url: "https://catchpon.com" }], */
    links: [],
  },
  {
    id: "chain-explorer", zone: "aesthetic", rarity: "proto", x: 2040, y: 880, art: "chain",
    title: { en: "Chain Explorer", zh: "链上探索" },
    flavor: { en: "On-chain data, but make it blossom.", zh: "链上数据，也可以开花。" },
    summary: {
      en: "A soft, flowery dashboard for looking up wallets and tokens. Paste an address and read balances, transfers, price and volume at a glance. It's also where my pixel coin started.",
      zh: "一个柔和带花的看板，用来查钱包和代币。贴上地址，余额、转账、价格和交易量一眼看清。我的像素硬币也诞生在这里。",
    },
    did: {
      en: ["Designed a rose and mint dashboard for a subject that's usually all black terminals", "Connected wallet and token views to the Dune API", "Drew the animated pixel coin"],
      zh: ["给通常是黑底终端风的题材设计了玫瑰和薄荷色的看板", "把钱包和代币视图接到 Dune API", "画了会动的像素硬币"],
    },
    stack: ["React", "Vite", "Tailwind", "Recharts"],
    links: [],
  },
  {
    id: "jewelry", zone: "aesthetic", rarity: "proto", x: 1950, y: 1090, art: "jewelry",
    title: { en: "Ran Jewelry Studio", zh: "Ran 首饰工作室" },
    flavor: { en: "Y2K piercings. DM to order.", zh: "Y2K 穿孔首饰，私信下单。" },
    summary: {
      en: "A storefront for Y2K piercing jewelry, with a scrolling marquee, new drops and an order flow that ends in an Instagram DM.",
      zh: "一个 Y2K 风穿孔首饰的店铺网站，有滚动跑马灯和上新区，下单流程通向 Instagram 私信。",
    },
    did: {
      en: ["Art-directed the Y2K look", "Wrote it as a dependency-free site in plain HTML, CSS and JavaScript", "Kept the catalog in one config so products are easy to change"],
      zh: ["定下 Y2K 的视觉风格", "用纯 HTML、CSS、JavaScript 写成，没有任何依赖", "商品都放在一个配置里，改起来很方便"],
    },
    stack: ["HTML", "CSS", "JavaScript"],
    links: [],
  },

  {
    id: "rosana-fixes-it", zone: "aesthetic", rarity: "live", x: 2270, y: 880, art: "fixes",
    title: { en: "Rosana Fixes It", zh: "Rosana Fixes It" },
    flavor: { en: "I fix the tech, so you can run the business.", zh: "技术我来修，生意你来做。" },
    summary: {
      en: "My tech help practice for small businesses in Orange County: workflow automation, AI assistants and hands-on fixes. The site is warm and pixel-drawn, with a small version of me waiting at the door.",
      zh: "我给橙县小商家做的技术服务：流程自动化、AI 助手，以及上门解决问题。网站是暖色的像素风，门口站着一个小小的我。",
    },
    did: {
      en: ["Designed and wrote the whole site in plain HTML and CSS, including services, case studies and a client review form", "Built a tool for a golf coach that turns full lesson recordings into one clip per swing", "Run the practice myself, from the first call to support after the project ends"],
      zh: ["用纯 HTML 和 CSS 设计并写完整个网站，包括服务、案例和客户评价表单", "给一位高尔夫教练做了工具，把整节课的录像切成一杆一个片段", "从第一通电话到项目结束后的支持，都是我自己在做"],
    },
    stack: ["HTML", "CSS", "Automation"],
    links: [{ label: "rosanafixes.it", url: "https://rosanafixes.it" }],
    shots: ["assets/shot-fixes.webp"],
  },

  /* ───────── Writing ─────────
     Still a draft, so only the title and summary are public. */
  {
    id: "golf-clips", zone: "writing", rarity: "draft", x: 1170, y: 500, art: "notebook",
    title: { en: "An Hour of Golf, 40 Seconds of Swings", zh: "一小时高尔夫，40 秒挥杆" },
    flavor: { en: "What counts as a swing, anyway?", zh: "到底什么才算一次挥杆？" },
    summary: {
      en: "What I learned cutting an hour of golf footage down to 40 seconds. A coach asked for a way to pull swings out of lesson videos. The hard part wasn't finding the swings. It was deciding what counts as one.",
      zh: "把一小时高尔夫录像剪成 40 秒，我学到了什么。一位教练想从课程录像里抽出挥杆片段。难的不是找到挥杆，而是决定什么才算一次挥杆。",
    },
    did: { en: ["I'm still writing this one. Check back soon."], zh: ["这篇还在写，过阵子再来看看。"] },
    stack: ["Build notes"],
    links: [],
  },
];
