import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNews } from '../context/NewsContext.jsx'
import { CATEGORY_META } from '../data/news.js'
import { isAdmin, loginAdmin, logoutAdmin } from '../lib/admin.js'
import Logo from '../components/Logo.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'

/* 可选封面图 —— 18 张粤BA 实拍 + 2 张城市天际线 */
const COVER_IMAGES = [
  ...Array.from({ length: 18 }, (_, i) => `images/game-${String(i + 1).padStart(2, '0')}.jpg`),
  'images/guangzhou-skyline.jpg',
  'images/shenzhen-skyline.jpg',
]

const CATEGORIES = Object.keys(CATEGORY_META)

function todayISO() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

const emptyForm = () => ({
  title: '',
  titleEn: '',
  category: 'league',
  date: todayISO(),
  summary: '',
  body: '',
  tags: '',
  image: 'images/game-01.jpg',
  pinned: false,
})

const genId = () => 'post-' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36)

export default function Admin() {
  const { drafts, addNews, removeNews } = useNews()
  const [authed, setAuthed] = useState(isAdmin())
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState('')
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [copied, setCopied] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function handleLogin(e) {
    e.preventDefault()
    if (loginAdmin(pwd)) {
      setAuthed(true)
      setErr('')
    } else {
      setErr('密码错误，请重试')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return setErr('请填写标题')
    if (!form.summary.trim()) return setErr('请填写摘要')
    const body = form.body.split('\n').map((s) => s.trim()).filter(Boolean)
    const item = {
      id: genId(),
      title: form.title.trim(),
      titleEn: form.titleEn.trim() || undefined,
      category: form.category,
      date: form.date,
      image: form.image,
      pinned: form.pinned,
      summary: form.summary.trim(),
      tags: form.tags.split(/[,，]/).map((s) => s.trim()).filter(Boolean),
      body,
    }
    addNews(item)
    setErr('')
    setMsg('✅ 发布成功！已同步显示在首页与资讯中心（本机）。')
    setForm(emptyForm())
    setTimeout(() => setMsg(''), 4000)
  }

  async function handleCopy() {
    const snippet = `/* 将以下数组粘贴到 src/data/news.js 的 STATIC_NEWS 数组最前面，即可全网发布 */\n${JSON.stringify(drafts, null, 2)}`
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  /* ================= 未登录：密码门 ================= */
  if (!authed) {
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
        <Kapok size={460} style={{ position: 'absolute', right: -80, top: -60, opacity: 0.08 }} color="#fff" />
        <Kapok size={280} style={{ position: 'absolute', left: -40, bottom: -30, opacity: 0.06 }} color="#fff" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }} className="fade-up">
            <span style={{ display: 'inline-flex' }}>
              <Logo size={52} />
            </span>
            <p style={{ marginTop: 12, fontSize: '0.8rem', letterSpacing: 3, color: 'var(--text-invert-muted)', textTransform: 'uppercase' }}>
              管理员中心 · Admin Console
            </p>
          </div>

          <div className="card fade-up fade-up-1" style={{ maxWidth: 420, margin: '0 auto', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
            <div className="card__body" style={{ padding: '36px 32px' }}>
              <h1 className="title-2" style={{ fontSize: '1.5rem', letterSpacing: 2, textAlign: 'center' }}>管理登录</h1>
              <p className="text-muted" style={{ fontSize: '0.82rem', textAlign: 'center', marginTop: 4 }}>
                输入管理密码进入后台
              </p>

              <form onSubmit={handleLogin} style={{ marginTop: 22 }}>
                <div className="field">
                  <label htmlFor="admin-pwd">管理密码</label>
                  <input
                    id="admin-pwd"
                    className="input"
                    type="password"
                    placeholder="请输入管理密码"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    autoFocus
                  />
                </div>
                {err && <p className="text-crimson" style={{ fontSize: '0.82rem', margin: '-4px 0 14px', fontWeight: 600 }}>{err}</p>}
                <button type="submit" className="btn btn--primary btn--block btn--lg">进入后台</button>
              </form>

              <p style={{ textAlign: 'center', marginTop: 22, fontSize: '0.76rem', color: 'var(--text-faint)' }}>
                演示密码：yueba2026（可在 src/lib/admin.js 中修改）
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ================= 已登录：后台 ================= */
  const exportSnippet = `/* 将以下数组粘贴到 src/data/news.js 的 STATIC_NEWS 数组最前面，即可全网发布 */\n${JSON.stringify(drafts, null, 2)}`

  return (
    <>
      {/* 顶部横幅 */}
      <section className="section section--crimson" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--sp-6) 0' }}>
        <Kapok size={380} style={{ position: 'absolute', right: -50, top: -60, opacity: 0.08 }} color="#fff" />
        <Kapok size={220} style={{ position: 'absolute', left: -30, bottom: -30, opacity: 0.06 }} color="#fff" />
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="sec-head__eyebrow" style={{ color: 'var(--gold)' }}>
              <span style={{ width: 26, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
              Admin Console
            </div>
            <h1 className="display" style={{ color: '#fff' }}>管理员中心</h1>
          </div>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => { logoutAdmin(); setAuthed(false); setForm(emptyForm()) }}
          >
            退出登录
          </button>
        </div>
      </section>

      <section className="section section--paper" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          {msg && (
            <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--jade)', color: 'var(--jade-deep)', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontWeight: 600 }}>
              {msg}
            </div>
          )}

          <div className="grid grid-2" style={{ alignItems: 'start', gap: 32 }}>
            {/* ===== 左：发布表单 ===== */}
            <div className="card">
              <div className="card__body" style={{ padding: '28px 26px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: 4 }}>发布新资讯</h2>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 20 }}>填写后点击「发布」，即时出现在首页与资讯中心。</p>

                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="a-title">标题 *</label>
                    <input id="a-title" className="input" type="text" placeholder="例如：XX 队主场大胜 YY 队" value={form.title} onChange={update('title')} />
                  </div>
                  <div className="field">
                    <label htmlFor="a-titleEn">英文标题（可选）</label>
                    <input id="a-titleEn" className="input" type="text" placeholder="English title" value={form.titleEn} onChange={update('titleEn')} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="field">
                      <label htmlFor="a-cat">分类</label>
                      <select id="a-cat" className="input select" value={form.category} onChange={update('category')}>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{CATEGORY_META[c].zh}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="a-date">日期</label>
                      <input id="a-date" className="input" type="date" value={form.date} onChange={update('date')} />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="a-summary">摘要 *</label>
                    <textarea id="a-summary" className="input" rows={2} placeholder="一句话概述这条资讯" value={form.summary} onChange={update('summary')} style={{ resize: 'vertical' }} />
                  </div>

                  <div className="field">
                    <label htmlFor="a-body">正文（每行一段）</label>
                    <textarea id="a-body" className="input" rows={5} placeholder={'第一段…\n第二段…\n第三段…'} value={form.body} onChange={update('body')} style={{ resize: 'vertical' }} />
                  </div>

                  <div className="field">
                    <label htmlFor="a-tags">标签（逗号分隔）</label>
                    <input id="a-tags" className="input" type="text" placeholder="例如：东莞, 总决赛, 周泽源" value={form.tags} onChange={update('tags')} />
                  </div>

                  <div className="field">
                    <label>封面图</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                      {COVER_IMAGES.map((src) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, image: src }))}
                          style={{
                            width: 64,
                            height: 44,
                            borderRadius: 6,
                            overflow: 'hidden',
                            border: form.image === src ? '3px solid var(--crimson)' : '1px solid var(--line-strong)',
                            padding: 0,
                            cursor: 'pointer',
                            background: '#eee',
                          }}
                        >
                          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-faint)' }}>已选：{form.image}</div>
                  </div>

                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.86rem', fontWeight: 600, marginBottom: 16, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.pinned}
                      onChange={(e) => setForm((f) => ({ ...f, pinned: e.target.checked }))}
                      style={{ accentColor: 'var(--crimson)', width: 16, height: 16 }}
                    />
                    置顶显示
                  </label>

                  {err && <p className="text-crimson" style={{ fontSize: '0.82rem', margin: '-6px 0 14px', fontWeight: 600 }}>{err}</p>}

                  <button type="submit" className="btn btn--primary btn--block btn--lg">发布资讯</button>
                </form>
              </div>
            </div>

            {/* ===== 右：草稿 + 导出 ===== */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card">
                <div className="card__body" style={{ padding: '24px 26px' }}>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>已创建的资讯</h2>
                  <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 16 }}>仅保存在本机浏览器 · 共 {drafts.length} 条草稿</p>

                  {drafts.length === 0 ? (
                    <p className="text-faint" style={{ fontSize: '0.86rem' }}>暂无草稿。在左侧发布第一条资讯吧。</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {drafts.map((n) => (
                        <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 10 }}>
                          <span className="badge" style={{ background: (CATEGORY_META[n.category] || {}).color || '#c8102e', color: '#fff', flexShrink: 0 }}>
                            {(CATEGORY_META[n.category] || {}).zh || n.category}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.title}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{n.date}</div>
                          </div>
                          <Link to={`/news/${n.id}`} className="btn btn--ghost btn--sm" style={{ flexShrink: 0 }}>预览</Link>
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            style={{ flexShrink: 0, color: 'var(--crimson)' }}
                            onClick={() => { if (window.confirm('确定删除这条草稿？')) removeNews(n.id) }}
                          >
                            删除
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card__body" style={{ padding: '24px 26px' }}>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>导出代码 · 永久发布</h2>
                  <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: 12 }}>
                    草稿只在本机可见。把下方代码粘贴到 <code style={{ color: 'var(--crimson)' }}>src/data/news.js</code> 的 <code style={{ color: 'var(--crimson)' }}>STATIC_NEWS</code> 数组最前面，重新部署后全网可见。
                  </p>
                  <button type="button" className="btn btn--dark btn--sm" onClick={handleCopy} disabled={drafts.length === 0} style={{ marginBottom: 10 }}>
                    {copied ? '✅ 已复制' : '复制代码'}
                  </button>
                  <textarea
                    readOnly
                    className="input"
                    rows={8}
                    value={exportSnippet}
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.74rem', resize: 'vertical', background: 'var(--ink-soft)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
