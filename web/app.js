'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   词屿 WordIsle · 桌面版
   纯前端实现：词库内嵌在 lexicon.js，进度存本地文件（经 Python 桥）或
   localStorage，导入导出格式与 Android 版完全一致，方便两边互通。
   ═══════════════════════════════════════════════════════════════════════ */

/* ── 图标 ─────────────────────────────────────────────────────────── */

const ICO = {
  home: '<svg viewBox="0 0 24 24"><path d="M3.5 10.6 12 3.5l8.5 7.1"/><path d="M5.8 9.6V20h12.4V9.6"/><path d="M10 20v-5.4h4V20"/></svg>',
  books: '<svg viewBox="0 0 24 24"><path d="M4 5.2c0-.7.5-1.2 1.2-1.2H11v15.5H5.2c-.7 0-1.2-.5-1.2-1.2z"/><path d="M13 4h5.8c.7 0 1.2.5 1.2 1.2v13.1c0 .7-.5 1.2-1.2 1.2H13z"/><path d="M13 8h7"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.6" cy="6.5" r="1.1"/><circle cx="4.6" cy="12" r="1.1"/><circle cx="4.6" cy="17.5" r="1.1"/></svg>',
  check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.4"/><path d="m8.3 12.2 2.6 2.5 4.8-5.2"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.4"/><path d="m15.8 15.8 4.4 4.4"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 20V11M10 20V4.5M16 20v-6.5M22 20H2.5"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.1"/><path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 4 2.5 5.1 5.6.8-4.1 4 1 5.6L12 16.9 7 19.5l1-5.6-4.1-4 5.6-.8z"/></svg>',
  volume: '<svg viewBox="0 0 24 24"><path d="M4.5 10v4h3l4.2 3.6V6.4L7.5 10z"/><path d="M15.4 9.4a3.6 3.6 0 0 1 0 5.2"/><path d="M17.8 7a7 7 0 0 1 0 10"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M7.5 4.8 19 12 7.5 19.2z"/></svg>',
  pencil: '<svg viewBox="0 0 24 24"><path d="M4 20h4L20.2 7.8 16.2 3.8 4 16z"/><path d="m14.6 5.4 4 4"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M12 4v11.2M8 11.6l4 4 4-4M4.5 19.5h15"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M12 19.5V8.3M8 12.4l4-4 4 4M4.5 4.5h15"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4.5 7h15M9.5 7V4.8h5V7M7 7l1 12.2h8L17 7"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4.2V9h-4.6"/></svg>',
  check2: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 3 5.5 13.4h5.2L10 21l7.6-10.6h-5.3z"/></svg>',
};

const icon = (n) => ICO[n] || '';

/* ── 意象图：语义规则 + 首字母兜底 ─────────────────────────────── */

const PALETTE = {
  BLUE:   ['#3C6BA8', '#24405F'],
  TEAL:   ['#2C7A76', '#17494A'],
  AMBER:  ['#B98330', '#7A4E15'],
  ROSE:   ['#B5505E', '#7A2C3C'],
  VIOLET: ['#6A5AA8', '#3F356E'],
  FOREST: ['#3F7A4E', '#234A2E'],
  INDIGO: ['#3B4E8C', '#232F58'],
  CLAY:   ['#9A6048', '#653728'],
  STEEL:  ['#4C6472', '#2C3C47'],
  BLUE2:  ['#3C6BA8', '#17494A'],
  TEAL2:  ['#2C7A76', '#232F58'],
  CLAY2:  ['#9A6048', '#7A2C3C'],
};
PALETTE.TEAL_BLUE = ['#2C7A76', '#232F58'];

const RULES = [
  ['🌧️', ['下雨', '雨天', '降雨', '雨'], 'BLUE'],
  ['☁️', ['云', '阴天', '多云'], 'STEEL'],
  ['❄️', ['雪', '冰', '寒冷', '冻结', '霜'], 'BLUE'],
  ['🌬️', ['风', '刮风', '气流'], 'TEAL'],
  ['☀️', ['太阳', '阳光', '晴朗', '日光'], 'AMBER'],
  ['🌊', ['海', '海洋', '波浪', '潮', '港'], 'BLUE2'],
  ['⛰️', ['山', '山脉', '峰', '登山'], 'FOREST'],
  ['🌲', ['森林', '树林', '丛林'], 'FOREST'],
  ['🌸', ['花', '开花', '玫瑰', '植物'], 'ROSE'],
  ['🌱', ['种子', '生长', '发芽', '农业', '作物'], 'FOREST'],
  ['🌍', ['世界', '地球', '全球', '国际', '国家', '环境', '生态', '气候'], 'INDIGO'],
  ['🐕', ['狗', '犬'], 'CLAY'],
  ['🐈', ['猫'], 'CLAY'],
  ['🐦', ['鸟', '翅膀', '飞翔'], 'BLUE2'],
  ['🐟', ['鱼', '钓鱼', '渔'], 'TEAL'],
  ['🐎', ['马', '骑'], 'CLAY'],
  ['🦁', ['狮子', '野兽', '野生'], 'AMBER'],
  ['🐜', ['昆虫', '蚂蚁', '蜜蜂'], 'FOREST'],
  ['🍞', ['面包', '食物', '食品', '粮食'], 'CLAY'],
  ['🍎', ['水果', '苹果', '果实'], 'ROSE'],
  ['☕', ['咖啡'], 'CLAY'],
  ['🍵', ['茶', '茶叶'], 'TEAL_BLUE'],
  ['🍷', ['酒', '醉', '葡萄酒'], 'ROSE'],
  ['🐄', ['牛奶', '奶', '乳'], 'BLUE'],
  ['🍬', ['糖', '甜', '糖果'], 'ROSE'],
  ['🍽️', ['吃', '餐', '饮食', '饿', '烹饪'], 'CLAY'],
  ['👥', ['朋友', '友谊', '合作', '协议', '伙伴', '参与', '参加'], 'TEAL'],
  ['👨‍👩‍👧', ['家庭', '家人', '父母', '亲属', '婚姻'], 'ROSE'],
  ['👶', ['儿童', '孩子', '婴儿', '童年'], 'AMBER'],
  ['🎒', ['学生', '同学', '班级'], 'INDIGO'],
  ['💊', ['医生', '医学', '护士', '疾病', '症'], 'TEAL'],
  ['👔', ['经理', '老板', '管理', '领导', '董事'], 'STEEL'],
  ['👤', ['人', '个人', '人们', '居民', '公民'], 'STEEL'],
  ['😄', ['高兴', '快乐', '愉快', '幸福', '笑', '满意'], 'AMBER'],
  ['😢', ['悲伤', '难过', '哭', '痛苦', '遗憾'], 'BLUE'],
  ['😠', ['愤怒', '生气', '怒', '恼'], 'ROSE'],
  ['😨', ['害怕', '恐惧', '恐怖', '担心', '焦虑'], 'VIOLET'],
  ['❤️', ['爱', '爱情', '喜欢', '亲爱', '热情'], 'ROSE'],
  ['😲', ['惊讶', '吃惊', '意外', '震惊'], 'VIOLET'],
  ['🤔', ['思考', '认为', '考虑', '琢磨'], 'VIOLET'],
  ['💭', ['记忆', '回忆', '记住', '梦', '想象'], 'VIOLET'],
  ['💡', ['想法', '主意', '理解', '明白', '聪明', '灵感'], 'AMBER'],
  ['👓', ['大脑', '智力', '头脑', '理智'], 'VIOLET'],
  ['✋', ['手', '握', '抓', '指'], 'CLAY'],
  ['👁️', ['眼睛', '看', '观察', '注意', '视'], 'STEEL'],
  ['👟', ['脚', '步行', '走'], 'CLAY'],
  ['💉', ['血', '流血', '出血', '注射'], 'ROSE'],
  ['🚗', ['汽车', '开车', '驾驶', '车辆'], 'STEEL'],
  ['🚆', ['火车', '铁路', '列车', '地铁'], 'STEEL'],
  ['✈️', ['飞机', '航空', '航班', '机场'], 'BLUE'],
  ['⛵', ['船', '航行', '帆', '运输'], 'TEAL'],
  ['🚲', ['自行车', '骑车', '轮'], 'TEAL'],
  ['🏠', ['房子', '家', '住宅', '居住', '公寓'], 'CLAY'],
  ['🏫', ['学校', '校园', '大学', '学院', '教育'], 'INDIGO'],
  ['🏥', ['医院', '诊所', '治疗', '手术'], 'TEAL'],
  ['🏙️', ['城市', '都市', '城镇', '街'], 'STEEL'],
  ['🏪', ['商店', '店铺', '超市', '零售'], 'CLAY'],
  ['🌉', ['桥', '跨越', '连接'], 'STEEL'],
  ['📚', ['书', '阅读', '图书馆', '知识', '学习'], 'INDIGO'],
  ['✍️', ['写', '写作', '签名', '文章', '稿'], 'STEEL'],
  ['🗣️', ['说', '语言', '讲话', '谈话', '发音', '翻译'], 'TEAL'],
  ['📝', ['考试', '测试', '测验', '论文', '作业'], 'INDIGO'],
  ['🔬', ['科学', '实验', '研究', '化学', '物理', '理论'], 'TEAL'],
  ['➗', ['数学', '计算', '数字', '统计'], 'INDIGO'],
  ['🎨', ['艺术', '绘画', '设计', '画', '色彩'], 'ROSE'],
  ['🎵', ['音乐', '歌', '旋律', '演奏', '唱'], 'VIOLET'],
  ['🎤', ['演讲', '表演', '舞台', '观众'], 'VIOLET'],
  ['🎓', ['毕业', '学位', '学术', '教授'], 'INDIGO'],
  ['💻', ['电脑', '计算机', '软件', '程序', '编程', '系统'], 'STEEL'],
  ['📱', ['手机', '电话', '移动', '短信'], 'STEEL'],
  ['🌐', ['网络', '互联网', '网站', '在线'], 'BLUE'],
  ['📊', ['数据', '图表', '分析', '报告', '比例'], 'INDIGO'],
  ['⚙️', ['机器', '机械', '引擎', '设备', '装置'], 'STEEL'],
  ['⚡', ['电', '电力', '能量', '能源', '电池'], 'AMBER'],
  ['🚀', ['发展', '进步', '促进', '快速', '推进'], 'INDIGO'],
  ['⏰', ['时间', '小时', '分钟', '准时', '钟'], 'STEEL'],
  ['📅', ['日期', '日历', '安排', '计划', '期限'], 'INDIGO'],
  ['⏳', ['等待', '耐心', '延迟', '拖延'], 'AMBER'],
  ['🌙', ['夜晚', '月亮', '深夜', '睡眠'], 'VIOLET'],
  ['💤', ['睡', '休息', '疲倦', '疲劳'], 'VIOLET'],
  ['🏛️', ['政府', '政治', '机构', '博物馆', '历史', '议会'], 'STEEL'],
  ['⚖️', ['法律', '法院', '公平', '正义', '诉讼', '判决', '律师', '代理', '起诉'], 'INDIGO'],
  ['⚔️', ['战争', '战斗', '冲突', '敌人', '攻击'], 'ROSE'],
  ['🎖️', ['军队', '士兵', '军事', '武器'], 'FOREST'],
  ['📄', ['税', '账', '预算', '费用', '成本'], 'CLAY'],
  ['💼', ['工作', '职业', '职位', '商务', '就业'], 'STEEL'],
  ['🏢', ['公司', '企业', '办公', '工厂', '产业'], 'STEEL'],
  ['💰', ['钱', '金钱', '财富', '工资', '收入', '资金'], 'AMBER'],
  ['💳', ['买', '购买', '购物', '消费', '顾客'], 'TEAL'],
  ['🏷️', ['卖', '出售', '价格', '销售', '折扣'], 'CLAY'],
  ['📈', ['增加', '增长', '上升', '提高', '利润', '繁荣'], 'FOREST'],
  ['📉', ['减少', '下降', '降低', '衰退', '损失', '危机'], 'ROSE'],
  ['💹', ['经济', '金融', '市场', '投资', '股票', '贸易'], 'FOREST'],
  ['🎭', ['文化', '传统', '习俗', '戏剧', '节日'], 'VIOLET'],
  ['🗳️', ['选举', '投票', '民主', '候选人'], 'STEEL'],
  ['🏳️', ['放弃', '抛弃', '投降', '让步', '妥协'], 'CLAY'],
  ['🚪', ['辞职', '离职', '退出', '解散'], 'STEEL'],
  ['🔄', ['变化', '改变', '转变', '交换', '代替'], 'TEAL'],
  ['⚠️', ['危险', '警告', '风险', '威胁', '事故'], 'AMBER'],
  ['❓', ['问题', '疑问', '怀疑', '谜'], 'INDIGO'],
  ['🎯', ['目标', '目的', '瞄准', '任务'], 'ROSE'],
  ['🗺️', ['方法', '方向', '指导', '策略', '途径'], 'TEAL'],
  ['🔑', ['关键', '钥匙', '重要', '核心'], 'AMBER'],
  ['🕯️', ['灯', '照亮', '光明', '明亮'], 'AMBER'],
  ['🔥', ['火', '燃烧', '炎热', '热情'], 'CLAY2'],
  ['🏆', ['成功', '胜利', '赢', '奖', '冠军'], 'AMBER'],
  ['🔩', ['部分', '组成', '结构', '复杂', '整体'], 'VIOLET'],
  ['🏃', ['跑', '运动', '锻炼', '比赛'], 'TEAL'],
  ['🚫', ['禁止', '阻止', '妨碍', '禁令', '不准'], 'CLAY'],
  ['✅', ['同意', '批准', '允许', '认可', '赞成'], 'FOREST'],
  ['🔍', ['调查', '探索', '检索', '寻找', '搜寻', '侦察', '审查'], 'STEEL'],
  ['📜', ['证明', '证言', '证据', '证书', '文件', '文档', '凭证'], 'CLAY'],
  ['🚚', ['运输', '搬运', '转移', '运送', '传递', '货物', '迁移'], 'BLUE'],
  ['🌪️', ['混乱', '骚乱', '暴动', '动荡', '风暴', '动乱'], 'STEEL'],
  ['🛡️', ['保护', '保卫', '防御', '守卫', '防护'], 'STEEL'],
  ['🏁', ['完成', '结束', '终止', '终点', '结局', '终结'], 'FOREST'],
  ['💥', ['爆炸', '爆发', '破裂', '粉碎', '冲突'], 'CLAY2'],
  ['💪', ['力量', '努力', '力气', '强壮', '肌肉', '尽力'], 'CLAY'],
  ['🏅', ['名声', '声誉', '荣誉', '名望', '威望', '声望'], 'AMBER'],
  ['📐', ['范围', '界限', '尺度', '测量', '面积', '幅度'], 'INDIGO'],
  ['🌟', ['希望', '渴望', '期待', '理想', '向往', '抱负'], 'AMBER'],
  ['🏋️', ['训练', '练习', '培育', '培养', '养成'], 'TEAL'],
  ['📣', ['宣布', '声明', '宣告', '宣传', '号召', '公告'], 'CLAY'],
  ['🔒', ['锁', '关闭', '封闭', '监禁'], 'STEEL'],
];

const FALLBACK_KEYS = ['INDIGO', 'TEAL', 'CLAY', 'VIOLET', 'STEEL', 'FOREST', 'ROSE', 'AMBER', 'BLUE'];

const artCache = new Map();

function artOf(word) {
  const hit = artCache.get(word.id);
  if (hit) return hit;
  let best = null, bestLen = 0;
  for (const [emoji, keys, pal] of RULES) {
    for (const k of keys) {
      if (k.length > bestLen && word.meaning.includes(k)) { best = [emoji, pal]; bestLen = k.length; }
    }
  }
  let art;
  if (best) {
    art = { glyph: best[0], colors: PALETTE[best[1]] };
  } else {
    const idx = Math.abs(hash(word.head)) % FALLBACK_KEYS.length;
    art = { glyph: '', colors: PALETTE[FALLBACK_KEYS[idx]], mono: monogram(word.head) };
  }
  artCache.set(word.id, art);
  return art;
}

const COVERS = {
  cet4: ['📘', ['#3C6BA8', '#24405F']],
  cet6: ['📗', ['#2C7A76', '#17494A']],
  cet6_high: ['🔥', ['#B5505E', '#7A2C3C']],
  ky: ['🎓', ['#3B4E8C', '#232F58']],
  ielts: ['🌍', ['#9A6048', '#653728']],
};
const coverOf = (id) => COVERS[id] || ['📖', ['#4C6472', '#2C3C47']];
const coverHTML = (id, size) => {
  const [e, [a, b]] = coverOf(id);
  return `<div class="cover" style="background:linear-gradient(145deg,${a},${b});${size ? `width:${size}px;height:${size * 1.22}px;flex:0 0 ${size}px;font-size:${size * .42}px` : ''}">${e}</div>`;
};

function monogram(head) {
  const m = head.match(/[a-zA-Z]/);
  return m ? m[0].toUpperCase() : '·';
}
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

/* ── 工具 ─────────────────────────────────────────────────────────── */

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad2 = (n) => String(n).padStart(2, '0');
const DAY_MS = 86400000;

function ymd(ts = Date.now()) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function dayIndex(ts) {
  const d = new Date(ts);
  return Math.floor((ts - d.getTimezoneOffset() * 60000) / DAY_MS);
}

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1900);
}

/* ── 词库 ─────────────────────────────────────────────────────────── */

const LEX = window.LEX;
const BOOKS = LEX.books;
const rawBook = {};
const bookCache = {};
let byIdCache = null;
let searchIndexCache = null;
const wcache = new Map();

function parseBook(id) {
  if (bookCache[id]) return bookCache[id];
  const text = rawBook[id] != null ? rawBook[id] : LEX.data[id];
  rawBook[id] = text;
  const out = [];
  for (const line of text.split('\n')) {
    if (!line) continue;
    const p = line.split('\t');
    if (p.length < 4) continue;
    const head = p[0];
    out.push({
      id: id + ':' + head,
      head,
      phonetic: p[1] || '',
      pos: p[2] || '',
      meaning: p[3].split('\\n').join('\n'),
      definition: p[4] || '',
      bookId: id,
    });
  }
  bookCache[id] = out;
  return out;
}

const wordsOf = (id) => parseBook(id);

function allWords() {
  if (!wcache.has('__all')) {
    const out = [];
    for (const b of BOOKS) out.push(...parseBook(b.id));
    wcache.set('__all', out);
  }
  return wcache.get('__all');
}
function byId() {
  if (!byIdCache) {
    byIdCache = new Map();
    for (const w of allWords()) byIdCache.set(w.id, w);
  }
  return byIdCache;
}
function searchIndex() {
  if (!searchIndexCache) {
    const seen = new Map();
    for (const w of allWords()) if (!seen.has(w.head)) seen.set(w.head, w);
    searchIndexCache = [...seen.values()];
  }
  return searchIndexCache;
}

function rank(words, query, limit = 80) {
  const raw = query.trim();
  if (!raw) return [];
  const q = raw.toLowerCase();
  const isCjk = /[\u4e00-\u9fff]/.test(raw);
  const scored = [];
  for (const w of words) {
    const head = w.head.toLowerCase();
    const firstSense = w.meaning.split('\n')[0];
    let score = 0;
    if (head === q) score = 100;
    else if (head.startsWith(q)) score = 90;
    else if (head.includes(q)) score = 78;
    else if (isCjk && firstSense.includes(raw)) score = 72;
    else if (w.meaning.includes(raw)) score = 58;
    else if (w.definition.toLowerCase().includes(q)) score = 40;
    if (score) scored.push([w, score]);
  }
  scored.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    const la = isCjk ? a[0].meaning.length : a[0].head.length;
    const lb = isCjk ? b[0].meaning.length : b[0].head.length;
    if (la !== lb) return la - lb;
    return a[0].head.localeCompare(b[0].head);
  });
  return scored.slice(0, limit).map((x) => x[0]);
}

const senses = (w) => w.meaning.split('\n').map((s) => s.trim()).filter(Boolean);
const firstSense = (w) => senses(w)[0] || '';

/* ── 短语与固定搭配 ───────────────────────────────────────────────── */

const PHRASE_TYPES = { pv: '短语动词', col: '动词搭配', prep: '介词短语', adj: '形容词搭配', idm: '固定说法' };

/* 短语中间常插代词：pull it out / take them off，比对时把这类词滤掉 */
const PRONOUNS = new Set(['it', 'them', 'him', 'her', 'me', 'us', 'you', 'this', 'that', 'one', 'ones']);

/* 短语里的功能词，拿来过滤单词结果时忽略（查 in terms of 不该把 weather 带出来） */
const PHRASE_STOPWORDS = new Set(['a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'from', 'by', 'be', 'as', 'and', 'or']);

let phraseCache = null;

function phrases() {
  if (phraseCache) return phraseCache;
  const src = typeof window.PHRASE_DATA === 'string' ? window.PHRASE_DATA : '';
  phraseCache = src.split('\n')
    .map((l) => l.replace(/\r$/, ''))
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((line, i) => {
      const [phrase, type, meaning] = line.split('\t');
      return {
        id: 'ph:' + i,
        phrase: phrase.trim(),
        type: (type || 'pv').trim(),
        meaning: (meaning || '').trim(),
        tokens: phrase.trim().toLowerCase().split(/\s+/),
      };
    });
  return phraseCache;
}

/** 查询串归一：全角转半角、弯引号拉直、多余标点吃掉、压空格、转小写 */
function normQuery(raw) {
  return String(raw == null ? '' : raw)
    .replace(/[\u2018\u2019\u02bc\u00b4]/g, "'")
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^\w\u4e00-\u9fff' -]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[\s'-]+|[\s'-]+$/g, '')
    .toLowerCase();
}

/* 词形变体缓存：不强行归一成一个词干，而是列出可能的形式再求交集。
   pulled → pull / pulle / pul，take ← taking，这样「拉长的词」不会把
   pull 削成 pul 而漏掉 pull out。 */
const variantCache = new Map();

function tokenVariants(t) {
  const hit = variantCache.get(t);
  if (hit) return hit;
  const out = new Set([t]);
  const add = (x) => { if (x.length >= 2) out.add(x); };
  if (/ied$/.test(t)) add(t.slice(0, -3) + 'y');
  if (/ed$/.test(t)) {
    const b = t.slice(0, -2);
    add(b); add(b + 'e');
    if (/([bdfgklmnprstvz])\1$/.test(b)) add(b.slice(0, -1));
    if (/i$/.test(b)) add(b.slice(0, -1) + 'y');
  }
  if (/ing$/.test(t)) {
    const b = t.slice(0, -3);
    add(b); add(b + 'e');
    if (/([bdfgklmnprstvz])\1$/.test(b)) add(b.slice(0, -1));
    if (/i$/.test(b)) add(b.slice(0, -1) + 'y');
  }
  if (/ies$/.test(t)) add(t.slice(0, -3) + 'y');
  if (/(ch|sh|x|z|s)es$/.test(t)) add(t.slice(0, -2));
  if (/s$/.test(t) && !/(ss|us|is)$/.test(t)) add(t.slice(0, -1));
  variantCache.set(t, out);
  return out;
}

const sameToken = (a, b) => {
  if (a === b) return true;
  const vb = tokenVariants(b);
  for (const x of tokenVariants(a)) if (vb.has(x)) return true;
  return false;
};

/** 短语与查询逐词对齐（会忽略 it / them 这类插入的代词） */
function phraseMatches(p, qContent) {
  if (qContent.length !== p.tokens.length) return false;
  return qContent.every((t, i) => sameToken(t, p.tokens[i]));
}

/** 短语检索：整条精确匹配优先，其次词形变体、前缀，最后按实词命中 */
function rankPhrases(q) {
  if (!q) return [];
  const isCjk = /[\u4e00-\u9fff]/.test(q);
  const qToks = q.split(' ').filter(Boolean);
  const qContent = qToks.filter((t) => !PRONOUNS.has(t));
  const out = [];
  for (const p of phrases()) {
    let score = 0;
    if (isCjk) {
      if (p.meaning.includes(q)) score = 70 + Math.min(10, q.length);
    } else if (p.phrase.toLowerCase() === q) {
      score = 100;
    } else if (qToks.length > 1 && phraseMatches(p, qContent)) {
      score = 94;                                     // pulled out / pulls it out / taking off
    } else if (qToks.length > 1 && p.phrase.toLowerCase().startsWith(q)) {
      score = 86;                                     // 边输边找：pull o
    } else if (qToks.length > 1 && p.phrase.toLowerCase().includes(q)) {
      score = 80;
    } else if (qToks.length > 1 && qContent.length && qContent.every((t) => p.tokens.some((x) => sameToken(t, x)))) {
      score = 74;                                     // 词序不同 / 中间插了别的词
    } else if (qToks.length === 1 && sameToken(q, p.tokens[0])) {
      score = 60;                                     // 查单词时顺带给出以它开头的搭配
    }
    if (score) out.push([p, score]);
  }
  out.sort((a, b) => b[1] - a[1] || a[0].phrase.length - b[0].phrase.length || a[0].phrase.localeCompare(b[0].phrase));
  return out.map((x) => x[0]);
}

/** 一次查词的全部结果：短语 + 单词，顺带告诉调用方单词那一栏该怎么称呼 */
function lookup(raw) {
  const q = normQuery(raw);
  if (!q) return { q: '', phrases: [], words: [], wordLabel: '', isPhrase: false };

  // pull-out 这种连字符写法，按 pull out 再查一次
  if (q.includes('-')) {
    const alt = lookup(q.replace(/-/g, ' '));
    if (alt.phrases.length) return { ...alt, q };
  }

  const isPhrase = q.includes(' ');
  const ph = rankPhrases(q);
  const qContent = q.split(' ').filter((t) => !PRONOUNS.has(t));
  // 整条搭配是否真的收录了（原形或词形变体）
  const hitPhrase = ph.some((p) => p.phrase.toLowerCase() === q || phraseMatches(p, qContent));
  let words = rank(searchIndex(), q, 120);
  let wordLabel = '单词';

  // 查短语时，靠英文释义「碰到了这几个字」命中的单词是噪音（weather 命中 in terms of），先滤掉
  if (isPhrase) {
    const keys = qContent.filter((t) => t.length > 2 && !PHRASE_STOPWORDS.has(t));
    words = words.filter((w) => keys.length === 0
      || keys.some((k) => w.head.toLowerCase().includes(k))
      || w.meaning.includes(q));
  }

  if (!words.length && isPhrase) {
    if (hitPhrase) {
      // 搭配查到了，把核心词也带出来，方便接着看它的其他义项
      const head = coreWordOf(ph[0].phrase);
      const hit = head && searchIndex().find((w) => w.head.toLowerCase() === head);
      if (hit) { words = [hit]; wordLabel = '相关单词'; }
    } else {
      // 搭配没收录：退一步用短语里的实词找相关词条
      const seen = new Set();
      for (const t of q.split(' ').filter((x) => x.length > 1 && !PRONOUNS.has(x))) {
        for (const w of rank(searchIndex(), t, 4)) {
          if (!seen.has(w.id)) { seen.add(w.id); words.push(w); }
        }
      }
      if (words.length) wordLabel = '这个搭配没有收录 · 相关单词';
    }
  }

  const cap = isPhrase ? 20 : 8;
  // 需要谷歌翻译兜底：单词没收录，或短语整条没收录（即使里面个别词是四六级词）
  const miss = isPhrase ? !hitPhrase : words.length === 0;
  const found = !miss;
  return { q, phrases: ph.slice(0, cap), words: words.slice(0, 120), wordLabel, isPhrase, found, miss, hitPhrase };
}

const coreWordOf = (phrase) => {
  const toks = phrase.toLowerCase().split(' ');
  return toks.find((t) => t.length > 1 && !PRONOUNS.has(t) && !PHRASE_STOPWORDS.has(t)) || toks[0];
};

/* ── 查词历史 ─────────────────────────────────────────────────────── */

const HISTORY_MAX = 40;
let histTimer = null;
let histOpen = false;

const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + '…' : s || '');

function histTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const hm = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  if (d.toDateString() === now.toDateString()) return `今天 ${hm}`;
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return `昨天 ${hm}`;
  const sameYear = d.getFullYear() === now.getFullYear();
  return `${sameYear ? '' : d.getFullYear() + '-'}${d.getMonth() + 1}-${d.getDate()} ${hm}`;
}

/** 结果摘要：查短语时写类型和释义，查单词时写词书和第一义项 */
function resultSummary(res) {
  const p = res.phrases[0];
  const w = res.words[0];
  if (p && (res.isPhrase || !w)) {
    return `${PHRASE_TYPES[p.type] || '词组'} · ${clip(p.meaning, 34)}`;
  }
  if (w) {
    const bookName = BOOKS.find((b) => b.id === w.bookId)?.name || '词库';
    return `${bookName} · ${clip(firstSense(w), 34)}`;
  }
  if (p) return `${PHRASE_TYPES[p.type] || '词组'} · ${clip(p.meaning, 34)}`;
  return '';
}

/** 查询成功才记一条；同一个词再查一次只是提到最前面，不重复堆叠 */
function commitSearch() {
  clearTimeout(histTimer);
  const res = lookup(searchQuery);
  if (!res.q) return;                                   // 空输入不记
  if (!res.phrases.length && !res.words.length) return;  // 没匹配也不记（交给谷歌翻译单独记）
  const key = res.q;
  const entry = { q: String(searchQuery).trim(), at: Date.now(), sum: resultSummary(res) };
  const list = S.searchHistory;

  const same = list.findIndex((x) => normQuery(x.q) === key);
  if (same >= 0) {
    list.splice(same, 1);
    list.unshift(entry);
  } else {
    // 边打字时留下的半截（pull → pull out）：直接替换，别把过程都塞进历史
    const half = list.findIndex((x) => {
      const k = normQuery(x.q);
      return entry.at - x.at < 180000 && (key.startsWith(k + ' ') || k.startsWith(key + ' '));
    });
    if (half >= 0) list.splice(half, 1);
    list.unshift(entry);
  }
  if (list.length > HISTORY_MAX) list.length = HISTORY_MAX;
  scheduleSave();
  renderHistory();
}

/** 谷歌翻译成功的未收录词条也写历史，摘要里带「非四六级词汇」标记 */
function commitTranslate(src, out) {
  const key = normQuery(src);
  if (!key) return;
  const entry = { q: src, at: Date.now(), sum: `谷歌翻译 · ${clip(out, 34)}`, x: true };
  const list = S.searchHistory;

  const same = list.findIndex((x) => normQuery(x.q) === key);
  if (same >= 0) {
    list.splice(same, 1);
    list.unshift(entry);
  } else {
    list.unshift(entry);
  }
  if (list.length > HISTORY_MAX) list.length = HISTORY_MAX;
  scheduleSave();
  renderHistory();
}

function removeHistory(q) {
  const key = normQuery(q);
  S.searchHistory = S.searchHistory.filter((x) => normQuery(x.q) !== key);
  scheduleSave();
  renderHistory();
  toast('已删除这条历史');
}

function renderHistory() {
  const box = $('#searchHist');
  if (!box) return;
  const list = S.searchHistory;
  if (!list.length) { box.innerHTML = ''; return; }

  const shown = histOpen ? list : list.slice(0, 8);
  const body = histOpen
    ? `<div class="hist-list">${shown.map((it) => `
        <div class="hist-row">
          <button class="hist-main" data-act="hist-run" data-q="${esc(it.q)}">
            <b>${esc(it.q)}</b>
            <span>${esc(it.sum || '已查过')}</span>
          </button>
          <time>${esc(histTime(it.at))}</time>
          <button class="icon-btn" data-act="hist-del" data-q="${esc(it.q)}" title="删除这条">${icon('close')}</button>
        </div>`).join('')}</div>`
    : `<div class="hist-chips">${shown.map((it) => `
        <button class="chip hist-chip" data-act="hist-run" data-q="${esc(it.q)}" title="${esc(it.sum || '')} · ${esc(histTime(it.at))}">
          <b>${esc(it.q)}</b><span>${esc(histTime(it.at))}</span>
        </button>`).join('')}</div>`;

  box.innerHTML = `<div class="hist-card">
    <div class="hist-head">
      <strong>查词历史</strong>
      <span class="tiny-hint">${list.length} 条 · 点一下重新查</span>
      <div class="hist-tools">
        ${list.length > 8 || histOpen ? `<button class="link-btn" data-act="hist-toggle">${histOpen ? '收起' : '展开全部'}</button>` : ''}
        <button class="link-btn danger" data-act="hist-clear">清空</button>
      </div>
    </div>
    ${body}
  </div>`;
}

/* ── 调度（SM-2 变体，与 Android 版一致） ─────────────────────────── */

const MIN_EASE = 1.3, MAX_EASE = 2.8, MAX_IV = 365, REVISIT = 600000;

function nextCard(card, grade, now) {
  const c = card || { ease: 2.5, intervalDays: 0, reps: 0, lapses: 0, learnedAt: 0, starred: false };
  let { ease, intervalDays: iv, reps, lapses } = c;
  if (grade === 'again') { ease = Math.max(MIN_EASE, ease - 0.2); iv = 0; reps = 0; lapses += 1; }
  else if (grade === 'hard') { ease = Math.max(MIN_EASE, ease - 0.15); iv = iv < 1 ? 0.5 : iv * 1.2; reps += 1; }
  else if (grade === 'good') { iv = iv < 1 ? 1 : iv * ease; reps += 1; }
  else { ease = Math.min(MAX_EASE, ease + 0.15); iv = iv < 1 ? 3 : iv * ease * 1.3; reps += 1; }
  iv = Math.min(iv, MAX_IV);
  const dueAt = grade === 'again' ? now + REVISIT : now + Math.round(iv * DAY_MS * (1 + (Math.random() - 0.5) * 0.04));
  return { ease, intervalDays: iv, reps, lapses, dueAt, lastAt: now, learnedAt: c.learnedAt || now, starred: !!c.starred };
}

function preview(card, grade) {
  if (grade === 'again') return '10 分钟';
  const iv0 = card ? card.intervalDays : 0;
  const e = card ? card.ease : 2.5;
  let iv = grade === 'hard' ? (iv0 < 1 ? 0.5 : iv0 * 1.2)
    : grade === 'good' ? (iv0 < 1 ? 1 : iv0 * e)
    : (iv0 < 1 ? 3 : iv0 * e * 1.3);
  iv = Math.min(iv, MAX_IV);
  if (iv < 1) return Math.max(1, Math.round(iv * 24)) + ' 小时';
  if (iv < 30) return Math.round(iv) + ' 天';
  if (iv < 365) return (Math.round((iv / 30) * 10) / 10) + ' 个月';
  return '1 年';
}

/* ── 存储 ─────────────────────────────────────────────────────────── */

/* ── 可自定义键位 ─────────────────────────────────────────────────── */

const APP_VERSION = '1.0.6';

const KEY_ACTIONS = [
  { id: 'reveal', name: '继续 / 下一个词', desc: '评完分（卡片翻到释义面）后按下，进入下一个词', def: ' ' },
  { id: 'gradeAgain', name: '评分：忘记了', desc: '完全没印象；新词练到会时 2 张后重来', def: '1' },
  { id: 'gradeHard', name: '评分：有点印象', desc: '想起来一半；新词练到会时 4 张后重来', def: '2' },
  { id: 'gradeGood', name: '评分：想起来了', desc: '基本记得；新词练到会时 6 张后重来', def: '3' },
  { id: 'gradeEasy', name: '评分：太简单', desc: '一眼就会；新词直接移出本组', def: '4' },
  { id: 'known', name: '标为熟词', desc: '移入熟词本，以后不再出现', def: 'k' },
  { id: 'speak', name: '朗读当前单词', desc: '按下听一遍发音', def: 'p' },
  { id: 'exit', name: '退出学习', desc: '结束本组，回到主界面', def: 'Escape' },
  { id: 'search', name: '查词', desc: '跳到查词页并聚焦输入框', def: '/' },
];

const DEFAULT_KEYMAP = KEY_ACTIONS.reduce((m, a) => { m[a.id] = a.def; return m; }, {});

const KEY_LABELS = {
  ' ': '空格', Escape: 'Esc', Enter: 'Enter', Backspace: '退格', Tab: 'Tab', CapsLock: 'Caps',
  ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
  Home: 'Home', End: 'End', PageUp: 'PgUp', PageDown: 'PgDn', Insert: 'Ins', Delete: 'Del',
};

/* 这些键在 WebView / 系统里有固定用途，绑定会打架 */
const KEY_RESERVED = new Set(['F5', 'F11', 'F12', 'Tab', 'Escape']);

/* 单纯按修饰键时不算一次录制，继续等真正的按键 */
const KEY_MODIFIERS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'AltGraph', 'OS', 'Process', 'Dead', 'Unidentified']);

/** 统一存法：单字符一律小写，空格记作 ' '，Esc 记作 'Escape' */
function normKey(k) {
  if (!k) return '';
  if (k === ' ' || k === 'Spacebar' || k === 'Space') return ' ';
  if (k === 'Esc') return 'Escape';
  return k.length === 1 ? k.toLowerCase() : k;
}

function keyLabel(k) {
  if (!k) return '未设置';
  return KEY_LABELS[k] || (k.length === 1 ? k.toUpperCase() : k);
}

/** 允许按字符值匹配，也按物理键位兜底（中文输入法下 e.key 可能不是字母） */
function keyMatch(e, k) {
  if (!k) return false;
  const ek = normKey(e.key);
  if (k === ' ') return ek === ' ' || e.code === 'Space';
  if (ek === k) return true;
  if (k.length === 1) {
    if (/[a-z]/.test(k) && e.code === 'Key' + k.toUpperCase()) return true;
    if (/[0-9]/.test(k) && (e.code === 'Digit' + k || e.code === 'Numpad' + k)) return true;
  }
  return false;
}

/** 从存档里取键位，缺项补默认值，脏数据直接忽略 */
function keymapFrom(raw) {
  const m = { ...DEFAULT_KEYMAP };
  if (raw && typeof raw === 'object') {
    for (const a of KEY_ACTIONS) {
      const v = raw[a.id];
      if (typeof v === 'string' && v) m[a.id] = normKey(v);
    }
  }
  return m;
}

const DEFAULT_SETTINGS = { dailyNew: 20, accentUs: true, autoSpeak: true, showPhonetic: true, dailyGoal: 30, theme: 'auto', loopNew: false, keymap: { ...DEFAULT_KEYMAP } };

const S = { version: 2, book: 'cet4', cards: {}, logs: {}, known: [], searchHistory: [], settings: { ...DEFAULT_SETTINGS } };
let knownSet = new Set();
let API = null;              // pywebview 桥
let saveTimer = null;
let storeMode = 'local';

/** 历史条目只留必要字段，脏数据一律丢掉，避免旧存档把界面弄坏 */
function historyFrom(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const x of raw) {
    if (!x || typeof x.q !== 'string' || !x.q.trim()) continue;
    const at = Number(x.at);
    out.push({
      q: x.q.trim(),
      at: Number.isFinite(at) && at > 0 ? at : Date.now(),
      sum: typeof x.sum === 'string' ? x.sum : '',
    });
    if (out.length >= HISTORY_MAX) break;
  }
  return out;
}

function applyState(o) {
  if (!o || typeof o !== 'object') return;
  S.book = o.book || S.book;
  S.cards = o.cards && typeof o.cards === 'object' ? o.cards : {};
  S.logs = o.logs && typeof o.logs === 'object' ? o.logs : {};
  S.known = Array.isArray(o.known) ? o.known.filter((x) => typeof x === 'string') : [];
  S.searchHistory = historyFrom(o.searchHistory);
  S.settings = { ...DEFAULT_SETTINGS, ...(o.settings || {}) };
  S.settings.keymap = keymapFrom(o.settings && o.settings.keymap);
  knownSet = new Set(S.known);
  if (!BOOKS.some((b) => b.id === S.book)) S.book = 'cet4';
}

function exportJSON() {
  const cards = {};
  for (const [k, c] of Object.entries(S.cards)) {
    cards[k] = {
      e: c.ease, i: c.intervalDays, r: c.reps, l: c.lapses,
      d: c.dueAt, t: c.lastAt, a: c.learnedAt, s: c.starred ? 1 : 0,
    };
  }
  S.known = [...knownSet];
  return JSON.stringify({ version: 2, book: S.book, cards, logs: S.logs, known: S.known, searchHistory: S.searchHistory, settings: S.settings });
}

function importJSON(text) {
  try {
    const o = JSON.parse(text);
    if (!o || typeof o.cards !== 'object') return -1;
    const cards = {};
    for (const [k, v] of Object.entries(o.cards)) {
      cards[k] = {
        ease: v.e ?? 2.5, intervalDays: v.i ?? 0, reps: v.r ?? 0, lapses: v.l ?? 0,
        dueAt: v.d ?? 0, lastAt: v.t ?? 0, learnedAt: v.a ?? 0, starred: (v.s ?? 0) === 1,
      };
    }
    S.cards = cards;
    S.logs = o.logs || {};
    S.known = Array.isArray(o.known) ? o.known : [];
    knownSet = new Set(S.known);
    S.searchHistory = historyFrom(o.searchHistory);
    S.settings = { ...DEFAULT_SETTINGS, ...(o.settings || {}) };
    S.settings.keymap = keymapFrom(o.settings && o.settings.keymap);
    if (o.book && BOOKS.some((b) => b.id === o.book)) S.book = o.book;
    scheduleSave();
    return Object.keys(cards).length;
  } catch (e) {
    return -1;
  }
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 400);
}

async function saveNow() {
  const text = exportJSON();
  try {
    if (API && API.save_state) await API.save_state(text);
    else localStorage.setItem('wordisle.state', text);
  } catch (e) {
    console.warn('保存失败', e);
  }
}

async function loadState() {
  let raw = null;
  try {
    if (API && API.load_state) {
      raw = await API.load_state();
      storeMode = 'file';
    } else {
      raw = localStorage.getItem('wordisle.state');
      storeMode = 'local';
    }
  } catch (e) { console.warn(e); }
  if (raw) { try { applyState(JSON.parse(raw)); } catch (e) { console.warn('状态解析失败', e); } }
}

/* 卡片读写 */
const cardOf = (id) => S.cards[id];
function putCard(id, card) { S.cards[id] = card; scheduleSave(); }
const isKnown = (id) => knownSet.has(id);

function markKnown(id) {
  knownSet.add(id);
  S.known = [...knownSet];
  delete S.cards[id];
  scheduleSave();
}
function unmarkKnown(id) {
  knownSet.delete(id);
  S.known = [...knownSet];
  scheduleSave();
}
function toggleStar(id) {
  const c = S.cards[id];
  if (!c) S.cards[id] = { ease: 2.5, intervalDays: 0, reps: 0, lapses: 0, dueAt: 0, lastAt: 0, learnedAt: 0, starred: true };
  else c.starred = !c.starred;
  scheduleSave();
}

function logStudy(grade, isNew) {
  const key = ymd();
  const l = S.logs[key] || [0, 0, 0, 0];
  l[0] += isNew ? 1 : 0;
  l[1] += isNew ? 0 : 1;
  l[2] += grade === 'again' ? 1 : 0;
  l[3] += 1;
  S.logs[key] = l;
  scheduleSave();
}

function streak() {
  let n = 0;
  const d = new Date();
  const countOf = (t) => { const l = S.logs[ymd(t)]; return l ? l[3] : 0; };
  if (countOf(d.getTime()) === 0) d.setDate(d.getDate() - 1);
  for (let i = 0; i < 3650; i++) {
    if (countOf(d.getTime()) > 0) { n++; d.setDate(d.getDate() - 1); } else break;
  }
  return n;
}

/* ── 派生统计 ─────────────────────────────────────────────────────── */

const book = () => BOOKS.find((b) => b.id === S.book) || BOOKS[0];
const bookWords = () => wordsOf(S.book);

function stats() {
  const now = Date.now();
  const ws = bookWords();
  let due = 0, fresh = 0, mastered = 0, learning = 0, known = 0, starred = 0;
  for (const w of ws) {
    if (isKnown(w.id)) { known++; continue; }
    const c = S.cards[w.id];
    if (!c || !c.learnedAt) { fresh++; continue; }
    if (c.dueAt <= now) due++;
    if (c.intervalDays >= 21 && c.reps >= 3) mastered++; else learning++;
    if (c.starred) starred++;
  }
  const todayLog = S.logs[ymd()] || [0, 0, 0, 0];
  const total = ws.length;
  return { total, due, fresh, mastered, learning, known, starred, todayNew: todayLog[0], todayReview: todayLog[1], todayAgain: todayLog[2], todayTotal: todayLog[3] };
}

const newQuota = () => Math.max(0, S.settings.dailyNew - stats().todayNew);

function forecast(days = 7) {
  const today = dayIndex(Date.now());
  const buckets = new Array(days + 1).fill(0);
  for (const w of bookWords()) {
    const c = S.cards[w.id];
    if (!c || !c.learnedAt) continue;
    const idx = dayIndex(c.dueAt) - today;
    if (idx <= 0) buckets[0]++; else if (idx <= days) buckets[idx]++;
  }
  return buckets;
}

/* ── 会话 ─────────────────────────────────────────────────────────── */

let session = null;
const counted = new Set();

function startSession(spelling = false) {
  captureId = null;
  const st = stats();
  if (spelling) {
    const learned = [];
    for (const w of bookWords()) {
      if (isKnown(w.id)) continue;
      const c = S.cards[w.id];
      if (c && c.learnedAt) learned.push([w, c]);
    }
    if (!learned.length) { toast('还没学过词，先完成一组学习再来测试'); return; }
    learned.sort((a, b) => (b[1].lapses - a[1].lapses) || (a[1].intervalDays - b[1].intervalDays));
    counted.clear();
    session = newSession(learned.slice(0, 20).map(([w]) => ({ word: w, isNew: false })), true);
    renderSession();
    return;
  }

  const now = Date.now();
  const due = [];
  const fresh = [];
  for (const w of bookWords()) {
    if (isKnown(w.id)) continue;
    const c = S.cards[w.id];
    if (c && c.learnedAt && c.dueAt <= now) due.push(w);
    else if (!c || !c.learnedAt) fresh.push(w);
  }
  due.sort((a, b) => (S.cards[a.id]?.dueAt || 0) - (S.cards[b.id]?.dueAt || 0));
  const quota = newQuota();
  const queue = [
    ...due.map((w) => ({ word: w, isNew: false })),
    ...(quota > 0 ? fresh.slice(0, quota).map((w) => ({ word: w, isNew: true })) : []),
  ];
  if (!queue.length) { toast(st.due === 0 && st.fresh === 0 ? '这本词书已经学完了' : '今天的任务已经完成了'); return; }
  counted.clear();
  session = newSession(queue, false);
  renderSession();
}

function newSession(queue, spelling) {
  return {
    queue, index: 0, revealed: false, spelling, pending: null,
    input: '', inputChecked: false, inputCorrect: false,
    newLearned: 0, reviewed: 0, againCount: 0, knownCount: 0,
    startedAt: Date.now(), finished: false,
  };
}

const current = () => (session ? session.queue[session.index] : null);

/** 正面还没评分就想翻面：提示先评分，不替用户打分 */
function nudgeGrade() {
  if (!session || session.pending) return;
  const km = S.settings.keymap;
  const g = ['gradeAgain', 'gradeHard', 'gradeGood', 'gradeEasy'].map((id) => keyLabel(km[id]));
  toast(`先凭印象评一次分：${g.join(' / ')}`);
}

function submitSpelling() {
  if (!session || !current()) return;
  if (session.revealed) return;
  session.revealed = true;
  session.inputChecked = true;
  session.inputCorrect = session.input.trim().toLowerCase() === current().word.head.toLowerCase();
  renderSession();
}

/** 往后插几张再出现，避免刚评完就又碰上同一个词 */
function enqueueLater(item, gap = 4) {
  const at = Math.min(session.queue.length, session.index + 1 + gap);
  session.queue.splice(at, 0, item);
}

/** 进入下一个词（翻面看完答案后按空格走这里） */
function advanceCard() {
  if (!session) return;
  session.pending = null;
  session.index++;
  session.revealed = false;
  session.input = '';
  session.inputChecked = false;
  session.inputCorrect = false;
  session.finished = session.index >= session.queue.length;
  renderSession();
}

/* 「新词练到会」开启时，评完分把这个词插回第几张之后：越不熟插得越近 */
const LOOP_GAP = { again: 2, hard: 4, good: 6, easy: 0 };

/**
 * 评分：正面（看词）就能评，评完自动翻到释义面，等空格进入下一个词。
 * 拼写测试例外：检查过拼写、评完分直接走，不额外占一次按键。
 */
function grade(g) {
  if (!session || !current() || session.pending) return;
  if (session.spelling && !session.revealed) return;      // 拼写要先检查，再评分
  const item = current();
  const id = item.word.id;
  const now = Date.now();
  const reviewAt = preview(S.cards[id], g);

  // 反复练的重复出现：只练不打分，卡片调度与统计都停在第一次评分上
  if (!item.repeat) {
    putCard(id, nextCard(S.cards[id], g, now));
    if (!counted.has(id)) {
      counted.add(id);
      logStudy(g, item.isNew);
      if (item.isNew) session.newLearned++; else session.reviewed++;
      if (g === 'again') session.againCount++;
    }
  }

  const loop = item.isNew && !!S.settings.loopNew;
  if (loop) {
    // 反复练：评「太简单」才移出这组，其余按评分程度当场插回队列后面几张
    const gap = LOOP_GAP[g] || 0;
    if (gap > 0) enqueueLater({ word: item.word, isNew: true, repeat: true }, gap);
  } else if (g === 'again') {
    // 没开反复练：忘掉的词也在本组里滚动再来一次
    enqueueLater({ word: item.word, isNew: false }, 3);
  }

  if (session.spelling) { advanceCard(); return; }        // 拼写测试：评分即走

  session.pending = { grade: g, loop, repeat: !!item.repeat, reviewAt };
  session.revealed = true;                                // 评分即翻面，露出释义
  renderSession();
}

function markCurrentKnown() {
  if (!session || !current()) return;
  const w = current().word;
  markKnown(w.id);
  counted.delete(w.id);
  session.pending = null;
  session.queue = session.queue.filter((it) => it.word.id !== w.id);
  session.knownCount++;
  session.revealed = false;
  session.input = '';
  session.inputChecked = false;
  session.finished = session.index >= session.queue.length;
  renderSession();
  toast('已移入熟词本');
}

function exitSession() {
  session = null;
  $('#session').classList.add('hidden');
  $('#session').innerHTML = '';
  render();
}

/* ── 发音 ─────────────────────────────────────────────────────────── */

let voicesReady = false;
function speak(text) {
  if (!('speechSynthesis' in window)) { toast('当前环境不支持语音合成'); return; }
  const u = new SpeechSynthesisUtterance(text);
  const lang = S.settings.accentUs ? 'en-US' : 'en-GB';
  u.lang = lang;
  u.rate = 0.92;
  const vs = speechSynthesis.getVoices();
  const v = vs.find((x) => x.lang === lang) || vs.find((x) => x.lang.startsWith('en'));
  if (v) u.voice = v;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => { voicesReady = true; };
}

/* ── 导航 ─────────────────────────────────────────────────────────── */

let route = 'home';
let browseQuery = '';
let browseFilter = 'all';
let browseLimit = 200;
let knownFilter = 'all';
let searchQuery = '';

const TITLES = {
  home: ['今日', '今天要复习的、要新学的，都在这儿'],
  books: ['词书', '每本书独立进度，随时切换'],
  browse: ['词表', '按状态筛选，可直接标星或标熟'],
  known: ['熟词本', '标过的熟词不再进入学习队列'],
  search: ['查词', '中英双语 · 支持短语与固定搭配'],
  stats: ['统计', '学习量、预测与掌握度'],
  settings: ['设置', '数据、发音与外观'],
};

function go(r) {
  captureId = null;
  clearTimeout(histTimer);      // 离开页面就不再补记刚才那段输入
  route = r;
  render();
  $('#view').scrollTop = 0;
}

function render() {
  const [t, s] = TITLES[route] || ['', ''];
  $('#pageTitle').textContent = t;
  $('#pageSub').textContent = s;
  $('#nav').querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.view === route));
  updateChrome();

  const actions = $('#topActions');
  if (route === 'home') {
    actions.innerHTML = `<button class="btn btn-primary" data-act="start">${icon('play')}开始学习</button>`;
  } else if (route === 'browse' || route === 'known') {
    actions.innerHTML = `<button class="btn" data-act="start-spell">${icon('pencil')}拼写测试</button>`;
  } else {
    actions.innerHTML = '';
  }

  const view = $('#view');
  if (route === 'home') view.innerHTML = viewHome();
  else if (route === 'books') view.innerHTML = viewBooks();
  else if (route === 'browse') view.innerHTML = viewBrowse();
  else if (route === 'known') view.innerHTML = viewKnown();
  else if (route === 'search') view.innerHTML = viewSearch();
  else if (route === 'stats') view.innerHTML = viewStats();
  else if (route === 'settings') view.innerHTML = viewSettings();

  if (route === 'browse') fillBrowse();
  if (route === 'search') fillSearch();
  if (route === 'known') fillKnown();
}

function updateChrome() {
  const b = book();
  const st = stats();
  $('#bookChipEmoji').textContent = coverOf(b.id)[0];
  $('#bookChipName').textContent = b.name;
  $('#bookChipSub').textContent = `${st.total} 词`;
  $('#streakNum').textContent = streak();
  // 底部标签在窄屏显示
  $('#bookChip').title = `${b.name} · ${b.subtitle}`;
}

/* ── 视图：今日 ───────────────────────────────────────────────────── */

function greet() {
  const h = new Date().getHours();
  if (h < 5) return '夜深了';
  if (h < 11) return '早上好';
  if (h < 14) return '中午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

function viewHome() {
  const st = stats();
  const quota = newQuota();
  const tasks = st.due + Math.min(quota, st.fresh);
  const goal = Math.max(1, S.settings.dailyGoal);
  const pct = Math.min(100, Math.round((st.todayTotal / goal) * 100));
  const fc = forecast(7);
  const maxFc = Math.max(1, ...fc);
  const days = ['今天', '明天', '后天'];
  const weekNames = ['日', '一', '二', '三', '四', '五', '六'];

  const forecastHTML = fc.map((v, i) => {
    const label = i === 0 ? '今天' : i < 3 ? days[i] : '周' + weekNames[(new Date().getDay() + i) % 7];
    return `<div class="mini-bar" title="${label}：${v} 个"><i style="height:${Math.max(4, (v / maxFc) * 46)}px"></i><span>${label}</span></div>`;
  }).join('');

  const allDone = tasks === 0;

  return `<div class="wrap">
    <section class="hero">
      <div>
        <div class="hero-eyebrow">第 ${streak() || 1} 天 · ${esc(book().name)}</div>
        <h2 class="hero-title">${greet()}，${allDone ? '今天已经收工了' : `还有 ${tasks} 个词等着你`}</h2>
        <p class="hero-desc">
          ${st.due > 0 ? `到期复习 ${st.due} 个 · ` : ''}新词 ${Math.min(quota, st.fresh)} 个
          ${quota === 0 ? '（今日新词额度已用完）' : ''}
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-act="start">${icon('play')}${allDone ? '再学一组' : '开始学习'}</button>
          <button class="btn btn-ghost" data-act="start-spell">${icon('pencil')}拼写测试</button>
        </div>
        <div class="hero-hint">快捷键：${hintHTML()}</div>
      </div>
      <div class="ring-wrap">
        <div class="ring" style="--p:${pct}">
          <div class="ring-inner"><b>${st.todayTotal}</b><span>/ ${goal} 今日</span></div>
        </div>
      </div>
    </section>

    <div class="stats-grid">
      ${statCard('已掌握', st.mastered, '#46a06b')}
      ${statCard('学习中', st.learning, '#c9a227')}
      ${statCard('未学习', st.fresh, '#6a8fc4')}
      ${statCard('熟词', st.known, '#d2694a')}
    </div>

    <section class="section">
      <div class="section-head"><h2>快捷入口</h2></div>
      <div class="quick-grid">
        ${quick('books', 'books', '词书', `${BOOKS.length} 本可选`)}
        ${quick('browse', 'list', '词表浏览', `${st.total} 词可筛`)}
        ${quick('known', 'check', '熟词本', `${st.known} 个不再学`)}
        ${quick('search', 'search', '查词', '中英双语')}
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>未来 7 天复习量</h2>
        <button data-act="nav" data-view="stats">看统计 →</button>
      </div>
      <div class="card" style="padding:16px 18px 10px">
        <div class="mini-chart">${forecastHTML}</div>
      </div>
    </section>
  </div>`;
}

const statCard = (label, value, color, unit = '词') => `<div class="stat">
  <div class="stat-label"><i class="stat-dot" style="background:${color}"></i>${label}</div>
  <div class="stat-value">${value}${unit ? `<small>${unit}</small>` : ''}</div>
</div>`;

const quick = (view, ic, title, sub) => `<button class="quick" data-act="nav" data-view="${view}">
  <div class="quick-ico">${icon(ic)}</div>
  <div class="quick-text"><strong>${title}</strong><span>${sub}</span></div>
</button>`;

/* ── 视图：词书 ───────────────────────────────────────────────────── */

function viewBooks() {
  const cards = BOOKS.map((b) => {
    const ws = wordsOf(b.id);
    let learned = 0, known = 0;
    for (const w of ws) {
      if (isKnown(w.id)) { known++; continue; }
      const c = S.cards[w.id];
      if (c && c.learnedAt) learned++;
    }
    const pct = ws.length ? Math.round((learned / ws.length) * 100) : 0;
    const cur = b.id === S.book;
    return `<button class="book-card ${cur ? 'current' : ''}" data-act="book" data-id="${b.id}">
      ${coverHTML(b.id)}
      <div class="book-meta">
        <div class="book-name">${esc(b.name)}${cur ? '<span class="pill pill-primary">当前</span>' : ''}</div>
        <div class="book-sub">${esc(b.subtitle)}</div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="book-foot"><span>已学 ${learned} / ${ws.length}</span><span>${known ? `熟词 ${known}` : pct + '%'}</span></div>
      </div>
    </button>`;
  }).join('');

  return `<div class="wrap"><div class="books-grid">${cards}</div>
    <p class="tiny-hint" style="margin-top:16px">共 ${BOOKS.reduce((n, b) => n + b.count, 0).toLocaleString()} 词，词库来自 ECDICT（MIT），全部离线内置。</p>
  </div>`;
}

/* ── 视图：词表 ───────────────────────────────────────────────────── */

const FILTERS = [
  ['all', '全部'], ['new', '未学'], ['learning', '学习中'],
  ['mastered', '已掌握'], ['known', '熟词'], ['starred', '已收藏'],
];

function viewBrowse() {
  const chips = FILTERS.map(([k, n]) => `<button class="chip ${browseFilter === k ? 'active' : ''}" data-act="filter" data-f="${k}">${n}</button>`).join('');
  return `<div class="wrap">
    <div class="toolbar">
      <div class="search-box" style="flex:0 0 300px;max-width:300px">
        ${icon('search')}
        <input class="input" id="browseInput" placeholder="搜索单词或中文释义" value="${esc(browseQuery)}">
      </div>
      <div class="filters">${chips}</div>
      <span class="tiny-hint" id="browseCount" style="margin-left:auto"></span>
    </div>
    <div class="list" id="browseList"></div>
  </div>`;
}

function browseRows() {
  const q = browseQuery.trim();
  let list;
  if (q) {
    list = rank(bookWords(), q, 400);
  } else {
    list = bookWords();
  }
  const now = Date.now();
  const out = [];
  for (const w of list) {
    const known = isKnown(w.id);
    const c = S.cards[w.id];
    const learned = c && c.learnedAt;
    if (browseFilter === 'known' && !known) continue;
    if (browseFilter !== 'known' && known) continue;
    if (browseFilter === 'new' && (learned || known)) continue;
    if (browseFilter === 'learning' && (!learned || (c.intervalDays >= 21 && c.reps >= 3))) continue;
    if (browseFilter === 'mastered' && !(learned && c.intervalDays >= 21 && c.reps >= 3)) continue;
    if (browseFilter === 'starred' && !(c && c.starred)) continue;
    out.push([w, c, known, learned]);
    if (out.length >= browseLimit + 1) break;
  }
  return { out, total: list.length };
}

function fillBrowse() {
  const box = $('#browseList');
  if (!box) return;
  const { out, total } = browseRows();
  const shown = out.slice(0, browseLimit);
  $('#browseCount').textContent = browseQuery.trim() ? `匹配 ${total} 条` : `共 ${total} 词`;

  if (!shown.length) {
    box.innerHTML = `<div class="empty">这里还没有词<br><span class="tiny-hint">换个筛选条件，或者先去学几个</span></div>`;
    return;
  }

  const rows = shown.map(([w, c, known]) => {
    const due = c && c.learnedAt && c.dueAt <= Date.now();
    const tags = [
      known ? '<span class="pill pill-coral">熟词</span>' : '',
      c && c.starred ? '<span class="pill">收藏</span>' : '',
      due ? '<span class="pill pill-primary">待复习</span>' : '',
      w.pos ? `<span class="pill">${esc(w.pos)}</span>` : '',
    ].join('');
    return `<div class="row">
      <div class="row-main">
        <div class="row-line1">
          <span class="row-head">${esc(w.head)}</span>
          <span class="row-phon">${esc(w.phonetic)}</span>
          ${tags}
        </div>
        <div class="row-meaning">${esc(senses(w).join(' / '))}</div>
      </div>
      <div class="row-actions">
        <button class="icon-btn star ${c && c.starred ? 'on' : ''}" data-act="star" data-id="${esc(w.id)}" title="收藏">${icon('star')}</button>
        <button class="icon-btn" data-act="${known ? 'unmark' : 'mark'}" data-id="${esc(w.id)}" title="${known ? '移出熟词本' : '标为熟词'}">${icon(known ? 'refresh' : 'check2')}</button>
      </div>
    </div>`;
  }).join('');

  const more = out.length > browseLimit
    ? `<div class="load-more"><button class="btn btn-sm" data-act="more">加载更多（还有 ${out.length - browseLimit} 条）</button></div>`
    : '';
  box.innerHTML = rows + more;
}

/* ── 视图：熟词本 ─────────────────────────────────────────────────── */

function knownWords() {
  const map = byId();
  const ids = [...knownSet];
  const list = ids.map((id) => map.get(id)).filter(Boolean);
  if (knownFilter === 'book') return list.filter((w) => w.bookId === S.book);
  return list;
}

function viewKnown() {
  const all = [...knownSet].map((id) => byId().get(id)).filter(Boolean);
  const inBook = all.filter((w) => w.bookId === S.book).length;
  return `<div class="wrap">
    <div class="toolbar">
      <div class="filters">
        <button class="chip ${knownFilter === 'all' ? 'active' : ''}" data-act="kfilter" data-f="all">全部 ${all.length}</button>
        <button class="chip ${knownFilter === 'book' ? 'active' : ''}" data-act="kfilter" data-f="book">当前词书 ${inBook}</button>
      </div>
      <span class="tiny-hint" style="margin-left:auto">标熟后不再进入学习与复习队列</span>
    </div>
    <div class="list" id="knownList"></div>
  </div>`;
}

function fillKnown() {
  const box = $('#knownList');
  if (!box) return;
  const list = knownWords().sort((a, b) => a.head.localeCompare(b.head));
  if (!list.length) {
    box.innerHTML = `<div class="empty">熟词本是空的<br><span class="tiny-hint">学习时点「熟词」，或在词表里点 ✓</span></div>`;
    return;
  }
  box.innerHTML = list.map((w) => `<div class="row">
    <div class="row-main">
      <div class="row-line1">
        <span class="row-head">${esc(w.head)}</span>
        <span class="row-phon">${esc(w.phonetic)}</span>
        <span class="pill pill-primary">${esc(BOOKS.find((b) => b.id === w.bookId)?.name || w.bookId)}</span>
      </div>
      <div class="row-meaning">${esc(senses(w).join(' / '))}</div>
    </div>
    <div class="row-actions">
      <button class="icon-btn" data-act="speak-word" data-id="${esc(w.id)}" title="发音">${icon('volume')}</button>
      <button class="btn btn-sm" data-act="unmark" data-id="${esc(w.id)}">移出</button>
    </div>
  </div>`).join('');
}

/* ── 视图：查词 ───────────────────────────────────────────────────── */

function viewSearch() {
  return `<div class="wrap">
    <div class="search-hero">
      <div class="search-box">
        ${icon('search')}
        <input class="input" id="searchInput" placeholder="输入单词、短语或中文，如 abandon / pull out / 放弃" value="${esc(searchQuery)}" autocomplete="off" spellcheck="false">
        ${searchQuery.trim() ? `<button class="search-clear" data-act="search-clear" title="清空输入">${icon('close')}</button>` : ''}
      </div>
      <div class="search-tips">
        <span>试试：</span>
        <button class="chip" data-act="sample" data-q="abandon">abandon</button>
        <button class="chip" data-act="sample" data-q="pull out">pull out</button>
        <button class="chip" data-act="sample" data-q="in terms of">in terms of</button>
        <button class="chip" data-act="sample" data-q="放弃">放弃</button>
        <button class="chip" data-act="sample" data-q="环境">环境</button>
      </div>
    </div>
    <div id="searchHist"></div>
    <div class="search-results" id="searchList"></div>
  </div>`;
}

function resultGroup(title, count, rows) {
  return `<section class="res-group">
    <div class="res-head"><h2>${esc(title)}</h2><span class="tiny-hint">${count} 条</span></div>
    <div class="list">${rows}</div>
  </section>`;
}

function phraseRow(p) {
  return `<div class="row">
    <div class="row-main">
      <div class="row-line1">
        <span class="row-head">${esc(p.phrase)}</span>
        <span class="pill pill-phrase">${esc(PHRASE_TYPES[p.type] || '词组')}</span>
      </div>
      <div class="row-meaning">${esc(p.meaning)}</div>
    </div>
    <div class="row-actions">
      <button class="icon-btn" data-act="speak-text" data-text="${esc(p.phrase)}" title="朗读">${icon('volume')}</button>
    </div>
  </div>`;
}

function wordRow(w) {
  const known = isKnown(w.id);
  return `<div class="row">
    <div class="row-main">
      <div class="row-line1">
        <span class="row-head">${esc(w.head)}</span>
        <span class="row-phon">${esc(w.phonetic)}</span>
        <span class="pill pill-primary">${esc(BOOKS.find((b) => b.id === w.bookId)?.name || '')}</span>
        ${known ? '<span class="pill pill-coral">熟词</span>' : ''}
      </div>
      <div class="row-meaning">${esc(senses(w).join(' / '))}</div>
    </div>
    <div class="row-actions">
      <button class="icon-btn" data-act="speak-word" data-id="${esc(w.id)}" title="发音">${icon('volume')}</button>
      <button class="icon-btn" data-act="${known ? 'unmark' : 'mark'}" data-id="${esc(w.id)}" title="${known ? '移出熟词本' : '标为熟词'}">${icon(known ? 'refresh' : 'check2')}</button>
    </div>
  </div>`;
}

function fillSearch() {
  const box = $('#searchList');
  if (!box) return;
  const res = lookup(searchQuery);
  renderHistory();

  if (!res.q) {
    box.innerHTML = `<div class="list"><div class="empty">输入单词、短语或中文开始查词<br>
      <span class="tiny-hint">支持短语动词与固定搭配，如 pull out、in terms of、take part in<br>
      覆盖 ${BOOKS.length} 本词书 · 共 ${searchIndex().length.toLocaleString()} 个不重复词条 · ${phrases().length} 条短语</span></div></div>`;
    return;
  }
  if (res.miss) {
    // 词库与短语表都没收录（或整条短语未收录）：交给谷歌翻译，并标记「非四六级词汇」
    renderTranslateResult(res);
    return;
  }

  const parts = [];
  const phPart = res.phrases.length
    ? resultGroup(res.isPhrase ? '词组 · 固定搭配' : '含这个词的短语', res.phrases.length, res.phrases.map(phraseRow).join(''))
    : '';
  const wPart = res.words.length
    ? resultGroup(res.wordLabel || '单词', res.words.length, res.words.map(wordRow).join(''))
    : '';
  // 查短语时短语在前；查单个词时先把该词给出来，再列出含它的搭配
  parts.push(res.isPhrase ? phPart : wPart, res.isPhrase ? wPart : phPart);
  box.innerHTML = parts.join('');
}

/* ── 谷歌翻译兜底（词库/短语表未收录时） ─────────────────────────── */

let translateSeq = 0;

/** 未收录词条走谷歌翻译，结果打上「非四六级词汇」标签 */
function renderTranslateResult(res) {
  const box = $('#searchList');
  if (!box) return;
  const q = res.q;
  const mySeq = ++translateSeq;
  const shown = String(searchQuery).trim();
  const isCjk = /[\u4e00-\u9fff]/.test(q);
  const dirLabel = isCjk ? '中 → 英' : '英 → 中';
  box.innerHTML = `<div class="list">
    <div class="empty trans-loading" id="transBox">正在用谷歌翻译「${esc(shown)}」…</div>
  </div>`;

  translateText(q).then((out) => {
    if (mySeq !== translateSeq) return;        // 期间又输入了新查询，丢弃过期结果
    if (!out) {
      box.innerHTML = `<div class="list"><div class="empty">没有找到「${esc(shown)}」，翻译也失败了<br>
        <span class="tiny-hint">请检查拼写，或检查网络连接后重试</span></div></div>`;
      return;
    }
    // 整条短语未收录时，附上短语里的四六级词方便接着查
    const relPart = (res.isPhrase && res.words.length)
      ? resultGroup('相关单词', res.words.length, res.words.map(wordRow).join(''))
      : '';
    box.innerHTML = `<section class="res-group">
      <div class="res-head"><h2>谷歌翻译</h2><span class="tiny-hint">${dirLabel}</span></div>
      <div class="list">${translateRow(shown, out)}</div>
    </section>${relPart}`;
    // 翻译成功也写进历史（词库未收录同样记，方便回头查）
    commitTranslate(shown, out);
  });
}

function translateRow(src, out) {
  return `<div class="row">
    <div class="row-main">
      <div class="row-line1">
        <span class="row-head">${esc(src)}</span>
        <span class="pill pill-coral">非四六级词汇</span>
        <span class="pill pill-phrase">谷歌翻译</span>
      </div>
      <div class="row-meaning">${esc(out)}</div>
    </div>
    <div class="row-actions">
      <button class="icon-btn" data-act="speak-text" data-text="${esc(src)}" title="朗读">${icon('volume')}</button>
    </div>
  </div>`;
}

/** 调后端谷歌翻译；浏览器模式（无 pywebview 桥）时直接 fetch 公开接口 */
async function translateText(text) {
  if (API && API.translate) {
    try { return await API.translate(text); }
    catch (e) { console.warn('后端翻译失败，走前端兜底', e); }
  }
  try {
    const sl = /[\u4e00-\u9fff]/.test(text) ? 'auto' : 'auto';
    const tl = /[\u4e00-\u9fff]/.test(text) ? 'en' : 'zh-CN';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
    const r = await fetch(url);
    const data = await r.json();
    return (data[0] || []).map((seg) => seg && seg[0]).join('').trim();
  } catch (e) {
    console.warn('前端翻译失败', e);
    return '';
  }
}

/** 输入框右侧的清空按钮，跟着输入内容出现与消失 */
function syncClearBtn() {
  const box = $('.search-box');
  if (!box) return;
  const has = !!searchQuery.trim();
  const btn = box.querySelector('.search-clear');
  if (has && !btn) box.insertAdjacentHTML('beforeend', `<button class="search-clear" data-act="search-clear" title="清空输入">${icon('close')}</button>`);
  if (!has && btn) btn.remove();
}

/** 一次性改写查词输入：输入框、清空按钮、结果、历史保持一致 */
function setSearchValue(v, commit) {
  searchQuery = v;
  const input = $('#searchInput');
  if (input) input.value = v;
  syncClearBtn();
  fillSearch();
  if (commit) commitSearch();
}

/* ── 视图：统计 ───────────────────────────────────────────────────── */

function viewStats() {
  const st = stats();
  const now = Date.now();

  // 近 30 天
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const t = now - i * DAY_MS;
    const l = S.logs[ymd(t)] || [0, 0, 0, 0];
    days.push({ t, total: l[3], label: new Date(t).getDate() });
  }
  const max = Math.max(1, ...days.map((d) => d.total));
  const chart = days.map((d) => `<div class="chart-col ${d.total ? '' : 'zero'}" title="${ymd(d.t)}：${d.total} 次">
      <i style="height:${Math.round((d.total / max) * 110)}px"></i>
      <span>${d.label % 5 === 0 || d.total ? d.label : ''}</span>
    </div>`).join('');

  // 累计
  let newSum = 0, revSum = 0, againSum = 0, totalSum = 0, activeDays = 0;
  for (const l of Object.values(S.logs)) {
    newSum += l[0]; revSum += l[1]; againSum += l[2]; totalSum += l[3];
    if (l[3] > 0) activeDays++;
  }
  const acc = totalSum ? Math.round(((totalSum - againSum) / totalSum) * 100) : 0;

  const fc = forecast(7);
  const fcMax = Math.max(1, ...fc);
  const weekNames = ['日', '一', '二', '三', '四', '五', '六'];
  const fcHTML = fc.map((v, i) => {
    const label = i === 0 ? '今天' : '周' + weekNames[(new Date().getDay() + i) % 7];
    return `<div class="mini-bar" title="${label}：${v} 个"><i style="height:${Math.max(4, (v / fcMax) * 46)}px"></i><span>${label}</span></div>`;
  }).join('');

  const m = st.mastered, l2 = st.learning, n = st.fresh + st.known;
  const tot = Math.max(1, m + l2 + n);
  const pct = (x) => (x / tot) * 100;

  return `<div class="wrap">
    <div class="stats-grid" style="margin-top:0">
      ${statCard('累计学习', totalSum, '#d2694a', '次')}
      ${statCard('已掌握', st.mastered, '#46a06b')}
      ${statCard('连续打卡', streak(), '#c9a227', '天')}
      ${statCard('一次记住', acc + '%', '#6a8fc4', '')}
    </div>

    <section class="section">
      <div class="section-head"><h2>近 30 天学习量</h2><span class="tiny-hint">共 ${totalSum} 次 · 活跃 ${activeDays} 天</span></div>
      <div class="chart-card">
        <div class="chart">${chart}</div>
        ${totalSum === 0 ? '<div class="empty" style="padding:6px 0 0">还没有学习记录，去学一组就有了</div>' : ''}
      </div>
    </section>

    <div class="section split-2">
      <div class="chart-card">
        <div class="section-head"><h2>未来 7 天复习量</h2></div>
        <div class="mini-chart">${fcHTML}</div>
        <div class="kv" style="margin-top:10px"><span>今天到期</span><b>${st.due} 个</b></div>
        <div class="kv"><span>新词剩余</span><b>${st.fresh} 个</b></div>
      </div>

      <div class="chart-card">
        <div class="section-head"><h2>掌握度分布</h2></div>
        <div class="dist">
          <i style="width:${pct(m)}%;background:#46a06b"></i>
          <i style="width:${pct(l2)}%;background:#c9a227"></i>
          <i style="width:${pct(n)}%;background:#4a5a6a"></i>
        </div>
        <div class="dist-legend">
          <span><em style="background:#46a06b"></em>已掌握 ${m}</span>
          <span><em style="background:#c9a227"></em>学习中 ${l2}</span>
          <span><em style="background:#4a5a6a"></em>未开始 ${n}</span>
        </div>
        <div class="kv" style="margin-top:14px"><span>新学 / 复习</span><b>${newSum} / ${revSum}</b></div>
        <div class="kv"><span>忘了 ${againSum} 次</span><b>${esc(book().name)}</b></div>
      </div>
    </div>
  </div>`;
}

/* ── 视图：设置 ───────────────────────────────────────────────────── */

function keyRow(a) {
  const k = S.settings.keymap[a.id];
  return `<div class="setting-row">
    <div class="setting-text"><strong>${esc(a.name)}</strong><span>${esc(a.desc)}</span></div>
    <button class="keycap" data-act="bindkey" data-k="${a.id}" title="点一下，然后按下你想要的键">${esc(keyLabel(k))}</button>
  </div>`;
}

/* 录制中的键位 id；非空时所有按键都不再触发功能，只用来绑定 */
let captureId = null;

function beginCapture(id) {
  captureId = id;
  document.querySelectorAll('.keycap').forEach((b) => {
    const hit = b.dataset.k === id;
    b.classList.toggle('capturing', hit);
    b.textContent = hit ? '按键…' : keyLabel(S.settings.keymap[b.dataset.k]);
  });
  toast('请按下新的按键 · Esc 取消');
}

function endCapture(id) {
  captureId = null;
  const b = id ? document.querySelector(`.keycap[data-k="${id}"]`) : null;
  if (b) { b.classList.remove('capturing'); b.textContent = keyLabel(S.settings.keymap[id]); }
}

function bindKey(id, k) {
  const map = { ...S.settings.keymap };
  const prev = map[id];
  const other = KEY_ACTIONS.map((a) => a.id).find((x) => x !== id && map[x] === k);
  map[id] = k;
  if (other) map[other] = prev;      // 撞车就互换，不留空档
  captureId = null;
  updateSetting({ keymap: map });
  const target = KEY_ACTIONS.find((a) => a.id === id);
  const clash = other ? KEY_ACTIONS.find((a) => a.id === other) : null;
  toast(clash ? `${target.name} → ${keyLabel(k)}，与「${clash.name}」互换` : `${target.name} → ${keyLabel(k)}`);
}

/** 会话底部与首页的统一提示，跟着用户改的键位走 */
function hintHTML() {
  const km = S.settings.keymap;
  if (session && session.pending) {
    return `<span class="kbd">${esc(keyLabel(km.reveal))}</span> 下一个词 · ` +
      `<span class="kbd">${esc(keyLabel(km.known))}</span> 标熟 · ` +
      `<span class="kbd">${esc(keyLabel(km.speak))}</span> 发音 · ` +
      `<span class="kbd">${esc(keyLabel(km.exit))}</span> 退出`;
  }
  const g = ['gradeAgain', 'gradeHard', 'gradeGood', 'gradeEasy'].map((id) => km[id]);
  // 四个评分键是连号数字时压成 1~4，否则逐个列出（改键后常常不再是区间）
  const consecutive = g.every((k, i) => /^[0-9]$/.test(k) && (i === 0 || Number(k) === Number(g[i - 1]) + 1));
  const gradeText = consecutive
    ? `<span class="kbd">${esc(keyLabel(g[0]))}</span>~<span class="kbd">${esc(keyLabel(g[3]))}</span>`
    : `<span class="kbd">${g.map((k) => esc(keyLabel(k))).join('</span>/<span class="kbd">')}</span>`;
  // 正面先评分，评分后卡片自动翻面，再按继续键走
  if (session) {
    return `${gradeText} 评分 · ` +
      `<span class="kbd">${esc(keyLabel(km.known))}</span> 标熟 · ` +
      `<span class="kbd">${esc(keyLabel(km.speak))}</span> 发音 · ` +
      `<span class="kbd">${esc(keyLabel(km.exit))}</span> 退出`;
  }
  return `${gradeText} 评分 · ` +
    `<span class="kbd">${esc(keyLabel(km.reveal))}</span> 下一个 · ` +
    `<span class="kbd">${esc(keyLabel(km.known))}</span> 标熟 · ` +
    `<span class="kbd">${esc(keyLabel(km.exit))}</span> 退出`;
}

function viewSettings() {
  const s = S.settings;
  const customCount = KEY_ACTIONS.filter((a) => s.keymap[a.id] !== a.def).length;
  const themeLabel = { auto: '跟随系统', light: '浅色', dark: '深色' };
  const rows = (k) => ['auto', 'light', 'dark'].map((x) =>
    `<button class="${s.theme === x ? 'active' : ''}" data-act="theme" data-v="${x}">${themeLabel[x]}</button>`).join('');

  return `<div class="wrap" style="max-width:820px">
    <div class="card" style="overflow:hidden">
      <div class="setting-row">
        <div class="setting-text"><strong>每日新词上限</strong><span>到量后只复习，不再推新词</span></div>
        <div class="stepper"><button data-act="step" data-k="dailyNew" data-d="-5">−</button><b>${s.dailyNew}</b><button data-act="step" data-k="dailyNew" data-d="5">+</button></div>
      </div>
      <div class="setting-row">
        <div class="setting-text"><strong>每日目标</strong><span>首页环形进度按这个值算</span></div>
        <div class="stepper"><button data-act="step" data-k="dailyGoal" data-d="-10">−</button><b>${s.dailyGoal}</b><button data-act="step" data-k="dailyGoal" data-d="10">+</button></div>
      </div>
      <div class="setting-row">
        <div class="setting-text"><strong>新词练到会</strong><span>只有「太简单」才移出本组，其余评分按程度插回后面几张继续练，直到标为太简单</span></div>
        <button class="switch ${s.loopNew ? 'on' : ''}" data-act="toggle" data-k="loopNew"></button>
      </div>
      <div class="setting-row">
        <div class="setting-text"><strong>发音口音</strong><span>朗读用美音还是英音</span></div>
        <div class="segmented">
          <button class="${s.accentUs ? 'active' : ''}" data-act="accent" data-v="us">美音</button>
          <button class="${!s.accentUs ? 'active' : ''}" data-act="accent" data-v="uk">英音</button>
        </div>
      </div>
      <div class="setting-row">
        <div class="setting-text"><strong>自动朗读</strong><span>换到新卡片时自动读一遍</span></div>
        <button class="switch ${s.autoSpeak ? 'on' : ''}" data-act="toggle" data-k="autoSpeak"></button>
      </div>
      <div class="setting-row">
        <div class="setting-text"><strong>显示音标</strong><span>关掉后卡片更简洁</span></div>
        <button class="switch ${s.showPhonetic ? 'on' : ''}" data-act="toggle" data-k="showPhonetic"></button>
      </div>
      <div class="setting-row">
        <div class="setting-text"><strong>外观</strong><span>默认跟随系统深浅色</span></div>
        <div class="segmented">${rows('theme')}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>键盘快捷键</h2><span class="tiny-hint">点键位后按下新键 · 冲突自动互换</span></div>
      <div class="card" style="overflow:hidden">
        ${KEY_ACTIONS.map(keyRow).join('')}
        <div class="setting-row">
          <div class="setting-text"><strong>恢复默认键位</strong><span>1~4 评分 · 空格 下一个 · K 标熟 · P 发音 · Esc 退出 · / 查词</span></div>
          <button class="btn" data-act="keyreset">${icon('refresh')}恢复</button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>数据</h2><span class="tiny-hint">存储：${storeMode === 'file' ? '本地文件' : '浏览器 localStorage'}</span></div>
      <div class="card" style="overflow:hidden">
        <div class="setting-row">
          <div class="setting-text"><strong>导出进度</strong><span>JSON 格式，可导入手机版，反之亦然</span></div>
          <button class="btn" data-act="export">${icon('download')}导出</button>
        </div>
        <div class="setting-row">
          <div class="setting-text"><strong>导入进度</strong><span>会覆盖当前所有学习记录</span></div>
          <button class="btn" data-act="import">${icon('upload')}导入</button>
        </div>
        <div class="setting-row">
          <div class="setting-text"><strong>清空学习数据</strong><span>词库不动，只清进度与熟词</span></div>
          <button class="btn" data-act="clear" style="color:#e05b4a;border-color:rgba(224,91,74,.4)">${icon('trash')}清空</button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>关于</h2></div>
      <div class="card" style="overflow:hidden">
        <div class="setting-row"><div class="setting-text"><strong>版本</strong><span>桌面版 ${APP_VERSION}</span></div><b style="font-size:13px">${APP_VERSION}</b></div>
        <div class="setting-row"><div class="setting-text"><strong>词库</strong><span>${BOOKS.length} 本 · ${BOOKS.reduce((n, b) => n + b.count, 0).toLocaleString()} 词</span></div><b style="font-size:13px">ECDICT</b></div>
        <div class="setting-row"><div class="setting-text"><strong>许可</strong><span>代码 MIT，词库 MIT</span></div><b style="font-size:13px">开源</b></div>
        <div class="setting-row"><div class="setting-text"><strong>键位</strong><span>在上方「键盘快捷键」里逐项修改</span></div><span class="tiny-hint">${customCount ? customCount + ' 项已自定义' : '默认键位'}</span></div>
      </div>
    </div>
  </div>`;
}

/* ── 会话渲染 ─────────────────────────────────────────────────────── */

let lastSpoken = null;

function renderSession() {
  const root = $('#session');
  if (!session) { root.classList.add('hidden'); root.innerHTML = ''; return; }
  root.classList.remove('hidden');

  if (session.finished) { root.innerHTML = sessionSummary(); return; }

  const item = current();
  if (!item) { root.innerHTML = sessionSummary(); return; }
  const w = item.word;
  const card = S.cards[w.id];
  const total = session.queue.length;
  const pct = Math.round((session.index / total) * 100);
  const km = S.settings.keymap;

  // 自动朗读：只在换到新卡时读一次，拼写模式不读（会泄底）
  const speakKey = session.index + '|' + w.id;
  if (!session.revealed && !session.spelling && S.settings.autoSpeak && lastSpoken !== speakKey) {
    lastSpoken = speakKey;
    setTimeout(() => speak(w.head), 120);
  }

  const head = `<div class="sess-head">
    <button class="icon-btn" data-act="exit" title="退出（${keyLabel(km.exit)}）">${icon('close')}</button>
    <div class="sess-progress"><i style="width:${pct}%"></i></div>
    <span class="sess-count">${Math.min(session.index + 1, total)}/${total}</span>
    <button class="btn btn-sm" data-act="known" title="标为熟词（${keyLabel(km.known)}）">${icon('check2')}熟词</button>
  </div>`;

  let body;
  if (!session.revealed) {
    body = session.spelling ? spellingFront(w) : cardFront(w, item);
  } else {
    body = cardBack(w, item);
  }

  let grades;
  if (session.pending) {
    grades = continueBar();
  } else if (session.spelling && !session.revealed) {
    grades = `<div class="grade-bar" style="grid-template-columns:1fr"><button class="btn btn-primary" data-act="submit" style="height:46px">检查拼写（Enter）</button></div>`;
  } else {
    // 再练的词不改排期，评分按钮上就不显示间隔，免得误导
    const pv = (g) => (item.repeat ? '不计排期' : preview(card, g));
    grades = `<div class="grade-bar">
      ${gradeBtn('again', '忘记了', pv('again'), 'close', 'g-again', km.gradeAgain)}
      ${gradeBtn('hard', '有点印象', pv('hard'), 'refresh', 'g-hard', km.gradeHard)}
      ${gradeBtn('good', '想起来了', pv('good'), 'check2', 'g-good', km.gradeGood)}
      ${gradeBtn('easy', '太简单', pv('easy'), 'bolt', 'g-easy', km.gradeEasy)}
    </div>`;
  }

  root.innerHTML = head + `<div class="sess-body">${body}</div>` + grades +
    `<div class="sess-foot-hint">${hintHTML()}</div>`;

  if (session.spelling && !session.revealed) {
    const input = $('#spellInput');
    if (input) { input.focus(); }
  }
}

function illusHTML(w, thumb = false) {
  const art = artOf(w);
  const bg = `background:linear-gradient(145deg,${art.colors[0]},${art.colors[1]})`;
  if (thumb) {
    return `<div class="back-thumb" style="${bg}">${art.glyph ? art.glyph : `<div class="illus-mono">${art.mono}</div>`}</div>`;
  }
  return `<div class="illus" style="${bg}">${art.glyph ? `<div class="illus-glyph">${art.glyph}</div>` : `<div class="illus-mono">${art.mono}</div>`}</div>`;
}

function cardFront(w, item) {
  const long = w.head.length > 11 ? 'xlong' : w.head.length > 7 ? 'long' : '';
  const pos = w.pos ? `<span class="pos-tag">${esc(w.pos)}</span>` : '';
  const again = item && item.repeat ? `<span class="pos-tag rep-tag">再练</span>` : '';
  const tags = (pos || again) ? `<div class="pos-row">${pos}${again}</div>` : '';
  const phon = S.settings.showPhonetic && w.phonetic ? `<div class="wcard-phon">${esc(w.phonetic)}</div>` : '';
  return `<div class="wcard">
    <div class="wcard-front">
      ${illusHTML(w)}
      <div class="wcard-face">
        ${tags}
        <div class="wcard-word ${long}">${esc(w.head)}</div>
        ${phon}
        <div class="speak-row">
          <button class="speak-btn" data-act="speak">${icon('volume')}发音</button>
          <span class="tiny-hint">先凭印象评一次分，评分后翻面核对答案</span>
        </div>
      </div>
    </div>
  </div>`;
}

function spellingFront(w) {
  return `<div class="wcard">
    <div class="wcard-face" style="justify-content:center">
      <span class="pos-tag">看释义，写出英文</span>
      <div style="font-family:var(--serif);font-size:clamp(17px,2.1vw,22px);line-height:1.8;max-width:560px">${esc(senses(w).join('<br>'))}</div>
      <div class="spell-box" style="margin-top:18px">
        <input class="input spell-input" id="spellInput" placeholder="在这里输入" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(session.input)}">
      </div>
    </div>
  </div>`;
}

function cardBack(w, item) {
  const lines = senses(w).map((line) => {
    const m = line.match(/^([a-z]{1,6}\.)\s*(.*)$/);
    if (m) return `<div class="sense"><div class="sense-pos">${esc(m[1])}</div><div class="sense-body">${esc(m[2])}</div></div>`;
    return `<div class="sense"><div class="sense-pos"></div><div class="sense-body">${esc(line)}</div></div>`;
  }).join('');

  const fb = session.spelling && session.inputChecked
    ? `<div class="spell-feedback ${session.inputCorrect ? 'spell-ok' : 'spell-bad'}">
        ${session.inputCorrect ? '拼写正确' : `你写的是「${esc(session.input.trim())}」`}
      </div>` : '';

  const phon = S.settings.showPhonetic && w.phonetic ? `<span>${esc(w.phonetic)}</span>` : '';
  return `<div class="wcard">
    <div class="wcard-back">
      <div class="back-head">
        ${illusHTML(w, true)}
        <div class="back-word"><b>${esc(w.head)}</b>${phon}</div>
        <button class="icon-btn" data-act="speak" title="发音">${icon('volume')}</button>
      </div>
      ${fb}
      <div style="padding-top:6px">${lines}</div>
      ${w.definition ? `<div class="def-box">${esc(w.definition)}</div>` : ''}
    </div>
  </div>`;
}

function gradeBtn(g, label, hint, ic, cls, key) {
  const tail = hint ? `${hint} · ${esc(keyLabel(key))}` : esc(keyLabel(key));
  return `<button class="grade ${cls}" data-act="grade" data-g="${g}">
    <b>${icon(ic)}${label}</b><small>${tail}</small>
  </button>`;
}

const GRADE_LABEL = { again: '忘记了', hard: '有点印象', good: '想起来了', easy: '太简单' };

/** 评完分后卡片已翻到释义面，按空格（继续键）进入下一个词 */
function continueBar() {
  const p = session.pending;
  const w = current().word;
  const km = S.settings.keymap;
  const left = session.queue.filter((it, i) => i > session.index && it.word.id === w.id).length;
  let note;
  if (p.loop) note = p.grade === 'easy' ? '移出这组新词' : `还会再出现 ${left} 次`;
  else note = `${p.reviewAt}后复习`;
  return `<div class="grade-bar single">
    <button class="btn btn-primary next-btn" data-act="next" title="按 ${esc(keyLabel(km.reveal))} 进入下一个词">
      <b>继续 · 下一个词</b>
      <span>${esc(GRADE_LABEL[p.grade])} · ${esc(note)} · 按 ${esc(keyLabel(km.reveal))}</span>
    </button>
  </div>`;
}

function sessionSummary() {
  const acc = session.newLearned + session.reviewed;
  const pct = acc ? Math.round(((acc - session.againCount) / acc) * 100) : 0;
  const mins = Math.max(1, Math.round((Date.now() - session.startedAt) / 60000));
  return `<div class="sess-body">
    <div class="summary">
      <h2>本组完成</h2>
      <div class="summary-sub">${streak() > 0 ? `连续打卡 ${streak()} 天` : '今天开了个头'}</div>
      <div class="summary-grid">
        <div><b>${session.newLearned}</b><span>新学</span></div>
        <div><b>${session.reviewed}</b><span>复习</span></div>
        <div><b>${pct}%</b><span>记得住</span></div>
      </div>
      <p class="summary-note">用时约 ${mins} 分钟 · 忘记 ${session.againCount} 次${session.knownCount ? ` · 标熟 ${session.knownCount} 个` : ''}</p>
      <button class="btn btn-primary" data-act="exit" style="width:100%;max-width:320px;margin:0 auto">回到首页</button>
      <p class="tiny-hint" style="margin-top:12px">忘掉的词已按评分重新插回本组，标熟的词进了熟词本</p>
    </div>
  </div>`;
}

/* ── 交互 ─────────────────────────────────────────────────────────── */

function updateSetting(patch) {
  S.settings = { ...S.settings, ...patch };
  scheduleSave();
  applyTheme();
  render();
}

function applyTheme() {
  const t = S.settings.theme || 'auto';
  const dark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}

async function doExport() {
  const text = exportJSON();
  if (API && API.export_json) {
    const r = await API.export_json(text);
    if (r) toast('已保存到 ' + r);
    else toast('已取消');
    return;
  }
  const blob = new Blob([text], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `wordisle-${ymd()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('已导出');
}

async function doImport() {
  if (API && API.import_json) {
    const text = await API.import_json();
    if (!text) return toast('已取消');
    const n = importJSON(text);
    afterImport(n);
    return;
  }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = async () => {
    const f = input.files && input.files[0];
    if (!f) return;
    const text = await f.text();
    afterImport(importJSON(text));
  };
  input.click();
}

function afterImport(n) {
  if (n < 0) { toast('导入失败，文件格式不对'); return; }
  applyTheme();
  render();
  toast(`已导入 ${n} 条学习记录`);
}

document.addEventListener('click', async (e) => {
  // 录制中点了别处：先取消录制，再照常执行点击，避免下一次按键被悄悄吞掉
  if (captureId && !e.target.closest('.keycap')) endCapture(captureId);

  const nav = e.target.closest('.nav-item');
  if (nav) { go(nav.dataset.view); return; }

  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;

  switch (act) {
    case 'nav': go(el.dataset.view); break;
    case 'start': startSession(false); break;
    case 'start-spell': startSession(true); break;
    case 'book':
      S.book = el.dataset.id;
      scheduleSave();
      render();
      toast(`已切换到「${book().name}」`);
      break;
    case 'filter': browseFilter = el.dataset.f; browseLimit = 200; render(); break;
    case 'kfilter': knownFilter = el.dataset.f; render(); break;
    case 'more': browseLimit += 200; fillBrowse(); break;
    case 'star': toggleStar(el.dataset.id); fillBrowse(); updateChrome(); break;
    case 'mark': markKnown(el.dataset.id); fillBrowse(); updateChrome(); toast('已标为熟词'); break;
    case 'unmark': unmarkKnown(el.dataset.id);
      if (route === 'known') fillKnown(); else if (route === 'browse') fillBrowse(); else if (route === 'search') fillSearch();
      updateChrome(); toast('已移出熟词本'); break;
    case 'speak-word': { const w = byId().get(el.dataset.id); if (w) speak(w.head); break; }
    case 'speak': if (current()) speak(current().word.head); break;
    case 'reveal': nudgeGrade(); break;
    case 'next': advanceCard(); break;
    case 'submit': submitSpelling(); break;
    case 'grade': grade(el.dataset.g); break;
    case 'known': markCurrentKnown(); break;
    case 'exit': exitSession(); break;
    case 'theme': updateSetting({ theme: el.dataset.v }); break;
    case 'accent': updateSetting({ accentUs: el.dataset.v === 'us' }); break;
    case 'toggle': updateSetting({ [el.dataset.k]: !S.settings[el.dataset.k] }); break;
    case 'step': {
      const k = el.dataset.k, d = Number(el.dataset.d);
      const v = Math.max(k === 'dailyNew' ? 5 : 10, Math.min(200, S.settings[k] + d));
      updateSetting({ [k]: v });
      break;
    }
    case 'sample': {
      setSearchValue(el.dataset.q, true);
      break;
    }
    case 'search-clear': {
      setSearchValue('', false);
      $('#searchInput')?.focus();
      break;
    }
    case 'hist-run': {
      setSearchValue(el.dataset.q, true);
      $('#searchInput')?.focus();
      break;
    }
    case 'hist-del': removeHistory(el.dataset.q); break;
    case 'hist-clear': {
      if (!S.searchHistory.length) return;
      if (!confirm('清空全部查词历史？学习记录不受影响。')) return;
      S.searchHistory = [];
      histOpen = false;
      scheduleSave();
      renderHistory();
      toast('查词历史已清空');
      break;
    }
    case 'hist-toggle': histOpen = !histOpen; renderHistory(); break;
    case 'speak-text': speak(el.dataset.text || ''); break;
    case 'export': doExport(); break;
    case 'import': doImport(); break;
    case 'bindkey': beginCapture(el.dataset.k); break;
    case 'keyreset': {
      captureId = null;
      updateSetting({ keymap: { ...DEFAULT_KEYMAP } });
      toast('键位已恢复默认');
      break;
    }
    case 'clear': {
      if (!confirm('确定清空所有学习记录？此操作不可撤销。')) return;
      S.cards = {}; S.logs = {}; S.known = [];
      knownSet = new Set();
      S.settings = { ...DEFAULT_SETTINGS, keymap: { ...S.settings.keymap } };
      scheduleSave();
      applyTheme();
      render();
      toast('已清空学习数据');
      break;
    }
  }
});

/* 输入框：单独绑定，避免重渲染丢焦点 */
document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.id === 'browseInput') { browseQuery = t.value; browseLimit = 200; fillBrowse(); }
  else if (t.id === 'searchInput') {
    searchQuery = t.value;
    syncClearBtn();
    fillSearch();
    // 输入停下来再记历史，避免把 pull / pull o 这些半截都写进去
    clearTimeout(histTimer);
    histTimer = setTimeout(commitSearch, 700);
  }
  else if (t.id === 'spellInput') { if (session) session.input = t.value; }
});

document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea';
  const km = S.settings.keymap;

  /* 1) 正在录制键位：这一次按键只用来绑定，不触发任何功能 */
  if (captureId) {
    e.preventDefault();
    if (e.ctrlKey || e.altKey || e.metaKey) { toast('不支持 Ctrl / Alt / Win 组合键，请单按一个键'); return; }
    const raw = normKey(e.key);
    if (raw === 'Escape') { endCapture(captureId); toast('已取消'); return; }
    if (KEY_MODIFIERS.has(raw)) return;          // 只按了 Shift 这类修饰键，继续等
    if (KEY_RESERVED.has(raw)) { toast(`${keyLabel(raw)} 被系统占用，换一个键吧`); return; }
    bindKey(captureId, raw);
    return;
  }

  /* 2) 带修饰键的组合留给系统（Ctrl+C / Alt+Tab 等），不抢 */
  if (e.isComposing || e.ctrlKey || e.altKey || e.metaKey) return;

  if (session) {
    if (keyMatch(e, km.exit)) { e.preventDefault(); exitSession(); return; }
    if (session.spelling && !session.revealed) {
      if (e.key === 'Enter') { e.preventDefault(); submitSpelling(); }
      return;
    }
    if (session.finished) {
      if (e.key === 'Enter' || keyMatch(e, km.reveal)) { e.preventDefault(); exitSession(); }
      return;
    }
    // 已评分、卡片翻在释义面：只认「继续」，评分键不再生效
    if (session.pending) {
      if (!typing && keyMatch(e, km.reveal)) { e.preventDefault(); advanceCard(); return; }
      if (!typing && keyMatch(e, km.known)) { e.preventDefault(); markCurrentKnown(); return; }
      if (!typing && keyMatch(e, km.speak)) {
        e.preventDefault();
        const w = current() && current().word;
        if (w) speak(w.head);
        return;
      }
      return;
    }
    // 正面：先评分（1~4），空格的用途是「下一个」，此时只做提示
    if (keyMatch(e, km.reveal)) {
      if (typing) return;
      e.preventDefault();
      nudgeGrade();
      return;
    }
    if (!typing) {
      const hit = [['gradeAgain', 'again'], ['gradeHard', 'hard'], ['gradeGood', 'good'], ['gradeEasy', 'easy']]
        .find(([id]) => keyMatch(e, km[id]));
      if (hit) { e.preventDefault(); grade(hit[1]); return; }
    }
    if (!typing && keyMatch(e, km.known)) { e.preventDefault(); markCurrentKnown(); return; }
    if (!typing && keyMatch(e, km.speak)) {
      e.preventDefault();
      const w = current() && current().word;
      if (w) speak(w.head);
      return;
    }
    return;
  }

  if (keyMatch(e, km.search) && !typing) {
    e.preventDefault();
    go('search');
    setTimeout(() => $('#searchInput')?.focus(), 30);
    return;
  }
  // 查词框里按回车：立刻记一条历史，不用等防抖
  if (typing && e.target.id === 'searchInput' && e.key === 'Enter') {
    e.preventDefault();
    commitSearch();
    return;
  }
  if (keyMatch(e, km.exit) && typing) { e.target.blur(); }
});

/* ── 启动 ─────────────────────────────────────────────────────────── */

function fillIcons() {
  document.querySelectorAll('[data-ico]').forEach((el) => { el.innerHTML = icon(el.dataset.ico); });
}

let started = false;
async function boot() {
  if (started) return;
  started = true;

  if (window.pywebview && window.pywebview.api) API = window.pywebview.api;
  await loadState();
  applyTheme();
  fillIcons();

  // 支持 #books / #study 这类深链，方便做桌面快捷方式
  const h = location.hash.slice(1);
  if (h === 'study') { render(); startSession(false); return; }
  if (h === 'spell') { render(); startSession(true); return; }
  if (TITLES[h]) route = h;

  render();
}

window.addEventListener('pywebviewready', () => {
  API = window.pywebview.api;
  if (!started) boot();
});
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => boot(), 120);
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((S.settings.theme || 'auto') === 'auto') applyTheme();
});
