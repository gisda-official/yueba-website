/* 球队队徽 —— 队色渐变圆形 + 城市简称字 */
export default function TeamCrest({ team, size = 44, style }) {
  const bg = `linear-gradient(135deg, ${team.color}, ${team.colorDark})`
  return (
    <span
      className="team-crest"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        background: bg,
        ...style,
      }}
      title={team.name}
    >
      <span className="team-crest__char">{team.abbr}</span>
    </span>
  )
}
