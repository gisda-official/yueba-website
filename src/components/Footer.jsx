import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext.jsx'
import Logo from './Logo.jsx'
import Roofline from './ornaments/Roofline.jsx'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div style={{ background: 'transparent', color: 'rgba(255,255,255,0.14)' }}>
        <Roofline height={34} />
      </div>
      <div className="container">
        <div className="footer__main">
          <div>
            <Logo size={40} />
            <p className="footer__brand-desc">
              粤BA（广东省城市篮球联赛）是广东省篮球协会主办、全省 21 个地级市参与的群众篮球赛事。
              前身为 2015 年创立的广东省男子篮球联赛，以「一战城名，粤战粤勇」为口号，让篮球回归城市与群众。
            </p>
          </div>

          <div className="footer__col">
            <h4>{t('footer.links')}</h4>
            <Link to="/schedule">赛程</Link>
            <Link to="/standings">积分榜</Link>
            <Link to="/teams">球队</Link>
            <Link to="/stats">数据看板</Link>
            <Link to="/tickets">票务</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.about')}</h4>
            <Link to="/about">联赛介绍</Link>
            <Link to="/news">资讯中心</Link>
            <Link to="/community">互动社区</Link>
            <Link to="/players">球员名册</Link>
          </div>

          <div className="footer__col">
            <h4>{t('footer.contact')}</h4>
            <a>微信公众号：广东篮球-粤BA</a>
            <a>主办：广东省篮球协会</a>
            <a>邮箱：contact@yueba.cn</a>
            <a>地址：广东省广州市天河区</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 {t('footer.copyright')}</span>
          <span>{t('footer.disclaimer')}</span>
        </div>
      </div>
    </footer>
  )
}
