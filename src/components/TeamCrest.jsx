import { useState } from 'react'

/* 球队队徽 —— 优先使用队徽图片；加载失败时回退到队色圆形 + 简称 */
export default function TeamCrest({ team, size = 44, style }) {
  const [err, setErr] = useState(false)

  if (err) {
    return (
      <span
        className="team-crest"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.5,
          background: `linear-gradient(135deg, ${team.color}, ${team.colorDark})`,
          ...style,
        }}
        title={team.name}
      >
        <span className="team-crest__char">{team.abbr}</span>
      </span>
    )
  }

  return (
    <img
      src={`crests/${team.id}.png`}
      alt={team.name}
      title={team.name}
      loading="lazy"
      onError={() => setErr(true)}
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0, ...style }}
    />
  )
}
