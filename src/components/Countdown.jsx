import { useEffect, useState } from 'react'

/* 倒计时组件 */
function diff(target) {
  const now = Date.now()
  const t = new Date(target).getTime() - now
  if (t <= 0) return null
  return {
    d: Math.floor(t / 86400000),
    h: Math.floor((t % 86400000) / 3600000),
    m: Math.floor((t % 3600000) / 60000),
    s: Math.floor((t % 60000) / 1000),
  }
}

export default function Countdown({ target, labels = ['天', '时', '分', '秒'] }) {
  const [left, setLeft] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!left) {
    return (
      <div className="countdown">
        <div className="countdown__unit">
          <div className="countdown__num">—</div>
          <div className="countdown__label">{labels[0]}</div>
        </div>
      </div>
    )
  }

  const units = [
    [left.d, labels[0]],
    [left.h, labels[1]],
    [left.m, labels[2]],
    [left.s, labels[3]],
  ]

  return (
    <div className="countdown">
      {units.map(([n, label], i) => (
        <div className="countdown__unit" key={i}>
          <div className="countdown__num">{String(n).padStart(2, '0')}</div>
          <div className="countdown__label">{label}</div>
        </div>
      ))}
    </div>
  )
}
