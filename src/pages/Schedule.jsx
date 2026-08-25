import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import teams, { getTeam } from '../data/teams.js'
import matches from '../data/matches.js'
import { fmtDateZh, fmtDateEn, weekdayZh } from '../lib/format.js'
import SectionHeader from '../components/SectionHeader.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import Countdown from '../components/Countdown.jsx'

const PHASES = [
  { key: 'all', zh: '全部场次', en: 'All' },
  { key: 'regular', zh: '常规赛', en: 'Regular' },
  { key: 'playoff', zh: '季后赛', en: 'Playoffs' },
]

function Score({ m }) {
  const isDecided = m.status === 'played'
  return (
    <div className="scoreline" style={{ padding: 10, gap: 10 }}>
      <span className="scoreline__team">
        <TeamCrest team={getTeam(m.home)} size={28} />
        <Link to={`/teams/${m.home}`} className="scoreline__name" style={{ fontSize: '0.9rem' }}>{getTeam(m.home).name}</Link>
      </span>
      {isDecided ? (
        <>
          <span className="scoreline__score num" style={{ fontSize: '1.35rem', minWidth: 30 }}>{m.homeScore}</span>
          <span className="scoreline__vs">:</span>
          <span className="scoreline__score num" style={{ fontSize: '1.35rem', minWidth: 30 }}>{m.awayScore}</span>
        </>
      ) : (
        <span className="scoreline__vs">VS</span>
      )}
      <span className="scoreline__team scoreline__team--away">
        <Link to={`/teams/${m.away}`} className="scoreline__name" style={{ fontSize: '0.9rem' }}>{getTeam(m.away).name}</Link>
        <TeamCrest team={getTeam(m.away)} size={28} />
      </span>
    </div>
  )
}

export default function Schedule() {
  const { t, lang } = useI18n()
  const [view, setView] = useState('calendar')
  const [phase, setPhase] = useState('all')
  const [teamId, setTeamId] = useState('all')

  const filtered = useMemo(() => {
    let list = matches
    if (phase !== 'all') list = list.filter((m) => m.phase === phase)
    if (teamId !== 'all') list = list.filter((m) => m.home === teamId || m.away === teamId)
    return [...list].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  }, [phase, teamId])

  const grouped = useMemo(() => {
    const g = {}
    filtered.forEach((m) => {
      ;(g[m.date] ||= []).push(m)
    })
    return Object.keys(g).sort().map((d) => ({ date: d, list: g[d] }))
  }, [filtered])

  return (
    <>
      <section className="section section--dark" style={{ paddingBottom: 0 }}>
        <div className="container">
          <SectionHeader eyebrow="SCHEDULE" title="赛程与赛果" en="Schedule & Results" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', paddingBottom: 32 }}>
            <div className="tabs">
              <button className={`tab ${view === 'calendar' ? 'tab--active' : ''}`} onClick={() => setView('calendar')}>{t('schedule.calendar')}</button>
              <button className={`tab ${view === 'list' ? 'tab--active' : ''}`} onClick={() => setView('list')}>{t('schedule.list')}</button>
            </div>
            <div className="tabs">
              {PHASES.map((p) => (
                <button key={p.key} className={`tab ${phase === p.key ? 'tab--active' : ''}`} onClick={() => setPhase(p.key)}>{p.zh}</button>
              ))}
            </div>
            <select className="input select" style={{ width: 150, marginBottom: 0 }} value={teamId} onChange={(e) => setTeamId(e.target.value)}>
              <option value="all">全部球队</option>
              {teams.map((tm) => (
                <option key={tm.id} value={tm.id}>{tm.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          {/* 全明星预告 */}
          <div className="card card--dark" style={{ marginBottom: 32, borderLeft: '4px solid var(--gold)' }}>
            <div className="card__body" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge--gold">即将到来</span>
                <h3 style={{ marginTop: 10 }}>粤BA 全明星赛 · 粤港澳篮球邀请赛</h3>
                <p className="text-muted" style={{ color: 'var(--text-invert-muted)' }}>9 月 12-13 日 · 东莞长安体育公园体育馆</p>
              </div>
              <Countdown target="2026-09-12T19:30:00+08:00" />
            </div>
          </div>

          {view === 'calendar' ? (
            <div>
              {grouped.map(({ date, list }) => (
                <div key={date} style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span className="num" style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--crimson)' }}>
                      {lang === 'zh' ? fmtDateZh(date) : fmtDateEn(date)}
                    </span>
                    <span className="badge badge--outline">{lang === 'zh' ? weekdayZh(date) : date.slice(5).replace('-', '/')}</span>
                    <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                  </div>
                  <div className="grid grid-2">
                    {list.map((m) => (
                      <div className="card" key={m.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: '1px solid var(--line)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <span>
                            {m.phase === 'playoff' ? (
                              <span className="badge badge--crimson-soft" style={{ marginRight: 6 }}>{m.round}</span>
                            ) : (
                              <span className="badge badge--outline" style={{ marginRight: 6 }}>常规赛 · 第{m.round}轮</span>
                            )}
                          </span>
                          <span>{m.time} · {m.venue}</span>
                        </div>
                        <Score m={m} />
                        {m.note && (
                          <div style={{ padding: '0 14px 12px', fontSize: '0.8rem', color: 'var(--crimson)', fontWeight: 700 }}>{m.note}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {grouped.length === 0 && <div className="empty">暂无符合条件的比赛</div>}
            </div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>日期</th><th>时间</th><th style={{ textAlign: 'left' }}>对阵</th><th>比分</th><th>场馆</th><th>阶段</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id}>
                      <td className="num">{lang === 'zh' ? fmtDateZh(m.date) : fmtDateEn(m.date)}</td>
                      <td className="num">{m.time}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <TeamCrest team={getTeam(m.home)} size={22} />
                          <Link to={`/teams/${m.home}`} style={{ fontWeight: 700 }}>{getTeam(m.home).name}</Link>
                          <span style={{ color: 'var(--text-faint)' }}>vs</span>
                          <Link to={`/teams/${m.away}`} style={{ fontWeight: 700 }}>{getTeam(m.away).name}</Link>
                          <TeamCrest team={getTeam(m.away)} size={22} />
                        </span>
                      </td>
                      <td className="num" style={{ fontWeight: 800 }}>
                        {m.status === 'played' ? `${m.homeScore} : ${m.awayScore}` : '—'}
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{m.venue}</td>
                      <td>
                        {m.phase === 'playoff' ? <span className="badge badge--crimson-soft">{m.round}</span> : <span className="badge badge--outline">常规赛</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="empty">暂无符合条件的比赛</div>}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
