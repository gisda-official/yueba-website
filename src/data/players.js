/* ==========================================================================
   粤BA · 球员数据库
   真实核心球员（得分王刘曙萌、总决赛MVP周泽源、助攻王钟俊杰等）+ 示例阵容。
   字段：stats = { gp 出场, ppg 得分, rpg 篮板, apg 助攻, spg 抢断, bpg 盖帽,
                  mp 出场分钟, fg 命中率%, three 三分%, ft 罚球% }
   ========================================================================== */

const players = [
  /* ===================== 东莞 Dongguan ===================== */
  { id: 'zyz', teamId: 'dongguan', name: '周泽源', nameEn: 'Zhou Zeyuan', num: 3, pos: 'PF', ht: 203, wt: 102, age: 27, stats: { gp: 18, ppg: 22.4, rpg: 8.6, apg: 3.1, spg: 1.4, bpg: 1.2, mp: 33.5, fg: 58.2, three: 35.4, ft: 78.9 }, honors: ['2026 粤BA 总决赛 MVP', '2026 粤BA 总冠军'], star: true, bio: '东莞队内线核心，总决赛两回合场均 30+ 的统治级表现，率队 2:0 夺冠，荣膺首届粤BA 总决赛 MVP。' },
  { id: 'lkn', teamId: 'dongguan', name: '刘康能', nameEn: 'Liu Kangneng', num: 7, pos: 'PG', ht: 183, wt: 80, age: 25, stats: { gp: 18, ppg: 13.8, rpg: 4.2, apg: 6.8, spg: 4.5, bpg: 0.2, mp: 31.0, fg: 47.6, three: 38.2, ft: 81.5 }, honors: ['2026 常规赛抢断王（4.5 次）', '2026 粤BA 总冠军'], star: true, bio: '「东莞闪电」，场均 4.5 次抢断高居联赛第一，攻防一体的后场发动机。' },
  { id: 'lj', teamId: 'dongguan', name: '罗杰', nameEn: 'Luo Jie', num: 11, pos: 'SF', ht: 195, wt: 90, age: 31, stats: { gp: 16, ppg: 16.9, rpg: 5.1, apg: 2.6, spg: 1.1, bpg: 0.6, mp: 29.4, fg: 49.8, three: 39.1, ft: 83.2 }, honors: ['2015 首届广东省男子篮球联赛总决赛 MVP'], star: true, bio: '东莞队老队长，2015 年首届联赛总决赛 MVP，见证并缔造了东莞篮球的黄金十年。' },
  { id: 'cjh', teamId: 'dongguan', name: '陈嘉豪', nameEn: 'Chen Jiahao', num: 1, pos: 'SG', ht: 190, wt: 85, age: 24, stats: { gp: 18, ppg: 15.2, rpg: 3.4, apg: 2.9, spg: 1.3, bpg: 0.3, mp: 27.8, fg: 45.9, three: 41.3, ft: 86.0 }, honors: [], star: false },
  { id: 'hzw', teamId: 'dongguan', name: '黄子维', nameEn: 'Huang Ziwei', num: 15, pos: 'C', ht: 210, wt: 118, age: 28, stats: { gp: 17, ppg: 11.5, rpg: 9.3, apg: 1.2, spg: 0.6, bpg: 1.8, mp: 26.2, fg: 60.4, three: 0, ft: 65.7 }, honors: [], star: false },
  { id: 'wl', teamId: 'dongguan', name: '吴磊', nameEn: 'Wu Lei', num: 9, pos: 'G', ht: 186, wt: 82, age: 23, stats: { gp: 15, ppg: 8.6, rpg: 2.8, apg: 4.4, spg: 1.6, bpg: 0.1, mp: 21.5, fg: 43.7, three: 36.5, ft: 79.4 }, honors: [], star: false },

  /* ===================== 深圳 Shenzhen ===================== */
  { id: 'qpl', teamId: 'shenzhen', name: '秦培量', nameEn: 'Qin Peiliang', num: 5, pos: 'PG', ht: 185, wt: 81, age: 26, stats: { gp: 17, ppg: 15.6, rpg: 3.9, apg: 6.3, spg: 1.9, bpg: 0.2, mp: 32.6, fg: 46.8, three: 37.6, ft: 84.1 }, honors: ['2026 常规赛助攻王（6.33 次）', '2026 粤BA 亚军'], star: true, bio: '深圳队大脑，场均 6.33 次助攻串联全队，率队一路杀入总决赛。' },
  { id: 'zjy', teamId: 'shenzhen', name: '郑家勇', nameEn: 'Zheng Jiayong', num: 23, pos: 'SF', ht: 198, wt: 96, age: 27, stats: { gp: 17, ppg: 19.8, rpg: 6.4, apg: 2.4, spg: 1.2, bpg: 0.7, mp: 33.1, fg: 51.3, three: 36.8, ft: 80.2 }, honors: ['2026 粤BA 亚军'], star: true, bio: '深圳队锋线尖刀，总决赛两回合均有亮眼发挥，是球队攻坚核心。' },
  { id: 'lwj', teamId: 'shenzhen', name: '林伟杰', nameEn: 'Lin Weijie', num: 8, pos: 'C', ht: 208, wt: 112, age: 28, stats: { gp: 16, ppg: 12.3, rpg: 9.8, apg: 1.1, spg: 0.5, bpg: 1.9, mp: 27.4, fg: 59.6, three: 0, ft: 70.3 }, honors: [], star: false },
  { id: 'zjh', teamId: 'shenzhen', name: '张俊豪', nameEn: 'Zhang Junhao', num: 2, pos: 'SG', ht: 192, wt: 87, age: 24, stats: { gp: 17, ppg: 14.1, rpg: 3.2, apg: 2.2, spg: 1.4, bpg: 0.3, mp: 25.6, fg: 44.9, three: 40.5, ft: 82.7 }, honors: [], star: false },
  { id: 'hy', teamId: 'shenzhen', name: '黄宇', nameEn: 'Huang Yu', num: 33, pos: 'PF', ht: 202, wt: 100, age: 26, stats: { gp: 15, ppg: 9.7, rpg: 6.8, apg: 1.8, spg: 0.8, bpg: 0.9, mp: 22.8, fg: 48.5, three: 30.2, ft: 74.6 }, honors: [], star: false },
  { id: 'xfl', teamId: 'shenzhen', name: '谢锋林', nameEn: 'Xie Fenglin', num: 12, pos: 'G', ht: 184, wt: 79, age: 23, stats: { gp: 14, ppg: 7.8, rpg: 2.5, apg: 3.9, spg: 1.5, bpg: 0.1, mp: 20.4, fg: 42.8, three: 35.9, ft: 77.8 }, honors: [], star: false },

  /* ===================== 河源 Heyuan ===================== */
  { id: 'zyc', teamId: 'heyuan', name: '曾煜成', nameEn: 'Zeng Yucheng', num: 10, pos: 'SG', ht: 193, wt: 89, age: 25, stats: { gp: 14, ppg: 24.8, rpg: 4.6, apg: 3.0, spg: 1.3, bpg: 0.4, mp: 34.2, fg: 48.9, three: 40.2, ft: 85.3 }, honors: ['2026 4月月度得分王（26.66 分）'], star: true, bio: '河源头号得分手，4 月以场均 26.66 分当选月度得分王，是联赛最具威胁的外线火力点。' },
  { id: 'lyy', teamId: 'heyuan', name: '黎伊扬', nameEn: 'Li Yiyang', num: 6, pos: 'PG', ht: 187, wt: 82, age: 26, stats: { gp: 14, ppg: 19.5, rpg: 4.9, apg: 8.2, spg: 2.1, bpg: 0.3, mp: 33.8, fg: 47.2, three: 36.1, ft: 83.0 }, honors: ['2025 广东省男子篮球联赛总决赛 MVP', '2025 联赛总冠军'], star: true, bio: '2025 年总决赛 MVP，河源夺冠的头号功臣，攻传一体的王牌控卫。' },
  { id: 'hjh', teamId: 'heyuan', name: '何俊辉', nameEn: 'He Junhui', num: 21, pos: 'C', ht: 207, wt: 110, age: 27, stats: { gp: 14, ppg: 11.2, rpg: 9.1, apg: 1.0, spg: 0.4, bpg: 1.6, mp: 26.8, fg: 57.8, three: 0, ft: 68.9 }, honors: [], star: false },
  { id: 'dcw', teamId: 'heyuan', name: '邓超文', nameEn: 'Deng Chaowen', num: 3, pos: 'SF', ht: 196, wt: 93, age: 25, stats: { gp: 13, ppg: 12.4, rpg: 5.5, apg: 2.1, spg: 1.0, bpg: 0.5, mp: 28.0, fg: 46.5, three: 33.8, ft: 76.4 }, honors: [], star: false },
  { id: 'yj', teamId: 'heyuan', name: '杨健', nameEn: 'Yang Jian', num: 17, pos: 'PF', ht: 201, wt: 99, age: 26, stats: { gp: 14, ppg: 8.9, rpg: 6.6, apg: 1.5, spg: 0.7, bpg: 0.8, mp: 23.5, fg: 50.1, three: 28.7, ft: 71.8 }, honors: [], star: false },

  /* ===================== 广州 Guangzhou ===================== */
  { id: 'gzc', teamId: 'guangzhou', name: '李凯文', nameEn: 'Li Kaiwen', num: 0, pos: 'PG', ht: 186, wt: 82, age: 26, stats: { gp: 15, ppg: 17.3, rpg: 3.8, apg: 7.4, spg: 2.0, bpg: 0.2, mp: 32.9, fg: 46.1, three: 37.4, ft: 82.6 }, honors: ['2026 粤BA 四强'], star: true, bio: '广州队指挥官，1/4 决赛「黄金九分」9:0 零封潮州一役的节奏掌控者。' },
  { id: 'gzf', teamId: 'guangzhou', name: '陈永强', nameEn: 'Chen Yongqiang', num: 9, pos: 'C', ht: 209, wt: 115, age: 28, stats: { gp: 15, ppg: 14.8, rpg: 10.2, apg: 1.3, spg: 0.6, bpg: 2.0, mp: 29.1, fg: 58.7, three: 0, ft: 72.5 }, honors: ['2026 粤BA 四强'], star: true, bio: '广州队内线支柱，场均两双，是羊城禁区的「木棉之盾」。' },
  { id: 'gzsf', teamId: 'guangzhou', name: '黄浩然', nameEn: 'Huang Haoran', num: 24, pos: 'SF', ht: 197, wt: 95, age: 25, stats: { gp: 15, ppg: 16.1, rpg: 5.2, apg: 2.5, spg: 1.1, bpg: 0.6, mp: 30.6, fg: 49.4, three: 35.2, ft: 79.8 }, honors: [], star: false },
  { id: 'gzgg', teamId: 'guangzhou', name: '梁嘉豪', nameEn: 'Liang Jiahao', num: 7, pos: 'SG', ht: 191, wt: 86, age: 24, stats: { gp: 14, ppg: 12.7, rpg: 3.1, apg: 2.8, spg: 1.4, bpg: 0.2, mp: 25.9, fg: 44.3, three: 39.8, ft: 81.1 }, honors: [], star: false },
  { id: 'gzwy', teamId: 'guangzhou', name: '吴烨', nameEn: 'Wu Ye', num: 13, pos: 'PF', ht: 203, wt: 101, age: 27, stats: { gp: 15, ppg: 9.5, rpg: 6.9, apg: 1.6, spg: 0.7, bpg: 1.1, mp: 24.3, fg: 51.6, three: 31.4, ft: 73.9 }, honors: [], star: false },

  /* ===================== 佛山 Foshan ===================== */
  { id: 'zjj', teamId: 'foshan', name: '钟俊杰', nameEn: 'Zhong Junjie', num: 4, pos: 'PG', ht: 184, wt: 79, age: 25, stats: { gp: 13, ppg: 14.2, rpg: 3.9, apg: 8.5, spg: 1.8, bpg: 0.1, mp: 33.4, fg: 45.5, three: 36.9, ft: 83.4 }, honors: ['2026 常规赛助攻王（8.5 次）', '2026 季后赛八强'], star: true, bio: '佛山「醒狮之芯」，场均 8.5 次助攻高居联赛第一，以华丽传切带动全队。' },
  { id: 'fsl', teamId: 'foshan', name: '陈志鹏', nameEn: 'Chen Zhipeng', num: 10, pos: 'SF', ht: 196, wt: 94, age: 26, stats: { gp: 13, ppg: 17.6, rpg: 5.8, apg: 2.3, spg: 1.0, bpg: 0.5, mp: 31.7, fg: 48.3, three: 34.6, ft: 78.2 }, honors: [], star: false },
  { id: 'fsw', teamId: 'foshan', name: '梁伟', nameEn: 'Liang Wei', num: 15, pos: 'C', ht: 208, wt: 113, age: 27, stats: { gp: 13, ppg: 12.9, rpg: 9.6, apg: 1.2, spg: 0.5, bpg: 1.7, mp: 28.3, fg: 57.9, three: 0, ft: 69.8 }, honors: [], star: false },
  { id: 'fsy', teamId: 'foshan', name: '叶文轩', nameEn: 'Ye Wenxuan', num: 8, pos: 'SG', ht: 189, wt: 84, age: 24, stats: { gp: 12, ppg: 11.8, rpg: 2.9, apg: 2.5, spg: 1.2, bpg: 0.3, mp: 23.6, fg: 43.9, three: 38.4, ft: 80.5 }, honors: [], star: false },

  /* ===================== 中山 Zhongshan ===================== */
  { id: 'lwb', teamId: 'zhongshan', name: '李文博', nameEn: 'Li Wenbo', num: 11, pos: 'SG', ht: 190, wt: 85, age: 25, stats: { gp: 14, ppg: 18.3, rpg: 4.0, apg: 3.2, spg: 1.5, bpg: 0.3, mp: 32.2, fg: 47.7, three: 40.8, ft: 84.9 }, honors: ['2026 粤BA 四强', '揭幕战 86:83 客胜广州'], star: true, bio: '揭幕战末节关键三分先生，率中山队客场 86:83 爆冷绝杀广州，一战成名。' },
  { id: 'zsg', teamId: 'zhongshan', name: '郑国安', nameEn: 'Zheng Guoan', num: 6, pos: 'PG', ht: 185, wt: 80, age: 26, stats: { gp: 14, ppg: 15.7, rpg: 3.6, apg: 6.9, spg: 1.9, bpg: 0.2, mp: 31.8, fg: 45.8, three: 36.3, ft: 81.7 }, honors: ['2026 粤BA 四强'], star: false },
  { id: 'zsz', teamId: 'zhongshan', name: '冯志强', nameEn: 'Feng Zhiqiang', num: 21, pos: 'C', ht: 206, wt: 109, age: 27, stats: { gp: 14, ppg: 11.9, rpg: 9.2, apg: 1.1, spg: 0.4, bpg: 1.5, mp: 27.0, fg: 56.8, three: 0, ft: 70.6 }, honors: [], star: false },
  { id: 'zsh', teamId: 'zhongshan', name: '何俊', nameEn: 'He Jun', num: 3, pos: 'SF', ht: 194, wt: 92, age: 24, stats: { gp: 13, ppg: 10.4, rpg: 5.0, apg: 2.0, spg: 0.9, bpg: 0.4, mp: 25.4, fg: 46.2, three: 33.5, ft: 75.8 }, honors: [], star: false },

  /* ===================== 肇庆 Zhaoqing ===================== */
  { id: 'lsm', teamId: 'zhaoqing', name: '刘曙萌', nameEn: 'Liu Shumeng', num: 8, pos: 'PF', ht: 201, wt: 104, age: 24, stats: { gp: 12, ppg: 25.4, rpg: 13.0, apg: 2.2, spg: 1.1, bpg: 1.0, mp: 35.1, fg: 54.6, three: 32.8, ft: 77.2 }, honors: ['2026 常规赛得分王（25.42 分）', '2026 常规赛篮板王（13.0 个）', '单场最高 34 分'], star: true, bio: '粤BA 第一杀器，场均 25.42 分 + 13 篮板包揽得分王与篮板王，单场轰下 34 分，是西区最炙手可热的新星。' },
  { id: 'zqw', teamId: 'zhaoqing', name: '梁志文', nameEn: 'Liang Zhiwen', num: 12, pos: 'C', ht: 210, wt: 118, age: 27, stats: { gp: 12, ppg: 10.8, rpg: 8.7, apg: 0.9, spg: 0.3, bpg: 1.8, mp: 26.9, fg: 58.1, three: 0, ft: 67.4 }, honors: [], star: false },
  { id: 'zqx', teamId: 'zhaoqing', name: '邓晓东', nameEn: 'Deng Xiaodong', num: 5, pos: 'PG', ht: 182, wt: 78, age: 24, stats: { gp: 12, ppg: 11.2, rpg: 3.1, apg: 6.4, spg: 1.6, bpg: 0.1, mp: 29.5, fg: 43.6, three: 35.7, ft: 79.3 }, honors: [], star: false },
  { id: 'zqt', teamId: 'zhaoqing', name: '何锦华', nameEn: 'He Jinhua', num: 9, pos: 'SG', ht: 190, wt: 85, age: 25, stats: { gp: 12, ppg: 13.5, rpg: 3.4, apg: 2.6, spg: 1.2, bpg: 0.2, mp: 27.3, fg: 44.8, three: 37.2, ft: 80.6 }, honors: [], star: false },

  /* ===================== 惠州 Huizhou ===================== */
  { id: 'zhy', teamId: 'huizhou', name: '朱浩源', nameEn: 'Zhu Haoyuan', num: 14, pos: 'C', ht: 211, wt: 120, age: 28, stats: { gp: 12, ppg: 12.6, rpg: 12.9, apg: 1.0, spg: 0.4, bpg: 2.1, mp: 30.2, fg: 59.8, three: 0, ft: 66.2 }, honors: ['2026 常规赛篮板王（12.9 个）', '单场最高 15 篮板'], star: true, bio: '惠州「禁区猛虎」，场均 12.9 篮板统治内线，是联赛最会抢篮板的巨人。' },
  { id: 'hzl', teamId: 'huizhou', name: '陈俊生', nameEn: 'Chen Junsheng', num: 2, pos: 'PG', ht: 183, wt: 79, age: 25, stats: { gp: 12, ppg: 14.1, rpg: 3.2, apg: 5.8, spg: 1.5, bpg: 0.1, mp: 28.9, fg: 44.7, three: 36.0, ft: 78.5 }, honors: [], star: false },
  { id: 'hzy', teamId: 'huizhou', name: '杨志伟', nameEn: 'Yang Zhiwei', num: 7, pos: 'SF', ht: 195, wt: 93, age: 26, stats: { gp: 12, ppg: 13.8, rpg: 5.1, apg: 2.2, spg: 1.0, bpg: 0.5, mp: 29.4, fg: 47.1, three: 33.9, ft: 76.8 }, honors: [], star: false },
  { id: 'hzh', teamId: 'huizhou', name: '黄俊', nameEn: 'Huang Jun', num: 11, pos: 'SG', ht: 189, wt: 84, age: 24, stats: { gp: 11, ppg: 10.9, rpg: 2.8, apg: 2.4, spg: 1.1, bpg: 0.2, mp: 23.1, fg: 43.2, three: 38.1, ft: 79.9 }, honors: [], star: false },

  /* ===================== 汕头 Shantou ===================== */
  { id: 'lhh', teamId: 'shantou', name: '连浩瀚', nameEn: 'Lian Haohan', num: 5, pos: 'PG', ht: 184, wt: 80, age: 25, stats: { gp: 11, ppg: 13.4, rpg: 3.5, apg: 5.9, spg: 3.7, bpg: 0.1, mp: 30.6, fg: 45.1, three: 35.4, ft: 80.8 }, honors: ['2026 常规赛抢断王（3.66 次）', '2026 季后赛八强'], star: true, bio: '汕头「英歌舞者」，场均 3.66 次抢断领跑联赛，压迫式防守令对手后卫胆寒。' },
  { id: 'stc', teamId: 'shantou', name: '陈立群', nameEn: 'Chen Liqun', num: 9, pos: 'SF', ht: 197, wt: 95, age: 26, stats: { gp: 11, ppg: 16.2, rpg: 5.9, apg: 2.4, spg: 1.1, bpg: 0.6, mp: 31.2, fg: 47.8, three: 34.2, ft: 77.5 }, honors: ['2026 季后赛八强'], star: false },
  { id: 'stl', teamId: 'shantou', name: '林东阳', nameEn: 'Lin Dongyang', num: 18, pos: 'C', ht: 207, wt: 111, age: 27, stats: { gp: 11, ppg: 11.7, rpg: 9.0, apg: 1.1, spg: 0.5, bpg: 1.6, mp: 27.5, fg: 56.9, three: 0, ft: 69.7 }, honors: [], star: false },
  { id: 'stw', teamId: 'shantou', name: '吴泽群', nameEn: 'Wu Zequn', num: 3, pos: 'SG', ht: 190, wt: 86, age: 24, stats: { gp: 11, ppg: 12.1, rpg: 3.0, apg: 2.3, spg: 1.3, bpg: 0.2, mp: 24.8, fg: 44.0, three: 37.6, ft: 79.1 }, honors: [], star: false },

  /* ===================== 潮州 Chaozhou ===================== */
  { id: 'czj', teamId: 'chaozhou', name: '陈旭东', nameEn: 'Chen Xudong', num: 7, pos: 'SF', ht: 196, wt: 94, age: 26, stats: { gp: 11, ppg: 17.8, rpg: 5.6, apg: 2.5, spg: 1.2, bpg: 0.5, mp: 31.9, fg: 48.6, three: 35.0, ft: 78.9 }, honors: ['2026 季后赛八强（黄金九分晋级）'], star: true, bio: '潮州队锋线核心，八强附加赛「黄金九分」中的关键得分手，率队惊险突围。' },
  { id: 'czw', teamId: 'chaozhou', name: '吴坤鹏', nameEn: 'Wu Kunpeng', num: 12, pos: 'C', ht: 208, wt: 112, age: 27, stats: { gp: 11, ppg: 12.4, rpg: 9.3, apg: 1.0, spg: 0.4, bpg: 1.7, mp: 28.1, fg: 57.2, three: 0, ft: 68.5 }, honors: [], star: false },
  { id: 'czl', teamId: 'chaozhou', name: '林沐阳', nameEn: 'Lin Muyang', num: 1, pos: 'PG', ht: 183, wt: 79, age: 24, stats: { gp: 11, ppg: 11.9, rpg: 3.3, apg: 5.6, spg: 1.5, bpg: 0.1, mp: 27.9, fg: 43.5, three: 35.8, ft: 79.6 }, honors: [], star: false },
  { id: 'czh', teamId: 'chaozhou', name: '黄卓然', nameEn: 'Huang Zhuoran', num: 9, pos: 'SG', ht: 189, wt: 84, age: 25, stats: { gp: 10, ppg: 10.6, rpg: 2.7, apg: 2.4, spg: 1.0, bpg: 0.2, mp: 22.6, fg: 42.9, three: 37.4, ft: 80.2 }, honors: [], star: false },

  /* ===================== 揭阳 Jieyang ===================== */
  { id: 'jyl', teamId: 'jieyang', name: '陈志杰', nameEn: 'Chen Zhijie', num: 6, pos: 'PG', ht: 184, wt: 80, age: 25, stats: { gp: 10, ppg: 15.5, rpg: 3.6, apg: 6.1, spg: 1.7, bpg: 0.1, mp: 31.0, fg: 45.4, three: 36.2, ft: 81.3 }, honors: ['2026 季后赛八强（黄金九分晋级）'], star: true, bio: '揭阳队后场核心，组织得分兼备，率队以「黄金九分」惊险晋级八强。' },
  { id: 'jyw', teamId: 'jieyang', name: '黄伟豪', nameEn: 'Huang Weihao', num: 20, pos: 'C', ht: 207, wt: 110, age: 27, stats: { gp: 10, ppg: 11.6, rpg: 9.1, apg: 1.0, spg: 0.4, bpg: 1.6, mp: 27.2, fg: 56.5, three: 0, ft: 69.1 }, honors: [], star: false },
  { id: 'jyz', teamId: 'jieyang', name: '郑子涵', nameEn: 'Zheng Zihan', num: 4, pos: 'SF', ht: 195, wt: 93, age: 24, stats: { gp: 10, ppg: 13.2, rpg: 5.3, apg: 2.1, spg: 1.0, bpg: 0.4, mp: 28.7, fg: 46.8, three: 33.6, ft: 75.9 }, honors: [], star: false },
  { id: 'jyx', teamId: 'jieyang', name: '许明辉', nameEn: 'Xu Minghui', num: 14, pos: 'SG', ht: 190, wt: 85, age: 25, stats: { gp: 10, ppg: 11.0, rpg: 2.9, apg: 2.3, spg: 1.2, bpg: 0.2, mp: 23.9, fg: 43.3, three: 37.8, ft: 79.4 }, honors: [], star: false },

  /* ===================== 江门 Jiangmen ===================== */
  { id: 'fzl', teamId: 'jiangmen', name: '冯泽泷', nameEn: 'Feng Zelong', num: 3, pos: 'PG', ht: 184, wt: 79, age: 24, stats: { gp: 10, ppg: 12.8, rpg: 3.4, apg: 5.9, spg: 1.6, bpg: 0.1, mp: 30.4, fg: 44.6, three: 35.5, ft: 80.7 }, honors: ['2026 常规赛助攻王（5.88 次）'], star: true, bio: '江门「侨乡之芯」，场均 5.88 次助攻，用精准传球串联起整支球队。' },
  { id: 'jml', teamId: 'jiangmen', name: '梁国华', nameEn: 'Liang Guohua', num: 10, pos: 'SF', ht: 196, wt: 94, age: 26, stats: { gp: 10, ppg: 15.9, rpg: 5.7, apg: 2.3, spg: 1.1, bpg: 0.5, mp: 31.3, fg: 47.5, three: 34.1, ft: 77.6 }, honors: [], star: false },
  { id: 'jmw', teamId: 'jiangmen', name: '黄子健', nameEn: 'Huang Zijian', num: 22, pos: 'C', ht: 207, wt: 111, age: 27, stats: { gp: 10, ppg: 11.3, rpg: 8.8, apg: 1.0, spg: 0.4, bpg: 1.5, mp: 26.8, fg: 56.1, three: 0, ft: 68.8 }, honors: [], star: false },
  { id: 'jml2', teamId: 'jiangmen', name: '林志鹏', nameEn: 'Lin Zhipeng', num: 8, pos: 'SG', ht: 189, wt: 84, age: 24, stats: { gp: 10, ppg: 10.8, rpg: 2.8, apg: 2.4, spg: 1.1, bpg: 0.2, mp: 23.4, fg: 43.0, three: 37.1, ft: 79.0 }, honors: [], star: false },

  /* ===================== 珠海 Zhuhai ===================== */
  { id: 'zhp', teamId: 'zhuhai', name: '陈嘉鹏', nameEn: 'Chen Jiapeng', num: 9, pos: 'SG', ht: 191, wt: 86, age: 24, stats: { gp: 9, ppg: 16.4, rpg: 3.9, apg: 3.1, spg: 1.4, bpg: 0.3, mp: 32.0, fg: 47.9, three: 39.2, ft: 82.5 }, honors: [], star: true, bio: '珠海队头号得分手，外线投射精准，是「百岛之市」最闪耀的进攻箭头。' },
  { id: 'zhw', teamId: 'zhuhai', name: '黄志明', nameEn: 'Huang Zhiming', num: 17, pos: 'C', ht: 206, wt: 109, age: 27, stats: { gp: 9, ppg: 11.5, rpg: 8.9, apg: 1.1, spg: 0.4, bpg: 1.5, mp: 27.0, fg: 55.9, three: 0, ft: 68.9 }, honors: [], star: false },
  { id: 'zhh', teamId: 'zhuhai', name: '何俊杰', nameEn: 'He Junjie', num: 5, pos: 'PG', ht: 183, wt: 79, age: 25, stats: { gp: 9, ppg: 11.2, rpg: 3.2, apg: 5.4, spg: 1.4, bpg: 0.1, mp: 28.6, fg: 43.7, three: 35.0, ft: 78.8 }, honors: [], star: false },
  { id: 'zhs', teamId: 'zhuhai', name: '张思远', nameEn: 'Zhang Siyuan', num: 2, pos: 'SF', ht: 194, wt: 92, age: 25, stats: { gp: 9, ppg: 10.6, rpg: 5.0, apg: 2.0, spg: 0.9, bpg: 0.4, mp: 25.8, fg: 45.2, three: 32.9, ft: 74.6 }, honors: [], star: false },

  /* ===================== 湛江 Zhanjiang ===================== */
  { id: 'zjp', teamId: 'zhanjiang', name: '陈子鹏', nameEn: 'Chen Zipeng', num: 12, pos: 'PF', ht: 202, wt: 103, age: 26, stats: { gp: 9, ppg: 15.7, rpg: 8.5, apg: 1.9, spg: 0.9, bpg: 1.2, mp: 31.5, fg: 50.2, three: 31.6, ft: 75.3 }, honors: [], star: true, bio: '湛江队内线中坚，兼具对抗与柔和手感，是「海鲜之都」篮下的定海神针。' },
  { id: 'zjl', teamId: 'zhanjiang', name: '黄志强', nameEn: 'Huang Zhiqiang', num: 6, pos: 'PG', ht: 184, wt: 80, age: 25, stats: { gp: 9, ppg: 12.9, rpg: 3.3, apg: 5.2, spg: 1.5, bpg: 0.1, mp: 29.8, fg: 44.1, three: 35.3, ft: 79.2 }, honors: [], star: false },
  { id: 'zjw', teamId: 'zhanjiang', name: '吴泽昊', nameEn: 'Wu Zehao', num: 21, pos: 'C', ht: 209, wt: 114, age: 28, stats: { gp: 9, ppg: 10.9, rpg: 8.6, apg: 0.9, spg: 0.3, bpg: 1.7, mp: 26.4, fg: 56.3, three: 0, ft: 67.9 }, honors: [], star: false },

  /* ===================== 茂名 Maoming ===================== */
  { id: 'mml', teamId: 'maoming', name: '梁志豪', nameEn: 'Liang Zhihao', num: 8, pos: 'SG', ht: 190, wt: 86, age: 24, stats: { gp: 9, ppg: 16.8, rpg: 3.7, apg: 2.8, spg: 1.3, bpg: 0.2, mp: 32.3, fg: 47.2, three: 38.6, ft: 81.4 }, honors: [], star: true, bio: '茂名队外线核心，火力凶猛的「荔枝射手」，是球队最稳定的得分点。' },
  { id: 'mmw', teamId: 'maoming', name: '黄伟', nameEn: 'Huang Wei', num: 15, pos: 'C', ht: 207, wt: 112, age: 27, stats: { gp: 9, ppg: 11.2, rpg: 9.0, apg: 1.0, spg: 0.4, bpg: 1.5, mp: 27.6, fg: 55.8, three: 0, ft: 68.4 }, honors: [], star: false },
  { id: 'mmc', teamId: 'maoming', name: '陈志雄', nameEn: 'Chen Zhixiong', num: 3, pos: 'PG', ht: 183, wt: 79, age: 25, stats: { gp: 9, ppg: 10.9, rpg: 3.0, apg: 5.1, spg: 1.3, bpg: 0.1, mp: 28.2, fg: 43.4, three: 34.7, ft: 78.5 }, honors: [], star: false },

  /* ===================== 阳江 Yangjiang ===================== */
  { id: 'yjl', teamId: 'yangjiang', name: '陈明杰', nameEn: 'Chen Mingjie', num: 7, pos: 'SG', ht: 190, wt: 85, age: 25, stats: { gp: 9, ppg: 15.3, rpg: 3.8, apg: 2.9, spg: 1.3, bpg: 0.2, mp: 31.8, fg: 46.5, three: 37.9, ft: 80.1 }, honors: [], star: true, bio: '阳江「刀锋射手」，外线出手快准狠，是球队撕开防线的利器。' },
  { id: 'yjw', teamId: 'yangjiang', name: '黄文杰', nameEn: 'Huang Wenjie', num: 16, pos: 'C', ht: 206, wt: 109, age: 27, stats: { gp: 9, ppg: 10.8, rpg: 8.4, apg: 1.0, spg: 0.4, bpg: 1.4, mp: 26.6, fg: 55.2, three: 0, ft: 67.8 }, honors: [], star: false },
  { id: 'yjx', teamId: 'yangjiang', name: '许志鹏', nameEn: 'Xu Zhipeng', num: 4, pos: 'PG', ht: 183, wt: 79, age: 24, stats: { gp: 9, ppg: 10.7, rpg: 3.1, apg: 4.9, spg: 1.3, bpg: 0.1, mp: 27.8, fg: 42.9, three: 34.5, ft: 77.9 }, honors: [], star: false },

  /* ===================== 梅州 Meizhou ===================== */
  { id: 'mzl', teamId: 'meizhou', name: '陈志勇', nameEn: 'Chen Zhiyong', num: 6, pos: 'PF', ht: 200, wt: 100, age: 26, stats: { gp: 9, ppg: 15.1, rpg: 8.2, apg: 1.8, spg: 0.9, bpg: 1.1, mp: 31.4, fg: 49.8, three: 30.9, ft: 74.2 }, honors: [], star: true, bio: '梅州队「客家雄狮」，作风硬朗，是球队内线攻防的支柱。' },
  { id: 'mzw', teamId: 'meizhou', name: '黄志文', nameEn: 'Huang Zhiwen', num: 18, pos: 'C', ht: 207, wt: 111, age: 27, stats: { gp: 9, ppg: 10.6, rpg: 8.8, apg: 0.9, spg: 0.3, bpg: 1.5, mp: 26.9, fg: 55.6, three: 0, ft: 67.9 }, honors: [], star: false },
  { id: 'mzl2', teamId: 'meizhou', name: '李志明', nameEn: 'Li Zhiming', num: 2, pos: 'PG', ht: 182, wt: 78, age: 24, stats: { gp: 9, ppg: 10.5, rpg: 2.9, apg: 4.8, spg: 1.3, bpg: 0.1, mp: 27.5, fg: 42.7, three: 34.3, ft: 77.6 }, honors: [], star: false },

  /* ===================== 韶关 Shaoguan ===================== */
  { id: 'sgl', teamId: 'shaoguan', name: '梁文杰', nameEn: 'Liang Wenjie', num: 10, pos: 'SF', ht: 196, wt: 94, age: 26, stats: { gp: 9, ppg: 15.6, rpg: 5.5, apg: 2.3, spg: 1.1, bpg: 0.5, mp: 31.6, fg: 47.4, three: 33.8, ft: 76.9 }, honors: [], star: true, bio: '韶关队锋线核心，如丹霞赤壁般坚韧，攻守两端皆有建树。' },
  { id: 'sgw', teamId: 'shaoguan', name: '黄志峰', nameEn: 'Huang Zhifeng', num: 15, pos: 'C', ht: 206, wt: 109, age: 27, stats: { gp: 9, ppg: 10.7, rpg: 8.5, apg: 1.0, spg: 0.4, bpg: 1.4, mp: 26.5, fg: 55.0, three: 0, ft: 67.5 }, honors: [], star: false },
  { id: 'sgx', teamId: 'shaoguan', name: '许明杰', nameEn: 'Xu Mingjie', num: 4, pos: 'PG', ht: 183, wt: 79, age: 24, stats: { gp: 9, ppg: 10.6, rpg: 3.0, apg: 4.7, spg: 1.2, bpg: 0.1, mp: 27.4, fg: 42.8, three: 34.2, ft: 77.4 }, honors: [], star: false },

  /* ===================== 清远 Qingyuan ===================== */
  { id: 'qyl', teamId: 'qingyuan', name: '陈志鹏', nameEn: 'Chen Zhipeng', num: 9, pos: 'SG', ht: 190, wt: 85, age: 25, stats: { gp: 9, ppg: 15.8, rpg: 3.6, apg: 2.9, spg: 1.3, bpg: 0.2, mp: 31.9, fg: 46.8, three: 38.2, ft: 80.4 }, honors: [], star: true, bio: '清远队后场核心，如北江清流般流畅，是球队的得分发动机。' },
  { id: 'qyw', teamId: 'qingyuan', name: '黄志坚', nameEn: 'Huang Zhijian', num: 17, pos: 'C', ht: 207, wt: 110, age: 27, stats: { gp: 9, ppg: 10.9, rpg: 8.6, apg: 1.0, spg: 0.4, bpg: 1.5, mp: 26.8, fg: 55.4, three: 0, ft: 68.0 }, honors: [], star: false },
  { id: 'qyz', teamId: 'qingyuan', name: '曾子豪', nameEn: 'Zeng Zihao', num: 5, pos: 'PG', ht: 183, wt: 79, age: 24, stats: { gp: 9, ppg: 10.8, rpg: 3.1, apg: 4.9, spg: 1.2, bpg: 0.1, mp: 27.7, fg: 43.1, three: 34.6, ft: 78.0 }, honors: [], star: false },

  /* ===================== 汕尾 Shanwei ===================== */
  { id: 'swl', teamId: 'shanwei', name: '陈子豪', nameEn: 'Chen Zihao', num: 8, pos: 'SF', ht: 195, wt: 93, age: 25, stats: { gp: 9, ppg: 14.9, rpg: 5.4, apg: 2.2, spg: 1.1, bpg: 0.5, mp: 31.3, fg: 46.9, three: 33.5, ft: 76.4 }, honors: [], star: true, bio: '汕尾队锋线箭头，带着「红色故里」的豪情，敢打敢拼。' },
  { id: 'sww', teamId: 'shanwei', name: '黄俊豪', nameEn: 'Huang Junhao', num: 16, pos: 'C', ht: 206, wt: 109, age: 27, stats: { gp: 9, ppg: 10.5, rpg: 8.3, apg: 1.0, spg: 0.3, bpg: 1.4, mp: 26.3, fg: 54.8, three: 0, ft: 67.3 }, honors: [], star: false },
  { id: 'swx', teamId: 'shanwei', name: '许泽伟', nameEn: 'Xu Zewei', num: 3, pos: 'PG', ht: 183, wt: 78, age: 24, stats: { gp: 9, ppg: 10.3, rpg: 2.9, apg: 4.6, spg: 1.2, bpg: 0.1, mp: 27.1, fg: 42.5, three: 34.0, ft: 77.1 }, honors: [], star: false },

  /* ===================== 云浮 Yunfu ===================== */
  { id: 'lsr', teamId: 'yunfu', name: '刘朔任', nameEn: 'Liu Shuoren', num: 13, pos: 'C', ht: 212, wt: 122, age: 28, stats: { gp: 9, ppg: 11.4, rpg: 9.6, apg: 0.9, spg: 0.3, bpg: 4.0, mp: 29.8, fg: 58.9, three: 0, ft: 66.8 }, honors: ['2026 常规赛盖帽王（4.0 次）'], star: true, bio: '云浮「石都长城」，场均 4 次盖帽领跑联赛，禁区之内寸草不生。' },
  { id: 'yfl', teamId: 'yunfu', name: '梁志明', nameEn: 'Liang Zhiming', num: 6, pos: 'SF', ht: 195, wt: 93, age: 25, stats: { gp: 9, ppg: 14.2, rpg: 5.2, apg: 2.2, spg: 1.0, bpg: 0.5, mp: 30.7, fg: 46.4, three: 33.1, ft: 75.8 }, honors: [], star: false },
  { id: 'yfw', teamId: 'yunfu', name: '黄文俊', nameEn: 'Huang Wenjun', num: 4, pos: 'PG', ht: 183, wt: 79, age: 24, stats: { gp: 9, ppg: 10.4, rpg: 3.0, apg: 4.5, spg: 1.2, bpg: 0.1, mp: 26.9, fg: 42.4, three: 33.8, ft: 77.0 }, honors: [], star: false },
]

export default players

export const getPlayer = (id) => players.find((p) => p.id === id)
export const playersByTeam = (teamId) => players.filter((p) => p.teamId === teamId)
