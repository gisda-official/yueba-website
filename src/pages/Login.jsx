import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import Logo from '../components/Logo.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

/* 登录页 —— 居中卡片 + 第三方登录 */
export default function Login() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  function handleSubmit(e) {
    e.preventDefault()
    try {
      localStorage.setItem(
        'yueba-user',
        JSON.stringify({
          name: account || '粤BA球迷',
          account,
          remember,
        })
      )
    } catch {
      /* ignore */
    }
    navigate('/')
  }

  const thirdParties = [
    { name: '微信', color: '#16a34a' },
    { name: 'QQ', color: '#2e7ab0' },
    { name: '微博', color: '#e6162d' },
  ]

  return (
    <section
      className="section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(120% 120% at 50% -10%, #5c0713 0%, #141417 60%)',
        color: '#fff',
      }}
    >
      {/* 岭南点缀水印 */}
      <Kapok size={460} style={{ position: 'absolute', right: -80, top: -60, opacity: 0.08 }} color="#fff" />
      <Kapok size={280} style={{ position: 'absolute', left: -40, bottom: -30, opacity: 0.06 }} color="#fff" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* 品牌区 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }} className="fade-up">
          <span style={{ display: 'inline-flex' }}>
            <Logo size={52} />
          </span>
          <p style={{ marginTop: 14, fontSize: '0.82rem', letterSpacing: 3, color: 'var(--text-invert-muted)', textTransform: 'uppercase' }}>
            {t('brand.sub')} · 一战城名 粤战粤勇
          </p>
        </div>

        {/* 登录卡片 */}
        <div
          className="card fade-up fade-up-1"
          style={{ maxWidth: 420, margin: '0 auto', width: '100%', boxShadow: 'var(--shadow-lg)' }}
        >
          <div className="card__body" style={{ padding: '40px 36px' }}>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <h1 className="title-2" style={{ fontSize: '1.7rem', letterSpacing: 2 }}>登录</h1>
              <p className="text-muted" style={{ fontSize: '0.82rem', marginTop: 4 }}>Sign in to YueBA</p>
            </div>
            <Meander color="#e6ddcc" style={{ margin: '18px auto', justifyContent: 'center' }} />

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="account">手机号 / 邮箱</label>
                <input
                  id="account"
                  className="input"
                  type="text"
                  placeholder="请输入手机号或邮箱"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="password">密码</label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '6px 0 20px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.86rem', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    style={{ accentColor: 'var(--crimson)', width: 16, height: 16 }}
                  />
                  记住我
                </label>
                <Link to="/login" style={{ fontSize: '0.86rem', color: 'var(--crimson)', fontWeight: 600 }}>忘记密码？</Link>
              </div>

              <button type="submit" className="btn btn--primary btn--block btn--lg">
                登录
              </button>
            </form>

            {/* 分割线 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '26px 0 18px' }}>
              <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              <span className="text-faint" style={{ fontSize: '0.82rem' }}>或</span>
              <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            </div>

            {/* 第三方登录 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {thirdParties.map((p) => (
                <button key={p.name} type="button" className="btn btn--ghost btn--sm" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: p.color, marginRight: 6 }} />
                  {p.name}
                </button>
              ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              没有账号？<Link to="/register" style={{ color: 'var(--crimson)', fontWeight: 700 }}>立即注册</Link>
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.76rem', color: 'var(--text-invert-muted)' }} className="fade-up fade-up-2">
          {t('footer.disclaimer')}
        </p>
      </div>
    </section>
  )
}
