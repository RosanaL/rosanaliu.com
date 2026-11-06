/* The script. Project facts come from content.js (summary, did, stack, links);
   this file only stages them: where the case happens and what you find there.
   A clue with `did: n` ends with Rosana reading line n of that project's `did`.
   Scene details are fiction. Facts about the work belong in content.js. */

const CASES = [
  /* ───────── ML ───────── */
  {
    id: "wallet-orb", scene: "fortune", time: "01:12", exhibit: "shot-walletorb",
    place: { en: "Under the railway arch", zh: "高架桥下" },
    open: { en: ["Under the tracks, a fortune teller's table. No fortune teller. Only the orb, still humming."], zh: ["高架桥下，一张算命摊。算命的人不在，只有水晶球还在嗡嗡响。"] },
    clues: [
      { spot: "orb", label: { en: "Crystal orb", zh: "水晶球" }, did: 0, line: { en: "You lean in. Hundreds of tiny decisions flicker inside the glass.", zh: "你凑近一看，玻璃里闪着无数个小小的判断。" } },
      { spot: "ledger", label: { en: "Ledger", zh: "账簿" }, did: 1, line: { en: "A ledger with three columns: Solana, Ethereum, Bitcoin.", zh: "一本账簿，分三栏：Solana、以太坊、比特币。" } },
      { spot: "wallet", label: { en: "Wallet", zh: "钱包" }, did: 2, line: { en: "A wallet left on the cloth. There's a pixel orb stitched into the flap.", zh: "桌布上落着一个钱包，翻盖上绣着一颗像素水晶球。" } },
    ],
  },
  {
    id: "chirpi", scene: "wire_street", time: "23:48", exhibit: "shot-chirpi",
    place: { en: "A residential street", zh: "住宅区小路" },
    open: { en: ["An ordinary street. Somewhere up on the wires, something small is chirping."], zh: ["一条普通的小路。电线上，有个小东西在叫。"] },
    clues: [
      { spot: "board", label: { en: "Notice board", zh: "告示板" }, did: 0, line: { en: "Everyone's free times, in pencil. Somebody has ringed the one slot that works.", zh: "所有人的空闲时间，用铅笔写着。有人圈出了唯一可行的那一格。" } },
      { spot: "bird", label: { en: "The bird", zh: "小鸟" }, did: 1, line: { en: "It looks down at you. It seems to be on a strict budget of chirps.", zh: "它低头看你。看起来，它能叫几声是有预算的。" } },
      { spot: "bag", label: { en: "Golf bag", zh: "球包" }, did: 2, line: { en: "A golf bag by the pole. The tag says: this chat only. Not the other one.", zh: "电线杆边靠着一个球包。吊牌上写着：只属于这个群，别的群不算。" } },
    ],
  },
  {
    id: "swing-coach", scene: "driving_range", time: "22:30",
    place: { en: "Driving range, after closing", zh: "打烊后的练习场" },
    open: { en: ["The range closed hours ago. One bay is still lit, and a laptop is still watching the mat."], zh: ["练习场几小时前就打烊了。只有一个打位还亮着，一台笔记本还盯着地垫。"] },
    clues: [
      { spot: "laptop", label: { en: "Laptop", zh: "笔记本" }, did: 0, line: { en: "On the screen, a stick figure with glowing joints waits for someone to swing.", zh: "屏幕上有个关节发光的火柴人，正等着有人挥杆。" } },
      { spot: "mat", label: { en: "Mat", zh: "地垫" }, did: 1, line: { en: "A worn mat. Whoever practised here drifted a little on the way back.", zh: "一块磨旧的地垫。在这儿练球的人，上杆时身体有点晃。" } },
      { spot: "mic", label: { en: "Microphone", zh: "麦克风" }, did: 2, line: { en: "A microphone, wired in on its own. Unplug it and the rest keeps thinking.", zh: "一支单独接线的麦克风。拔掉它，其他部分照样在思考。" } },
    ],
  },
  {
    id: "hisho", scene: "car", time: "02:06",
    place: { en: "The expressway", zh: "高速公路上" },
    open: { en: ["Expressway, two in the morning. Rain on the glass. Nobody is touching a phone."], zh: ["凌晨两点的高速。雨打在玻璃上，没有人碰手机。"] },
    clues: [
      { spot: "grant", label: { en: "OK? button", zh: "OK? 按钮" }, did: 0, line: { en: "One lit button. Nothing important happens until it has an answer on record.", zh: "一个亮着的按钮。它没拿到记录在案的答复之前，什么要紧事都不会发生。" } },
      { spot: "tally", label: { en: "Clipboard", zh: "记录板" }, did: 1, line: { en: "A clipboard on the passenger seat. Twenty-four rows, each with a result.", zh: "副驾上放着一块记录板。二十四行，每行都有结果。" } },
      { spot: "voice", label: { en: "Console", zh: "中控台" }, did: 2, line: { en: "The waveform on the console keeps moving. Beside it, a small switch: ADVISORY.", zh: "中控台上的声波还在跳。旁边有个小开关：ADVISORY。" } },
    ],
  },

  /* ───────── Aesthetic ───────── */
  {
    id: "idow", scene: "aquarium", time: "00:31", exhibit: "idow-sketch",
    place: { en: "The aquarium, after hours", zh: "闭馆后的水族馆" },
    open: { en: ["The building is closed. The big tank isn't. Something round is looking at you, unimpressed."], zh: ["水族馆闭馆了，大水箱还亮着。有个圆圆的东西正看着你，不太服气。"] },
    clues: [
      { spot: "sketch", label: { en: "Plaque", zh: "说明牌" }, did: 0, line: { en: "A plaque with a pencil sketch on it. Same seal, younger.", zh: "说明牌上有一张铅笔稿。同一只海豹，年轻一点。" } },
      { spot: "phone", label: { en: "Phone", zh: "手机" }, did: 1, line: { en: "A phone left on the bench, its keyboard still lit.", zh: "长椅上落着一部手机，键盘还亮着。" } },
      { spot: "seal", label: { en: "The seal", zh: "海豹" }, did: 2, line: { en: "It looks grumpy. It's just round. Five small name tags are stuck to the glass.", zh: "它看着不高兴，其实只是圆。玻璃上贴着五个小名牌。" } },
    ],
  },
  {
    id: "rousong", scene: "bedroom", time: "03:02",
    place: { en: "Somebody's desk, 3 a.m.", zh: "凌晨三点的书桌" },
    open: { en: ["A desk at three in the morning. A small flaky thing floats beside the monitor, keeping you company."], zh: ["凌晨三点的书桌。显示器旁飘着一个小小的、掉渣的东西，在陪你。"] },
    clues: [
      { spot: "pet", label: { en: "Floating bun", zh: "飘着的饼" }, did: 0, line: { en: "It notices you noticing it, and changes its mood.", zh: "它发现你在看它，马上换了个表情。" } },
      { spot: "card", label: { en: "Pop-up card", zh: "弹出的卡片" }, did: 1, line: { en: "A card has popped up on the screen. Allow? Yes or no.", zh: "屏幕上弹出一张卡片：允许吗？是，或者否。" } },
      { spot: "credits", label: { en: "Sticky note", zh: "便利贴" }, did: 2, line: { en: "A sticky note with a bar on it, drawn down to about half.", zh: "一张便利贴，上面画着一条用掉一半的进度条。" } },
      { spot: "water", label: { en: "Glass of water", zh: "一杯水" }, line: { en: "Shoulders up. Drink some water.", zh: "喝口水，脑袋会亮一点点。" } },
    ],
  },
  {
    id: "curipo", scene: "card_shop", time: "19:50", exhibit: "shot-curipo",
    place: { en: "A card shop window", zh: "卡牌店的橱窗" },
    open: { en: ["Rows of binders behind wet glass. One is open on a stand. The faces in it are looking back."], zh: ["湿漉漉的玻璃后面是一排排卡册。有一本摊开放着，里面的脸也在看你。"] },
    clues: [
      { spot: "binder", label: { en: "Open binder", zh: "摊开的卡册" }, did: 0, line: { en: "Not a directory. Not a list. Somebody's collection.", zh: "不是导航站，也不是列表，是某个人的收藏。" } },
      { spot: "card", label: { en: "Marked card", zh: "做了记号的卡" }, did: 1, line: { en: "Each card has a face and a name. One of them is outlined in gold.", zh: "每张卡都有一张脸和一个名字。其中一张描着金边。" } },
      { spot: "note", label: { en: "Note", zh: "便条" }, did: 2, line: { en: "A note that says: for you. On the back, three names: Next.js, Supabase, Claude.", zh: "便条上写着：给你的。背面有三个名字：Next.js、Supabase、Claude。" } },
    ],
  },
  {
    id: "catchpon", scene: "gacha", time: "20:15",
    place: { en: "Capsule machines by a shop", zh: "店门口的扭蛋机" },
    open: { en: ["A row of capsule machines outside a shop. No sign-up form anywhere. You just turn the dial."], zh: ["店门口一排扭蛋机。哪儿都没有注册表，转一下就行。"] },
    clues: [
      { spot: "machines", label: { en: "Machines", zh: "扭蛋机" }, did: 0, line: { en: "Flat colour, hard shadows. Nothing here is blurred, not even in the rain.", zh: "平涂的颜色，硬边的影子。这里什么都不模糊，下雨也一样。" } },
      { spot: "pack", label: { en: "Card pack", zh: "卡包" }, did: 1, line: { en: "A pack in the chute. Tilt it, and the frame moves apart from the picture.", zh: "出货口有一个卡包。一倾斜，卡框和画面就分开动了。" } },
      { spot: "foil", label: { en: "Rare card", zh: "稀有卡" }, did: 2, line: { en: "One card is on different paper. You can tell from across the street.", zh: "有一张卡用的纸不一样，隔着一条街都认得出来。" } },
    ],
  },
  {
    id: "chain-explorer", scene: "flower_shop", time: "02:40",
    place: { en: "A flower stall, under the cables", zh: "电缆下的花摊" },
    open: { en: ["The cables overhead run on for blocks. Under them, somebody has opened a flower stall at two in the morning."], zh: ["头顶的电缆一路拉出去好几条街。电缆下面，有人在凌晨两点开了个花摊。"] },
    clues: [
      { spot: "flowers", label: { en: "Flowers", zh: "花" }, did: 0, line: { en: "Rose and mint, in a part of town that's usually all black terminals.", zh: "玫瑰和薄荷色，开在通常全是黑底终端的地段。" } },
      { spot: "api", label: { en: "Junction box", zh: "接线盒" }, did: 1, line: { en: "A junction box on the wall. Its wires run straight into the stall.", zh: "墙上有个接线盒，电线一路接进了花摊。" } },
      { spot: "coin", label: { en: "Shop sign", zh: "招牌" }, did: 2, line: { en: "The sign is one small gold coin. It turns when you're not looking.", zh: "招牌是一枚小金币。你不看它的时候，它就在转。" } },
    ],
  },
  {
    id: "jewelry", scene: "jewelry", time: "18:05",
    place: { en: "A piercing studio's window", zh: "穿孔店的橱窗" },
    open: { en: ["The brightest window on the street. Everything in it is on velvet, and all of it is from the year 2000."], zh: ["整条街最亮的橱窗。里面的东西都放在天鹅绒上，全都像是 2000 年来的。"] },
    clues: [
      { spot: "butterfly", label: { en: "Butterfly", zh: "蝴蝶" }, did: 0, line: { en: "The centrepiece: a butterfly with far too much confidence.", zh: "正中间是一只自信过头的蝴蝶。" } },
      { spot: "marquee", label: { en: "Marquee", zh: "跑马灯" }, did: 1, line: { en: "The marquee runs on bulbs and a bit of wire. Nothing else is holding it up.", zh: "跑马灯只靠灯泡和一点电线在走，除此之外什么都没有。" } },
      { spot: "config", label: { en: "Card in the case", zh: "柜里的卡片" }, did: 2, line: { en: "A card in the corner of the case lists every piece in one place.", zh: "柜角的卡片上，每件商品都列在同一个地方。" } },
    ],
  },
  {
    id: "rosana-fixes-it", scene: "repair_shop", time: "17:40", exhibit: "shot-fixes",
    place: { en: "The repair shop", zh: "修理铺" },
    open: { en: ["The only warm room in this city. Old sets on the shelves, and someone who'll pick up the phone."], zh: ["这座城里唯一暖和的房间。架子上摆着旧电视，还有一个会接电话的人。"] },
    clues: [
      { spot: "sign", label: { en: "The sign", zh: "招牌" }, did: 0, line: { en: "A dark sign: Rosana fixes it. It doesn't shout.", zh: "一块深色招牌：Rosana fixes it。它不喊叫。" } },
      { spot: "clips", label: { en: "Monitor", zh: "监视器" }, did: 1, line: { en: "A whole lesson on tape, and on the monitor, one frame for each swing.", zh: "录像带里是整节课，监视器上是一杆一格。" } },
      { spot: "phone", label: { en: "Telephone", zh: "电话" }, did: 2, line: { en: "The phone on the bench. It's been answered by the same person from the start.", zh: "工作台上的电话。从第一通开始，接的都是同一个人。" } },
    ],
  },

  /* ───────── Writing ───────── */
  {
    id: "golf-clips", scene: "writing_desk", time: "01:58",
    place: { en: "The editing desk", zh: "剪辑台" },
    open: { en: ["A shelf of tapes, a word processor, and one sentence that hasn't made up its mind."], zh: ["一架录像带，一台文字处理机，还有一句没拿定主意的话。"] },
    clues: [
      { spot: "draft", label: { en: "The draft", zh: "草稿" }, did: 0, line: { en: "The cursor blinks at the end of an unfinished line.", zh: "光标在一行没写完的字后面闪。" } },
      { spot: "strip", label: { en: "Film strip", zh: "胶片" }, line: { en: "Frame after frame across the desk. Only a few are lit. Forty seconds, out of an hour.", zh: "胶片铺满了桌子，只有几格是亮的。一小时里的 40 秒。" } },
      { spot: "tapes", label: { en: "Tape shelf", zh: "录像带架" }, line: { en: "Lesson tapes, labelled by hand. Somebody asked for a way to pull the swings out of these.", zh: "手写标签的课程录像。有人想从这些带子里把挥杆抽出来。" } },
    ],
  },
];

/* Everything spoken outside a case. */
const SCRIPT = {
  title: { en: "THE CASE FILES", zh: "事件簿" },
  menu: {
    begin: { en: "New Game", zh: "开始调查" },
    resume: { en: "Load Game", zh: "继续调查" },
    index: { en: "Case Files", zh: "直接看案件" },
    options: { en: "Options", zh: "设置" },
    back: { en: "Back", zh: "返回" },
  },
  prologue: {
    en: [
      { t: "It has been raining for three days." },
      { t: "You were hired to find out who Rosana Liu is. No résumé came with the job. Only a box of case files." },
      { t: "Every case in the box is something Rosana built." },
      { who: "Rosana", face: "half", t: "So you're the one reading my files. Sit anywhere. Don't wake the seal." },
      { who: "Rosana", face: "smile", t: "Start with whichever you like. I'll answer what I can." },
    ],
    zh: [
      { t: "雨已经下了三天。" },
      { t: "你受雇查清 Rosana Liu 是谁。委托里没有简历，只有一箱案件档案。" },
      { t: "箱子里的每一个案件，都是 Rosana 做过的东西。" },
      { who: "Rosana", face: "half", t: "你就是来读我档案的人？随便坐，别吵醒海豹。" },
      { who: "Rosana", face: "smile", t: "想从哪个开始都行。能回答的我都回答。" },
    ],
  },
  office: {
    place: { en: "Rosana's office", zh: "Rosana 的事务所" },
    idle: { en: "What will you do?", zh: "接下来做什么？" },
    look: {
      en: [{ t: "A small office above the station. Case board, filing cabinet, a phone that still rings. The rain doesn't stop." }],
      zh: [{ t: "车站上面的一间小事务所。案件板、档案柜，还有一部会响的电话。雨一直没停。" }],
    },
    spots: {
      board: { en: "Case board", zh: "案件板" },
      files: { en: "Case files", zh: "案件档案" },
      crt: { en: "Terminal", zh: "终端" },
      cabinet: { en: "Filing cabinet", zh: "档案柜" },
      phone: { en: "Telephone", zh: "电话" },
      seal: { en: "The seal", zh: "海豹" },
    },
    seal: {
      en: [{ who: "Idow", t: "..." }, { t: "The seal opens one eye, looks at you, and goes back to sleep. It looks grumpy, but it's just round." }],
      zh: [{ who: "Idow", t: "……" }, { t: "海豹睁开一只眼，看了看你，又睡了。看着不高兴，其实只是圆。" }],
    },
  },
  about: {
    place: { en: "Personnel file", zh: "人事档案" },
    open: {
      en: [{ t: "A personnel file, slid out of the bottom drawer. Most of it has been blacked out." }],
      zh: [{ t: "从最下面的抽屉里抽出来的人事档案。大部分内容都被涂黑了。" }],
    },
    redact: {
      en: [{ t: "Solid black bars." }, { who: "Rosana", face: "half", t: "I'll fill those in myself, when I feel like it." }],
      zh: [{ t: "一条条实心的黑杠。" }, { who: "Rosana", face: "half", t: "这些我以后自己填，看心情。" }],
    },
    photo: {
      en: [{ t: "A clipped photo: a coat, a hat, no face." }, { who: "Rosana", face: "smile", t: "Good likeness." }],
      zh: [{ t: "别着的照片：一件大衣，一顶帽子，没有脸。" }, { who: "Rosana", face: "smile", t: "挺像的。" }],
    },
    stamp: {
      en: [{ t: "CONFIDENTIAL, stamped slightly crooked." }],
      zh: [{ t: "盖着 CONFIDENTIAL，章有点歪。" }],
    },
  },
  contact: {
    place: { en: "A public telephone", zh: "公共电话亭" },
    open: {
      en: [{ t: "The booth is still lit. Somebody has pinned a card next to the phone." }],
      zh: [{ t: "电话亭还亮着。有人在电话旁边别了一张名片。" }],
    },
    phone: {
      en: [{ who: "Rosana", face: "smile", t: "Hiring, collaborating, or you just have a good seal fact. All welcome." }],
      zh: [{ who: "Rosana", face: "smile", t: "招人、合作，或者你只是知道一个很棒的海豹冷知识，都欢迎。" }],
    },
  },
  garage: {
    place: { en: "The garage", zh: "车库" },
    open: {
      en: [
        { t: "Five letters, found in five places. They were never about any case." },
        { t: "Behind the roller door, something small and red." },
      ],
      zh: [
        { t: "五个字母，散落在五个地方。它们从来就和案子无关。" },
        { t: "卷帘门后面，停着一个红色的小东西。" },
      ],
    },
    car: {
      en: [{ t: "You touch the switch. The headlamps flip up, like it was waiting for you." }, { who: "Rosana", face: "smile", t: "m i a t a <3" }],
      zh: [{ t: "你碰了一下开关。大灯翻了起来，好像一直在等你。" }, { who: "Rosana", face: "smile", t: "m i a t a <3" }],
    },
  },
  ui: {
    look: { en: "Look", zh: "观察", jp: "見る" },
    search: { en: "Search", zh: "调查", jp: "調べる" },
    ask: { en: "Ask", zh: "询问", jp: "聞く" },
    evidence: { en: "Evidence", zh: "证物", jp: "証拠" },
    leave: { en: "Leave", zh: "离开", jp: "戻る" },
    cases: { en: "Case files", zh: "案件档案", jp: "事件簿" },
    about: { en: "Personnel file", zh: "人事档案", jp: "人事" },
    contact: { en: "Telephone", zh: "打电话", jp: "電話" },
    garage: { en: "Garage", zh: "车库", jp: "車庫" },
    back: { en: "Back", zh: "返回", jp: "戻る" },
    stack: { en: "What's it made of?", zh: "用什么做的？" },
    status: { en: "Can I see it?", zh: "现在能看到吗？" },
    what: { en: "What is this?", zh: "这是什么？" },
    searchHint: { en: "Where do you look?", zh: "要查哪里？" },
    askHint: { en: "What do you ask?", zh: "问什么？" },
    casesHint: { en: "Which case?", zh: "查哪个案子？" },
    closed: { en: "CLOSED", zh: "结案" },
    closedStamp: { en: "CASE CLOSED", zh: "结案" },
    open: { en: "OPEN", zh: "未结" },
    case: { en: "CASE", zh: "案件" },
    narrator: { en: "", zh: "" },
    noExhibit: { en: "There's nothing public to show for this one yet.", zh: "这个案子暂时没有可以公开的证物。" },
    exhibitTitle: { en: "EXHIBIT", zh: "证物" },
    openExhibit: { en: "Open", zh: "打开" },
    noLink: { en: "No public link for this one yet.", zh: "这件证物暂时没有公开的网址。" },
    other: { en: "Also on file", zh: "其他档案" },
    copy: { en: "Copy", zh: "复制" },
    copied: { en: "Copied", zh: "已复制" },
    title: { en: "Title", zh: "封面" },
    sound: { en: "Sound", zh: "声音" },
    crt: { en: "CRT", zh: "CRT" },
    on: { en: "on", zh: "开" },
    off: { en: "off", zh: "关" },
    close: { en: "Close", zh: "关闭" },
    clickToSkip: { en: "Click to skip", zh: "点击跳过" },
    press: { en: "Click or press Enter", zh: "点击或按回车" },
    allClosed: {
      en: [{ who: "Rosana", face: "smile", t: "That's every file in the box. You know as much as anyone now." }, { who: "Rosana", face: "half", t: "If you want the rest, the phone still works." }],
      zh: [{ who: "Rosana", face: "smile", t: "箱子里的档案都看完了。现在你知道的不比别人少。" }, { who: "Rosana", face: "half", t: "还想知道更多的话，电话还能打。" }],
    },
  },
  /* Answers to "Can I see it?", from the project's real status. */
  status: {
    live: { en: "It's live. Go and look for yourself.", zh: "已经上线了，你可以自己去看。" },
    soon: { en: "Launching soon. The door isn't open yet.", zh: "即将上线，门还没开。" },
    proto: { en: "It's a prototype, so there's nothing public to click yet.", zh: "还是原型，暂时没有可以公开点开的东西。" },
    study: { en: "It was a study. The code is on GitHub.", zh: "这是一个研究项目，代码在 GitHub 上。" },
    draft: { en: "Not yet. I'm still writing it.", zh: "还没有，我还在写。" },
    note: { en: "It's published. Go and read it.", zh: "已经发了，去读吧。" },
  },
  zoneTag: { ml: "機械学習", aesthetic: "美学", writing: "文章" },
};
