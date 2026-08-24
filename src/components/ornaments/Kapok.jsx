/* 木棉花（英雄花）—— 广州市花，五瓣红花，岭南精神象征 */
export default function Kapok({ size = 64, color = '#c8102e', stamen = '#e2b44a', style, ...props }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {petals.map((r) => (
        <path
          key={r}
          d="M50 50 C 46 30, 44 16, 50 4 C 56 16, 54 30, 50 50 Z"
          fill={color}
          transform={`rotate(${r} 50 50)`}
        />
      ))}
      {/* 花蕊 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r, i) => (
        <line
          key={r}
          x1="50"
          y1="50"
          x2="50"
          y2={i % 2 ? 34 : 28}
          stroke={stamen}
          strokeWidth="2.4"
          strokeLinecap="round"
          transform={`rotate(${r} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill={stamen} />
    </svg>
  )
}
