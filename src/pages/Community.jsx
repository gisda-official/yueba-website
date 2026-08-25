import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import players, { getPlayer } from '../data/players.js'
import { getTeam } from '../data/teams.js'
import { leaderboard } from '../lib/stats.js'
import { fmtNum } from '../lib/format.js'
import SectionHeader from '../components/SectionHeader.jsx'
import Kapok from '../components/ornaments/Kapok.jsx'
import Meander from '../components/ornaments/Meander.jsx'

/* 全明星票选：最多可投 5 票 */
const MAX_PICKS = 5

/* 胜负竞猜：焦点对阵（主胜 = home，客胜 = away） */
const PREDICTIONS = [
  {
    id: 'asg',
    title: '全明星正赛',
    home: '东区全明星',
    away: '西区全明星',
    homeColor: '#c8102e',
    awayColor: '#2f6b5b',
    baseHomePct: 54,
    venue: '东莞长安体育公园体育馆',
    time: '9月12日 19:30',
  },
  {
    id: 'gba',
    title: '粤港澳邀请赛',
    home: '粤BA明星队',
    away: '香港队',
    homeColor: '#c8102e',
    awayColor: '#b8862b',
    baseHomePct: 67,
    venue: '东莞长安体育公园体育馆',
    time: '9月13日 15:00',
  },
  {
    id: 'macau',
    title: '大湾区友谊赛',
    home: '香港队',
    away: '澳门队',
    homeColor: '#b8862b',
    awayColor: '#2e7ab0',
    baseHomePct: 48,
    venue: '东莞长安体育公园体育馆',
    time: '9月13日 19:00',
  },
]

/* 球迷评论：初始示例（真实感中文评论） */
const INITIAL_COMMENTS = [
  { id: 1, name: '阿伟仔', city: '广州', time: '2小时前', content: '东区全明星必胜！黎伊扬今年状态太炸了，助攻榜稳居前列，现场见！', likes: 128 },
  { id: 2, name: '篮球老炮儿', city: '肇庆', time: '5小时前', content: '刘曙萌这数据不拿MVP都说不过去，场均25分+13篮板，西区就看他的。', likes: 96 },
  { id: 3, name: '惠州小鱼', city: '惠州', time: '1天前', content: '主场氛围绝了，今年必须去东莞看全明星，罗浮山下约起来！', likes: 74 },
  { id: 4, name: '深漂青年', city: '深圳', time: '1天前', content: '周泽源总决赛两场30+，全明星肯定首发，第一个票就投他。', likes: 65 },
  { id: 5, name: '木棉花开', city: '广州', time: '2天前', content: '已投！坐等9月12号开票，木棉树下等一场全明星，粤战粤勇！', likes: 41 },
]

/* 确定性的初始票数（由 ppg 与球员 id 推导，保证每次渲染一致） */
function seedVotes(rows) {
  const votes = {}
  rows.forEach(({ player: p }) => {
    const code = p.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    votes[p.id] = 12000 + Math.round(p.stats.ppg * 800) + (code % 1200)
  })
  return votes
}

export default function Community() {
  const { t } = useI18n()

  const [active, setActive] = useState('vote')

  // 全明星票选
  const [votes, setVotes] = useState(() => seedVotes(leaderboard(players, 'ppg', 12)))
  const [myPicks, setMyPicks] = useState([])
  const [voted, setVoted] = useState(false)

  // 胜负竞猜
  const [predChoices, setPredChoices] = useState({})

  // 球迷评论
  const [comments, setComments] = useState(INITIAL_COMMENTS)
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')

  /* 全明星票选：按场均得分取前 12 名候选人 */
  const voteRows = useMemo(() => leaderboard(players, 'ppg', 12), [])

  /* 实时票数榜 TOP 5 */
  const topVoters = useMemo(() => {
    return [...voteRows]
      .sort((a, b) => (votes[b.player.id] || 0) - (votes[a.player.id] || 0))
      .slice(0, 5)
  }, [voteRows, votes])
  const maxVotes = topVoters.length ? votes[topVoters[0].player.id] || 1 : 1

  const togglePick = (id) => {
    if (voted) return
    setMyPicks((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_PICKS) return prev
      return [...prev, id]
    })
  }

  const submitVote = () => {
    if (myPicks.length === 0 || voted) return
    setVotes((prev) => {
      const next = { ...prev }
      myPicks.forEach((id) => {
        next[id] = (next[id] || 0) + 1
      })
      return next
    })
    setVoted(true)
  }

  const resetVote = () => {
    if (!voted) return
    setVotes((prev) => {
      const next = { ...prev }
      myPicks.forEach((id) => {
        next[id] = Math.max(0, (next[id] || 0) - 1)
      })
      return next
    })
    setMyPicks([])
    setVoted(false)
  }

  const choose = (id, side) => {
    setPredChoices((prev) => ({ ...prev, [id]: prev[id] === side ? null : side }))
  }

  const like = (id) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)))
  }

  const submitComment = () => {
    const content = commentText.trim()
    if (!content) return
    const nextId = comments.length ? Math.max(...comments.map((c) => c.id)) + 1 : 1
    const newComment = {
      id: nextId,
      name: commentName.trim() || '匿名球迷',
      city: '粤BA球迷',
      time: '刚刚',
      content,
      likes: 0,
    }
    setComments((prev) => [newComment, ...prev])
    setCommentText('')
  }

  const TABS = [
    { key: 'vote', label: t('community.vote') },
    { key: 'predict', label: t('community.predict') },
    { key: 'comment', label: '球迷评论' },
  ]

  return (
    <>
      {/* ============ 头部 + Tabs ============ */}
      <section className="section section--crimson" style={{ position: 'relative', overflow: 'hidden' }}>
        <Kapok size={360} color="#fff" style={{ position: 'absolute', right: -60, top: -40, opacity: 0.1 }} />
        <Kapok size={220} color="#fff" style={{ position: 'absolute', left: -30, bottom: -30, opacity: 0.07 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-head__eyebrow" style={{ color: 'var(--gold)' }}>
            <span style={{ width: 26, height: 3, background: 'var(--gold)', borderRadius: 2, display: 'inline-block' }} />
            COMMUNITY · {t('brand.slogan')}
          </div>
          <h1 className="title-1" style={{ fontSize: '2.4rem', color: '#fff' }}>
            {t('nav.community')}
          </h1>
          <p className="lead" style={{ color: 'var(--text-invert-muted)', maxWidth: 640, marginTop: 10 }}>
            票选你心中的全明星、竞猜焦点之战、与万千球迷同场互动。你的每一次参与，都在为岭南篮球添一把火。
          </p>
          <div className="tabs" style={{ marginTop: 28, background: 'rgba(255,255,255,0.1)' }}>
            {TABS.map((tb) => (
              <button
                key={tb.key}
                className={`tab ${active === tb.key ? 'tab--active' : ''}`}
                onClick={() => setActive(tb.key)}
                style={
                  active === tb.key
                    ? { background: 'var(--gold)', color: 'var(--ink)' }
                    : { color: 'rgba(255,255,255,0.82)' }
                }
              >
                {tb.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 内容区 ============ */}
      <section className="section">
        <div className="container">
          {/* ---------- 全明星票选 ---------- */}
          {active === 'vote' && (
            <>
              <SectionHeader eyebrow="ALL-STAR VOTING" title={t('community.vote')} en="Pick Your Starting Five" />

              {voted && (
                <div className="card" style={{ borderColor: 'var(--gold)', background: 'var(--gold-soft)', marginBottom: 24 }}>
                  <div className="card__body" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span className="badge badge--gold">✓ 已投票</span>
                    <span style={{ fontSize: '0.9rem' }}>
                      投票成功！你为 {myPicks.map((id) => getPlayer(id)?.name).join('、')} 投出了宝贵的一票。
                    </span>
                    <button className="btn btn--sm btn--ghost" style={{ marginLeft: 'auto' }} onClick={resetVote}>
                      重新投票
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-2" style={{ alignItems: 'start' }}>
                {/* 实时票数榜 */}
                <div className="card">
                  <div className="card__body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <h3 style={{ fontSize: '1rem' }}>实时票数榜 · TOP 5</h3>
                      <span className="badge badge--live">LIVE</span>
                    </div>
                    {topVoters.map(({ player: p }, i) => {
                      const v = votes[p.id] || 0
                      const pct = maxVotes > 0 ? Math.round((v / maxVotes) * 100) : 0
                      return (
                        <div className="statbar" key={p.id} style={{ marginBottom: 12 }}>
                          <span className="statbar__label">
                            {i + 1}. {p.name}
                          </span>
                          <div className="statbar__track">
                            <div className="statbar__fill" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="statbar__val">{fmtNum(v)}</span>
                        </div>
                      )
                    })}
                    <p className="text-faint" style={{ fontSize: '0.76rem', marginTop: 10 }}>
                      票数实时更新，快去为你支持的球星助力。
                    </p>
                  </div>
                </div>

                {/* 规则 + 提交 */}
                <div>
                  <div className="card card--dark">
                    <div className="card__body">
                      <h3 style={{ fontSize: '1rem', color: '#fff' }}>投票规则</h3>
                      <ul style={{ fontSize: '0.86rem', color: 'var(--text-invert-muted)', marginTop: 10, lineHeight: 2 }}>
                        <li>· 每位球迷最多投出 {MAX_PICKS} 票</li>
                        <li>· 票数前 10 名入选全明星首发</li>
                        <li>· 投票截止：9 月 8 日 24:00</li>
                      </ul>
                      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-invert-muted)', fontSize: '0.85rem' }}>
                          已选 {myPicks.length}/{MAX_PICKS}
                        </span>
                        <button
                          className="btn btn--gold btn--sm"
                          disabled={myPicks.length === 0 || voted}
                          onClick={submitVote}
                          style={myPicks.length === 0 || voted ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                        >
                          {voted ? '已投票' : '提交投票'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="culture-quote" style={{ marginTop: 16 }}>
                    「木棉花开，英雄本色」—— 为你城市的球星投上一票。
                  </p>
                </div>
              </div>

              {/* 候选球员投票卡 */}
              <div className="grid grid-auto" style={{ marginTop: 32 }}>
                {voteRows.map(({ player: p }) => {
                  const tm = getTeam(p.teamId)
                  const selected = myPicks.includes(p.id)
                  return (
                    <div
                      key={p.id}
                      className={`card ${selected ? '' : 'card--hover'}`}
                      style={selected ? { borderColor: 'var(--crimson)', boxShadow: '0 0 0 3px var(--crimson-tint)' } : undefined}
                    >
                      <div className="card__body" style={{ textAlign: 'center', position: 'relative' }}>
                        {selected && (
                          <span className="badge badge--crimson" style={{ position: 'absolute', top: 10, right: 10 }}>
                            已选
                          </span>
                        )}
                        <div
                          className="player-avatar"
                          style={{ background: `linear-gradient(135deg, ${tm.color}, ${tm.colorDark})`, margin: '0 auto 10px' }}
                        >
                          {p.name[0]}
                        </div>
                        <div className="player-card__name" style={{ fontSize: '1.05rem' }}>
                          {p.name}
                        </div>
                        <div className="player-card__pos">
                          {tm.name} · {p.pos}
                        </div>
                        <div style={{ margin: '10px 0 4px' }}>
                          <b className="num" style={{ fontSize: '1.4rem', color: 'var(--crimson)' }}>
                            {p.stats.ppg}
                          </b>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginLeft: 4 }}>{t('players.ppg')}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                          {fmtNum(votes[p.id] || 0)} 票
                        </div>
                        <button
                          className={`btn btn--sm btn--block ${selected ? 'btn--ghost' : 'btn--primary'}`}
                          disabled={voted}
                          onClick={() => togglePick(p.id)}
                          style={voted ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                        >
                          {selected ? '取消选择' : '投票'}
                        </button>
                        <Link to={`/players/${p.id}`} className="text-faint" style={{ fontSize: '0.74rem', display: 'inline-block', marginTop: 10 }}>
                          查看球员 →
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* ---------- 胜负竞猜 ---------- */}
          {active === 'predict' && (
            <>
              <SectionHeader eyebrow="PREDICTIONS" title={t('community.predict')} en="Who Takes the Win?" />
              <p className="lead" style={{ marginTop: -20, marginBottom: 28 }}>
                全明星周末三场焦点对决，猜中即有机会赢取官方周边。选择「主胜」或「客胜」，看看你与大多数球迷的判断是否一致。
              </p>
              <div className="grid grid-3">
                {PREDICTIONS.map((pred) => {
                  const choice = predChoices[pred.id]
                  const homePct = pred.baseHomePct
                  const awayPct = 100 - homePct
                  return (
                    <div className="card" key={pred.id}>
                      <div className="card__body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                          <span className="badge badge--crimson-soft">{pred.title}</span>
                          <span className="text-faint" style={{ fontSize: '0.76rem' }}>
                            {pred.time}
                          </span>
                        </div>
                        <div className="scoreline" style={{ padding: 0, marginBottom: 10 }}>
                          <span className="scoreline__team">
                            <span className="scoreline__name">{pred.home}</span>
                          </span>
                          <span className="scoreline__vs">VS</span>
                          <span className="scoreline__team scoreline__team--away">
                            <span className="scoreline__name">{pred.away}</span>
                          </span>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-faint)', marginBottom: 14 }}>{pred.venue}</div>

                        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                          <button
                            className={`btn btn--sm btn--block ${choice === 'home' ? 'btn--primary' : 'btn--ghost'}`}
                            onClick={() => choose(pred.id, 'home')}
                          >
                            主胜
                          </button>
                          <button
                            className={`btn btn--sm btn--block ${choice === 'away' ? 'btn--primary' : 'btn--ghost'}`}
                            onClick={() => choose(pred.id, 'away')}
                          >
                            客胜
                          </button>
                        </div>

                        <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: 'var(--paper-soft)' }}>
                          <div
                            style={{
                              width: `${homePct}%`,
                              background: pred.homeColor,
                              transition: 'opacity 0.3s',
                              opacity: choice && choice !== 'home' ? 0.35 : 1,
                            }}
                          />
                          <div style={{ flex: 1, background: pred.awayColor, transition: 'opacity 0.3s', opacity: choice && choice !== 'away' ? 0.35 : 1 }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.8rem' }}>
                          <span className="text-muted">
                            主胜 <b className="num">{homePct}%</b>
                          </span>
                          <span className="text-muted">
                            <b className="num">{awayPct}%</b> 客胜
                          </span>
                        </div>

                        {choice && (
                          <div className="badge badge--jade" style={{ marginTop: 12 }}>
                            你已预测：{choice === 'home' ? '主胜' : '客胜'}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* ---------- 球迷评论 ---------- */}
          {active === 'comment' && (
            <>
              <SectionHeader eyebrow="FAN COMMENTS" title="球迷评论" en="Join the Conversation" />
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'start' }}>
                <div>
                  {comments.map((c) => (
                    <div className="card" key={c.id} style={{ marginBottom: 14 }}>
                      <div className="card__body">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            className="player-avatar"
                            style={{ width: 40, height: 40, fontSize: '0.9rem', background: 'linear-gradient(135deg, var(--crimson), var(--crimson-deep))' }}
                          >
                            {c.name[0]}
                          </span>
                          <div>
                            <div style={{ fontWeight: 700 }}>
                              {c.name}{' '}
                              <span className="text-faint" style={{ fontWeight: 400, fontSize: '0.76rem' }}>
                                · {c.city}
                              </span>
                            </div>
                            <div className="text-faint" style={{ fontSize: '0.72rem' }}>
                              {c.time}
                            </div>
                          </div>
                          <button
                            onClick={() => like(c.id)}
                            style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          >
                            赞 {c.likes}
                          </button>
                        </div>
                        <p style={{ marginTop: 10, fontSize: '0.92rem', lineHeight: 1.7 }}>{c.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card" style={{ position: 'sticky', top: 88 }}>
                  <div className="card__body">
                    <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>发表评论</h3>
                    <div className="field">
                      <label>昵称</label>
                      <input
                        className="input"
                        placeholder="你的昵称"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>评论内容</label>
                      <textarea
                        className="input"
                        rows={4}
                        placeholder="说说你对比赛和球队的看法…"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        style={{ resize: 'vertical', minHeight: 96, fontFamily: 'inherit' }}
                      />
                    </div>
                    <button className="btn btn--primary btn--block" onClick={submitComment}>
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ 回纹收尾 ============ */}
      <section className="section--tight">
        <div className="container" style={{ textAlign: 'center' }}>
          <Meander color="#d9cfbf" />
          <p className="text-faint" style={{ fontSize: '0.78rem', marginTop: 16, letterSpacing: 2 }}>
            粤战粤勇 · 一战城名
          </p>
        </div>
      </section>
    </>
  )
}
