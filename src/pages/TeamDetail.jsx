import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import { getTeam } from '../data/teams.js'
import { playersByTeam } from '../data/players.js'
import matches, { matchesByTeam } from '../data/matches.js'
import { teamSeasonStats } from '../lib/standings.js'
import { fmtNum, fmtHeight, posFull, fmtDateZh } from '../lib/format.js'
import SectionHeader from '../components/SectionHeader.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

export default function TeamDetail() {
  const { t } = useI18n()
  const { id } = useParams()
  const team = getTeam(id)

  if (!team) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty">
            <h2 className="title-2">未找到球队</h2>
            <p className="text-muted" style={{ marginTop: 8 }}>该球队不存在或已被移除。</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/teams" className="btn btn--primary">返回球队列表</Link>
              <Link to="/" className="btn btn--ghost">{t('common.back')}</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const roster = playersByTeam(team.id).slice().sort((a, b) => a.num - b.num)
  const season = teamSeasonStats(team.id, matches)
  const recent = matchesByTeam(team.id).slice(-5)
  const regionLabel = t(team.region === 'east' ? 'common.region.east' : 'common.region.west')

  const tiles = [
    { label: t('common.w'), value: season.w, color: 'var(--win)' },
    { label: t('common.l'), value: season.l, color: 'var(--loss)' },
    { label: t('players.ppg'), value: season.ppg, color: 'var(--crimson)' },
    { label: '场均失分', value: season.oppg, color: 'var(--text)' },
  ]

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="section section--dark" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 120% at 82% 0%, ${team.colorDark} 0%, #141417 58%)` }} />
        <Kapok size={460} style={{ position: 'absolute', right: -80, top: -60, opacity: 0.08 }} color="#fff" />
        <Kapok size={260} style={{ position: 'absolute', left: -50, bottom: -30, opacity: 0.05 }} color="#fff" />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 36 }}>
            <TeamCrest team={team} size={96} style={{ boxShadow: '0 16px 44px rgba(0,0,0,0.45)', border: '3px solid rgba(255,255,255,0.14)' }} />
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="hero__eyebrow" style={{ marginBottom: 10 }}>
                <span style={{ width: 30, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
                {team.nameEn.toUpperCase()} · {regionLabel}
              </div>
              <h1 className="display">{team.name}队</h1>
              <p className="lead" style={{ color: 'var(--text-invert-muted)', marginTop: 10 }}>
                {team.tagline} · {team.city}
              </p>
              <p className="culture-quote" style={{ marginTop: 8, color: 'var(--gold)' }}>「{team.slogan}」</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginTop: 36 }}>
            {[
              { label: t('teams.venue'), value: team.venue },
              { label: '容量', value: `${fmtNum(team.capacity)} 人` },
              { label: t('teams.founded'), value: `${team.founded} 年` },
            ].map((c) => (
              <div key={c.label} className="card card--dark" style={{ borderColor: 'var(--ink-line)' }}>
                <div className="card__body" style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-invert-muted)', letterSpacing: 1 }}>{c.label}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', marginTop: 4 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 赛季数据 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="SEASON" title={t('teams.season')} en="Season Stats" />
          <div className="grid grid-4">
            {tiles.map((tl) => (
              <div key={tl.label} className="card" style={{ borderTop: `3px solid ${tl.color}` }}>
                <div className="card__body" style={{ textAlign: 'center', padding: '26px 16px' }}>
                  <div className="num" style={{ fontSize: '2.4rem', fontWeight: 900, color: tl.color }}>{tl.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: 1, marginTop: 4 }}>{tl.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <div className="card__body" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <p className="lead" style={{ maxWidth: 760, flex: 1, minWidth: 260, lineHeight: 1.9 }}>{team.description}</p>
              <span className="badge badge--jade" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>岭南特色 · {team.specialty}</span>
            </div>
          </div>

          {/* 主场馆 */}
          <figure style={{ margin: '28px 0 0' }}>
            <img
              src="images/gym-1.jpg"
              alt={team.venue}
              loading="lazy"
              style={{ width: '100%', height: 'auto', maxHeight: 380, objectFit: 'cover', borderRadius: 14, boxShadow: 'var(--shadow-lg)' }}
            />
            <figcaption style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: 12 }}>
              主场 · {team.venue}（{fmtNum(team.capacity)} 座）
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ 球员名单 ============ */}
      <section className="section section--paper" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader eyebrow="ROSTER" title={t('teams.roster')} en="Player Roster" more={t('common.more')} moreTo="/players" />
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>{t('players.number')}</th>
                  <th style={{ textAlign: 'left' }}>姓名</th>
                  <th>{t('players.position')}</th>
                  <th>{t('players.height')}</th>
                  <th>{t('players.ppg')}</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((p) => (
                  <tr key={p.id}>
                    <td className="num">{p.num}</td>
                    <td style={{ textAlign: 'left' }}>
                      <Link to={`/players/${p.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
                        <span className="player-avatar" style={{ width: 30, height: 30, fontSize: '0.8rem', background: `linear-gradient(135deg, ${team.color}, ${team.colorDark})` }}>{p.name[0]}</span>
                        {p.name}
                        {p.star && <span className="badge badge--gold" style={{ fontSize: '0.6rem', padding: '1px 7px' }}>★</span>}
                      </Link>
                    </td>
                    <td>{posFull(p.pos)}</td>
                    <td className="num">{fmtHeight(p.ht)}</td>
                    <td className="num" style={{ fontWeight: 800, color: 'var(--crimson)' }}>{p.stats.ppg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 近期赛果 ============ */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="SCHEDULE" title="近期赛果" en="Recent Results" more={t('common.more')} moreTo="/schedule" />
          <div className="card card--dark" style={{ overflow: 'hidden' }}>
            {recent.map((m, i) => {
              const home = getTeam(m.home)
              const away = getTeam(m.away)
              const myScore = m.home === team.id ? m.homeScore : m.awayScore
              const oppScore = m.home === team.id ? m.awayScore : m.homeScore
              const result = myScore > oppScore ? 'win' : myScore < oppScore ? 'loss' : 'draw'
              const resultLabel = { win: '胜', loss: '负', draw: '平' }[result]
              return (
                <div key={m.id} className="scoreline scoreline--dark" style={{ borderBottom: i < recent.length - 1 ? '1px solid var(--ink-line)' : 'none' }}>
                  <span style={{ minWidth: 74, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{fmtDateZh(m.date)}</span>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-invert-muted)' }}>{m.phase === 'regular' ? '常规赛' : '季后赛'}</span>
                  </span>
                  <span className="scoreline__team">
                    <TeamCrest team={home} size={26} />
                    <span className="scoreline__name">{home.abbr}</span>
                  </span>
                  <span className="scoreline__score num">{m.homeScore}</span>
                  <span className="scoreline__vs">:</span>
                  <span className="scoreline__score num">{m.awayScore}</span>
                  <span className="scoreline__team scoreline__team--away">
                    <TeamCrest team={away} size={26} />
                    <span className="scoreline__name">{away.abbr}</span>
                  </span>
                  <span style={{
                    minWidth: 40,
                    textAlign: 'center',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: result === 'win' ? 'var(--crimson)' : 'rgba(255,255,255,0.12)',
                    color: result === 'win' ? '#fff' : 'var(--text-invert-muted)',
                  }}>
                    {resultLabel}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ 球队荣誉 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="HONORS" title={t('teams.honors')} en="Team Honors" />
          {team.honors.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {team.honors.map((h) => (
                <span key={h} className="badge badge--gold" style={{ fontSize: '0.85rem', padding: '9px 16px' }}>{h}</span>
              ))}
            </div>
          ) : (
            <p className="text-muted">{t('common.empty')}</p>
          )}
          <div style={{ marginTop: 48 }}>
            <Meander color="#d9cfbf" />
          </div>
        </div>
      </section>
    </>
  )
}
