import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import { CATEGORY_META } from '../data/news.js'
import { useNews } from '../context/NewsContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

const CATEGORIES = ['league', 'team', 'media', 'gallery', 'notice']

export default function News() {
  const { t } = useI18n()
  const { news } = useNews()
  const [active, setActive] = useState('all')

  const list = useMemo(() => {
    const base = active === 'all' ? news : news.filter((n) => n.category === active)
    return [...base].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return (b.date || '').localeCompare(a.date || '')
    })
  }, [active, news])

  return (
    <>
      {/* ============ 页面头 ============ */}
      <section className="section section--crimson" style={{ position: 'relative', overflow: 'hidden' }}>
        <Kapok size={380} style={{ position: 'absolute', right: -50, top: -60, opacity: 0.08 }} color="#fff" />
        <Kapok size={220} style={{ position: 'absolute', left: -30, bottom: -30, opacity: 0.06 }} color="#fff" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head__eyebrow" style={{ color: 'var(--gold)' }}>
            <span style={{ width: 26, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
            News Center
          </div>
          <h1 className="display" style={{ color: '#fff' }}>资讯中心</h1>
          <p className="lead" style={{ color: 'var(--text-invert-muted)', marginTop: 10, maxWidth: 560 }}>
            联赛新闻 · 球队动态 · 媒体聚焦 · 图集视频 · 官方公告，第一时间掌握粤BA 赛场内外。
          </p>
        </div>
      </section>

      {/* ============ 资讯列表 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="LATEST NEWS" title="最新资讯" en="All Stories & Announcements" />

          {/* 分类筛选 */}
          <div className="tabs" style={{ marginBottom: 28, flexWrap: 'wrap', maxWidth: '100%' }}>
            <button
              type="button"
              className={`tab ${active === 'all' ? 'tab--active' : ''}`}
              onClick={() => setActive('all')}
            >
              {t('common.all')}
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`tab ${active === c ? 'tab--active' : ''}`}
                onClick={() => setActive(c)}
              >
                {CATEGORY_META[c].zh}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="empty">
              <p>{t('common.empty')}</p>
              <Link to="/" className="btn btn--ghost btn--sm" style={{ marginTop: 16 }}>{t('common.back')}</Link>
            </div>
          ) : (
            <div className="grid grid-3">
              {list.map((n) => {
                const meta = CATEGORY_META[n.category] || { zh: n.category, color: '#c8102e' }
                return (
                  <Link to={`/news/${n.id}`} key={n.id} className="card card--hover">
                    <div
                      className="card__media"
                      style={{
                        aspectRatio: '16/9',
                        position: 'relative',
                        overflow: 'hidden',
                        background: `linear-gradient(135deg, ${meta.color}, #141417)`,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: 10,
                        padding: 16,
                      }}
                    >
                      {n.image && (
                        <>
                          <img
                            src={n.image}
                            alt=""
                            loading="lazy"
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,20,23,0.08) 45%, rgba(20,20,23,0.72) 100%)' }} />
                        </>
                      )}
                      {n.pinned && (
                        <span className="badge badge--gold" style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>置顶</span>
                      )}
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.94)', color: meta.color, position: 'relative', zIndex: 2 }}>{meta.zh}</span>
                      {n.tags && n.tags[0] && (
                        <span style={{ position: 'relative', zIndex: 2, color: 'rgba(255,255,255,0.9)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 0.5 }}>
                          #{n.tags[0]}
                        </span>
                      )}
                    </div>
                    <div className="card__body">
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-faint)', marginBottom: 8 }}>{n.date}</div>
                      <h3 style={{ fontSize: '1rem', lineHeight: 1.45, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {n.title}
                      </h3>
                      <p className="text-muted" style={{ fontSize: '0.84rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {n.summary}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ 岭南点缀 ============ */}
      <section className="section section--tight">
        <div className="container" style={{ textAlign: 'center' }}>
          <Meander color="#d9cfbf" />
        </div>
      </section>
    </>
  )
}
