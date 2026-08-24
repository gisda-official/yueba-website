/* ==========================================================================
   粤BA · 资讯中心内容
   category: league 联赛新闻 / team 球队动态 / media 媒体聚焦 / gallery 图集视频 / notice 公告
   ========================================================================== */

const news = [
  {
    id: 'finals-champion',
    title: '东莞，粤BA 总冠军！主场 108:73 大胜深圳，周泽源荣膺总决赛 MVP',
    titleEn: 'Dongguan wins the inaugural YueBA title, sweeping Shenzhen 2-0',
    category: 'league',
    date: '2026-08-02',
    image: 'images/arena-1.jpg',
    pinned: true,
    summary:
      '8 月 1 日晚，东莞篮球中心座无虚席。东莞队主场 108:73 击败深圳队，以总比分 2:0 问鼎首届粤BA 总冠军，延续了这座「全国篮球城市」的荣耀。',
    tags: ['总决赛', '东莞', '深圳', '周泽源'],
    body: [
      '8 月 1 日晚，东莞篮球中心灯火通明，上万名球迷见证了一场属于篮球之城的加冕。东莞队在总决赛第二回合中以 108:73 大胜深圳队，加上首回合客场 79:70 的胜利，以总比分 2:0 问鼎 2026 年李宁·广东省城市篮球联赛（粤BA）总冠军。',
      '内线核心周泽源凭借两回合统治级的发挥，荣膺首届粤BA 总决赛最有价值球员（MVP）。赛后，主场球迷高唱粤韵童谣，用最岭南的方式为冠军庆祝。',
      '从揭幕战到总决赛，东莞队主场七战全胜，场均净胜对手 20 分以上，展现了「全国篮球城市」的深厚底蕴。这座城市用一座总冠军奖杯，续写了属于自己的篮球传奇。',
    ],
  },
  {
    id: 'allstar-announce',
    title: '9 月 12-13 日，粤BA 全明星赛暨粤港澳篮球邀请赛将在东莞长安打响',
    titleEn: 'YueBA All-Star Game & GBA Invitational set for Sep 12-13 in Dongguan',
    category: 'notice',
    date: '2026-08-15',
    image: 'images/action-1.jpg',
    pinned: true,
    summary:
      '粤BA 全明星赛将于 9 月 12 日至 13 日在东莞长安体育公园体育馆举办，东、西区全明星队将与香港队、澳门队同台角逐。全明星票选于 8 月 26 日至 28 日进行。',
    tags: ['全明星赛', '粤港澳', '东莞', '票选'],
    body: [
      '2026 年 9 月 12 日至 13 日，粤BA 全明星赛暨粤港澳篮球邀请赛将在东莞长安体育公园体育馆激情上演。粤BA 东区全明星队、西区全明星队，将与香港队、澳门队展开交叉淘汰排位赛，争夺邀请赛冠军。',
      '全明星赛期间还将举办技巧挑战赛、三分球大赛、扣篮大赛等单项赛，为球迷呈现一场集竞技与娱乐于一体的篮球盛宴。',
      '全明星票选将于 8 月 26 日至 28 日在官方平台进行，广大球迷可为自己喜爱的球员投上宝贵一票。',
    ],
  },
  {
    id: 'opening-night',
    title: '揭幕战 86:83！中山队客场绝杀广州，打响粤BA 第一枪',
    titleEn: 'Zhongshan stuns Guangzhou 86-83 in season opener',
    category: 'league',
    date: '2026-03-22',
    image: 'images/action-4.jpg',
    pinned: false,
    summary:
      '3 月 21 日，2026 年粤BA 在广州天河体育中心体育馆揭幕。中山队客场 86:83 险胜广州队，李文博末节关键三分锁定胜局，为联赛写下戏剧性开局。',
    tags: ['揭幕战', '广州', '中山', '天河体育中心'],
    body: [
      '3 月 21 日晚，广州天河体育中心体育馆气氛热烈，2026 年广东省城市篮球联赛（粤BA）在这里盛大揭幕。揭幕战中，客场作战的中山队以 86:83 险胜东道主广州队。',
      '比赛最后时刻，中山队后卫李文博命中关键三分，帮助球队在客场完成绝杀。这场「开门红」也让中山队成为本届联赛第一支带走胜利的球队。',
      '揭幕战采取「预约摇号购票」模式，8.8 元与 18.8 元两档亲民票价，让普通市民也能走进场馆，感受群众篮球的魅力。',
    ],
  },
  {
    id: 'golden-nine-playin',
    title: '四场「黄金九分」扣人心弦！汕头、潮州、揭阳、佛山晋级八强',
    titleEn: 'Four "Golden 9" thrillers decide the last quarterfinal spots',
    category: 'league',
    date: '2026-07-06',
    image: 'images/ball-1.jpg',
    pinned: false,
    summary:
      '八强附加赛（12 进 8）四场比赛全部通过「黄金九分」决出胜负。汕头、潮州、揭阳、佛山分别在附加赛中涉险晋级，堪称联赛史上最刺激的一轮对决。',
    tags: ['黄金九分', '季后赛', '八强'],
    body: [
      '「黄金九分」——粤BA 独创的淘汰赛决胜赛制，在 2026 年八强附加赛中迎来集体爆发。四场附加赛全部战至「黄金九分」，汕头、潮州、揭阳、佛山各自以 9 分惊险晋级八强。',
      '所谓「黄金九分」，即两队主客场两回合总比分战平后，立即开启一场全新的附加赛：比分、犯规全部清零，不计时间，先得 9 分者胜。它被媒体称为「篮球界的点球大战」。',
      '这一夜，四座城市的命运被浓缩在 9 分之内，一次失误就可能改变整个系列赛的走向，悬念与观赏性拉满。',
    ],
  },
  {
    id: 'guangzhou-zero',
    title: '广州队 9:0 零封潮州！「黄金九分」再创经典，挺进四强',
    titleEn: 'Guangzhou blanks Chaozhou 9-0 in Golden 9 to reach semifinals',
    category: 'league',
    date: '2026-07-13',
    image: 'images/court-2.jpg',
    pinned: false,
    summary:
      '1/4 决赛第二回合，广州队与潮州队战至「黄金九分」，广州队以 9:0 零封对手，强势晋级四强，上演了「黄金九分」赛制下最酣畅淋漓的一场胜利。',
    tags: ['广州', '潮州', '黄金九分', '四强'],
    body: [
      '1/4 决赛第二回合，广州队主场迎战潮州队。两回合总比分战平后，比赛进入「黄金九分」。',
      '广州队展现出了惊人的专注与防守强度，在附加赛中连得 9 分，以 9:0 零封潮州队，用一场堪称教科书级别的胜利强势晋级四强。',
      '「黄金九分」赛制下，9:0 是极限级别的表现。广州队用行动诠释了羊城篮球的底蕴与魄力。',
    ],
  },
  {
    id: 'semifinal-sz-gz',
    title: '东区内战一触即发：深圳队两回合 2:0 淘汰广州，晋级总决赛',
    titleEn: 'Shenzhen eliminates Guangzhou 2-0 to book a finals date with Dongguan',
    category: 'league',
    date: '2026-07-20',
    image: 'images/action-3.jpg',
    pinned: false,
    summary:
      '半决赛中，深圳队以总比分 2:0 淘汰广州队，其中第二回合主场仅以 3 分优势险胜。深圳队与东莞队会师总决赛，上演「东区内战」。',
    tags: ['半决赛', '深圳', '广州', '总决赛'],
    body: [
      '半决赛第二回合，深圳队主场以 3 分优势险胜广州队，从而以总比分 2:0 淘汰对手，挺进总决赛。',
      '至此，2026 粤BA 总决赛对阵出炉：东莞队与深圳队上演「东区内战」。另一组半决赛中，东莞队淘汰中山队晋级。',
      '两支来自珠三角东岸的球队会师总决赛，也让这场巅峰对决充满了「同城德比」的宿命感。',
    ],
  },
  {
    id: 'dongguan-homecourt',
    title: '场均净胜 20+、七战全胜！东莞「最强主场」是如何炼成的',
    titleEn: 'Inside Dongguan\'s "strongest home court": 7-0 with a 20+ point margin',
    category: 'team',
    date: '2026-07-28',
    image: 'images/hoop-3.jpg',
    pinned: false,
    summary:
      '从粤韵童谣到爱国歌曲快闪，从华为、OPPO 到非遗醒狮，东莞队把「主场」打造成了城市文化的秀场。总决赛预约人数突破 12 万，一票难求。',
    tags: ['东莞', '主场', '非遗', '城市文化'],
    body: [
      '东莞队的「最强主场」不仅是胜负，更是一场城市文化的沉浸式体验。主场比赛中，洪梅小红花合唱团唱响粤韵童谣，爱国歌曲快闪点燃全场。',
      '华为、OPPO、VIVO 等「东莞制造」被搬上赛场抽奖，醒狮、鳌鱼、麒麟、千角灯、粤剧等非遗元素轮番登场，让每一次主场都成为岭南文化的巡礼。',
      '总决赛预约人数突破 12 万，一票难求。东莞人用行动证明：篮球，早已融入这座城市的血脉。',
    ],
  },
  {
    id: 'jersey-city',
    title: '季后赛各队身着城市特色球衣亮相：从恐龙骨架到生蚝菠萝',
    titleEn: 'Playoff teams debut city-themed jerseys, from dinosaurs to oysters',
    category: 'team',
    date: '2026-06-10',
    image: 'images/training-1.jpg',
    pinned: false,
    summary:
      '季后赛打响，各队身着融入城市特色的全新球衣亮相。河源把恐龙骨架、湛江把生蚝与菠萝、潮州把铁枝木偶等元素印上球衣，成为赛场最亮眼的风景。',
    tags: ['球衣', '城市特色', '季后赛', '文创'],
    body: [
      '2026 粤BA 季后赛打响，各队身着具有城市特色的全新球衣亮相赛场。',
      '河源队的球衣印上恐龙骨架，致敬「恐龙之乡」；湛江队把生蚝与菠萝搬上战袍；潮州队的铁枝木偶、汕头队的玩具、东莞队的潮玩机甲……21 座城市以球衣为画布，各展风采。',
      '这些充满巧思的设计，让粤BA 不仅是一场篮球赛，更成为一场广东城市文化的流动展。',
    ],
  },
  {
    id: 'scoring-leaders',
    title: '常规赛数据盘点：刘曙萌包揽得分王+篮板王，钟俊杰称雄助攻榜',
    titleEn: 'Regular-season stat wrap: Liu Shumeng leads scoring & rebounding',
    category: 'league',
    date: '2026-06-22',
    image: 'images/ball-2.jpg',
    pinned: false,
    summary:
      '常规赛落幕，肇庆队刘曙萌以场均 25.42 分、13 篮板包揽得分王与篮板王；佛山钟俊杰场均 8.5 次助攻、东莞刘康能场均 4.5 次抢断、云浮刘朔任场均 4 次盖帽分别领跑各项榜单。',
    tags: ['数据', '得分王', '篮板王', '常规赛'],
    body: [
      '2026 粤BA 常规赛落下帷幕，各项数据榜单尘埃落定。',
      '肇庆队刘曙萌以场均 25.42 分、13 篮板包揽得分王与篮板王，单场最高轰下 34 分；佛山队钟俊杰以场均 8.5 次助攻登顶助攻榜；东莞队刘康能场均 4.5 次抢断领跑抢断榜；云浮队刘朔任场均 4 次盖帽称雄盖帽榜。',
      '此外，河源队曾煜成在 4 月以场均 26.66 分当选月度得分王，惠州队朱浩源场均 12.9 篮板同样是内线猛将。',
    ],
  },
  {
    id: 'dufeng-president',
    title: '杜锋当选广东省篮球协会会长，为粤BA 注入专业力量',
    titleEn: 'Du Feng elected chairman of Guangdong Basketball Association',
    category: 'media',
    date: '2026-02-20',
    image: 'images/gym-2.jpg',
    pinned: false,
    summary:
      '前中国男篮、广东宏远功勋主教练杜锋当选广东省篮球协会会长。业内人士认为，这将为粤BA 等群众篮球赛事带来更专业的运营与更高的关注度。',
    tags: ['杜锋', '广东省篮协', '组织'],
    body: [
      '2026 年 2 月，前中国男篮、广东宏远功勋主教练杜锋当选广东省篮球协会会长。',
      '杜锋的加入，为粤BA 带来了专业的教练资源与更高的大众关注度。业内人士普遍认为，这将推动广东群众篮球向更专业化、规范化方向发展。',
      '「让篮球回归群众，让城市为篮球而战。」——这是粤BA 不变的初心。',
    ],
  },
  {
    id: 'golden-card',
    title: '粤BA 打造群众体育「金名片」：从「拖鞋球王」到全民赛事',
    titleEn: 'How YueBA became a golden card for grassroots sports',
    category: 'media',
    date: '2026-08-03',
    image: 'images/guangzhou-skyline.jpg',
    pinned: false,
    summary:
      '国家体育总局刊文关注粤BA。从「友谊第一、宵夜第二、比赛第三」的口号，到「拖鞋球王」的民间传说，粤BA 正成为群众体育的一张金色名片。',
    tags: ['群众体育', '国家体育总局', '品牌'],
    body: [
      '国家体育总局官网刊发文章，聚焦粤BA 如何打造群众体育的「金名片」。',
      '作为前身为 2015 年创立的广东省男子篮球联赛，粤BA 在 2019 年获评「国家体育产业示范项目」，2023 年入选国家体育总局首批群众「三大球」精品赛事案例。',
      '从「友谊第一、宵夜第二、比赛第三」的轻松口号，到「拖鞋球王」的民间传说，粤BA 让篮球真正回归群众、回归城市、回归生活。',
    ],
  },
  {
    id: 'mascot',
    title: '十五运会吉祥物「喜洋洋」「乐融融」返聘上岗，粤BA 萌力全开',
    titleEn: 'National Games mascots "Xiyangyang" & "Lerongrong" join YueBA',
    category: 'gallery',
    date: '2026-03-18',
    image: 'images/fitness-2.jpg',
    pinned: false,
    summary:
      '粤BA 邀请十五运会吉祥物「喜洋洋」「乐融融」返聘上岗，这对萌态可掬的吉祥物将贯穿整个赛季，成为赛场内外的「气氛担当」。',
    tags: ['吉祥物', '十五运会', 'IP'],
    body: [
      '2026 粤BA 赛季，十五运会吉祥物「喜洋洋」「乐融融」正式返聘上岗，担任联赛的「气氛担当」。',
      '这对以中华白海豚为原型的吉祥物，将在揭幕战、季后赛、全明星赛等场合亮相，与球迷互动，传递岭南文化的友好与热情。',
    ],
  },
  {
    id: 'liyiyang',
    title: '从河源到全国：2025 总决赛 MVP 黎伊扬的逆袭之路',
    titleEn: 'Li Yiyang: Heyuan\'s hometown hero and 2025 Finals MVP',
    category: 'team',
    date: '2026-03-10',
    image: 'images/court-1.jpg',
    pinned: false,
    summary:
      '2025 年，河源队在黎伊扬的带领下打破东莞队垄断夺冠。这位从万绿湖畔走出的控卫，用一场场硬仗书写了属于自己的逆袭故事。',
    tags: ['河源', '黎伊扬', 'MVP', '人物'],
    body: [
      '2025 年，河源队在总决赛中击败东莞队夺冠，控卫黎伊扬荣膺总决赛 MVP。',
      '这位从万绿湖畔走出的后卫，用犀利突破与精准组织，带领一支并非传统豪强的球队登顶，成为粤BA 最动人的逆袭故事。',
      '2026 赛季，黎伊扬继续征战，与新星曾煜成组成的后场双枪，让河源队始终保持着竞争力。',
    ],
  },
  {
    id: 'ticket-lottery',
    title: '关于 2026 粤BA 门票「预约摇号购票」模式的公告',
    titleEn: 'Notice on the reservation-lottery ticketing model',
    category: 'notice',
    date: '2026-03-15',
    image: 'images/hoop-1.jpg',
    pinned: false,
    summary:
      '为保障赛事安全与公平，2026 粤BA 采用「预约摇号购票」模式。观众通过官方渠道实名预约，摇号中签后凭有效证件购票入场。',
    tags: ['票务', '公告', '摇号'],
    body: [
      '为保障赛事安全、维护购票公平，2026 年粤BA 采用「预约摇号购票」模式。',
      '观众可通过官方微信公众号及合作平台进行实名预约，摇号中签后，凭本人有效证件在指定时间内完成购票。',
      '请广大球迷关注官方渠道发布的最新场次与票务信息，谨防非官方渠道的虚假票务。',
    ],
  },
  {
    id: 'season-kickoff',
    title: '一战城名，粤战粤勇！2026 粤BA 赛程正式公布',
    titleEn: '2026 YueBA schedule released under the slogan "One Battle, One City"',
    category: 'notice',
    date: '2026-03-01',
    image: 'images/shenzhen-skyline.jpg',
    pinned: false,
    summary:
      '2026 年李宁·广东省城市篮球联赛赛程正式公布。21 个地级市、378 名运动员，以珠江为界分东、西两大片区，全赛季共 125 场比赛。',
    tags: ['赛程', '公告', '揭幕'],
    body: [
      '2026 年李宁·广东省城市篮球联赛（粤BA）赛程正式公布。',
      '本届联赛由全省 21 个地级市组队参赛，378 名运动员年龄覆盖 16 至 40 岁，以珠江为界划分东、西两大片区，采用主客场赛制，全赛季共进行 125 场比赛。',
      '联赛口号「一战城名，粤战粤勇」，寓意每一位球员为城市而战、一战成名。',
    ],
  },
]

export default news

export const getNews = (id) => news.find((n) => n.id === id)
export const newsByCategory = (cat) => news.filter((n) => n.category === cat)

export const CATEGORY_META = {
  league: { zh: '联赛新闻', en: 'League News', color: '#c8102e' },
  team: { zh: '球队动态', en: 'Team News', color: '#2f6b5b' },
  media: { zh: '媒体聚焦', en: 'Media', color: '#b8862b' },
  gallery: { zh: '图集视频', en: 'Gallery', color: '#2e7ab0' },
  notice: { zh: '官方公告', en: 'Notice', color: '#4a5a8c' },
}
