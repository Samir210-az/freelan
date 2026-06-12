// ===== FREELAN.AZ — Shared Firebase + UI module =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc, query, limit, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDhahbyEM5IsLLWrRz7_haxJIH0WWyBec",
  authDomain: "freelan-8e5b4.firebaseapp.com",
  projectId: "freelan-8e5b4",
  storageBucket: "freelan-8e5b4.firebasestorage.app",
  messagingSenderId: "1044012909081",
  appId: "1:1044012909081:web:3c74e34edc5b3dd1be2088"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== I18N (AZ / RU / EN) =====
const LANG = localStorage.getItem('lang') || 'az';
const I18N = {
az:{nav_jobs:'Tapşırıqlar',nav_freelancers:'Freelancerlər',nav_how:'Necə işləyir',nav_pricing:'Tariflər',nav_home:'Ana səhifə',nav_messages:'Mesajlar',login:'Daxil ol',register:'Qeydiyyat',logout:'Çıxış',
ftr_desc:'Azərbaycanın ilk freelance platforması. Müştərilər və peşəkarlar üçün etibarlı iş bazarı.',ftr_platform:'Platforma',ftr_company:'Şirkət',ftr_legal:'Hüquqi',about:'Haqqımızda',blog:'Blog',contact:'Əlaqə',terms:'İstifadə şərtləri',privacy:'Gizlilik siyasəti',rules:'Qaydalar',rights:'© 2026 Freelan.az — Bütün hüquqlar qorunur',
au_welcome:'Xoş gəldiniz 👋',au_login_sub:'Hesabınıza daxil olun',au_email:'E-poçt',au_pass:'Şifrə',au_no_acc:'Hesabınız yoxdur?',au_reg_t:'Qeydiyyat 🚀',au_reg_sub:'Hansı rolda qatılırsınız?',au_role_c:'💼 Müştəri',au_role_c2:'İş elanı verirəm',au_role_f2:'İş axtarıram',au_name:'Ad, Soyad',au_pass_min:'(min. 6 simvol)',au_reg_btn:'Qeydiyyatdan keç',au_have:'Artıq hesabınız var?',
bid_t:'Təklif göndər 💼',bid_amt:'Təklif məbləği (₼)',bid_days:'Müddət (gün)',bid_cover:'Müraciət məktubu',bid_send:'Təklifi göndər 🚀',
pj_t:'Yeni elan 📋',pj_sub:'Tapşırığınızı ətraflı təsvir edin — daha yaxşı təkliflər alın',pj_title:'Başlıq',pj_cat:'Kateqoriya',pj_desc:'Təsvir',pj_budget:'Büdcə (₼)',pj_days:'Müddət (gün)',pj_send:'Elanı paylaş 🚀',pj_note:'Elan moderasiyadan keçdikdən sonra dərc olunur',
search:'Axtar',
idx_h1:'İşini tap.<br><em>Azad qazan.</em>',idx_p:'Azərbaycanın ilk freelance bazarı — dizaynerlər, proqramçılar, kopirayterlər və müştərilər üçün etibarlı platforma.',idx_q_ph:'Hansı xidməti axtarırsınız?',idx_cats_t:'Hər iş növü üçün freelancer tap',idx_cats_s:'Kateqoriyanı seç və peşəkarlarla işə başla',idx_how_t:'Necə işləyir?',idx_how_s:'4 sadə addımda işə başla',
s1t:'Elan yerləşdir',s1p:'İşini təsvir et, büdcəni göstər. Elan vermək həmişə pulsuzdur.',s2t:'Təkliflər al',s2p:'Uyğun freelancerlər qiymət və müddət təklifi göndərir.',s3t:'Seç və işə başla',s3p:'Profili, reytinqi yoxla, ən yaxşı təklifi qəbul et.',s4t:'Təhlükəsiz ödə',s4p:'Pul escrow-da saxlanılır — işi qəbul etdikdən sonra ödənilir.',
idx_more:'Ətraflı öyrən →',idx_recent_t:'Son elanlar',idx_recent_s:'İndi aktiv tapşırıqlar',idx_all:'Bütün elanlar →',idx_top_t:'Top freelancerlər',idx_top_s:'Ən yüksək reytinqli mütəxəssislər',idx_seeall:'Hamısına bax →',cta_t:'Bu gün işə başla',cta_p:'İstər iş ver, istər iş tap — Freelan.az səninlədir.',cta_post:'💼 Elan ver — Pulsuz',cta_fl:'🧑‍💻 Freelancer ol',
jobs_h:'Tapşırıqlar',post_job:'+ Elan ver',jobs_q_ph:'Tapşırıq axtar... (başlıq, təsvir, kateqoriya)',all_cat:'Hamısı',
fl_h:'Freelancerlər',fl_q_ph:'Ad və ya ixtisas üzrə axtar...',
pr_h:'Şəffaf tariflər 💎',pr_s:'Gizli ödəniş yoxdur — yalnız uğurlu işdən komissiya',pr_free_t:'Başlanğıc',pr_free:'Pulsuz',pr_free_s:'Hər kəs üçün',prf1:'Limitsiz elan yerləşdirmə',prf2:'Limitsiz təklif göndərmə',prf3:'Profil yaratma',prf4:'Mesajlaşma',prf5:'10% xidmət haqqı (freelancer)',pr_pop:'⭐ Populyar',pr_pro_s:'Aktiv freelancerlər üçün',prp1:'Bütün Başlanğıc imkanları',prp2:'Yalnız 5% xidmət haqqı',prp3:'Profilin önə çıxarılması',prp4:'"Pro" nişanı',prp5:'Prioritet dəstək',pr_pro_btn:'Pro ol',pr_biz_s:'Şirkətlər üçün',prb1:'Bütün Pro imkanları',prb2:'Komanda hesabları',prb3:'Şirkət profili',prb4:'Hesabat və analitika',prb5:'Xüsusi menecer',pr_biz_btn:'Biznes ol',pr_esc_t:'💡 Escrow necə işləyir?',pr_esc_p:'Müştəri təklifi qəbul etdikdə ödəniş platformada (escrow hesabında) saxlanılır. Freelancer işi təhvil verir, müştəri qəbul edir — yalnız bundan sonra pul freelancerə köçürülür. Beləliklə hər iki tərəf qorunur: müştəri görmədiyi işə pul ödəmir, freelancer gördüyü işin pulunu mütləq alır.',
hw_h:'Necə işləyir? 🛠',hw_s:'Freelan.az-da iş prosesi — sadə, şəffaf, təhlükəsiz',hw_c:'💼 Müştərilər üçün',hw_f:'🧑‍💻 Freelancerlər üçün',hw_start:'İndi başla →'},
ru:{nav_jobs:'Заказы',nav_freelancers:'Фрилансеры',nav_how:'Как это работает',nav_pricing:'Тарифы',nav_home:'Главная',nav_messages:'Сообщения',login:'Войти',register:'Регистрация',logout:'Выйти',
ftr_desc:'Первая фриланс-платформа Азербайджана. Надёжная биржа для клиентов и профессионалов.',ftr_platform:'Платформа',ftr_company:'Компания',ftr_legal:'Правовая информация',about:'О нас',blog:'Блог',contact:'Контакты',terms:'Условия использования',privacy:'Политика конфиденциальности',rules:'Правила',rights:'© 2026 Freelan.az — Все права защищены',
au_welcome:'Добро пожаловать 👋',au_login_sub:'Войдите в свой аккаунт',au_email:'Эл. почта',au_pass:'Пароль',au_no_acc:'Нет аккаунта?',au_reg_t:'Регистрация 🚀',au_reg_sub:'В какой роли вы присоединяетесь?',au_role_c:'💼 Клиент',au_role_c2:'Размещаю заказы',au_role_f2:'Ищу работу',au_name:'Имя, Фамилия',au_pass_min:'(мин. 6 символов)',au_reg_btn:'Зарегистрироваться',au_have:'Уже есть аккаунт?',
bid_t:'Отправить предложение 💼',bid_amt:'Сумма предложения (₼)',bid_days:'Срок (дней)',bid_cover:'Сопроводительное письмо',bid_send:'Отправить 🚀',
pj_t:'Новый заказ 📋',pj_sub:'Опишите задачу подробно — получите лучшие предложения',pj_title:'Заголовок',pj_cat:'Категория',pj_desc:'Описание',pj_budget:'Бюджет (₼)',pj_days:'Срок (дней)',pj_send:'Опубликовать 🚀',pj_note:'Заказ публикуется после модерации',
search:'Поиск',
idx_h1:'Найди работу.<br><em>Зарабатывай свободно.</em>',idx_p:'Первая фриланс-биржа Азербайджана — надёжная платформа для дизайнеров, программистов, копирайтеров и клиентов.',idx_q_ph:'Какую услугу вы ищете?',idx_cats_t:'Найди фрилансера для любой задачи',idx_cats_s:'Выбери категорию и начни работать с профи',idx_how_t:'Как это работает?',idx_how_s:'Начни всего за 4 шага',
s1t:'Разместите заказ',s1p:'Опишите задачу и укажите бюджет. Размещение всегда бесплатно.',s2t:'Получите предложения',s2p:'Подходящие фрилансеры присылают цену и сроки.',s3t:'Выберите и начните',s3p:'Проверьте профиль и рейтинг, примите лучшее предложение.',s4t:'Платите безопасно',s4p:'Деньги хранятся в escrow и переводятся после приёмки работы.',
idx_more:'Подробнее →',idx_recent_t:'Последние заказы',idx_recent_s:'Активные задачи прямо сейчас',idx_all:'Все заказы →',idx_top_t:'Топ фрилансеры',idx_top_s:'Специалисты с лучшим рейтингом',idx_seeall:'Смотреть все →',cta_t:'Начни уже сегодня',cta_p:'Размещай заказы или находи работу — Freelan.az с тобой.',cta_post:'💼 Разместить заказ — бесплатно',cta_fl:'🧑‍💻 Стать фрилансером',
jobs_h:'Заказы',post_job:'+ Разместить заказ',jobs_q_ph:'Поиск заказов... (заголовок, описание, категория)',all_cat:'Все',
fl_h:'Фрилансеры',fl_q_ph:'Поиск по имени или специальности...',
pr_h:'Прозрачные тарифы 💎',pr_s:'Без скрытых платежей — комиссия только с успешной работы',pr_free_t:'Старт',pr_free:'Бесплатно',pr_free_s:'Для всех',prf1:'Безлимитное размещение заказов',prf2:'Безлимитные предложения',prf3:'Создание профиля',prf4:'Сообщения',prf5:'Комиссия 10% (фрилансер)',pr_pop:'⭐ Популярный',pr_pro_s:'Для активных фрилансеров',prp1:'Все возможности Старта',prp2:'Комиссия всего 5%',prp3:'Продвижение профиля',prp4:'Значок «Pro»',prp5:'Приоритетная поддержка',pr_pro_btn:'Стать Pro',pr_biz_s:'Для компаний',prb1:'Все возможности Pro',prb2:'Командные аккаунты',prb3:'Профиль компании',prb4:'Отчёты и аналитика',prb5:'Персональный менеджер',pr_biz_btn:'Стать Бизнес',pr_esc_t:'💡 Как работает escrow?',pr_esc_p:'Когда клиент принимает предложение, оплата хранится на платформе (escrow-счёт). Фрилансер сдаёт работу, клиент принимает её — и только после этого деньги переводятся фрилансеру. Так защищены обе стороны: клиент не платит за невыполненную работу, а фрилансер гарантированно получает оплату.',
hw_h:'Как это работает? 🛠',hw_s:'Процесс работы на Freelan.az — просто, прозрачно, безопасно',hw_c:'💼 Для клиентов',hw_f:'🧑‍💻 Для фрилансеров',hw_start:'Начать сейчас →'},
en:{nav_jobs:'Jobs',nav_freelancers:'Freelancers',nav_how:'How it works',nav_pricing:'Pricing',nav_home:'Home',nav_messages:'Messages',login:'Log in',register:'Sign up',logout:'Log out',
ftr_desc:"Azerbaijan's first freelance platform. A trusted marketplace for clients and professionals.",ftr_platform:'Platform',ftr_company:'Company',ftr_legal:'Legal',about:'About us',blog:'Blog',contact:'Contact',terms:'Terms of use',privacy:'Privacy policy',rules:'Rules',rights:'© 2026 Freelan.az — All rights reserved',
au_welcome:'Welcome 👋',au_login_sub:'Log in to your account',au_email:'Email',au_pass:'Password',au_no_acc:"Don't have an account?",au_reg_t:'Sign up 🚀',au_reg_sub:'Which role are you joining as?',au_role_c:'💼 Client',au_role_c2:'I post jobs',au_role_f2:'I look for work',au_name:'Full name',au_pass_min:'(min. 6 characters)',au_reg_btn:'Sign up',au_have:'Already have an account?',
bid_t:'Submit a proposal 💼',bid_amt:'Bid amount (₼)',bid_days:'Duration (days)',bid_cover:'Cover letter',bid_send:'Send proposal 🚀',
pj_t:'New job 📋',pj_sub:'Describe your task in detail to get better proposals',pj_title:'Title',pj_cat:'Category',pj_desc:'Description',pj_budget:'Budget (₼)',pj_days:'Duration (days)',pj_send:'Post job 🚀',pj_note:'Jobs are published after moderation',
search:'Search',
idx_h1:'Find work.<br><em>Earn freely.</em>',idx_p:"Azerbaijan's first freelance marketplace — a trusted platform for designers, developers, copywriters and clients.",idx_q_ph:'What service are you looking for?',idx_cats_t:'Find a freelancer for any job',idx_cats_s:'Pick a category and start working with pros',idx_how_t:'How it works?',idx_how_s:'Get started in 4 simple steps',
s1t:'Post a job',s1p:'Describe your task and set a budget. Posting is always free.',s2t:'Get proposals',s2p:'Matching freelancers send their price and timeline.',s3t:'Choose and start',s3p:'Check profiles and ratings, accept the best offer.',s4t:'Pay securely',s4p:'Funds are held in escrow and released after you approve the work.',
idx_more:'Learn more →',idx_recent_t:'Latest jobs',idx_recent_s:'Tasks active right now',idx_all:'All jobs →',idx_top_t:'Top freelancers',idx_top_s:'Highest-rated professionals',idx_seeall:'See all →',cta_t:'Start today',cta_p:'Post jobs or find work — Freelan.az has you covered.',cta_post:'💼 Post a job — Free',cta_fl:'🧑‍💻 Become a freelancer',
jobs_h:'Jobs',post_job:'+ Post a job',jobs_q_ph:'Search jobs... (title, description, category)',all_cat:'All',
fl_h:'Freelancers',fl_q_ph:'Search by name or specialty...',
pr_h:'Transparent pricing 💎',pr_s:'No hidden fees — commission only on successful work',pr_free_t:'Starter',pr_free:'Free',pr_free_s:'For everyone',prf1:'Unlimited job posting',prf2:'Unlimited proposals',prf3:'Profile creation',prf4:'Messaging',prf5:'10% service fee (freelancer)',pr_pop:'⭐ Popular',pr_pro_s:'For active freelancers',prp1:'Everything in Starter',prp2:'Only 5% service fee',prp3:'Featured profile',prp4:'"Pro" badge',prp5:'Priority support',pr_pro_btn:'Go Pro',pr_biz_s:'For companies',prb1:'Everything in Pro',prb2:'Team accounts',prb3:'Company profile',prb4:'Reports & analytics',prb5:'Dedicated manager',pr_biz_btn:'Go Business',pr_esc_t:'💡 How does escrow work?',pr_esc_p:'When the client accepts a proposal, the payment is held on the platform (escrow account). The freelancer delivers the work, the client approves it — only then is the money released to the freelancer. Both sides are protected: the client never pays for unseen work, and the freelancer is guaranteed to get paid.',
hw_h:'How it works 🛠',hw_s:'The Freelan.az workflow — simple, transparent, secure',hw_c:'💼 For clients',hw_f:'🧑‍💻 For freelancers',hw_start:'Start now →'}
};
window.t = k => (I18N[LANG] && I18N[LANG][k] !== undefined) ? I18N[LANG][k] : (I18N.az[k] !== undefined ? I18N.az[k] : k);
window.setLang = function(l) { localStorage.setItem('lang', l); location.reload(); };
window.applyI18n = function() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (I18N.az[k] !== undefined) el.innerHTML = t(k);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const k = el.dataset.i18nPh;
    if (I18N.az[k] !== undefined) el.placeholder = t(k);
  });
  if (document.title.includes('Freelan.az') === false) return;
};

window.FB = {
  auth, db, user: null, userData: null, ready: false,
  collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc, query, limit, where, serverTimestamp
};

// ===== HELPERS =====
window.esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

window.showToast = function(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.remove('show'), 3200);
};

window.timeAgo = function(ts) {
  if (!ts?.seconds) return '';
  const d = Math.floor((Date.now()/1000 - ts.seconds));
  if (d < 60) return 'indicə';
  if (d < 3600) return Math.floor(d/60) + ' dəq əvvəl';
  if (d < 86400) return Math.floor(d/3600) + ' saat əvvəl';
  return Math.floor(d/86400) + ' gün əvvəl';
};

window.fbErr = function(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
};
window.fbErrClear = function(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
};

// ===== HEADER INJECTION =====
function renderHeader() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const act = p => page === p ? 'active' : '';
  const el = document.getElementById('app-header');
  if (!el) return;
  el.innerHTML = `
  <div class="hdr-inner">
    <a class="logo" href="index.html">Freelan<span>.az</span></a>
    <nav class="hdr-nav">
      <a href="jobs.html" class="${act('jobs.html')}">${t('nav_jobs')}</a>
      <a href="freelancers.html" class="${act('freelancers.html')}">${t('nav_freelancers')}</a>
      <a href="how-it-works.html" class="${act('how-it-works.html')}">${t('nav_how')}</a>
      <a href="pricing.html" class="${act('pricing.html')}">${t('nav_pricing')}</a>
      <a href="admin.html" id="nav-admin" style="display:none;color:var(--green);font-weight:700;">👑 Admin</a>
    </nav>
    <div class="hdr-right" id="hdr-right">
      ${langSelHtml()}
      <button class="btn btn-ghost btn-sm" onclick="openAuth('login')">${t('login')}</button>
      <button class="btn btn-green btn-sm" onclick="openAuth('register')">${t('register')}</button>
      <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="index.html">${t('nav_home')}</a>
    <a href="jobs.html">${t('nav_jobs')}</a>
    <a href="freelancers.html">${t('nav_freelancers')}</a>
    <a href="how-it-works.html">${t('nav_how')}</a>
    <a href="pricing.html">${t('nav_pricing')}</a>
    <a href="messages.html">${t('nav_messages')}</a>
  </div>`;
}

function langSelHtml() {
  return `<select class="lang-sel" onchange="setLang(this.value)" style="border:1px solid #e0e0e0;border-radius:8px;padding:5px 4px;font-size:12px;font-weight:600;background:#fff;cursor:pointer;">
    <option value="az"${LANG==='az'?' selected':''}>AZ</option>
    <option value="ru"${LANG==='ru'?' selected':''}>RU</option>
    <option value="en"${LANG==='en'?' selected':''}>EN</option>
  </select>`;
}

window.toggleMobileMenu = function() {
  const m = document.getElementById('mobile-menu');
  if (m) m.style.display = m.style.display === 'block' ? 'none' : 'block';
};
document.addEventListener('click', e => {
  const m = document.getElementById('mobile-menu');
  if (m && m.style.display === 'block' && !m.contains(e.target) && !e.target.closest('.hamburger')) {
    m.style.display = 'none';
  }
});

// ===== FOOTER INJECTION =====
function renderFooter() {
  const el = document.getElementById('app-footer');
  if (!el) return;
  el.innerHTML = `
  <div class="ftr-inner">
    <div class="ftr-grid">
      <div>
        <a class="logo" href="index.html" style="color:#9aff8a;">Freelan<span style="color:#fff;">.az</span></a>
        <p class="ftr-desc">${t('ftr_desc')}</p>
      </div>
      <div>
        <h4>${t('ftr_platform')}</h4>
        <a href="jobs.html">${t('nav_jobs')}</a>
        <a href="freelancers.html">${t('nav_freelancers')}</a>
        <a href="how-it-works.html">${t('nav_how')}</a>
        <a href="pricing.html">${t('nav_pricing')}</a>
      </div>
      <div>
        <h4>${t('ftr_company')}</h4>
        <a href="about.html">${t('about')}</a>
        <a href="blog.html">${t('blog')}</a>
        <a href="contact.html">${t('contact')}</a>
      </div>
      <div>
        <h4>${t('ftr_legal')}</h4>
        <a href="terms.html">${t('terms')}</a>
        <a href="privacy.html">${t('privacy')}</a>
        <a href="rules.html">${t('rules')}</a>
      </div>
    </div>
    <div class="ftr-bottom">
      <span>${t('rights')}</span>
      <span>By <a href="https://instagram.com/s_akhundoff" target="_blank" rel="noopener">@s_akhundoff</a></span>
    </div>
  </div>`;
}

// ===== AUTH MODAL INJECTION =====
function renderAuthModal() {
  if (document.getElementById('modal-auth')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
  <div class="modal-bg" id="modal-auth">
    <div class="modal">
      <button class="modal-x" onclick="closeAuth()">✕</button>
      <div id="auth-login">
        <h2>${t('au_welcome')}</h2>
        <p class="sub">${t('au_login_sub')}</p>
        <div id="login-err" class="err-box"></div>
        <div class="form-group"><label class="form-label">${t('au_email')}</label>
          <input class="form-input" id="li-email" type="email" placeholder="sizin@email.com" oninput="fbErrClear('login-err')"></div>
        <div class="form-group"><label class="form-label">${t('au_pass')}</label>
          <input class="form-input" id="li-pass" type="password" placeholder="••••••••" oninput="fbErrClear('login-err')" onkeydown="if(event.key==='Enter')fbLogin()"></div>
        <button class="btn btn-green" id="li-btn" style="width:100%;" onclick="fbLogin()">${t('login')}</button>
        <div class="auth-sw">${t('au_no_acc')} <a onclick="switchAuth('register')">${t('register')}</a></div>
      </div>
      <div id="auth-register" style="display:none;">
        <h2>${t('au_reg_t')}</h2>
        <p class="sub">${t('au_reg_sub')}</p>
        <div class="role-tabs">
          <button class="role-tab active" data-role="client" onclick="pickRole(this)">${t('au_role_c')}<br><small style="font-weight:400;font-size:11px;">${t('au_role_c2')}</small></button>
          <button class="role-tab" data-role="freelancer" onclick="pickRole(this)">🧑‍💻 Freelancer<br><small style="font-weight:400;font-size:11px;">${t('au_role_f2')}</small></button>
        </div>
        <div id="reg-err" class="err-box"></div>
        <div class="form-group"><label class="form-label">${t('au_name')}</label>
          <input class="form-input" id="rg-name" placeholder="" oninput="fbErrClear('reg-err')"></div>
        <div class="form-group"><label class="form-label">${t('au_email')}</label>
          <input class="form-input" id="rg-email" type="email" placeholder="sizin@email.com" oninput="fbErrClear('reg-err')"></div>
        <div class="form-group"><label class="form-label">${t('au_pass')} <small style="color:var(--ink3);">${t('au_pass_min')}</small></label>
          <input class="form-input" id="rg-pass" type="password" placeholder="••••••••" oninput="fbErrClear('reg-err')" onkeydown="if(event.key==='Enter')fbRegister()"></div>
        <button class="btn btn-green" id="rg-btn" style="width:100%;" onclick="fbRegister()">${t('au_reg_btn')}</button>
        <div class="auth-sw">${t('au_have')} <a onclick="switchAuth('login')">${t('login')}</a></div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(wrap.firstElementChild);
  document.getElementById('modal-auth').addEventListener('click', e => {
    if (e.target.id === 'modal-auth') closeAuth();
  });
}

window.openAuth = function(mode) {
  renderAuthModal();
  document.getElementById('modal-auth').classList.add('open');
  switchAuth(mode || 'login');
};
window.closeAuth = function() {
  document.getElementById('modal-auth')?.classList.remove('open');
};
window.switchAuth = function(mode) {
  document.getElementById('auth-login').style.display = mode === 'login' ? 'block' : 'none';
  document.getElementById('auth-register').style.display = mode === 'register' ? 'block' : 'none';
};
window.pickRole = function(btn) {
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
};

// ===== AUTH ACTIONS =====
window.fbRegister = async function() {
  const name = document.getElementById('rg-name').value.trim();
  const email = document.getElementById('rg-email').value.trim();
  const pass = document.getElementById('rg-pass').value;
  const role = document.querySelector('.role-tab.active')?.dataset.role || 'client';
  if (!name || !email || !pass) { fbErr('reg-err', 'Bütün xanaları doldurun'); return; }
  if (pass.length < 6) { fbErr('reg-err', 'Şifrə ən az 6 simvol olmalıdır'); return; }
  const btn = document.getElementById('rg-btn');
  btn.disabled = true; btn.textContent = '⏳ Gözləyin...';
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, 'users', cred.user.uid), {
      name, email, role,
      title: '', bio: '', skills: [], rate: 0,
      rating: 0, jobsDone: 0, balance: 0,
      status: 'active', createdAt: serverTimestamp()
    });
    closeAuth();
    showToast('Xoş gəldiniz, ' + name + '! 🎉');
    setTimeout(() => location.href = 'dashboard.html', 700);
  } catch(e) {
    const msg = e.code === 'auth/email-already-in-use' ? 'Bu e-poçt artıq qeydiyyatdadır' :
                e.code === 'auth/invalid-email' ? 'E-poçt düzgün deyil' : 'Xəta: ' + e.message;
    fbErr('reg-err', msg);
    btn.disabled = false; btn.textContent = 'Qeydiyyatdan keç';
  }
};

window.fbLogin = async function() {
  const email = document.getElementById('li-email').value.trim();
  const pass = document.getElementById('li-pass').value;
  if (!email || !pass) { fbErr('login-err', 'E-poçt və şifrəni daxil edin'); return; }
  const btn = document.getElementById('li-btn');
  btn.disabled = true; btn.textContent = '⏳ Gözləyin...';
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    closeAuth();
    showToast('Xoş gəldiniz! 🎉');
    setTimeout(() => location.href = 'dashboard.html', 600);
  } catch(e) {
    fbErr('login-err', 'E-poçt və ya şifrə yanlışdır');
    btn.disabled = false; btn.textContent = 'Daxil ol';
  }
};

window.fbLogout = async function() {
  await signOut(auth);
  showToast('Çıxış edildi');
  setTimeout(() => location.href = 'index.html', 500);
};

// ===== AUTH STATE =====
onAuthStateChanged(auth, async (user) => {
  FB.user = user;
  if (user) {
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) FB.userData = snap.data();
    } catch(e) { console.log('userData err:', e.message); }
    updateHeaderUser();
  } else {
    FB.userData = null;
  }
  FB.ready = true;
  document.dispatchEvent(new CustomEvent('fb-ready', { detail: { user, userData: FB.userData } }));
});

function updateHeaderUser() {
  const right = document.getElementById('hdr-right');
  if (!right || !FB.user) return;
  const d = FB.userData;
  const name = d?.name || FB.user.email.split('@')[0];
  const role = d?.role || 'client';
  right.innerHTML = `
    ${langSelHtml()}
    <a class="user-chip" href="dashboard.html">
      <div class="avatar">${esc(name[0].toUpperCase())}</div><span>${esc(name)}</span>
    </a>
    <button class="btn btn-ghost btn-sm" onclick="fbLogout()">${t('logout')}</button>
    <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Menu"><span></span><span></span><span></span></button>`;
  if (role === 'admin') {
    const a = document.getElementById('nav-admin');
    if (a) a.style.display = 'inline-block';
  }
}

// ===== UNIFIED BID SYSTEM (Upwork "Submit a Proposal") =====
function renderBidModal() {
  if (document.getElementById('modal-bid')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
  <div class="modal-bg" id="modal-bid">
    <div class="modal modal-wide">
      <button class="modal-x" onclick="closeBid()">✕</button>
      <h2>${t('bid_t')}</h2>
      <p class="sub" id="bid-job-label" style="color:var(--green);font-weight:600;"></p>
      <div class="form-row">
        <div class="form-group"><label class="form-label">${t('bid_amt')}</label>
          <input class="form-input" id="bid-amount" type="number" placeholder="350"></div>
        <div class="form-group"><label class="form-label">${t('bid_days')}</label>
          <input class="form-input" id="bid-days" type="number" placeholder="7"></div>
      </div>
      <div class="form-group"><label class="form-label">${t('bid_cover')}</label>
        <textarea class="form-textarea" id="bid-cover" placeholder="Özünüzü təqdim edin: təcrübəniz, bu işi necə yerinə yetirəcəyiniz, niyə sizi seçməlidirlər..."></textarea></div>
      <div id="bid-err" class="err-box"></div>
      <button class="btn btn-green" id="bid-btn" style="width:100%;" onclick="fbSubmitBid()">${t('bid_send')}</button>
    </div>
  </div>`;
  document.body.appendChild(wrap.firstElementChild);
  document.getElementById('modal-bid').addEventListener('click', e => {
    if (e.target.id === 'modal-bid') closeBid();
  });
}

window.openBid = function(jobId, jobTitle) {
  if (!FB.user) { openAuth('register'); return; }
  const role = FB.userData?.role;
  if (role === 'client') { showToast('Müştərilər təklif verə bilməz — elan verə bilərsiniz'); return; }
  if (role === 'admin') { showToast('Admin hesabı ilə təklif verilə bilməz'); return; }
  renderBidModal();
  window._bidJobId = jobId;
  document.getElementById('bid-job-label').textContent = jobTitle || '';
  document.getElementById('bid-amount').value = '';
  document.getElementById('bid-days').value = '';
  document.getElementById('bid-cover').value = '';
  fbErrClear('bid-err');
  const btn = document.getElementById('bid-btn');
  btn.disabled = false; btn.textContent = 'Təklifi göndər 🚀';
  document.getElementById('modal-bid').classList.add('open');
};
window.closeBid = function() {
  document.getElementById('modal-bid')?.classList.remove('open');
};

window.fbSubmitBid = async function() {
  const user = FB.user;
  if (!user) return;
  const jobId = window._bidJobId;
  const amount = parseInt(document.getElementById('bid-amount').value);
  const days = parseInt(document.getElementById('bid-days').value);
  const cover = document.getElementById('bid-cover').value.trim();
  if (!amount || amount < 1) { fbErr('bid-err', 'Məbləği daxil edin'); return; }
  if (!days || days < 1) { fbErr('bid-err', 'Müddəti daxil edin'); return; }
  if (cover.length < 20) { fbErr('bid-err', 'Müraciət məktubu ən az 20 simvol olmalıdır'); return; }
  const btn = document.getElementById('bid-btn');
  btn.disabled = true; btn.textContent = '⏳ Göndərilir...';
  try {
    const existing = await getDocs(query(collection(db, 'bids'),
      where('jobId', '==', jobId), where('freelancerId', '==', user.uid)));
    if (!existing.empty) {
      fbErr('bid-err', 'Bu elanda artıq təklifiniz var');
      btn.disabled = false; btn.textContent = 'Təklifi göndər 🚀';
      return;
    }
    const d = FB.userData;
    await addDoc(collection(db, 'bids'), {
      jobId,
      freelancerId: user.uid,
      freelancerName: d?.name || user.email.split('@')[0],
      freelancerTitle: d?.title || '',
      freelancerRating: d?.rating || 0,
      freelancerPlan: d?.plan || 'free',
      amount, days, cover,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    try {
      const js = await getDoc(doc(db, 'jobs', jobId));
      await updateDoc(doc(db, 'jobs', jobId), { bids: (js.data()?.bids || 0) + 1 });
    } catch(e) {}
    closeBid();
    showToast('Təklifiniz göndərildi! 🎉');
    document.dispatchEvent(new CustomEvent('bid-sent', { detail: { jobId } }));
  } catch(e) {
    fbErr('bid-err', 'Xəta: ' + e.message);
    btn.disabled = false; btn.textContent = 'Təklifi göndər 🚀';
  }
};

// ===== POST JOB MODAL (shared) =====
function renderPostJobModal() {
  if (document.getElementById('modal-postjob')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
  <div class="modal-bg" id="modal-postjob">
    <div class="modal modal-wide">
      <button class="modal-x" onclick="closePostJob()">✕</button>
      <h2>${t('pj_t')}</h2>
      <p class="sub">${t('pj_sub')}</p>
      <div class="form-group"><label class="form-label">${t('pj_title')}</label>
        <input class="form-input" id="pj-title" placeholder="Məs: E-ticarət saytı üçün logo dizaynı"></div>
      <div class="form-group"><label class="form-label">${t('pj_cat')}</label>
        <select class="form-select" id="pj-cat">
          <option>Dizayn</option><option>Proqramlaşdırma</option><option>Kopiraytinq</option>
          <option>SMM & Marketing</option><option>Video & Animasiya</option><option>Tərcümə</option>
          <option>Data & Analitika</option><option>Audio & Musiqi</option><option>Digər</option>
        </select></div>
      <div class="form-group"><label class="form-label">${t('pj_desc')}</label>
        <textarea class="form-textarea" id="pj-desc" placeholder="Nə istədiyinizi ətraflı yazın: tələblər, gözləntilər, nümunələr..."></textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">${t('pj_budget')}</label>
          <input class="form-input" id="pj-budget" type="number" placeholder="500"></div>
        <div class="form-group"><label class="form-label">${t('pj_days')}</label>
          <input class="form-input" id="pj-deadline" type="number" placeholder="7"></div>
      </div>
      <div id="pj-err" class="err-box"></div>
      <button class="btn btn-green" id="pj-btn" style="width:100%;" onclick="fbPostJob()">${t('pj_send')}</button>
      <p style="font-size:12px;color:var(--ink3);text-align:center;margin-top:10px;">${t('pj_note')}</p>
    </div>
  </div>`;
  document.body.appendChild(wrap.firstElementChild);
  document.getElementById('modal-postjob').addEventListener('click', e => {
    if (e.target.id === 'modal-postjob') closePostJob();
  });
}

window.openPostJob = function() {
  if (!FB.user) { openAuth('register'); return; }
  const role = FB.userData?.role;
  if (role === 'freelancer') { showToast('Freelancer hesabı ilə elan verilə bilməz'); return; }
  renderPostJobModal();
  document.getElementById('modal-postjob').classList.add('open');
};
window.closePostJob = function() {
  document.getElementById('modal-postjob')?.classList.remove('open');
};

window.fbPostJob = async function() {
  if (!FB.user) { openAuth('login'); return; }
  const title = document.getElementById('pj-title').value.trim();
  const cat = document.getElementById('pj-cat').value;
  const desc = document.getElementById('pj-desc').value.trim();
  const budget = parseInt(document.getElementById('pj-budget').value);
  const deadline = parseInt(document.getElementById('pj-deadline').value) || 7;
  if (!title || !desc || !budget) { fbErr('pj-err', 'Başlıq, təsvir və büdcə mütləqdir'); return; }
  const btn = document.getElementById('pj-btn');
  btn.disabled = true; btn.textContent = '⏳ Göndərilir...';
  try {
    await addDoc(collection(db, 'jobs'), {
      title, category: cat, description: desc, budget, deadline,
      clientId: FB.user.uid,
      clientName: FB.userData?.name || 'Müştəri',
      status: 'pending', bids: 0,
      createdAt: serverTimestamp()
    });
    closePostJob();
    showToast('Elanınız moderasiyaya göndərildi! ⏳');
    document.dispatchEvent(new CustomEvent('job-posted'));
  } catch(e) {
    fbErr('pj-err', e.code === 'permission-denied'
      ? 'İcazə xətası — Firestore Rules yoxlayın'
      : 'Xəta: ' + e.message);
  }
  btn.disabled = false; btn.textContent = 'Elanı paylaş 🚀';
};

// ===== SHARED RENDER HELPERS =====
window.jobCardHtml = function(j) {
  return `
  <div class="job-card" onclick="location.href='job.html?id=${j.id}'">
    <div class="job-top">
      <div class="job-title">${esc(j.title)}</div>
      <div class="job-price">₼${esc(j.budget)}</div>
    </div>
    <div class="job-desc">${esc((j.description||'').substring(0,130))}${(j.description||'').length>130?'…':''}</div>
    <div class="tags"><span class="tag">${esc(j.category)}</span></div>
    <div class="job-foot">
      <div class="job-meta"><span>⏱ ${esc(j.deadline)} gün</span><span>💬 ${j.bids||0} təklif</span><span>${timeAgo(j.createdAt)}</span></div>
      <button class="btn btn-line btn-sm" onclick="event.stopPropagation();openBid('${j.id}','${esc(j.title)}')">Təklif ver</button>
    </div>
  </div>`;
};

// ===== DIRECT MESSAGE (chat open/create) =====
window.openMessage = async function(otherUid, otherName) {
  if (!FB.user) { openAuth('login'); return; }
  if (otherUid === FB.user.uid) { showToast('Özünüzə mesaj göndərə bilməzsiniz'); return; }
  const { db, collection, getDocs, addDoc, query, where, serverTimestamp } = FB;
  showToast('Söhbət açılır... 💬');
  try {
    const snap = await getDocs(query(collection(db, 'chats'), where('members', 'array-contains', FB.user.uid)));
    let chatId = null;
    snap.forEach(d => { if (d.data().members?.includes(otherUid)) chatId = d.id; });
    if (!chatId) {
      const myName = FB.userData?.name || FB.user.email.split('@')[0];
      const ref = await addDoc(collection(db, 'chats'), {
        members: [FB.user.uid, otherUid],
        memberNames: { [FB.user.uid]: myName, [otherUid]: otherName || 'İstifadəçi' },
        lastMsg: '', lastAt: serverTimestamp(), createdAt: serverTimestamp()
      });
      chatId = ref.id;
    }
    location.href = 'messages.html?chat=' + chatId;
  } catch(e) { showToast('Xəta: ' + e.message); }
};

// ===== PLANS (Pro / Business) =====
window.planBadge = function(p) {
  if (p === 'pro') return '<span class="badge" style="background:#fff4e0;color:#b97700;">⭐ PRO</span>';
  if (p === 'business') return '<span class="badge badge-blue">💼 Biznes</span>';
  return '';
};

window.requestPlan = async function(plan) {
  if (!FB.user) { openAuth('register'); return; }
  if ((FB.userData?.plan || 'free') === plan) { showToast('Bu tarif artıq aktivdir ✅'); return; }
  const { db, collection, addDoc, getDocs, query, where, serverTimestamp } = FB;
  try {
    const ex = await getDocs(query(collection(db, 'upgrades'),
      where('userId', '==', FB.user.uid), where('status', '==', 'pending')));
    if (!ex.empty) { showToast('Sorğunuz artıq baxılır ⏳'); return; }
    await addDoc(collection(db, 'upgrades'), {
      userId: FB.user.uid,
      name: FB.userData?.name || '',
      email: FB.user.email,
      role: FB.userData?.role || '',
      plan, status: 'pending', createdAt: serverTimestamp()
    });
    showToast('Sorğunuz göndərildi! Ödəniş üçün sizinlə əlaqə saxlanılacaq 📩');
  } catch(e) { showToast('Xəta: ' + e.message); }
};

// ===== INIT =====
renderHeader();
renderFooter();
applyI18n();
