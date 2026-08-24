import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import { getNews, newsByCategory, CATEGORY_META } from '../data/news.js'
import SectionHeader from '../components/SectionHeader.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

export default function NewsDetail() {
  const { t } = useI18n()
  const { id } = useParams()
  const article = getNews(id)

  // 未命中：优雅空状态
  if (!article) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty">
            <Kapok size={72} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
            <h2 className="title-2" style={{ marginBottom: 10 }}>资讯不存在</h2>
            <p className="text-muted" style={{ marginBottom: 26 }}>这篇资讯可能已被移除，或链接地址有误。</p>
            <Link to="/news" className="btn btn--primary">{t('common.back')}资讯中心</Link>
          </div>
        </div>
      </section>
    )
  }

  const meta = CATEGORY_META[article.category] || CATEGORY_META.league
  const related = newsByCategory(article.category).filter((n) => n.id !== article.id).slice(0, 3)

  return (
    <>
      {/* ============ 文章头 ============ */}
      <section className="section section--dark" style={{ position: 'relative', overflow: 'hidden', paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <Kapok size={460} style={{ position: 'absolute', right: -80, top: -60, opacity: 0.07 }} color="#fff" />
        <Kapok size={220} style={{ position: 'absolute', left: -30, bottom: -30, opacity: 0.05 }} color="#fff" />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 880 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <span className="badge" style={{ background: meta.color, color: '#fff' }}>{meta.zh}</span>
            <span style={{ fontSize: '0.74rem', letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-invert-muted)' }}>{meta.en}</span>
          </div>

          <h1 className="title-1" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3.4vw, 2.2rem)', lineHeight: 1.3 }}>
            {article.title}
          </h1>
          {article.titleEn && (
            <p className="culture-quote" style={{ color: 'var(--text-invert-muted)', marginTop: 12, fontSize: '0.95rem' }}>
              {article.titleEn}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--ink-line)' }}>
            <span className="num" style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem' }}>{article.date}</span>
            {article.tags && article.tags.map((tag) => (
              <span key={tag} className="badge badge--outline" style={{ borderColor: 'var(--ink-line)', color: 'var(--text-invert-muted)' }}># {tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 正文 ============ */}
      <section className="section section--paper" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-6)' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          {article.image && (
            <figure style={{ margin: '0 0 30px' }}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: 'auto', maxHeight: 460, objectFit: 'cover', borderRadius: 14, boxShadow: 'var(--shadow-lg)' }}
              />
            </figure>
          )}

          <article>
            {article.body.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 2,
                  color: 'var(--text)',
                  marginBottom: 26,
                  textAlign: 'justify',
                }}
              >
                {para}
              </p>
            ))}
          </article>

          <Meander color="#d9cfbf" style={{ margin: '12px 0 28px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/news" className="btn btn--ghost" style={{ color: 'var(--ink)' }}>← {t('common.back')}资讯</Link>
            <span className="text-faint" style={{ fontSize: '0.8rem' }}>{meta.zh} · 粤BA 联赛资讯</span>
          </div>
        </div>
      </section>

      {/* ============ 相关资讯 ============ */}
      <section className="section" style={{ paddingTop: 'var(--sp-6)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="RELATED"
            title="相关资讯"
            en={meta.en}
            more={t('common.more')}
            moreTo="/news"
          />

          {related.length > 0 ? (
            <div className="grid grid-3">
              {related.map((n) => {
                const m = CATEGORY_META[n.category] || CATEGORY_META.league
                return (
                  <Link to={`/news/${n.id}`} key={n.id} className="card card--hover">
                    <div className="card__media" style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${m.color}, #141417)`, display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                      {n.image && (
                        <>
                          <img src={n.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,20,23,0.08) 45%, rgba(20,20,23,0.72) 100%)' }} />
                        </>
                      )}
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.92)', color: m.color, position: 'relative', zIndex: 2 }}>{m.zh}</span>
                    </div>
                    <div className="card__body">
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-faint)', marginBottom: 6 }}>{n.date}</div>
                      <h3 style={{ fontSize: '1rem', lineHeight: 1.45, marginBottom: 8 }}>{n.title}</h3>
                      <p className="text-muted" style={{ fontSize: '0.84rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.summary}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="empty" style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
              <p className="text-muted">暂无同类资讯</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
