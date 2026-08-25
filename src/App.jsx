import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// 懒加载 + 代码分割
const Home = lazy(() => import('./pages/Home.jsx'))
const News = lazy(() => import('./pages/News.jsx'))
const NewsDetail = lazy(() => import('./pages/NewsDetail.jsx'))
const Schedule = lazy(() => import('./pages/Schedule.jsx'))
const Standings = lazy(() => import('./pages/Standings.jsx'))
const Teams = lazy(() => import('./pages/Teams.jsx'))
const TeamDetail = lazy(() => import('./pages/TeamDetail.jsx'))
const Players = lazy(() => import('./pages/Players.jsx'))
const PlayerDetail = lazy(() => import('./pages/PlayerDetail.jsx'))
const Stats = lazy(() => import('./pages/Stats.jsx'))
const Tickets = lazy(() => import('./pages/Tickets.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function PageFallback() {
  return (
    <div style={{ padding: '96px 0', textAlign: 'center' }}>
      <div className="spinner" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
