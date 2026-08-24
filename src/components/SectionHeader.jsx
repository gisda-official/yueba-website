import { Link } from 'react-router-dom'

/* 区块标题：眉题 + 主标题 + 英文副标题 + 「更多」链接 */
export default function SectionHeader({ eyebrow, title, en, more, moreTo }) {
  return (
    <div className="sec-head">
      <div className="sec-head__title-wrap">
        {eyebrow && <span className="sec-head__eyebrow">{eyebrow}</span>}
        <h2 className="sec-head__title">
          {title}
          {en && <span className="en">{en}</span>}
        </h2>
      </div>
      {more && (
        moreTo ? (
          <Link to={moreTo} className="sec-head__more">
            {more} <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="sec-head__more">{more}</span>
        )
      )}
    </div>
  )
}
