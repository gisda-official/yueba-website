import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

/* 可复用 ECharts 容器 —— 自动初始化、更新与自适应缩放 */
export default function EChart({ option, height = 340, className = '', dark = false }) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current, dark ? 'dark' : undefined)
    chartRef.current = chart

    const ro = new ResizeObserver(() => chart.resize())
    ro.observe(ref.current)

    return () => {
      ro.disconnect()
      chart.dispose()
      chartRef.current = null
    }
  }, [dark])

  useEffect(() => {
    if (chartRef.current && option) chartRef.current.setOption(option, true)
  }, [option])

  return <div ref={ref} className={`chart ${className}`} style={{ height }} />
}
