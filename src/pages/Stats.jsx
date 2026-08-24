import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as echarts from 'echarts'
import { useI18n } from '../context/I18nContext.jsx'
import teams, { getTeam } from '../data/teams.js'
import players from '../data/players.js'
import matches from '../data/matches.js'
import { leaderboard, simplePER } from '../lib/stats.js'
import { teamSeasonStats } from '../lib/standings.js'
import SectionHeader from '../components/SectionHeader.jsx'
import EChart from '../components/EChart.jsx'
import TeamCrest from '../components/TeamCrest.jsx'

const TABS = [
  { key: 'ppg', zh: '得分', en: 'Points', unit: '分' },
  { key: 'rpg', zh: '篮板', en: 'Rebounds', unit: '个' },
  { key: 'apg', zh: '助攻', en: 'Assists', unit: '次' },
  { key: 'spg', zh: '抢断', en: 'Steals', unit: '次' },
  { key: 'bpg', zh: '盖帽', en: 'Blocks', unit: '次' },
  { key: 'per', zh: '效率值', en: 'PER', unit: '' },
]

export default function Stats() {
  const { t, lang } = useI18n()
  const [tab, setTab] = useState('ppg')

  const leaders = useMemo(() => {
    if (tab === 'per') {
      return players
        .map((p) => ({ player: p, value: simplePER(p) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
    }
    return leaderboard(players, tab, 10, 5)
  }, [tab])

  // 得分榜柱状图
  const scorers = useMemo(() => leaderboard(players, 'ppg', 10, 5), [])
  const barOption = useMemo(() => {
    const data = [...scorers].reverse()
    return {
      grid: { left: 96, right: 44, top: 8, bottom: 28 },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'value', max: 30, splitLine: { lineStyle: { color: '#e8e2d6' } }, axisLabel: { color: '#8a8272' } },
      yAxis: {
        type: 'category',
        data: data.map((d) => d.player.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#3a352c', fontWeight: 700 },
      },
      series: [
        {
          type: 'bar',
          data: data.map((d) => d.value),
          barWidth: 16,
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#c8102e' },
              { offset: 1, color: '#e0183f' },
            ]),
          },
          label: { show: true, position: 'right', color: '#c8102e', fontWeight: 800 },
        },
      ],
    }
  }, [scorers])

  // 球队攻防效率散点图
  const effOption = useMemo(() => {
    const data = teams.map((tm) => {
      const s = teamSeasonStats(tm.id, matches)
      return { name: tm.name, value: [s.ppg, s.oppg], symbolSize: 14 + s.w * 2, itemStyle: { color: tm.region === 'east' ? '#c8102e' : '#2f6b5b', opacity: 0.82 } }
    })
    return {
      grid: { left: 56, right: 28, top: 28, bottom: 48 },
      tooltip: { formatter: (p) => `${p.name}<br/>场均得分 ${p.value[0]} · 场均失分 ${p.value[1]}` },
      xAxis: { name: '场均得分', nameLocation: 'middle', nameGap: 30, type: 'value', splitLine: { lineStyle: { color: '#e8e2d6' } }, axisLabel: { color: '#8a8272' } },
      yAxis: { name: '场均失分', nameLocation: 'middle', nameGap: 36, type: 'value', scale: true, splitLine: { lineStyle: { color: '#e8e2d6' } }, axisLabel: { color: '#8a8272' } },
      series: [
        {
          type: 'scatter',
          data,
          label: { show: true, position: 'top', fontSize: 10, color: '#8a8272', formatter: '{b}' },
        },
      ],
    }
  }, [])

  // 球队效率榜
  const teamEff = useMemo(() => {
    return teams
      .map((tm) => ({ tm, ...teamSeasonStats(tm.id, matches) }))
      .sort((a, b) => b.ppg - a.ppg)
  }, [])

  const active = TABS.find((x) => x.key === tab)

  return (
    <>
      <section className="section section--dark" style={{ paddingBottom: 0 }}>
        <div className="container">
          <SectionHeader eyebrow="DATA" title={t('stats.title')} en="League Analytics" />
          <p className="lead" style={{ color: 'var(--text-invert-muted)', maxWidth: 720 }}>
            所有榜单由<b>球员数据库</b>实时计算生成，无需人工维护。切换标签查看得分、篮板、助攻、抢断、盖帽与效率值五大榜单。
          </p>
        </div>
      </section>

      {/* 得分榜柱状图 */}
      <section className="section" style={{ paddingTop: 36 }}>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
            <div className="card">
              <div className="card__body">
                <h3 className="title-2" style={{ marginBottom: 4 }}>场均得分 Top 10</h3>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 16 }}>Scoring Leaders · 出场 ≥ 5 场</p>
                <EChart option={barOption} height={360} />
              </div>
            </div>
            <div className="card">
              <div className="card__body">
                <h3 className="title-2" style={{ marginBottom: 4 }}>球队攻防效率象限</h3>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 16 }}>东区 · 西区 · 气泡大小 = 胜场数</p>
                <EChart option={effOption} height={360} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据榜单 */}
      <section className="section section--paper" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader eyebrow="LEADERBOARDS" title="数据榜单" en="Stat Leaders" />
          <div className="tabs" style={{ marginBottom: 24 }}>
            {TABS.map((x) => (
              <button key={x.key} className={`tab ${tab === x.key ? 'tab--active' : ''}`} onClick={() => setTab(x.key)}>
                {x.zh}
              </button>
            ))}
          </div>

          <div className="grid grid-auto">
            {leaders.map(({ player: p, value }, i) => {
              const tm = getTeam(p.teamId)
              return (
                <Link to={`/players/${p.id}`} key={p.id} className="card card--hover" style={{ minWidth: 260 }}>
                  <div className="card__body player-card">
                    <span className={`rank ${i < 3 ? `rank--${i + 1}` : 'rank--plain'}`} style={{ width: 30, height: 30, flexShrink: 0 }}>{i + 1}</span>
                    <span className="player-avatar" style={{ background: `linear-gradient(135deg, ${tm.color}, ${tm.colorDark})` }}>{p.name[0]}</span>
                    <div>
                      <div className="player-card__name">{p.name}</div>
                      <div className="player-card__pos">{tm.name} · {p.pos}</div>
                    </div>
                    <div className="player-card__stat">
                      <b>{value}</b>
                      <span>{active.unit}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 球队效率榜 */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="TEAM EFFICIENCY" title="球队效率榜" en="Team Efficiency" />
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>球队</th>
                  <th>胜 / 负</th>
                  <th>场均得分</th>
                  <th>场均失分</th>
                  <th>净胜分</th>
                  <th>胜率</th>
                </tr>
              </thead>
              <tbody>
                {teamEff.map(({ tm, w, l, ppg, oppg, diff }, i) => (
                  <tr key={tm.id}>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                        <span className={`rank ${i < 3 ? `rank--${i + 1}` : 'rank--plain'}`}>{i + 1}</span>
                        <TeamCrest team={tm} size={26} />
                        <Link to={`/teams/${tm.id}`} style={{ fontWeight: 700 }}>{tm.name}</Link>
                      </span>
                    </td>
                    <td className="num">{w} / {l}</td>
                    <td className="num">{ppg}</td>
                    <td className="num">{oppg}</td>
                    <td className="num" style={{ fontWeight: 800, color: diff >= 0 ? 'var(--crimson)' : 'var(--text-muted)' }}>{diff > 0 ? '+' : ''}{diff}</td>
                    <td className="num">{((w / (w + l)) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
