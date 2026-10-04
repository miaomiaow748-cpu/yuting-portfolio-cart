const cards = [...document.querySelectorAll('.item-card')];
const cartStage = document.querySelector('#cartStage');
const basketCount = document.querySelector('#basketCount');
const basketCountCenter = document.querySelector('#basketCountCenter');
const receiptCount = document.querySelector('#receiptCount');
const basketTickets = document.querySelector('#basketTickets');
const receiptList = document.querySelector('#receiptList');
const toast = document.querySelector('#toast');
const detailDialog = document.querySelector('#detailDialog');
const detailTitle = document.querySelector('#detailTitle');
const detailCode = document.querySelector('#detailCode');
const detailBody = document.querySelector('#detailBody');
const dialogClose = document.querySelector('#dialogClose');
const collected = new Set();

const detailContent = {
  education: {
    code: '01 / EDUCATION',
    title: '教育背景',
    html: `
      <section class="detail-block"><div class="detail-meta"><strong>中国传媒大学</strong><span>2024.09 — 2027.06</span></div><h3>艺术管理 · 硕士</h3><p>GPA 4.0 / 4.0（93.3 / 100），获研究生三等学业奖学金。</p></section>
      <section class="detail-block"><div class="detail-meta"><strong>湖南师范大学</strong><span>2020.09 — 2024.06</span></div><h3>文化产业管理 · 本科</h3><p>GPA 4.2 / 5.0，获二等综合奖学金、三好学生；曾任院学生会宣传部部长，发表学术论文 2 篇，参与国家级大学生创新创业项目 1 项。</p></section>
    `
  },
  internship: {
    code: '02 / INTERNSHIP',
    title: '实习经历',
    html: `
      <section class="detail-block internship-row"><div class="internship-copy"><div class="detail-meta"><strong>名创优品（营销中心）</strong><span>2026.06 — 至今</span></div><h3>娱乐营销实习生</h3><ul><li><b>代言人节点营销与粉丝经营：</b>参与时代少年团青春周年、成团日及成员生日等节点，监测微博超话、小红书、抖音和品牌评论区，提出 4 个主题创意，其中 2 个获内部深度分析。</li><li><b>综艺 IP 场景营销：</b>参与《花儿与少年 8》×名创优品墨西哥门店合作，梳理植入、艺人特征、节目路透与用户讨论，协助多平台传播。</li><li><b>整合传播与项目推进：</b>跟进 KV、线下大屏、联名赠品、达人内容、MCN 及供应商排期，并输出大学城、商圈等投放建议。</li><li><b>竞品研究与方案优化：</b>持续拆解多个品牌案例，输出 4 项直播问题建议，其中 3 项被采纳。</li></ul></div><button class="pull-card" type="button" aria-expanded="false" aria-label="展开名创优品实习照片"><span class="pull-tab"><b>↔</b><em>名创优品</em></span><span class="pull-media"><img src="./assets/internships/miniso.jpg" alt="名创优品实习现场照片" /><small>名创优品.HEIC</small></span></button></section>
      <section class="detail-block internship-row"><div class="internship-copy"><div class="detail-meta"><strong>美团（美团团购）</strong><span>2025.11 — 2026.02</span></div><h3>品牌营销实习生</h3><ul><li>参与冬季 Campaign、会员日及品牌联合营销，协同 TVC、小红书、线下试用与配送到家内容落地。</li><li>推动 20 余篇小红书内容，整体曝光 100 万以上；热点营销项目整体 GTV 超 2500 万元，类目撬动比 1.9。</li><li>跟进公众号、直播和复盘内容产出，推动 10 余篇公关稿发布后 3—5 日阅读量超过 10 万。</li></ul></div><button class="pull-card" type="button" aria-expanded="false" aria-label="展开美团实习照片"><span class="pull-tab"><b>↔</b><em>美团</em></span><span class="pull-media"><img src="./assets/internships/meituan.jpg" alt="美团实习现场照片" /><small>美团.JPG</small></span></button></section>
      <section class="detail-block internship-row"><div class="internship-copy"><div class="detail-meta"><strong>新东方（新东方文旅）</strong><span>2025.05 — 2025.08</span></div><h3>文旅产品实习生</h3><ul><li>面向 10—18 岁学生及高净值家庭开展市场调研，分析研学、出境游、飞猪、小红书及海外旅行团的产品机会。</li><li>协同供应商与客户需求，核查护照、航班、酒店及饮食禁忌等 600 余条 ERP 记录，支持 30 余团、600 余名学员顺利出行。</li></ul></div><button class="pull-card" type="button" aria-expanded="false" aria-label="展开新东方实习照片"><span class="pull-tab"><b>↔</b><em>新东方</em></span><span class="pull-media"><img src="./assets/internships/new-oriental.jpg" alt="新东方实习现场照片" /><small>新东方.jpg</small></span></button></section>
      <section class="detail-block internship-row"><div class="internship-copy"><div class="detail-meta"><strong>湖南卫视（节目制作中心）</strong><span>2023.02 — 2023.04；2022.07 — 2022.09</span></div><h3>导演实习生</h3><ul><li>参与《我想和你唱》8 期节目，围绕 20 余位艺人筛选及沟通 50 余名合唱嘉宾与互动观众。</li><li>参与素材筛选、短片剪辑与播出审核，累计处理 100 余分钟素材，约 80% 初审并完成修改。</li></ul></div><button class="pull-card" type="button" aria-expanded="false" aria-label="展开湖南卫视实习照片"><span class="pull-tab"><b>↔</b><em>湖南卫视</em></span><span class="pull-media"><img src="./assets/internships/hunan-tv.jpg" alt="湖南卫视实习现场照片" /><small>湖南卫视.JPG</small></span></button></section>
      <section class="detail-block portfolio-row"><div class="portfolio-intro"><div class="detail-meta"><strong>营销作品集</strong><span>16 页 · 营销策划与执行案例</span></div><p>收录名创优品、美团等品牌营销实习中的策略洞察、活动执行与数据复盘，点击下方标签抽拉查看完整作品集。</p></div><div class="portfolio-pull-card"><div class="portfolio-pull-panel" id="marketingPortfolioPanel"><div class="portfolio-pull-heading"><strong>王雨婷营销实习作品集 · 16 页预览</strong><a href="./assets/marketing-portfolio.pdf" target="_blank" rel="noreferrer">新窗口打开 PDF ↗</a></div><div class="portfolio-page-strip">${Array.from({ length: 16 }, (_, index) => { const page = String(index + 1).padStart(2, '0'); return `<figure><img src="./assets/marketing-portfolio/page-${page}.jpg" alt="营销作品集第 ${index + 1} 页" /><figcaption>${page} / PAGE</figcaption></figure>`; }).join('')}</div></div><button class="portfolio-pull-tab" type="button" aria-expanded="false" aria-controls="marketingPortfolioPanel"><span><b>↕</b><em>营销作品集 · 16 页</em></span><strong>点击抽拉查看</strong></button></div></section>
    `
  },
  skills: {
    code: '07 / SKILLS',
    title: '个人技能',
    html: `
      <section class="detail-block"><div class="detail-meta"><strong>营销与工具</strong><span>Strategy / Content / Review</span></div><ul><li>熟悉品牌 Campaign、代言人 / IP 营销、热点借势、用户洞察、达人 Brief 及传播复盘。</li><li>熟练使用 Word、Excel、PPT、Photoshop、Illustrator、剪映；可使用 DeepSeek、ChatGPT、豆包辅助资料聚合、策略梳理与视觉 Demo。</li></ul></section>
      <section class="detail-block"><div class="detail-meta"><strong>语言与认证</strong><span>Certificates</span></div><ul><li>英语 CET-6（540）、CET-4（637）。</li><li>普通话二级甲等、计算机二级、钢琴社会艺术水平考级十级。</li></ul></section>
    `
  },
  research: {
    code: '03 / RESEARCH',
    title: '学术与研究',
    html: `
      <section class="detail-block"><div class="detail-meta"><strong>红色文化资源可视化与活化路径研究</strong><span>国家级大学生创新创业项目</span></div><p>以湖南省长沙市为例，梳理红色文化资源，借助 The Brain 建立可视化信息网络，探索资源的重构、记忆与应用。</p></section>
      <section class="detail-block"><div class="detail-meta"><strong>红研湖南红色研学教育实践 App</strong><span>“互联网+”大学生创新创业大赛</span></div><p>整合优质资源，打造线上线下红色主题研学实践通道，推动红色文化资源的创造性转化与创新性发展。</p></section>
      <section class="detail-block"><div class="detail-meta"><strong>传统文化综艺 IP 创新传播路径探析</strong><span>以《国家宝藏》为例</span></div><p>从媒体融合与 IP 传播视角，分析传统文化综艺的传播现状、局限与创新路径。</p></section>
      <section class="detail-block"><div class="detail-meta"><strong>《只此青绿》品牌化传播路径研究</strong><span>文化主体性视阈</span></div><p>围绕传统文化品牌传播中的同质化、审美疲劳与文化主体性问题，讨论舞剧 IP 如何形成更有效的品牌表达。</p></section>
      <section class="detail-block"><div class="detail-meta"><strong>爱奇艺 SWOT 及波士顿矩阵分析</strong><span>媒介与产品研究</span></div><p>通过 SWOT 与波士顿矩阵分析爱奇艺的优势、机会、威胁及产品结构，并提出发展策略。</p></section>
      <section class="detail-block"><div class="detail-meta"><strong>芒果 TV 运营与盈利分析</strong><span>平台运营研究</span></div><p>从媒体内容、App 运营、广告、会员与线上商城等模块分析平台架构，梳理运营模式与盈利空间。</p></section>
    `
  },
  creative: {
    code: '05 / CREATIVE OUTPUT',
    title: '文化创意产出',
    html: `
      <section class="detail-block creative-project creative-folder"><div class="project-folder-content"><div class="detail-meta"><strong>浏阳淳口好茶文化创意设计</strong><span>浏阳口茶文化创意设计大赛</span></div><p>提取浏阳口茶叶文化特色，以 Logo、IP 人物和包装系统讲述地方茶文化，并完成外观、样机与路演物料设计。</p><div class="project-gallery"><figure><img src="./assets/works/chun-kou-tea/cover.png" alt="淳口好茶包装艺术设计封面" /><figcaption>01 / COVER</figcaption></figure><figure><img src="./assets/works/chun-kou-tea/detail-1-logo.png" alt="淳口好茶 Logo 设计" /><figcaption>02 / LOGO</figcaption></figure><figure><img src="./assets/works/chun-kou-tea/detail-2-ip.jpg.png" alt="淳口好茶 IP 形象设计" /><figcaption>03 / IP</figcaption></figure><figure><img src="./assets/works/chun-kou-tea/detail-3-package.png" alt="淳口好茶包装设计" /><figcaption>04 / PACKAGE</figcaption></figure><figure><img src="./assets/works/chun-kou-tea/detail-4-ip.jpg" alt="淳口好茶 IP 细节设计" /><figcaption>05 / IP DETAIL</figcaption></figure><figure><img src="./assets/works/chun-kou-tea/detail-5-certificate.png" alt="淳口好茶参赛证书与路演物料" /><figcaption>06 / PRESENTATION</figcaption></figure></div></div><button class="project-gallery-toggle project-folder-tab" type="button" aria-expanded="false"><span>淳口好茶 · 包装艺术设计</span><b>↑</b></button></section>
      <section class="detail-block creative-project creative-folder"><div class="project-folder-content"><div class="detail-meta"><strong>长沙西园北里文旅品牌</strong><span>品牌视觉与文旅传播</span></div><p>围绕西园北里的历史文化街区定位，完成品牌 VI、研学手册、宣传册、宣传片脚本、拍摄与剪辑，塑造“传统市井、都市古游”的街区形象。</p><div class="project-gallery"><figure><img src="./assets/works/xiyuan-beili/cover.jpg" alt="长沙西园北里文旅品牌封面" /><figcaption>01 / COVER</figcaption></figure><figure><img src="./assets/works/xiyuan-beili/detail-2-shouce.jpg" alt="西园北里文旅研学手册" /><figcaption>02 / BOOKLET</figcaption></figure><figure><img src="./assets/works/xiyuan-beili/detail-3-logo.png" alt="西园北里品牌 Logo" /><figcaption>03 / IDENTITY</figcaption></figure><figure><img src="./assets/works/xiyuan-beili/detail-4-shouce2.jpg" alt="西园北里文旅手册细节" /><figcaption>04 / DETAIL</figcaption></figure></div></div><button class="project-gallery-toggle project-folder-tab" type="button" aria-expanded="false"><span>长沙西园北里 · 文旅品牌</span><b>↑</b></button></section>
      <section class="detail-block creative-project creative-folder"><div class="project-folder-content"><div class="detail-meta"><strong>展览策划：穿越丽人行</strong><span>女性图像主题展览</span></div><p>以中国古代女性图像为线索，通过图像变迁呈现历史、文化与思想意识的演变，策划沉浸式女性画作展览方案。</p><div class="project-gallery"><figure><img src="./assets/works/li-ren-xing/cover.jpg" alt="穿越丽人行展览策划封面" /><figcaption>01 / COVER</figcaption></figure><figure><img src="./assets/works/li-ren-xing/detail-1-juanshouyu.jpg" alt="穿越丽人行展览卷首语" /><figcaption>02 / OPENING</figcaption></figure><figure><img src="./assets/works/li-ren-xing/detail-2-zhuangban.jpg" alt="穿越丽人行展览装帧设计" /><figcaption>03 / LAYOUT</figcaption></figure><figure><img src="./assets/works/li-ren-xing/detail-3-aihao-1.jpg" alt="穿越丽人行展览内容页一" /><figcaption>04 / STORY</figcaption></figure><figure><img src="./assets/works/li-ren-xing/detail-4-aihao-2.jpg" alt="穿越丽人行展览内容页二" /><figcaption>05 / STORY</figcaption></figure></div></div><button class="project-gallery-toggle project-folder-tab" type="button" aria-expanded="false"><span>穿越丽人行 · 展览策划</span><b>↑</b></button></section>
      <section class="detail-block creative-project creative-folder"><div class="project-folder-content"><div class="detail-meta"><strong>品牌营销：植物有灵·润发养心</strong><span>百年润发整合营销策划</span></div><p>根据品牌特色和三类目标女性消费者画像，提出以“植物有灵·润发养心”为主题的品牌故事与整合营销方案。</p><div class="project-gallery"><figure><img src="./assets/works/runfa/cover.jpg" alt="植物有灵·润发养心品牌营销封面" /><figcaption>01 / COVER</figcaption></figure><figure><img src="./assets/works/runfa/detail-1.jpg" alt="百年润发品牌营销方案页一" /><figcaption>02 / STRATEGY</figcaption></figure><figure><img src="./assets/works/runfa/detail-2.jpg" alt="百年润发品牌营销方案页二" /><figcaption>03 / INSIGHT</figcaption></figure><figure><img src="./assets/works/runfa/detail-3-girl1.jpg" alt="植物有灵女性消费者画像一" /><figcaption>04 / PERSONA</figcaption></figure><figure><img src="./assets/works/runfa/detail-4-girl2.jpg" alt="植物有灵女性消费者画像二" /><figcaption>05 / PERSONA</figcaption></figure><figure><img src="./assets/works/runfa/detail-4-girl3.jpg" alt="植物有灵女性消费者画像三" /><figcaption>06 / PERSONA</figcaption></figure></div></div><button class="project-gallery-toggle project-folder-tab" type="button" aria-expanded="false"><span>植物有灵 · 润发养心</span><b>↑</b></button></section>
      <section class="detail-block creative-project creative-folder"><div class="project-folder-content"><div class="detail-meta"><strong>报纸创刊策划：旧时光书店报</strong><span>实体书店内容策划</span></div><p>通过实地采访书店与店员，挖掘实体书店的人文艺术特色，完成采访、文字整理、新闻稿撰写、报纸策划与排版设计。</p><div class="project-gallery"><figure><img src="./assets/works/newspaper/cover.jpg" alt="旧时光书店报创刊策划封面" /><figcaption>01 / COVER</figcaption></figure><figure><img src="./assets/works/newspaper/detail-1-page.jpg" alt="旧时光书店报版面一" /><figcaption>02 / PAGE</figcaption></figure><figure><img src="./assets/works/newspaper/detail-2-page.jpg" alt="旧时光书店报版面二" /><figcaption>03 / PAGE</figcaption></figure><figure><img src="./assets/works/newspaper/detail-3-page.jpg" alt="旧时光书店报版面三" /><figcaption>04 / PAGE</figcaption></figure><figure><img src="./assets/works/newspaper/detail-4-page.jpg" alt="旧时光书店报版面四" /><figcaption>05 / PAGE</figcaption></figure><figure><img src="./assets/works/newspaper/detail-5-page.jpg" alt="旧时光书店报版面五" /><figcaption>06 / PAGE</figcaption></figure></div></div><button class="project-gallery-toggle project-folder-tab" type="button" aria-expanded="false"><span>旧时光书店报 · 创刊策划</span><b>↑</b></button></section>
    `
  },
  interest: {
    code: '08 / INTERESTS',
    title: '兴趣培育',
    html: `
      <section class="detail-block internship-row interest-row"><div class="internship-copy"><div class="detail-meta"><strong>艺术表演：《春雷》</strong><span>湖南师范大学第十九届社团文化节暨历史剧展演</span></div><p>参与历史剧《春雷》展演并饰演人物角色，从排练、彩排到最终演出完整参与，获得湖南师范大学年度特色学生工作优秀奖。</p></div><button class="pull-card interest-pull-card" type="button" aria-expanded="false" aria-label="展开艺术表演《春雷》照片"><span class="pull-tab"><b>↔</b><em>艺术表演</em></span><span class="pull-media"><img src="./assets/interests/spring-thunder.png" alt="艺术表演《春雷》展演照片" /><small>《春雷》展演照片</small></span></button></section>
      <section class="detail-block internship-row interest-row"><div class="internship-copy"><div class="detail-meta"><strong>钢琴</strong><span>社会艺术水平考级十级</span></div><p>通过中国音乐学院考级委员会钢琴十级认证，持续保持对音乐表演与舞台表达的兴趣。</p></div><button class="pull-card interest-pull-card" type="button" aria-expanded="false" aria-label="展开钢琴考级证书照片"><span class="pull-tab"><b>↔</b><em>钢琴</em></span><span class="pull-media"><img src="./assets/interests/piano.jpg" alt="钢琴社会艺术水平考级十级证书" /><small>钢琴.jpg</small></span></button></section>
      <section class="detail-block internship-row interest-row"><div class="internship-copy"><div class="detail-meta"><strong>北京国际电影节</strong><span>第十五届北京国际电影节</span></div><p>参与北京国际电影节现场活动，在电影节展映与活动现场中积累文化活动观察与执行经验。</p></div><button class="pull-card interest-pull-card" type="button" aria-expanded="false" aria-label="展开北京国际电影节照片"><span class="pull-tab"><b>↔</b><em>北京国际电影节</em></span><span class="pull-media"><span class="interest-media-grid"><img src="./assets/interests/beijing-film-festival-1.JPG" alt="北京国际电影节现场照片一" /><img src="./assets/interests/beijing-film-festival-2.JPG" alt="北京国际电影节现场照片二" /></span><small>北京国际电影节1.JPG · 北京国际电影节2.JPG</small></span></button></section>
      <section class="detail-block internship-row interest-row"><div class="internship-copy"><div class="detail-meta"><strong>北京当代艺术展</strong><span>当代艺术展览现场</span></div><p>走进北京当代艺术展，观察展览空间、作品呈现与观众互动，持续积累对艺术现场和文化项目的感知。</p></div><button class="pull-card interest-pull-card" type="button" aria-expanded="false" aria-label="展开北京当代艺术展照片"><span class="pull-tab"><b>↔</b><em>北京当代艺术展</em></span><span class="pull-media"><img src="./assets/interests/beijing-contemporary-art.JPG" alt="北京当代艺术展现场照片" /><small>北京当代艺术展.JPG</small></span></button></section>
    `
  }
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderReceipt() {
  receiptCount.textContent = collected.size;
  if (!collected.size) {
    receiptList.innerHTML = '<p class="empty-receipt">还没有挑选商品。回到上面，开始逛逛吧。</p>';
    return;
  }
  receiptList.innerHTML = [...collected].map((title, index) => `
    <div class="receipt-row"><span>${String(index + 1).padStart(2, '0')} / ${title.toUpperCase()}</span><strong>SELECTED</strong></div>
  `).join('');
}

function collectCard(card) {
  const title = card.dataset.title;
  if (collected.has(title)) {
    collected.delete(title);
    card.classList.remove('collected');
    card.setAttribute('aria-label', `${title}，已放回货架`);
    const chip = [...basketTickets.querySelectorAll('.collected-chip')].find((item) => item.dataset.title === title);
    if (chip) chip.remove();
    const button = card.querySelector('.add-button');
    button.textContent = '加入篮子';
    button.setAttribute('aria-pressed', 'false');
    basketCount.textContent = collected.size;
    basketCountCenter.textContent = collected.size;
    renderReceipt();
    showToast(`${title} 已放回货架`);
    return;
  }
  collected.add(title);
  card.classList.add('collected');
  card.setAttribute('aria-label', `${title}，已加入购物篮`);
  const chip = document.createElement('span');
  chip.className = 'collected-chip';
  chip.dataset.title = title;
  chip.textContent = `${card.dataset.code} ${title}`;
  basketTickets.appendChild(chip);
  const button = card.querySelector('.add-button');
  button.textContent = '放回货架';
  button.setAttribute('aria-pressed', 'true');
  basketCount.textContent = collected.size;
  basketCountCenter.textContent = collected.size;
  renderReceipt();
  showToast(`${title} 已加入购物篮`);
}

cards.forEach((card) => {
  const button = card.querySelector('.add-button');
  const detailButton = card.querySelector('.detail-button');
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    collectCard(card);
  });
  if (detailButton) {
    detailButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const detail = detailContent[detailButton.dataset.detail];
      if (!detail) return;
      detailCode.textContent = detail.code;
      detailTitle.textContent = detail.title;
      const detailKind = detailButton.dataset.detail;
      detailDialog.classList.toggle('internship-dialog', detailKind === 'internship');
      detailDialog.classList.toggle('creative-dialog', detailKind === 'creative');
      detailDialog.classList.toggle('interest-dialog', detailKind === 'interest');
      detailBody.innerHTML = detail.html;
      detailBody.querySelectorAll('.pull-card').forEach((pullCard) => {
        pullCard.addEventListener('click', () => {
          const isOpen = pullCard.classList.toggle('is-open');
          pullCard.setAttribute('aria-expanded', String(isOpen));
        });
      });
      detailBody.querySelectorAll('.portfolio-pull-tab').forEach((portfolioButton) => {
        portfolioButton.addEventListener('click', () => {
          const portfolioCard = portfolioButton.closest('.portfolio-pull-card');
          const isOpen = portfolioCard.classList.toggle('is-open');
          portfolioButton.setAttribute('aria-expanded', String(isOpen));
          portfolioButton.querySelector('strong').textContent = isOpen ? '收起作品集' : '点击抽拉查看';
        });
      });
      detailBody.querySelectorAll('.project-gallery-toggle').forEach((galleryButton) => {
        galleryButton.addEventListener('click', () => {
          const project = galleryButton.closest('.creative-project');
          const isOpen = project.classList.toggle('is-open');
          galleryButton.setAttribute('aria-expanded', String(isOpen));
          galleryButton.querySelector('b').textContent = isOpen ? '↓' : '↑';
        });
      });
      detailDialog.showModal();
    });
  }
  card.addEventListener('click', (event) => {
    if (!event.target.closest('button')) collectCard(card);
  });
  card.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text/plain', card.dataset.title);
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
});

cartStage.addEventListener('dragover', (event) => {
  event.preventDefault();
  cartStage.classList.add('drag-over');
});
cartStage.addEventListener('dragleave', () => cartStage.classList.remove('drag-over'));
cartStage.addEventListener('drop', (event) => {
  event.preventDefault();
  cartStage.classList.remove('drag-over');
  const title = event.dataTransfer.getData('text/plain');
  const card = cards.find((item) => item.dataset.title === title);
  if (card) collectCard(card);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
cards.forEach((card) => observer.observe(card));

dialogClose.addEventListener('click', () => detailDialog.close());
detailDialog.addEventListener('click', (event) => {
  if (event.target === detailDialog) detailDialog.close();
});

renderReceipt();
