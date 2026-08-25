import { useI18n } from '../context/I18nContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Countdown from '../components/Countdown.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

const ALLSTAR = { date: '2026-09-12T19:30:00+08:00', venue: '东莞长安体育公园体育馆' }

// 摇号预约购票流程（与「广东篮球-粤BA」公众号一致）
const STEPS = [
  { title: '关注公众号', desc: '微信搜索「广东篮球-粤BA」并关注，这是粤BA 唯一的官方购票入口。' },
  { title: '进入购票入口', desc: '点击公众号主页「粤BA购票」专栏，进入票务预约系统。' },
  { title: '选择赛事', desc: '在预约页面选择想要观看的赛事场次，点击「立即预约」。' },
  { title: '填写信息', desc: '添加观赛人信息，包括姓名、身份证号等，请确保信息准确无误。' },
  { title: '提交预约', desc: '确认信息无误后提交预约申请，等待摇号结果。' },
  { title: '等待摇号', desc: '摇号结果将通过短信通知，也可在公众号「我的预约」中查看。' },
  { title: '中签支付', desc: '中签用户需在规定时间内完成支付；未中签用户票款将原路退回。' },
  { title: '凭身份证入场', desc: '支付成功后，凭本人身份证原件入场，无需兑换实体票。' },
]

// 静态二维码样式占位（公众号二维码），确定性图案
const QR_PATTERN = [
  '#########',
  '#.......#',
  '#.#####.#',
  '#.#####.#',
  '#.#####.#',
  '#.......#',
  '#########',
  '..##..##.',
  '.#..#..#.',
]

export default function Tickets() {
  const { t } = useI18n()

  return (
    <>
      {/* ============ Hero / 倒计时 ============ */}
      <section className="section section--dark" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--sp-9) 0' }}>
        <Kapok size={380} style={{ position: 'absolute', right: -50, top: -40, opacity: 0.07 }} color="#fff" />
        <Kapok size={220} style={{ position: 'absolute', left: -30, bottom: -20, opacity: 0.05 }} color="#fff" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head__eyebrow" style={{ color: 'var(--gold)' }}>
            <span style={{ width: 26, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
            TICKETING · 预约摇号购票
          </div>
          <h1 className="display">{t('tickets.title')}</h1>
          <p className="lead" style={{ color: 'var(--text-invert-muted)', marginTop: 14, maxWidth: 680 }}>
            粤BA 门票采用「预约摇号购票」模式，通过官方微信公众号「广东篮球-粤BA」实名预约，摇号中签后凭本人身份证入场，无需兑换实体票。
          </p>

          <div style={{ marginTop: 36, display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.78rem', letterSpacing: 2, color: 'var(--text-invert-muted)', marginBottom: 10, textTransform: 'uppercase' }}>
                {t('home.next.countdown')}
              </div>
              <Countdown target={ALLSTAR.date} />
            </div>
            <div style={{ borderLeft: '1px solid var(--ink-line)', paddingLeft: 36, minWidth: 260 }}>
              <span className="badge badge--crimson" style={{ marginBottom: 10 }}>9.12 · {ALLSTAR.venue}</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>粤BA 全明星赛 · 粤港澳邀请赛</div>
              <div style={{ color: 'var(--text-invert-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                东、西区全明星队 × 香港队 × 澳门队
              </div>
              <a href="#wechat" className="btn btn--gold" style={{ marginTop: 18 }}>前往公众号预约 →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 关注公众号（核心入口） ============ */}
      <section className="section section--crimson" id="wechat" style={{ position: 'relative', overflow: 'hidden' }}>
        <Kapok size={320} style={{ position: 'absolute', left: -40, bottom: -30, opacity: 0.06 }} color="#fff" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <SectionHeader eyebrow="WECHAT" title="关注「广东篮球-粤BA」" en="Follow the Official WeChat Account" />
              <p className="lead" style={{ color: 'var(--text-invert-muted)', marginTop: -8 }}>
                这是粤BA 唯一的官方购票入口。打开微信，搜索「广东篮球-粤BA」关注后，点击公众号主页的「粤BA购票」专栏即可进入预约系统。
              </p>
              <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a className="btn btn--gold btn--lg" href="#flow">查看购票流程</a>
                <span className="badge badge--outline" style={{ borderColor: 'var(--ink-line)', color: 'var(--text-invert-muted)' }}>实名预约 · 摇号中签 · 身份证入场</span>
              </div>
            </div>

            {/* 公众号二维码占位框 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 240, padding: 22, background: '#fff', borderRadius: 16, textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
                <div
                  aria-label="微信公众号二维码占位"
                  style={{ width: 176, height: 176, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 2 }}
                >
                  {QR_PATTERN.join('').split('').map((c, i) => (
                    <span key={i} style={{ background: c === '#' ? 'var(--ink)' : 'transparent', borderRadius: 1 }} />
                  ))}
                </div>
                <div style={{ marginTop: 14, fontWeight: 900, letterSpacing: 1 }}>微信公众号</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>广东篮球-粤BA · 粤BA购票</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 购票流程 ============ */}
      <section className="section" id="flow">
        <div className="container">
          <SectionHeader eyebrow="HOW TO BUY" title="预约摇号购票流程" en="Reservation & Lottery Flow" />

          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {STEPS.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 18, position: 'relative', paddingBottom: 28 }}>
                  {/* 连接线 */}
                  {i < STEPS.length - 1 && (
                    <span style={{ position: 'absolute', left: 21, top: 52, bottom: 0, width: 2, background: 'var(--line)' }} />
                  )}
                  <span className="rank rank--1" style={{ width: 44, height: 44, flexShrink: 0, fontSize: '1rem' }}>{i + 1}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                      {s.title}
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.7, marginTop: 4 }}>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* 购票须知 */}
            <div>
              <div className="card" style={{ borderColor: 'var(--line)' }}>
                <div className="card__body">
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>购票须知</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    <li>· 粤BA 采用<b style={{ color: 'var(--crimson)' }}>预约摇号</b>模式，实名制购票，一证一票。</li>
                    <li>· 预约成功后请等待摇号，结果将通过<b>短信</b>通知，也可在公众号「我的预约」查看。</li>
                    <li>· 中签用户需在<b>规定时间内完成支付</b>，逾期视为放弃。</li>
                    <li>· 未中签用户的票款将<b>原路退回</b>，无需额外操作。</li>
                    <li>· 入场需<b>凭本人身份证原件</b>，无需兑换实体票。</li>
                    <li>· 谨防非官方渠道的虚假票务，认准「广东篮球-粤BA」公众号。</li>
                  </ul>
                </div>
              </div>

              <div className="card card--dark" style={{ marginTop: 16, borderTop: '3px solid var(--gold)' }}>
                <div className="card__body">
                  <h3 style={{ fontSize: '1rem', color: '#fff' }}>票价档位</h3>
                  <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.85rem', marginTop: 8, lineHeight: 1.7 }}>
                    常规赛票价亲民，设 8.8 元、18.8 元两档；全明星赛与总决赛票价以官方公众号公示为准。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 回纹收尾 ============ */}
      <section className="section section--tight">
        <div className="container" style={{ textAlign: 'center' }}>
          <Meander color="#d9cfbf" />
          <p className="text-faint" style={{ fontSize: '0.78rem', marginTop: 16, letterSpacing: 2 }}>
            关注「广东篮球-粤BA」· 一键预约 · 摇号购票
          </p>
        </div>
      </section>
    </>
  )
}
