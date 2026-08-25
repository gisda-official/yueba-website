import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import { getTeam, EAST_TEAMS, WEST_TEAMS } from '../data/teams.js'
import matches from '../data/matches.js'
import { playoffBracket } from '../data/playoffs.js'
import { computeStandings } from '../lib/standings.js'
import SectionHeader from '../components/SectionHeader.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import Meander from '../components/ornaments/Meander.jsx'

function StandingsTable({ title, rows }) {
  const { t } = useI18n()
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>{title}</th>
            <th>{t('common.w')}</th>
            <th>{t('common.l')}</th>
            <th>{t('common.pct')}</th>
            <th>{t('common.pf')}</th>
            <th>{t('common.pa')}</th>
            <th>{t('common.diff')}</th>
            <th>{t('standings.streak')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const tm = getTeam(r.teamId)
            return (
              <tr key={r.teamId} className={i === 0 ? 'is-top' : ''}>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <span className={`rank ${i < 3 ? `rank--${i + 1}` : 'rank--plain'}`}>{i + 1}</span>
                    <TeamCrest team={tm} size={26} />
                    <Link to={`/teams/${tm.id}`} style={{ fontWeight: 700 }}>{tm.name}</Link>
                  </span>
                </td>
                <td className="num">{r.w}</td>
                <td className="num">{r.l}</td>
                <td className="num">{r.pct.toFixed(3).slice(1)}</td>
                <td className="num">{(r.pf / r.games).toFixed(1)}</td>
                <td className="num">{(r.pa / r.games).toFixed(1)}</td>
                <td className="num" style={{ fontWeight: 800, color: r.diff >= 0 ? 'var(--crimson)' : 'var(--text-muted)' }}>{r.diff > 0 ? '+' : ''}{r.diff}</td>
                <td className="num">{r.streak}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function BracketRow({ home, away, winner, note, size = 30 }) {
  const h = getTeam(home)
  const a = getTeam(away)
  const Row = ({ id, w }) => {
    const tm = getTeam(id)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, background: w ? 'linear-gradient(90deg, var(--crimson-tint), transparent)' : 'transparent' }}>
        <TeamCrest team={tm} size={size} />
        <span style={{ fontWeight: w ? 800 : 600, fontSize: '0.88rem', color: w ? 'var(--crimson)' : 'var(--text)' }}>{tm.name}</span>
        {w && <span style={{ marginLeft: 'auto', color: 'var(--crimson)', fontWeight: 900 }}>●</span>}
      </div>
    )
  }
  return (
    <div className="card" style={{ padding: 8 }}>
      <Row id={home} w={winner === home} />
      <div style={{ height: 1, background: 'var(--line)', margin: '4px 0' }} />
      <Row id={away} w={winner === away} />
      {note && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '4px 10px 0', textAlign: 'center' }}>{note}</div>}
    </div>
  )
}

export default function Standings() {
  const { t } = useI18n()
  const champion = getTeam(playoffBracket.champion)

  const eastRows = useMemo(() => computeStandings(EAST_TEAMS.map((x) => x.id), matches), [])
  const westRows = useMemo(() => computeStandings(WEST_TEAMS.map((x) => x.id), matches), [])

  return (
    <>
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="STANDINGS" title="积分榜" en="Division Standings" />
          <p className="lead" style={{ color: 'var(--text-invert-muted)', maxWidth: 720 }}>
            以珠江为界分东、西两大片区，主客场单循环。积分榜依据赛果<b>自动计算</b>：胜 2 分、负 1 分，同分依次比较胜率 → 净胜分 → 总得分。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <StandingsTable title={t('standings.east')} rows={eastRows} />
            <StandingsTable title={t('standings.west')} rows={westRows} />
          </div>
        </div>
      </section>

      {/* 季后赛对阵图 */}
      <section className="section section--paper" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader eyebrow="PLAYOFFS" title={t('standings.bracket')} en="Playoff Bracket" />

          {/* 冠军横幅 */}
          <div className="card card--dark" style={{ borderTop: '3px solid var(--gold)', marginBottom: 28, textAlign: 'center', padding: 28 }}>
            <span className="badge badge--gold" style={{ fontSize: '0.9rem' }}>2026 粤BA 总冠军</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 16 }}>
              <TeamCrest team={champion} size={64} />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: 2 }}>{champion.name}队</h3>
                <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.85rem' }}>{champion.tagline} · 总决赛 {playoffBracket.finals.score} 深圳</p>
              </div>
            </div>
            <p style={{ marginTop: 14, fontSize: '0.9rem' }}>
              总决赛 MVP：<b style={{ color: 'var(--gold)' }}>{playoffBracket.finals.mvp}</b>
            </p>
          </div>

          {/* 八强附加赛 */}
          <h3 className="title-2" style={{ marginBottom: 14 }}>八强附加赛 · 黄金九分</h3>
          <div className="grid grid-4" style={{ marginBottom: 32 }}>
            {playoffBracket.playIn.map((p) => (
              <div className="card" key={p.winner} style={{ textAlign: 'center', padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                  <TeamCrest team={getTeam(p.winner)} size={32} />
                  <span className="scoreline__vs">vs</span>
                  <TeamCrest team={getTeam(p.loser)} size={32} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  {getTeam(p.winner).name} 胜
                  <span style={{ color: 'var(--text-faint)', fontWeight: 500 }}>（黄金九分 {p.score}）</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', marginTop: 2 }}>{getTeam(p.loser).name}</div>
              </div>
            ))}
          </div>

          {/* 主对阵图 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 20, alignItems: 'center', overflowX: 'auto', paddingBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: 2, color: 'var(--text-muted)' }}>1/4 决赛</div>
              {playoffBracket.quarterfinals.map((q) => (
                <BracketRow key={q.home + q.away} {...q} />
              ))}
            </div>
            <div style={{ fontSize: '1.4rem', color: 'var(--text-faint)' }}>→</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: 2, color: 'var(--text-muted)' }}>半决赛</div>
              {playoffBracket.semifinals.map((s) => (
                <BracketRow key={s.home + s.away} {...s} />
              ))}
            </div>
            <div style={{ fontSize: '1.4rem', color: 'var(--text-faint)' }}>→</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: 2, color: 'var(--text-muted)' }}>总决赛（三局两胜）</div>
              <BracketRow home={playoffBracket.finals.home} away={playoffBracket.finals.away} winner={playoffBracket.finals.winner} note={`${playoffBracket.finals.score} · MVP ${playoffBracket.finals.mvp}`} size={34} />
              <div className="card card--dark" style={{ textAlign: 'center', padding: 16 }}>
                <span style={{ color: 'var(--gold)', fontWeight: 900, letterSpacing: 2 }}>{getTeam(playoffBracket.champion).name} · 总冠军</span>
              </div>
            </div>
          </div>

          {/* 总决赛详情 */}
          <div style={{ marginTop: 36 }}>
            <h3 className="title-2" style={{ marginBottom: 14 }}>总决赛战报</h3>
            <div className="grid grid-2">
              {playoffBracket.finals.games.map((g) => (
                <div className="card" key={g.date}>
                  <div className="card__body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <div>
                      <div className="num" style={{ fontWeight: 800, fontSize: '1.2rem' }}>{g.line}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>{g.date} · {g.venue}</div>
                    </div>
                    <span className="badge badge--crimson-soft">完赛</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: '0 0 40px', textAlign: 'center', color: 'var(--line-strong)' }}>
        <Meander color="#d9cfbf" />
      </div>
    </>
  )
}
