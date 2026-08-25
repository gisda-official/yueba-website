import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import players from '../data/players.js'
import teams, { getTeam } from '../data/teams.js'
import { posFull } from '../lib/format.js'
import TeamCrest from '../components/TeamCrest.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'

/* 位置筛选项 */
const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C']

/* 前三名奖牌配色（金 / 银 / 铜） */
const RANK_STYLES = [
  { background: '#e2b44a', color: '#141417' },
  { background: '#c9ccd4', color: '#141417' },
  { background: '#d9a67a', color: '#141417' },
]

const rankBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
  fontWeight: 800,
  fontSize: '0.82rem',
  flexShrink: 0,
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  marginBottom: 6,
  color: 'var(--text-invert-muted)',
}

export default function Players() {
  const { t, lang } = useI18n()

  const [query, setQuery] = useState('')
  const [teamId, setTeamId] = useState('')
  const [pos, setPos] = useState('')

  const topScorer = useMemo(() => [...players].sort((a, b) => b.stats.ppg - a.stats.ppg)[0], [])
  const topTeam = getTeam(topScorer.teamId)

  const filtered = useMemo(() => {
    const q = query.trim()
    const qLower = q.toLowerCase()
    return players
      .filter((p) => {
        if (teamId && p.teamId !== teamId) return false
        if (pos && p.pos !== pos) return false
        if (q) {
          const hit = p.name.includes(q) || (p.nameEn || '').toLowerCase().includes(qLower)
          if (!hit) return false
        }
        return true
      })
      .sort((a, b) => b.stats.ppg - a.stats.ppg)
  }, [query, teamId, pos])

  const hasFilter = query.trim() !== '' || teamId !== '' || pos !== ''

  const reset = () => {
    setQuery('')
    setTeamId('')
    setPos('')
  }

  return (
    <>
      {/* ============ 页头 · 球员名册 ============ */}
      <section className="section section--crimson" style={{ position: 'relative', overflow: 'hidden' }}>
        <Kapok size={420} style={{ position: 'absolute', right: -60, top: -40, opacity: 0.08 }} color="#fff" />
        <Kapok size={260} style={{ position: 'absolute', left: -40, bottom: -20, opacity: 0.06 }} color="#fff" />

        <div
          className="container"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
            <div className="sec-head__eyebrow" style={{ color: 'var(--gold)' }}>
              <span style={{ width: 26, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
              PLAYERS · SCORING LEADERS
            </div>
            <h1 className="title-1" style={{ marginBottom: 10 }}>球员名册</h1>
            <p className="lead" style={{ color: 'var(--text-invert-muted)', marginBottom: 28 }}>
              21 支城市球队 · 收录 {players.length} 名核心球员 · 以场均得分为序，一览粤BA 得分榜
            </p>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              <div>
                <div className="num" style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--gold)' }}>{players.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-invert-muted)' }}>注册球员</div>
              </div>
              <div>
                <div className="num" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff' }}>{topScorer.stats.ppg.toFixed(1)}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-invert-muted)' }}>场均最高分</div>
              </div>
              <div>
                <div className="num" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff' }}>{teams.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-invert-muted)' }}>参赛球队</div>
              </div>
            </div>
          </div>

          {/* 得分王卡 */}
          <div className="card card--dark" style={{ boxShadow: 'var(--shadow-lg)', borderTop: '3px solid var(--gold)' }}>
            <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ink-line)' }}>
              <span className="badge badge--gold">2026 得分王</span>
              <span style={{ color: 'var(--text-invert-muted)', fontSize: '0.8rem' }}>Scoring Leader</span>
            </div>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <TeamCrest team={topTeam} size={58} style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: 1 }}>{topScorer.name}</h3>
              <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.82rem', marginTop: 2 }}>
                {topTeam.name}队 · {posFull(topScorer.pos, lang)} · #{topScorer.num}
              </p>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 28 }}>
                <div>
                  <div className="num" style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--gold)' }}>{topScorer.stats.ppg.toFixed(1)}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-invert-muted)', letterSpacing: 1 }}>{t('players.ppg')}</div>
                </div>
                <div>
                  <div className="num" style={{ fontSize: '1.7rem', fontWeight: 900 }}>{topScorer.stats.rpg.toFixed(1)}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-invert-muted)', letterSpacing: 1 }}>{t('players.rpg')}</div>
                </div>
                <div>
                  <div className="num" style={{ fontSize: '1.7rem', fontWeight: 900 }}>{topScorer.stats.apg.toFixed(1)}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-invert-muted)', letterSpacing: 1 }}>{t('players.apg')}</div>
                </div>
              </div>
              {topScorer.honors[0] && (
                <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: 0.5 }}>{topScorer.honors[0]}</p>
              )}
              <Link to={`/players/${topScorer.id}`} className="btn btn--gold btn--block" style={{ marginTop: 16 }}>
                {t('common.view')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 得分榜 · 全员名单 ============ */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="SCORING LEADERS" title={t('stats.scorer')} en="All Players, Ranked by PPG" />

          {/* 筛选控件 */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 28 }}>
            <div style={{ flex: '1 1 280px', minWidth: 200 }}>
              <label style={labelStyle}>{t('common.search')}</label>
              <input
                className="input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索姓名（中文 / 拼音）"
              />
            </div>
            <div style={{ flex: '1 1 220px', minWidth: 160 }}>
              <label style={labelStyle}>球队</label>
              <select className="input select" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                <option value="">{t('common.all')} · 21 队</option>
                {teams.map((tm) => (
                  <option key={tm.id} value={tm.id}>{tm.name}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1 1 180px', minWidth: 140 }}>
              <label style={labelStyle}>{t('players.position')}</label>
              <select className="input select" value={pos} onChange={(e) => setPos(e.target.value)}>
                <option value="">{t('common.all')}</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p} · {posFull(p, lang)}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <p style={{ marginBottom: 16 }}>{t('common.empty')}</p>
              <button className="btn btn--gold" onClick={reset}>{t('common.filter')} · 清除</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ color: 'var(--text-invert-muted)', fontSize: '0.85rem' }}>共 {filtered.length} 名球员</span>
                {hasFilter && (
                  <button className="btn btn--ghost btn--sm" onClick={reset}>清除筛选</button>
                )}
              </div>

              <div className="grid grid-auto">
                {filtered.map((p, i) => {
                  const tm = getTeam(p.teamId)
                  const rankStyle = RANK_STYLES[i] || { background: 'rgba(255,255,255,0.10)', color: '#c9c9cf' }
                  return (
                    <Link to={`/players/${p.id}`} key={p.id} className="card card--dark card--hover">
                      <div className="card__body player-card">
                        <span style={{ ...rankBase, ...rankStyle }}>{i + 1}</span>
                        <span
                          className="player-avatar"
                          style={{ background: `linear-gradient(135deg, ${tm.color}, ${tm.colorDark})` }}
                        >
                          {p.name[0]}
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <div className="player-card__name">
                            {p.name}
                            {p.star && <span className="badge badge--gold" style={{ marginLeft: 8, padding: '1px 6px', fontSize: '0.62rem' }}>★</span>}
                          </div>
                          <div className="player-card__pos" style={{ color: 'var(--text-invert-muted)' }}>{tm.name} · {p.pos} · #{p.num}</div>
                        </div>
                        <div className="player-card__stat">
                          <b style={{ color: i === 0 ? 'var(--gold)' : undefined }}>{p.stats.ppg.toFixed(1)}</b>
                          <span style={{ color: 'var(--text-invert-muted)' }}>{t('players.ppg')}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
