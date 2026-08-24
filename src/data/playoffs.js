/* ==========================================================================
   2026 粤BA 季后赛对阵图（依据真实赛果整理）
   结构：八强附加赛（黄金九分）→ 1/4 决赛 → 半决赛 → 总决赛（三局两胜）
   ========================================================================== */

export const playoffBracket = {
  // 八强附加赛（12 进 8）—— 胜者以「黄金九分」晋级八强
  playIn: [
    { winner: 'shantou', loser: 'meizhou', score: '9:6' },
    { winner: 'chaozhou', loser: 'heyuan', score: '9:7' },
    { winner: 'jieyang', loser: 'huizhou', score: '9:4' },
    { winner: 'foshan', loser: 'jiangmen', score: '9:4' },
  ],
  // 1/4 决赛
  quarterfinals: [
    { home: 'guangzhou', away: 'chaozhou', winner: 'guangzhou', note: '黄金九分 9:0' },
    { home: 'shenzhen', away: 'shantou', winner: 'shenzhen', note: '总比分 2:0' },
    { home: 'dongguan', away: 'foshan', winner: 'dongguan', note: '总比分 2:0' },
    { home: 'zhongshan', away: 'jieyang', winner: 'zhongshan', note: '总比分 2:0' },
  ],
  // 半决赛
  semifinals: [
    { home: 'shenzhen', away: 'guangzhou', winner: 'shenzhen', note: '总比分 2:0' },
    { home: 'dongguan', away: 'zhongshan', winner: 'dongguan', note: '总比分 2:0' },
  ],
  // 总决赛（三局两胜）
  finals: {
    home: 'dongguan',
    away: 'shenzhen',
    winner: 'dongguan',
    score: '2:0',
    mvp: '周泽源',
    games: [
      { date: '2026-07-26', venue: '深圳大运中心体育馆', line: '深圳 70 : 79 东莞' },
      { date: '2026-08-01', venue: '东莞篮球中心', line: '东莞 108 : 73 深圳' },
    ],
  },
  champion: 'dongguan',
}
