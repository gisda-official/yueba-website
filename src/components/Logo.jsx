/* 粤BA 品牌 Logo —— 篮球 + 木棉花瓣 + 「粤」字 */
export default function Logo({ size = 40, showText = true, dark = false, ...props }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, ...props.style }}>
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d4123a" />
            <stop offset="1" stopColor="#8e0b1e" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="15" fill="url(#lg-bg)" />
        <circle cx="32" cy="32" r="19" fill="none" stroke="#e8b64c" strokeWidth="2.2" />
        <path
          d="M32 32 L32 16 M32 32 L44 24 M32 32 L20 24 M32 32 L32 48"
          stroke="#e8b64c"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <text
          x="32"
          y="27"
          fontFamily="PingFang SC, Microsoft YaHei, sans-serif"
          fontSize="12"
          fontWeight="900"
          fill="#fff"
          textAnchor="middle"
        >
          粤
        </text>
      </svg>
      {showText && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.12 }}>
          <strong
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: 3,
              color: dark ? '#fff' : '#fff',
            }}
          >
            粤BA
          </strong>
          <span
            style={{
              fontSize: '0.56rem',
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            YueBA
          </span>
        </span>
      )}
    </span>
  )
}
