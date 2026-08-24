/* 满洲窗 —— 岭南彩色玻璃窗，几何格栅 + 多色玻璃，用作装饰面板 */
const GLASS = ['#c8102e', '#2f6b5b', '#e2b44a', '#2e7ab0', '#b8862b', '#8e0b1e']

export default function ManchuriaWindow({ size = 120, style, ...props }) {
  const cells = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={6 + c * 27}
          y={6 + r * 27}
          width="24"
          height="24"
          rx="3"
          fill={GLASS[(r * 4 + c) % GLASS.length]}
          opacity="0.82"
        />
      )
    }
  }
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={style} aria-hidden="true" {...props}>
      <rect x="1" y="1" width="118" height="118" rx="8" fill="#1c1c21" />
      {cells}
      <rect x="4" y="4" width="112" height="112" rx="6" fill="none" stroke="#e2b44a" strokeWidth="1.5" />
    </svg>
  )
}
