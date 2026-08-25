import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import teams, { EAST_TEAMS, WEST_TEAMS } from '../data/teams.js'
import SectionHeader from '../components/SectionHeader.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'

export default function Teams() {
  const { t } = useI18n()
  const [region, setRegion] = useState('all')

  const tabs = [
    { id: 'all', label: t('common.all') },
    { id: 'east', label: t('common.region.east') },
    { id: 'west', label: t('common.region.west') },
  ]

  const filtered = useMemo(() => {
    if (region === 'east') return EAST_TEAMS
    if (region === 'west') return WEST_TEAMS
    return teams
  }, [region])

  const regionLabel = (r) => (r === 'east' ? t('common.region.east') : t('common.region.west'))

  return (
    <>
      {/* ============ 欢迎 / 概览（深色） ============ */}
      <section className="section section--dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <Kapok size={420} style={{ position: 'absolute', right: -70, top: -50, opacity: 0.08 }} color="#fff" />
        <Kapok size={240} style={{ position: 'absolute', left: -30, bottom: -30, opacity: 0.06 }} color="#fff" />

        <div className="container">
          <div className="sec-head__eyebrow fade-up" style={{ color: 'var(--gold)' }}>
            <span style={{ width: 28, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
            TEAMS · 球队
          </div>
          <h1 className="title-1 fade-up fade-up-1" style={{ marginBottom: 10 }}>
            21 城 · 21 队<span className="gold"> · 各展风采</span>
          </h1>
          <p className="lead fade-up fade-up-2" style={{ color: 'var(--text-invert-muted)', maxWidth: 640 }}>
            以珠江为界，粤BA 21 支城市球队分为东、西两区。每支球队都带着一座城市的性格与岭南文化印记，为城市荣誉而战。
          </p>
          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: 32, marginTop: 26, flexWrap: 'wrap' }}>
            <div><b style={{ fontSize: '2rem', fontWeight: 900 }}>{teams.length}</b><span style={{ color: 'var(--text-invert-muted)', marginLeft: 8, fontSize: '0.9rem' }}>{t('home.hero.stat.teams')}</span></div>
            <div><b style={{ fontSize: '2rem', fontWeight: 900 }}>{EAST_TEAMS.length}</b><span style={{ color: 'var(--text-invert-muted)', marginLeft: 8, fontSize: '0.9rem' }}>{t('common.region.east')}</span></div>
            <div><b style={{ fontSize: '2rem', fontWeight: 900 }}>{WEST_TEAMS.length}</b><span style={{ color: 'var(--text-invert-muted)', marginLeft: 8, fontSize: '0.9rem' }}>{t('common.region.west')}</span></div>
          </div>
        </div>
      </section>

      {/* ============ 球队列表 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="TEAMS" title={t('teams.all')} en="21 Cities, One League" />

          {/* 分区筛选 */}
          <div className="tabs" style={{ marginBottom: 28 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab ${region === tab.id ? 'tab--active' : ''}`}
                onClick={() => setRegion(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <p>{t('common.empty')}</p>
              <Link to="/" className="btn btn--primary" style={{ marginTop: 16 }}>{t('common.back')}</Link>
            </div>
          ) : (
            <div className="grid grid-auto">
              {filtered.map((tm) => (
                <Link to={`/teams/${tm.id}`} key={tm.id} className="card card--hover">
                  <div className="team-card">
                    <TeamCrest team={tm} size={64} />
                    <div className="team-card__name">{tm.name}</div>
                    <div className="team-card__en">{tm.nameEn}</div>
                    <div className="team-card__meta">{tm.tagline}</div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <span className={`badge ${tm.region === 'east' ? 'badge--crimson-soft' : 'badge--jade'}`}>
                        {regionLabel(tm.region)}
                      </span>
                      <span className="badge badge--outline">{tm.honors.length} 项荣誉</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
