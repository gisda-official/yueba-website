/* ==========================================================================
   积分榜计算 —— 依据赛果数据自动生成（体现「数据驱动」工程能力）
   规则：胜 2 分、负 1 分；同分依次比较 胜率 → 净胜分 → 总得分。
   ========================================================================== */

// 连续战绩（如 "W3" / "L2"）
function streakOf(results) {
  if (!results.length) return '—'
  const last = results[results.length - 1]
  let n = 0
  for (let i = results.length - 1; i >= 0; i--) {
    if (results[i] === last) n++
    else break
  }
  return `${last}${n}`
}

/**
 * 计算常规赛积分榜
 * @param {string[]} teamIds 参赛球队 id
 * @param {Array} matches 全部比赛
 */
export function computeStandings(teamIds, matches) {
  const map = {}
  teamIds.forEach((id) => {
    map[id] = { teamId: id, w: 0, l: 0, pf: 0, pa: 0, games: 0, results: [] }
  })

  matches.forEach((m) => {
    if (m.phase !== 'regular' || m.status !== 'played') return
    if (!map[m.home] || !map[m.away]) return
    const h = map[m.home]
    const a = map[m.away]
    h.games++
    a.games++
    h.pf += m.homeScore
    h.pa += m.awayScore
    a.pf += m.awayScore
    a.pa += m.homeScore
    if (m.homeScore > m.awayScore) {
      h.w++
      a.l++
      h.results.push('W')
      a.results.push('L')
    } else {
      a.w++
      h.l++
      a.results.push('W')
      h.results.push('L')
    }
  })

  return teamIds
    .map((id) => {
      const r = map[id]
      const pct = r.games ? r.w / r.games : 0
      const diff = r.pf - r.pa
      const points = r.w * 2 + r.l
      return { ...r, pct, diff, points, streak: streakOf(r.results) }
    })
    .sort((a, b) => b.w - a.w || b.pct - a.pct || b.diff - a.diff || b.pf - a.pf)
}

/**
 * 球队赛季统计（进攻/防守效率等）
 */
export function teamSeasonStats(teamId, matches) {
  const played = matches.filter(
    (m) => m.phase === 'regular' && m.status === 'played' && (m.home === teamId || m.away === teamId)
  )
  let pf = 0
  let pa = 0
  let w = 0
  played.forEach((m) => {
    const isHome = m.home === teamId
    const score = isHome ? m.homeScore : m.awayScore
    const oppScore = isHome ? m.awayScore : m.homeScore
    pf += score
    pa += oppScore
    if (score > oppScore) w++
  })
  const games = played.length
  return {
    games,
    w,
    l: games - w,
    pf,
    pa,
    ppg: games ? +(pf / games).toFixed(1) : 0,
    oppg: games ? +(pa / games).toFixed(1) : 0,
    diff: pf - pa,
  }
}
