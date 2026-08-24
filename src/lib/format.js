/* 通用格式化工具 */

// 数字千分位
export const fmtNum = (n) => {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-US')
}

// 保留一位小数的场均数据
export const avg = (total, games) => {
  if (!games) return 0
  return +(total / games).toFixed(1)
}

// 日期格式化：ISO -> '3月21日'
export const fmtDateZh = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

// 日期格式化：ISO -> 'Mar 21'
export const fmtDateEn = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// 星期
export const weekdayZh = (iso) => {
  const d = new Date(iso)
  const map = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return map[d.getDay()]
}

// 身高 cm -> 中文 '1.98 米'
export const fmtHeight = (cm, lang = 'zh') => {
  if (!cm) return '—'
  const m = (cm / 100).toFixed(2)
  return lang === 'zh' ? `${m} 米` : `${(cm * 0.3937).toFixed(0)} in`
}

// 位置缩写 -> 全称
export const posFull = (pos, lang = 'zh') => {
  const map = {
    zh: { PG: '控球后卫', SG: '得分后卫', SF: '小前锋', PF: '大前锋', C: '中锋', G: '后卫', F: '前锋', 'G/F': '锋卫摇摆人', 'F/C': '锋线中锋' },
    en: { PG: 'Point Guard', SG: 'Shooting Guard', SF: 'Small Forward', PF: 'Power Forward', C: 'Center', G: 'Guard', F: 'Forward', 'G/F': 'Guard/Forward', 'F/C': 'Forward/Center' },
  }
  return map[lang]?.[pos] ?? pos
}

// 取色亮度，用于判断深色
export const isDark = (hex) => {
  if (!hex) return false
  const c = hex.replace('#', '')
  if (c.length !== 6) return false
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 140
}
