import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useI18n } from '../context/I18nContext.jsx'
import Logo from '../components/Logo.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'

export default function Register() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const [form, setForm] = useState({ phone: '', code: '', pwd: '', pwd2: '', agree: false })
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!countdown) return
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const sendCode = () => {
    if (countdown > 0) return
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      setError('请先输入正确的手机号')
      return
    }
    setError('')
    setCountdown(60)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^1[3-9]\d{9}$/.test(form.phone)) return setError('请输入正确的手机号')
    if (!form.code) return setError('请输入验证码')
    if (form.pwd.length < 6) return setError('密码至少 6 位')
    if (form.pwd !== form.pwd2) return setError('两次输入的密码不一致')
    if (!form.agree) return setError('请先阅读并同意《用户协议》')
    setError('')
    navigate('/login')
  }

  return (
    <section
      className="section section--dark"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        overflow: 'hidden',
        background: 'radial-gradient(120% 120% at 80% 0%, #5c0713 0%, #141417 55%)',
      }}
    >
      <Kapok size={420} style={{ position: 'absolute', right: -60, top: -40, opacity: 0.08 }} color="#fff" />
      <Kapok size={260} style={{ position: 'absolute', left: -40, bottom: -20, opacity: 0.06 }} color="#fff" />

      <div
        className="card fade-up"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        {/* 品牌头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--crimson-deep), var(--crimson-dark))',
            padding: '34px 32px 28px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Logo size={46} showText style={{ justifyContent: 'center' }} />
          <h1 className="title-1" style={{ marginTop: 18, fontSize: '1.7rem', letterSpacing: 4 }}>
            {t('nav.register')}
          </h1>
          <div
            style={{
              marginTop: 8,
              fontSize: '0.7rem',
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 700,
            }}
          >
            Sign Up · 会员注册
          </div>
        </div>

        {/* 表单 */}
        <div className="card__body" style={{ padding: '30px 32px 34px' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="phone">手机号</label>
              <input
                id="phone"
                className="input"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="请输入 11 位手机号"
                value={form.phone}
                onChange={update('phone')}
              />
            </div>

            <div className="field">
              <label htmlFor="code">验证码</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  id="code"
                  className="input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="请输入验证码"
                  value={form.code}
                  onChange={update('code')}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="btn btn--dark btn--sm"
                  onClick={sendCode}
                  disabled={countdown > 0}
                  style={{ flexShrink: 0, whiteSpace: 'nowrap', opacity: countdown > 0 ? 0.6 : 1 }}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="pwd">密码</label>
              <input
                id="pwd"
                className="input"
                type="password"
                placeholder="至少 6 位密码"
                value={form.pwd}
                onChange={update('pwd')}
              />
            </div>

            <div className="field">
              <label htmlFor="pwd2">确认密码</label>
              <input
                id="pwd2"
                className="input"
                type="password"
                placeholder="请再次输入密码"
                value={form.pwd2}
                onChange={update('pwd2')}
              />
            </div>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                marginBottom: 18,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm((f) => ({ ...f, agree: e.target.checked }))}
                style={{ accentColor: 'var(--crimson)', width: 16, height: 16 }}
              />
              <span>
                我已阅读并同意
                <Link to="/about" style={{ color: 'var(--crimson)', fontWeight: 600 }}>
                  《用户协议》
                </Link>
                与《隐私政策》
              </span>
            </label>

            {error && (
              <p
                className="text-crimson"
                style={{ fontSize: '0.82rem', margin: '-6px 0 14px', fontWeight: 600 }}
              >
                {error}
              </p>
            )}

            <button type="submit" className="btn btn--primary btn--block btn--lg">
              {t('nav.register')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 18, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            已有账号？
            <Link to="/login" style={{ color: 'var(--crimson)', fontWeight: 700 }}>
              {t('nav.login')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
