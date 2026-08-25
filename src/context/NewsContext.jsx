import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import STATIC_NEWS from '../data/news.js'

/* --------------------------------------------------------------------------
   资讯上下文 —— 静态资讯（src/data/news.js）+ 管理员本地草稿（localStorage）合并，
   让管理员在后台创建的资讯即时反映到首页 / 资讯中心 / 详情页。
   草稿仅保存在当前浏览器；要全网可见需「导出代码」并入 src/data/news.js。
   -------------------------------------------------------------------------- */
const DRAFT_KEY = 'yueba-admin-news'

function readDrafts() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function writeDrafts(arr) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(arr))
  } catch {
    /* ignore */
  }
}

const NewsContext = createContext(null)

export function NewsProvider({ children }) {
  const [drafts, setDrafts] = useState(readDrafts)

  // 草稿置顶（最新在前），静态资讯紧随其后
  const news = useMemo(() => [...drafts, ...STATIC_NEWS], [drafts])

  const addNews = useCallback((item) => {
    setDrafts((prev) => {
      const next = [item, ...prev]
      writeDrafts(next)
      return next
    })
  }, [])

  const removeNews = useCallback((id) => {
    setDrafts((prev) => {
      const next = prev.filter((n) => n.id !== id)
      writeDrafts(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ news, drafts, addNews, removeNews }),
    [news, drafts, addNews, removeNews]
  )

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export function useNews() {
  const ctx = useContext(NewsContext)
  if (!ctx) throw new Error('useNews must be used within NewsProvider')
  return ctx
}
