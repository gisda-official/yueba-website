import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import Logo from './Logo.jsx'

const LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/news', key: 'nav.news' },
  { to: '/schedule', key: 'nav.schedule' },
  { to: '/standings', key: 'nav.standings' },
  { to: '/teams', key: 'nav.teams' },
  { to: '/players', key: 'nav.players' },
  { to: '/stats', key: 'nav.stats' },
  { to: '/tickets', key: 'nav.tickets' },
  { to: '/community', key: 'nav.community' },
  { to: '/about', key: 'nav.about' },
]

export default function Navbar() {
  const { t, lang, toggleLang } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 顶部标语条 */}
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__item">
            <span aria-hidden>🏀</span> 一战城名 · 粤战粤勇
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span className="topbar__item">微信公众号：广东篮球-粤BA</span>
            <Link to="/admin" className="topbar__item" style={{ fontWeight: 700, letterSpacing: 1 }}>
              ⚙ {t('nav.admin')}
            </Link>
            <button
              onClick={toggleLang}
              className="topbar__item"
              style={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <header className="nav">
        <div className="container nav__inner">
          <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <Logo size={38} />
            <span className="nav__brand-text">
              <span className="nav__brand-title">粤BA</span>
              <span className="nav__brand-sub">{t('brand.sub')}</span>
            </span>
          </Link>

          <nav className="nav__links">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `nav__link${isActive ? ' nav__link--active' : ''}`
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <Link to="/login" className="btn btn--ghost btn--sm">
              {t('nav.login')}
            </Link>
            <button
              className="nav__burger"
              onClick={() => setOpen((o) => !o)}
              aria-label="菜单"
            >
              <span style={{ transform: open ? 'rotate(45deg) translateY(5px)' : 'none' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div className={`nav__menu${open ? ' nav__menu--open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {t(l.key)}
            </NavLink>
          ))}
          <Link to="/register" className="nav__link" onClick={() => setOpen(false)}>
            {t('nav.register')}
          </Link>
        </div>
      </header>
    </>
  )
}
