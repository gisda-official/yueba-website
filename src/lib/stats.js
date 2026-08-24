/* ==========================================================================
   球员/球队数据榜计算 —— 从球员数据中排序生成各类榜单
   ========================================================================== */

// 单项数据榜（默认取前 n，可加出场门槛）
export function leaderboard(players, key, n = 10, minGames = 5) {
  return players
    .filter((p) => p.stats && p.stats.gp >= minGames)
    .map((p) => ({ player: p, value: p.stats[key] ?? 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n)
}

// 场均数据榜（得分/篮板/助攻/抢断/盖帽）
export const allLeaderboards = (players, n = 10) => ({
  ppg: leaderboard(players, 'ppg', n),
  rpg: leaderboard(players, 'rpg', n),
  apg: leaderboard(players, 'apg', n),
  spg: leaderboard(players, 'spg', n),
  bpg: leaderboard(players, 'bpg', n),
})

// 单场最高分（模拟：取场均 * 系数，展示用）
export const playerCareerHigh = (p) => Math.round((p.stats?.ppg ?? 0) * 1.45)

// 效率值（简化 PER 估算）
export const simplePER = (p) => {
  const s = p.stats
  if (!s) return 0
  return +((s.ppg + s.rpg * 1.2 + s.apg * 1.5 + s.spg * 2 + s.bpg * 2 - 6).toFixed(1))
}
