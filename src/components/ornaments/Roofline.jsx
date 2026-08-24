/* 镬耳墙 —— 岭南传统建筑山墙，形似「镬耳」（锅耳），重复排列成装饰带 */
export default function Roofline({ color = 'currentColor', height = 40, style, ...props }) {
  const gable = (
    <path
      d="M0 36 C0 36 8 30 14 18 C18 10 16 4 20 2 C22 10 22 20 24 26 C26 20 26 10 28 2 C32 4 30 10 34 18 C40 30 48 36 48 36 Z"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
  )
  return (
    <svg
      viewBox="0 0 240 40"
      width="100%"
      height={height}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', ...style }}
      aria-hidden="true"
      {...props}
    >
      <line x1="0" y1="38" x2="240" y2="38" stroke={color} strokeWidth="2" />
      {[0, 48, 96, 144, 192].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          {gable}
        </g>
      ))}
    </svg>
  )
}
