import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import teams, { getTeam, EAST_TEAMS, WEST_TEAMS } from '../data/teams.js'
import players from '../data/players.js'
import matches from '../data/matches.js'
import { CATEGORY_META } from '../data/news.js'
import { useNews } from '../context/NewsContext.jsx'
import announcements from '../data/announcements.js'
import { computeStandings } from '../lib/standings.js'
import { leaderboard } from '../lib/stats.js'
import SectionHeader from '../components/SectionHeader.jsx'
import Countdown from '../components/Countdown.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

const ALLSTAR = { date: '2026-09-12T19:30:00+08:00', venue: '东莞长安体育公园体育馆' }

export default function Home() {
  const { t } = useI18n()
  const { news } = useNews()

  const eastRows = computeStandings(EAST_TEAMS.map((x) => x.id), matches).slice(0, 5)
  const westRows = computeStandings(WEST_TEAMS.map((x) => x.id), matches).slice(0, 5)
  const scorers = leaderboard(players, 'ppg', 5)
  const champion = getTeam('dongguan')
  const recentNews = news.slice(0, 6)
  const pinned = announcements.filter((a) => a.pinned)
  // 最新赛果（总决赛两回合）
  const finalGames = matches.filter((m) => m.round === '总决赛').slice(-2)

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="hero">
        <img
          src="images/game-01.jpg"
          alt=""
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="hero__bg" style={{ background: 'radial-gradient(120% 120% at 80% 0%, rgba(92,7,19,0.9) 0%, rgba(20,20,23,0.82) 55%)' }} />
        <Kapok size={420} style={{ position: 'absolute', right: -60, top: -40, opacity: 0.08 }} color="#fff" />
        <Kapok size={260} style={{ position: 'absolute', left: -40, bottom: -20, opacity: 0.06 }} color="#fff" />

        <div className="container hero__content">
          <div>
            <div className="hero__eyebrow fade-up">
              <span style={{ width: 30, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
              {t('brand.sub')} · SINCE 2015
            </div>
            <h1 className="hero__title fade-up fade-up-1">
              {t('home.hero.title1')}
              <br />
              <span className="gold">{t('home.hero.title2')}</span>
            </h1>
            <p className="hero__sub fade-up fade-up-2">{t('home.hero.sub')}</p>
            <div className="hero__cta fade-up fade-up-2">
              <Link to="/tickets" className="btn btn--gold btn--lg">{t('home.hero.cta.tickets')}</Link>
              <Link to="/schedule" className="btn btn--ghost btn--lg">{t('home.hero.cta.schedule')}</Link>
            </div>
            <div className="hero__stats fade-up fade-up-3">
              <div className="hero__stat"><b>21</b><span>{t('home.hero.stat.teams')}</span></div>
              <div className="hero__stat"><b>125</b><span>{t('home.hero.stat.games')}</span></div>
              <div className="hero__stat"><b>378</b><span>{t('home.hero.stat.athletes')}</span></div>
              <div className="hero__stat"><b>16–40</b><span>岁</span></div>
            </div>
          </div>

          {/* 冠军卡 */}
          <div className="card card--dark fade-up fade-up-2" style={{ boxShadow: 'var(--shadow-lg)', borderTop: '3px solid var(--gold)' }}>
            <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ink-line)' }}>
              <span className="badge badge--gold">2026 总冠军</span>
              <span style={{ color: 'var(--text-invert-muted)', fontSize: '0.8rem' }}>Champion</span>
            </div>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <TeamCrest team={champion} size={72} style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: 2 }}>{champion.name}队</h3>
              <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.82rem', marginTop: 2 }}>{champion.tagline}</p>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {finalGames.map((g) => (
                  <div key={g.id} className="scoreline scoreline--dark" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 10 }}>
                    <span className="scoreline__team"><span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{getTeam(g.home).abbr}</span></span>
                    <span className="scoreline__score num" style={{ fontSize: '1.25rem' }}>{g.homeScore}</span>
                    <span className="scoreline__vs">:</span>
                    <span className="scoreline__score num" style={{ fontSize: '1.25rem' }}>{g.awayScore}</span>
                    <span className="scoreline__team scoreline__team--away"><span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{getTeam(g.away).abbr}</span></span>
                  </div>
                ))}
              </div>
              <Link to="/standings" className="btn btn--gold btn--block" style={{ marginTop: 18 }}>总决赛 MVP · 周泽源</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 公告滚动 ============ */}
      <div className="ticker">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', animation: 'tickerMove 30s linear infinite' }}>
          {[...pinned, ...pinned].map((a, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span className="ticker__label">{t('home.announcement')}</span>
              <span>{a.title}</span>
              <span style={{ opacity: 0.5 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ 倒计时 + 全明星 ============ */}
      <section className="section section--crimson">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <div className="sec-head__eyebrow" style={{ color: 'var(--gold)' }}>
              <span style={{ width: 26, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
              {t('home.next.countdown')}
            </div>
            <h2 className="title-1" style={{ marginBottom: 8 }}>粤BA 全明星赛 · 粤港澳邀请赛</h2>
            <p className="lead" style={{ color: 'var(--text-invert-muted)' }}>
              东、西区全明星队 × 香港队 × 澳门队 · {ALLSTAR.venue}
            </p>
            <div style={{ marginTop: 28 }}>
              <Countdown target={ALLSTAR.date} />
            </div>
            <Link to="/community" className="btn btn--gold" style={{ marginTop: 28 }}>
              参与全明星票选
            </Link>
          </div>
          <div className="card card--dark" style={{ borderColor: 'var(--ink-line)' }}>
            <div className="card__body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="badge badge--crimson">9.12–9.13</span>
                <span style={{ color: 'var(--text-invert-muted)', fontSize: '0.8rem' }}>单项赛 · 技巧 / 三分 / 扣篮</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  ['粤BA 东区全明星', '#c8102e'],
                  ['粤BA 西区全明星', '#2f6b5b'],
                  ['香港队', '#b8862b'],
                  ['澳门队', '#2e7ab0'],
                ].map(([name, color]) => (
                  <div key={name} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 14, textAlign: 'center', border: '1px solid var(--ink-line)' }}>
                    <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color, marginBottom: 6 }} />
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 积分榜快照 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="STANDINGS" title={t('home.standings')} en="Division Standings" more={t('common.more')} moreTo="/standings" />
          <div className="grid grid-2">
            {[
              { title: t('standings.east'), rows: eastRows },
              { title: t('standings.west'), rows: westRows },
            ].map(({ title, rows }) => (
              <div className="table-wrap" key={title}>
                <table className="table">
                  <thead>
                    <tr><th style={{ textAlign: 'left' }}>{title}</th><th>{t('common.w')}</th><th>{t('common.l')}</th><th>{t('common.pct')}</th><th>{t('common.diff')}</th></tr>
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
                          <td className="num" style={{ color: r.diff >= 0 ? 'var(--crimson)' : 'var(--text-muted)' }}>{r.diff > 0 ? '+' : ''}{r.diff}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 数据领跑者 ============ */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="LEADERS" title={t('home.leaders')} en="Scoring Leaders" more={t('common.more')} moreTo="/stats" />
          <div className="grid grid-auto">
            {scorers.map(({ player: p, value }, i) => {
              const tm = getTeam(p.teamId)
              return (
                <Link to={`/players/${p.id}`} key={p.id} className="card card--dark card--hover">
                  <div className="card__body player-card">
                    <span className="rank rank--1" style={{ width: 30, height: 30, flexShrink: 0 }}>{i + 1}</span>
                    <span className="player-avatar" style={{ background: `linear-gradient(135deg, ${tm.color}, ${tm.colorDark})` }}>{p.name[0]}</span>
                    <div>
                      <div className="player-card__name">{p.name}</div>
                      <div className="player-card__pos">{tm.name} · {p.pos}</div>
                    </div>
                    <div className="player-card__stat">
                      <b>{value}</b>
                      <span>{t('players.ppg')}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ 联赛资讯 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="NEWS" title={t('home.news')} en="League News" more={t('common.more')} moreTo="/news" />
          <div className="grid grid-3">
            {recentNews.map((n) => (
              <Link to={`/news/${n.id}`} key={n.id} className="card card--hover">
                <div className="card__media" style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${CATEGORY_META[n.category].color}, #141417)`, display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                  {n.image && (
                    <>
                      <img src={n.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,20,23,0.08) 45%, rgba(20,20,23,0.72) 100%)' }} />
                    </>
                  )}
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.92)', color: CATEGORY_META[n.category].color, position: 'relative', zIndex: 2 }}>{CATEGORY_META[n.category].zh}</span>
                </div>
                <div className="card__body">
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-faint)', marginBottom: 6 }}>{n.date}</div>
                  <h3 style={{ fontSize: '1rem', lineHeight: 1.4, marginBottom: 8 }}>{n.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.84rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 21 城风采 ============ */}
      <section className="section section--paper" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader eyebrow="CITIES" title="21 城 · 各展风采" en="21 Cities, One League" more={t('common.more')} moreTo="/teams" />
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 18 }}>
            {teams.map((tm) => (
              <Link to={`/teams/${tm.id}`} key={tm.id} style={{ textAlign: 'center', display: 'block' }}>
                <TeamCrest team={tm} size={56} style={{ margin: '0 auto 8px', transition: 'transform 0.2s' }} />
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{tm.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>{tm.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 合作伙伴 ============ */}
      <section className="section section--tight">
        <div className="container" style={{ textAlign: 'center' }}>
          <Meander color="#d9cfbf" style={{ marginBottom: 24 }} />
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32, color: 'var(--text-faint)', fontWeight: 800, letterSpacing: 2, fontSize: '1.05rem' }}>
            <span>李宁</span><span>广东省篮球协会</span><span>广东省体育局</span><span>十五运会</span><span>东莞篮球中心</span>
          </div>
          <Meander color="#d9cfbf" style={{ marginTop: 24 }} />
        </div>
      </section>
    </>
  )
}
