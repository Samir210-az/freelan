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
      <a href="jobs.html" class="${act('jobs.html')}">Tapşırıqlar</a>
      <a href="freelancers.html" class="${act('freelancers.html')}">Freelancerlər</a>
      <a href="how-it-works.html" class="${act('how-it-works.html')}">Necə işləyir</a>
      <a href="pricing.html" class="${act('pricing.html')}">Tariflər</a>
      <a href="admin.html" id="nav-admin" style="display:none;color:var(--green);font-weight:700;">👑 Admin</a>
    </nav>
    <div class="hdr-right" id="hdr-right">
      <button class="btn btn-ghost btn-sm" onclick="openAuth('login')">Daxil ol</button>
      <button class="btn btn-green btn-sm" onclick="openAuth('register')">Qeydiyyat</button>
      <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="index.html">Ana səhifə</a>
    <a href="jobs.html">Tapşırıqlar</a>
    <a href="freelancers.html">Freelancerlər</a>
    <a href="how-it-works.html">Necə işləyir</a>
    <a href="pricing.html">Tariflər</a>
    <a href="messages.html">Mesajlar</a>
  </div>`;
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
        <p class="ftr-desc">Azərbaycanın ilk freelance platforması. Müştərilər və peşəkarlar üçün etibarlı iş bazarı.</p>
      </div>
      <div>
        <h4>Platform</h4>
        <a href="jobs.html">Tapşırıqlar</a>
        <a href="freelancers.html">Freelancerlər</a>
        <a href="how-it-works.html">Necə işləyir</a>
        <a href="pricing.html">Tariflər</a>
      </div>
      <div>
        <h4>Şirkət</h4>
        <a href="about.html">Haqqımızda</a>
        <a href="blog.html">Blog</a>
        <a href="contact.html">Əlaqə</a>
      </div>
      <div>
        <h4>Hüquqi</h4>
        <a href="terms.html">İstifadə şərtləri</a>
        <a href="privacy.html">Gizlilik siyasəti</a>
        <a href="rules.html">Qaydalar</a>
      </div>
    </div>
    <div class="ftr-bottom">
      <span>© 2026 Freelan.az — Bütün hüquqlar qorunur</span>
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
        <h2>Xoş gəldiniz 👋</h2>
        <p class="sub">Hesabınıza daxil olun</p>
        <div id="login-err" class="err-box"></div>
        <div class="form-group"><label class="form-label">E-poçt</label>
          <input class="form-input" id="li-email" type="email" placeholder="sizin@email.com" oninput="fbErrClear('login-err')"></div>
        <div class="form-group"><label class="form-label">Şifrə</label>
          <input class="form-input" id="li-pass" type="password" placeholder="••••••••" oninput="fbErrClear('login-err')" onkeydown="if(event.key==='Enter')fbLogin()"></div>
        <button class="btn btn-green" id="li-btn" style="width:100%;" onclick="fbLogin()">Daxil ol</button>
        <div class="auth-sw">Hesabınız yoxdur? <a onclick="switchAuth('register')">Qeydiyyat</a></div>
      </div>
      <div id="auth-register" style="display:none;">
        <h2>Qeydiyyat 🚀</h2>
        <p class="sub">Hansı rolda qatılırsınız?</p>
        <div class="role-tabs">
          <button class="role-tab active" data-role="client" onclick="pickRole(this)">💼 Müştəri<br><small style="font-weight:400;font-size:11px;">İş elanı verirəm</small></button>
          <button class="role-tab" data-role="freelancer" onclick="pickRole(this)">🧑‍💻 Freelancer<br><small style="font-weight:400;font-size:11px;">İş axtarıram</small></button>
        </div>
        <div id="reg-err" class="err-box"></div>
        <div class="form-group"><label class="form-label">Ad, Soyad</label>
          <input class="form-input" id="rg-name" placeholder="Adınız Soyadınız" oninput="fbErrClear('reg-err')"></div>
        <div class="form-group"><label class="form-label">E-poçt</label>
          <input class="form-input" id="rg-email" type="email" placeholder="sizin@email.com" oninput="fbErrClear('reg-err')"></div>
        <div class="form-group"><label class="form-label">Şifrə <small style="color:var(--ink3);">(min. 6 simvol)</small></label>
          <input class="form-input" id="rg-pass" type="password" placeholder="••••••••" oninput="fbErrClear('reg-err')" onkeydown="if(event.key==='Enter')fbRegister()"></div>
        <button class="btn btn-green" id="rg-btn" style="width:100%;" onclick="fbRegister()">Qeydiyyatdan keç</button>
        <div class="auth-sw">Artıq hesabınız var? <a onclick="switchAuth('login')">Daxil ol</a></div>
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
    <a class="user-chip" href="dashboard.html">
      <div class="avatar">${esc(name[0].toUpperCase())}</div><span>${esc(name)}</span>
    </a>
    <button class="btn btn-ghost btn-sm" onclick="fbLogout()">Çıxış</button>
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
      <h2>Təklif göndər 💼</h2>
      <p class="sub" id="bid-job-label" style="color:var(--green);font-weight:600;"></p>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Təklif məbləği (₼)</label>
          <input class="form-input" id="bid-amount" type="number" placeholder="350"></div>
        <div class="form-group"><label class="form-label">Müddət (gün)</label>
          <input class="form-input" id="bid-days" type="number" placeholder="7"></div>
      </div>
      <div class="form-group"><label class="form-label">Müraciət məktubu</label>
        <textarea class="form-textarea" id="bid-cover" placeholder="Özünüzü təqdim edin: təcrübəniz, bu işi necə yerinə yetirəcəyiniz, niyə sizi seçməlidirlər..."></textarea></div>
      <div id="bid-err" class="err-box"></div>
      <button class="btn btn-green" id="bid-btn" style="width:100%;" onclick="fbSubmitBid()">Təklifi göndər 🚀</button>
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
      <h2>Yeni elan 📋</h2>
      <p class="sub">Tapşırığınızı ətraflı təsvir edin — daha yaxşı təkliflər alın</p>
      <div class="form-group"><label class="form-label">Başlıq</label>
        <input class="form-input" id="pj-title" placeholder="Məs: E-ticarət saytı üçün logo dizaynı"></div>
      <div class="form-group"><label class="form-label">Kateqoriya</label>
        <select class="form-select" id="pj-cat">
          <option>Dizayn</option><option>Proqramlaşdırma</option><option>Kopiraytinq</option>
          <option>SMM & Marketing</option><option>Video & Animasiya</option><option>Tərcümə</option>
          <option>Data & Analitika</option><option>Audio & Musiqi</option><option>Digər</option>
        </select></div>
      <div class="form-group"><label class="form-label">Təsvir</label>
        <textarea class="form-textarea" id="pj-desc" placeholder="Nə istədiyinizi ətraflı yazın: tələblər, gözləntilər, nümunələr..."></textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Büdcə (₼)</label>
          <input class="form-input" id="pj-budget" type="number" placeholder="500"></div>
        <div class="form-group"><label class="form-label">Müddət (gün)</label>
          <input class="form-input" id="pj-deadline" type="number" placeholder="7"></div>
      </div>
      <div id="pj-err" class="err-box"></div>
      <button class="btn btn-green" id="pj-btn" style="width:100%;" onclick="fbPostJob()">Elanı paylaş 🚀</button>
      <p style="font-size:12px;color:var(--ink3);text-align:center;margin-top:10px;">Elan moderasiyadan keçdikdən sonra dərc olunur</p>
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

// ===== INIT =====
renderHeader();
renderFooter();
