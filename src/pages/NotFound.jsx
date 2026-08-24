import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <section
      className="section section--dark"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(120% 120% at 50% 0%, #2a0810 0%, #141417 60%)',
      }}
    >
      {/* 木棉花水印 */}
      <Kapok
        size={520}
        color="#c8102e"
        style={{ position: 'absolute', right: -120, top: -120, opacity: 0.1, transform: 'rotate(18deg)' }}
      />
      <Kapok
        size={300}
        color="#c8102e"
        style={{ position: 'absolute', left: -80, bottom: -60, opacity: 0.08, transform: 'rotate(-24deg)' }}
      />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p className="display num" style={{ fontSize: 'clamp(6rem, 18vw, 11rem)', lineHeight: 0.9, color: 'var(--crimson-bright)', textShadow: '0 10px 40px rgba(200,16,46,0.35)' }}>
          404
        </p>

        <h1 className="title-1" style={{ marginTop: 24 }}>
          页面未找到
          <span className="en" style={{ color: 'var(--text-invert-muted)' }}>Page Not Found</span>
        </h1>

        <Meander color="rgba(226,180,74,0.55)" height={16} style={{ maxWidth: 320, margin: '20px auto 20px' }} />

        <p className="lead" style={{ color: 'var(--text-invert-muted)', maxWidth: 420, margin: '0 auto' }}>
          你访问的页面可能已被移动、删除，或从未存在。球场上的每一分都要重新来过，回家再战一场吧。
        </p>

        <div style={{ marginTop: 32 }}>
          <Link to="/" className="btn btn--primary btn--lg">
            {t('common.back')} · 返回首页
          </Link>
        </div>

        <div style={{ marginTop: 40, color: 'var(--text-invert-muted)', fontSize: '0.78rem', letterSpacing: 2 }}>
          {t('brand.slogan')}
        </div>
      </div>
    </section>
  )
}
