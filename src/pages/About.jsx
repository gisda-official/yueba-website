import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import teams from '../data/teams.js'
import Logo from '../components/Logo.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'
import ManchuriaWindow from '../components/ornaments/ManchuriaWindow.jsx'
import Roofline from '../components/ornaments/Roofline.jsx'
import TeamCrest from '../components/TeamCrest.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

/* 联赛里程碑 —— 数据确定性，中文为主 */
const MILESTONES = [
  { year: '2015', title: '广东省男子篮球联赛创立', desc: '首届全省城市篮球联赛启幕，21 支城市球队同场竞技，拉开广东城市篮球的序幕。' },
  { year: '2019', title: '国家体育产业示范项目', desc: '联赛获评国家体育产业示范项目，赛事规模与影响力持续跃升，成为广东体育的一张名片。' },
  { year: '2023', title: '群众三大球精品赛事案例', desc: '入选国家群众「三大球」精品赛事案例，树立起群众篮球赛事的标杆与典范。' },
  { year: '2025', title: '河源夺冠', desc: '河源队打破垄断，总决赛 MVP 黎伊扬一战成名，首次问鼎广东省男子篮球联赛总冠军。' },
  { year: '2026', title: '粤BA 元年 · 东莞夺冠', desc: '联赛焕新升级为「粤BA」，东莞队以主场七战全胜的统治力问鼎首届总冠军。' },
]

const PARTNERS = ['李宁', '广东省体育局', '广东省篮球协会', '十五运会', '东莞篮球中心', '广东广播电视台']

export default function About() {
  const { t } = useI18n()

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="hero">
        <img
          src="images/shenzhen-skyline.jpg"
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
              {t('nav.about')} · {t('brand.sub').toUpperCase()}
            </div>
            <h1 className="hero__title fade-up fade-up-1">
              {t('brand.slogan')}
            </h1>
            <p className="hero__sub fade-up fade-up-2">
              以篮球为纽带，以城市为荣耀。粤BA 汇聚广东 21 个地级市的篮球力量，书写一场关于热爱、团结与城市精神的全民间较量。
            </p>
            <div className="hero__stats fade-up fade-up-3">
              <div className="hero__stat"><b>21</b><span>参赛城市</span></div>
              <div className="hero__stat"><b>10</b><span>年传承</span></div>
              <div className="hero__stat"><b>2</b><span>大分区</span></div>
              <div className="hero__stat"><b>1</b><span>共同荣耀</span></div>
            </div>
          </div>

          <div className="card card--dark fade-up fade-up-2" style={{ boxShadow: 'var(--shadow-lg)', borderTop: '3px solid var(--gold)' }}>
            <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ink-line)' }}>
              <span className="badge badge--gold">{t('about.logo')} · 会徽</span>
              <span style={{ color: 'var(--text-invert-muted)', fontSize: '0.8rem' }}>Emblem</span>
            </div>
            <div className="card__body" style={{ textAlign: 'center', padding: '28px 20px' }}>
              <Logo size={72} showText={false} style={{ justifyContent: 'center', margin: '0 auto 14px' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: 2 }}>粤BA</h3>
              <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.82rem', marginTop: 4 }}>广东省城市篮球联赛</p>
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8 }}>
                <span className="badge badge--crimson-soft" style={{ color: '#fff', background: 'var(--crimson)' }}>中国红</span>
                <span className="badge badge--gold">岭南金</span>
                <span className="badge badge--jade">满洲窗绿</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 联赛愿景 ============ */}
      <section className="section section--crimson">
        <div className="container" style={{ textAlign: 'center' }}>
          <Roofline color="rgba(255,255,255,0.22)" style={{ marginBottom: 32 }} />
          <h2 className="title-1" style={{ marginBottom: 14 }}>{t('about.vision')}</h2>
          <p className="culture-quote" style={{ fontSize: '1.15rem', color: 'var(--text-invert-muted)', maxWidth: 760, margin: '0 auto' }}>
            「让每一个广东城市都有一支可以为之呐喊的球队，让篮球成为连接千万家庭与城市的共同语言。」
          </p>
          <Roofline color="rgba(255,255,255,0.22)" style={{ marginTop: 32 }} />
        </div>
      </section>

      {/* ============ 广东全景 ============ */}
      <section className="section section--tight" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <figure style={{ margin: 0 }}>
            <img
              src="images/guangzhou-skyline.jpg"
              alt="广州城市天际线"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 14, boxShadow: 'var(--shadow-lg)' }}
            />
            <figcaption style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: 12 }}>
              广州城市天际线 · 粤BA 所在城市群
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ 联赛历史 ============ */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="HISTORY" title={t('about.history')} en="A Decade of City Basketball" />
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {MILESTONES.map((m, i) => {
              const last = i === MILESTONES.length - 1
              return (
                <div key={m.year} style={{ display: 'flex', gap: 28 }}>
                  <div className="num" style={{ flexShrink: 0, width: 92, textAlign: 'right', fontSize: '1.55rem', fontWeight: 900, color: last ? 'var(--gold-deep)' : 'var(--crimson)' }}>
                    {m.year}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      paddingLeft: 28,
                      paddingBottom: last ? 0 : 44,
                      borderLeft: last ? '2px solid transparent' : '2px solid var(--line-strong)',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: -9,
                        top: 7,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: last ? 'var(--gold)' : 'var(--crimson)',
                        border: '3px solid var(--paper)',
                        boxShadow: last ? '0 0 0 3px var(--gold-soft)' : 'none',
                      }}
                    />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 6 }}>{m.title}</h3>
                    <p className="text-muted" style={{ fontSize: '0.92rem' }}>{m.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ 组织架构 ============ */}
      <section className="section section--dark">
        <div className="container">
          <SectionHeader eyebrow="ORGANIZATION" title={t('about.org')} en="League Structure" />
          <div className="grid grid-2" style={{ gap: 32 }}>
            <div>
              <div className="card card--dark" style={{ borderColor: 'var(--ink-line)' }}>
                <div className="card__body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span className="badge badge--gold">主办</span>
                    <h3 style={{ fontSize: '1.2rem' }}>广东省篮球协会</h3>
                  </div>
                  <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.9rem', marginBottom: 18 }}>
                    联赛由广东省篮球协会主办，各城市体育部门协办，是全省规格最高、覆盖最广的群众性城市篮球赛事。
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['指导单位 · 广东省体育局', '协办 · 各市篮球协会', '数据支持 · 粤BA 数据中心'].map((s) => (
                      <span key={s} className="badge badge--outline" style={{ color: 'var(--text-invert-muted)', borderColor: 'var(--ink-line)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <ManchuriaWindow size={72} style={{ flexShrink: 0 }} />
                <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  以珠江为界，21 支球队分为<b style={{ color: '#fff' }}>东区（11 队）</b>与<b style={{ color: '#fff' }}>西区（10 队）</b>，常规赛单循环，季后赛决出总冠军。
                </p>
              </div>
            </div>

            <div className="card card--dark" style={{ borderColor: 'var(--ink-line)' }}>
              <div className="card__body">
                <h3 style={{ fontSize: '1.05rem', marginBottom: 16, letterSpacing: 1 }}>21 城 · 21 队</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 16 }}>
                  {teams.map((tm) => (
                    <Link to={`/teams/${tm.id}`} key={tm.id} style={{ textAlign: 'center', display: 'block' }}>
                      <TeamCrest team={tm} size={40} style={{ margin: '0 auto 6px' }} />
                      <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{tm.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 品牌文化 ============ */}
      <section className="section section--paper" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader eyebrow="BRAND" title="品牌文化" en="Brand & Lingnan Culture" />
          <div className="grid grid-3">
            {/* 会徽 */}
            <div className="card card--hover">
              <div className="card__media" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #5c0713, #141417)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Logo size={88} showText={false} style={{ justifyContent: 'center' }} />
              </div>
              <div className="card__body">
                <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>{t('about.logo')} · 会徽</h3>
                <p className="text-muted" style={{ fontSize: '0.86rem' }}>篮球与「粤」字相融，五瓣木棉环绕，岭南金描边，寓意城市同心、英雄花开。</p>
              </div>
            </div>

            {/* 满洲窗灵感 */}
            <div className="card card--hover">
              <div className="card__media" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, var(--ink-soft), var(--ink))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ManchuriaWindow size={96} />
              </div>
              <div className="card__body">
                <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>满洲窗灵感</h3>
                <p className="text-muted" style={{ fontSize: '0.86rem' }}>取岭南满洲窗彩色玻璃的几何格栅，红、绿、金交织，是粤BA 视觉体系的文化底色。</p>
              </div>
            </div>

            {/* 木棉 */}
            <div className="card card--hover">
              <div className="card__media" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, var(--paper-soft), var(--paper))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Kapok size={96} color="#c8102e" />
              </div>
              <div className="card__body">
                <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>木棉 · 英雄花</h3>
                <p className="text-muted" style={{ fontSize: '0.86rem' }}>广州市花木棉，先花后叶、赤焰满树，象征岭南儿女的豪迈与不屈，贯穿赛事标识与荣誉。</p>
              </div>
            </div>

            {/* 吉祥物 */}
            <div className="card card--hover">
              <div className="card__body">
                <span className="badge badge--crimson" style={{ marginBottom: 12 }}>{t('about.mascot')}</span>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1, textAlign: 'center', background: 'var(--crimson-tint)', borderRadius: 12, padding: '18px 10px' }}>
                    <div style={{ width: 46, height: 46, margin: '0 auto', borderRadius: '50%', background: 'var(--crimson)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem' }}>洋</div>
                    <div style={{ fontWeight: 800, color: 'var(--crimson)' }}>喜洋洋</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: 'var(--jade-soft)', borderRadius: 12, padding: '18px 10px' }}>
                    <div style={{ width: 46, height: 46, margin: '0 auto', borderRadius: '50%', background: 'var(--jade-deep)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem' }}>融</div>
                    <div style={{ fontWeight: 800, color: 'var(--jade-deep)' }}>乐融融</div>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.86rem' }}>双羊吉祥物「喜洋洋」「乐融融」，源自羊城「五羊」传说，寓意粤BA 赛场喜乐融融、共享篮球之欢。</p>
              </div>
            </div>

            {/* 奖牌 */}
            <div className="card card--hover">
              <div className="card__body">
                <span className="badge badge--gold" style={{ marginBottom: 12 }}>{t('about.medal')}</span>
                <div style={{ textAlign: 'center', padding: '10px 0 16px' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Kapok size={72} color="#e2b44a" />
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>冠</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.86rem' }}>冠军奖牌以木棉五瓣为形，中国红与岭南金相映，镌刻「一战城名」四字，铭记城市荣耀。</p>
              </div>
            </div>

            {/* 一战城名 */}
            <div className="card card--hover" style={{ background: 'var(--ink)', borderColor: 'var(--ink-line)', color: '#fff' }}>
              <div className="card__body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ fontSize: '0.78rem', letterSpacing: 3, color: 'var(--gold)', marginBottom: 10 }}>SLOGAN</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: 2, lineHeight: 1.3 }}>一战城名<br />粤战粤勇</div>
                <p style={{ color: 'var(--text-invert-muted)', fontSize: '0.86rem', marginTop: 14 }}>每一战，皆为城市之名；每一场，尽显南粤之勇。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 合作伙伴 ============ */}
      <section className="section section--tight">
        <div className="container" style={{ textAlign: 'center' }}>
          <Meander color="#d9cfbf" style={{ marginBottom: 28 }} />
          <div className="sec-head__eyebrow" style={{ justifyContent: 'center', marginBottom: 20 }}>
            {t('about.partner')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 36, color: 'var(--text-faint)', fontWeight: 800, letterSpacing: 2, fontSize: '1.05rem' }}>
            {PARTNERS.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
          <Meander color="#d9cfbf" style={{ marginTop: 28 }} />
        </div>
      </section>
    </>
  )
}
