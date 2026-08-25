/* 粤BA 品牌 Logo —— 官方 logo 图（透明 PNG） */
export default function Logo({ size = 40, showText, dark, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      <img
        src="images/logo.png"
        alt="粤BA · 广东省城市篮球联赛"
        style={{ height: size, width: 'auto', display: 'block' }}
      />
    </span>
  )
}
