import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as echarts from 'echarts'
import { useI18n } from '../context/I18nContext.jsx'
import { getTeam } from '../data/teams.js'
import players, { getPlayer, playersByTeam } from '../data/players.js'
import { playerCareerHigh, simplePER } from '../lib/stats.js'
import { fmtHeight, posFull } from '../lib/format.js'
import EChart from '../components/EChart.jsx'
import TeamCrest from '../components/TeamCrest.jsx'

// 联赛平均水平（用于雷达图对比）
const LEAGUE_AVG = { ppg: 13.5, rpg: 5.6, apg: 3.4, spg: 1.2, bpg: 0.7 }

// 投篮热区（由球员命中率推导，示意用）
function heatZones(p) {
  const s = p.stats
  const fg = s.fg, three = s.three, ft = s.ft
  return [
    { name: '弧顶三分', pct: three, x: 50, y: 22 },
    { name: '左侧 45°', pct: three - 2, x: 22, y: 38 },
    { name: '右侧 45°', pct: three + 1, x: 78, y: 38 },
    { name: '左侧底角', pct: three + 3, x: 12, y: 62 },
    { name: '右侧底角', pct: three - 1, x: 88, y: 62 },
    { name: '中距离左', pct: fg - 3, x: 32, y: 60 },
    { name: '中距离右', pct: fg - 1, x: 68, y: 60 },
    { name: '篮下', pct: Math.min(fg + 12, 80), x: 50, y: 80 },
    { name: '罚球线', pct: ft, x: 50, y: 52 },
  ]
}

function zoneColor(pct) {
  if (pct >= 55) return '#c8102e'
  if (pct >= 45) return '#e2b44a'
  if (pct >= 35) return '#c9b891'
  return '#b7ac96'
}

function StatItem({ label, value, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '10px 6px' }}>
      <div className="num" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--crimson)' }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>{label}</div>
      {sub && <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>{sub}</div>}
    </div>
  )
}

export default function PlayerDetail() {
  const { id } = useParams()
  const { t, lang } = useI18n()
  const player = getPlayer(id)
  const team = player ? getTeam(player.teamId) : null
  const teammates = player ? playersByTeam(player.teamId).filter((x) => x.id !== player.id) : []

  const radarOption = useMemo(() => {
    if (!player) return null
    const s = player.stats
    const max = { ppg: 28, rpg: 14, apg: 9, spg: 5, bpg: 5 }
    return {
      tooltip: {},
      legend: { data: [player.name, '联赛平均'], bottom: 0, textStyle: { color: '#8a8272' } },
      radar: {
        indicator: [
          { name: '得分', max: max.ppg },
          { name: '篮板', max: max.rpg },
          { name: '助攻', max: max.apg },
          { name: '抢断', max: max.spg },
          { name: '盖帽', max: max.bpg },
        ],
        radius: '62%',
        splitArea: { areaStyle: { color: ['#fbf7f0', '#f4eee2'] } },
        axisName: { color: '#3a352c', fontWeight: 700 },
      },
      series: [
        {
          type: 'radar',
          data: [
            { value: [s.ppg, s.rpg, s.apg, s.spg, s.bpg], name: player.name, areaStyle: { color: 'rgba(200,16,46,0.28)' }, lineStyle: { color: '#c8102e', width: 2 }, itemStyle: { color: '#c8102e' } },
            { value: [LEAGUE_AVG.ppg, LEAGUE_AVG.rpg, LEAGUE_AVG.apg, LEAGUE_AVG.spg, LEAGUE_AVG.bpg], name: '联赛平均', areaStyle: { color: 'rgba(140,130,112,0.12)' }, lineStyle: { color: '#8a8272', width: 1, type: 'dashed' }, itemStyle: { color: '#8a8272' } },
          ],
        },
      ],
    }
  }, [player])

  if (!player || !team) {
    return (
      <div className="container section">
        <div className="empty">球员不存在</div>
        <div style={{ textAlign: 'center', marginTop: 16 }}><Link to="/players" className="btn btn--ghost">返回球员列表</Link></div>
      </div>
    )
  }

  const s = player.stats
  const zones = heatZones(player)

  return (
    <>
      {/* 球员头部 */}
      <section className="section section--dark" style={{ paddingBottom: 40 }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }}>
          <span className="player-avatar" style={{ width: 120, height: 120, fontSize: 52, background: `linear-gradient(135deg, ${team.color}, ${team.colorDark})`, boxShadow: 'var(--shadow-lg)', border: '3px solid var(--gold)' }}>
            {player.name[0]}
          </span>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: 1 }}>{player.name}</h1>
              {player.star && <span className="badge badge--gold">★ 全明星</span>}
              <span className="badge badge--crimson">#{player.num}</span>
            </div>
            <p style={{ color: 'var(--text-invert-muted)', marginTop: 4 }}>{player.nameEn} · {posFull(player.pos, lang)} · {player.age} 岁</p>
            <p style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link to={`/teams/${team.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontWeight: 800 }}>
                <TeamCrest team={team} size={24} /> {team.name}队 · {team.slogan}
              </Link>
            </p>
            <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.84rem', marginTop: 8 }}>{fmtHeight(player.ht, lang)} · {player.wt} kg</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 22px', border: '1px solid var(--ink-line)' }}>
            <StatItem label="场均得分" value={s.ppg} sub="PPG" />
            <StatItem label="场均篮板" value={s.rpg} sub="RPG" />
            <StatItem label="场均助攻" value={s.apg} sub="APG" />
          </div>
        </div>
      </section>

      {/* 数据详情 */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            {/* 基础数据 */}
            <div className="card">
              <div className="card__body">
                <h3 className="title-2" style={{ marginBottom: 18 }}>赛季基础数据</h3>
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr><th>指标</th><th>数值</th><th>联赛均</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>出场（GP）</td><td className="num">{s.gp}</td><td className="num">12.5</td></tr>
                      <tr><td>场均时间（MP）</td><td className="num">{s.mp}</td><td className="num">27.0</td></tr>
                      <tr><td>投篮命中率（FG）</td><td className="num" style={{ color: 'var(--crimson)' }}>{s.fg}%</td><td className="num">47.5%</td></tr>
                      <tr><td>三分命中率（3P）</td><td className="num" style={{ color: 'var(--crimson)' }}>{s.three}%</td><td className="num">35.8%</td></tr>
                      <tr><td>罚球命中率（FT）</td><td className="num" style={{ color: 'var(--crimson)' }}>{s.ft}%</td><td className="num">76.0%</td></tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
                  <div className="card" style={{ textAlign: 'center', padding: 16 }}>
                    <div className="num" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--crimson)' }}>{playerCareerHigh(player)}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>单场最高分</div>
                  </div>
                  <div className="card" style={{ textAlign: 'center', padding: 16 }}>
                    <div className="num" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--jade)' }}>{simplePER(player)}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>效率值 PER</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 雷达图 */}
            <div className="card">
              <div className="card__body">
                <h3 className="title-2" style={{ marginBottom: 4 }}>能力雷达</h3>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 8 }}>与联赛平均水平对比</p>
                <EChart option={radarOption} height={360} />
              </div>
            </div>
          </div>

          {/* 投篮热区 + 荣誉 */}
          <div className="grid grid-2" style={{ marginTop: 28 }}>
            <div className="card">
              <div className="card__body">
                <h3 className="title-2" style={{ marginBottom: 4 }}>投篮热区</h3>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 14 }}>投篮命中率 · 颜色越深越准</p>
                <div style={{ position: 'relative', width: '100%', maxWidth: 380, margin: '0 auto', aspectRatio: '1.55/1', background: '#fbf7f0', border: '2px solid var(--crimson)', borderRadius: 12, overflow: 'hidden' }}>
                  {/* 三分弧 */}
                  <div style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', width: '62%', height: '46%', border: '2px dashed #d9cfbf', borderRadius: '0 0 200px 200px' }} />
                  {/* 禁区 */}
                  <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '34%', height: '34%', background: 'rgba(200,16,46,0.06)', border: '1.5px solid #d9cfbf' }} />
                  {/* 篮筐 */}
                  <div style={{ position: 'absolute', left: '50%', bottom: '4%', transform: 'translateX(-50%)', width: 22, height: 22, borderRadius: '50%', border: '3px solid var(--crimson)' }} />
                  {/* 热区标记 */}
                  {zones.map((z) => (
                    <div key={z.name} style={{ position: 'absolute', left: `${z.x}%`, top: `${z.y}%`, transform: 'translate(-50%, -50%)' }}>
                      <span style={{ display: 'block', width: 34, height: 34, borderRadius: '50%', background: zoneColor(z.pct), color: '#fff', textAlign: 'center', lineHeight: '34px', fontSize: '0.7rem', fontWeight: 900, boxShadow: 'var(--shadow-sm)' }}>
                        {z.pct}
                      </span>
                      <span style={{ display: 'block', textAlign: 'center', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 2 }}>{z.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__body">
                <h3 className="title-2" style={{ marginBottom: 14 }}>荣誉与简介</h3>
                {player.honors.length > 0 ? (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                    {player.honors.map((h) => (
                      <li key={h} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 900 }}>🏅</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted" style={{ marginBottom: 18 }}>暂无荣誉记录</p>
                )}
                <p style={{ lineHeight: 1.7, color: 'var(--text-muted)' }}>{player.bio || '球员简介更新中。'}</p>
              </div>
            </div>
          </div>

          {/* 队友 */}
          {teammates.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h3 className="title-2" style={{ marginBottom: 14 }}>{team.name}队 · 队友</h3>
              <div className="grid grid-auto">
                {teammates.map((m) => (
                  <Link to={`/players/${m.id}`} key={m.id} className="card card--hover">
                    <div className="card__body player-card">
                      <span className="player-avatar" style={{ background: `linear-gradient(135deg, ${team.color}, ${team.colorDark})` }}>{m.name[0]}</span>
                      <div>
                        <div className="player-card__name">{m.name}</div>
                        <div className="player-card__pos">#{m.num} · {m.pos}</div>
                      </div>
                      <div className="player-card__stat">
                        <b>{m.stats.ppg}</b>
                        <span>分</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
