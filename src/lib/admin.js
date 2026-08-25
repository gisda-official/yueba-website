/* --------------------------------------------------------------------------
   管理员鉴权 —— 客户端演示用。
   注意：纯前端静态站，密码会打包进 JS 源码，仅作演示门槛，不构成真正的
   安全隔离。真实发布请走服务端鉴权或 GitHub 协作（导出代码）流程。
   -------------------------------------------------------------------------- */
const AUTH_KEY = 'yueba-admin-auth'

export const ADMIN_PASSWORD = 'yueba2026'

export function isAdmin() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1'
  } catch {
    return false
  }
}

export function loginAdmin(pwd) {
  if (pwd === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem(AUTH_KEY, '1')
    } catch {
      /* ignore */
    }
    return true
  }
  return false
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(AUTH_KEY)
  } catch {
    /* ignore */
  }
}
