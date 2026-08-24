/* 回纹（云雷纹）—— 中国传统吉祥纹样，用作细装饰边 */
export default function Meander({ color = 'currentColor', height = 14, style, ...props }) {
  return (
    <svg
      viewBox="0 0 400 20"
      width="100%"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', ...style }}
      aria-hidden="true"
      {...props}
    >
      <pattern id="meander" width="40" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M2 18 V6 H12 V14 H30 V6 H38"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </pattern>
      <rect width="400" height="20" fill="url(#meander)" />
    </svg>
  )
}
