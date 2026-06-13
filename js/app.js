// ===== FREELAN.AZ — Shared Firebase + UI module =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
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
hw_h:'Necə işləyir? 🛠',hw_s:'Freelan.az-da iş prosesi — sadə, şəffaf, təhlükəsiz',hw_c:'💼 Müştərilər üçün',hw_f:'🧑‍💻 Freelancerlər üçün',hw_start:'İndi başla →',
ta_now:'indicə',ta_min:'dəq əvvəl',ta_hr:'saat əvvəl',ta_day:'gün əvvəl',
day_s:'gün',offers:'təklif',bid_sm:'Təklif ver',new_lbl:'Yeni',per_hour:'/saat',work_s:'iş',user_lbl:'İstifadəçi',loading:'Yüklənir...',load_fail:'Yüklənmədi',no_results:'Nəticə tapılmadı',no_cat:'Bu kateqoriyada elan yoxdur',reset_filter:'Filtri sıfırla',jobs_found:'tapşırıq tapıldı',fl_word:'freelancer',
st_open:'Açıq',st_progress:'Davam edir',st_pending:'Moderasiyada',st_done:'Tamamlanıb',st_wait:'Gözləyir',st_accepted:'✅ Qəbul edildi',
jd_desc:'Təsvir',jd_props:'Təkliflər',jd_no_props:'Hələ təklif yoxdur — ilk sən ol!',jd_fixed:'Sabit qiymət',jd_bid_sent:'Təklifiniz göndərilib',jd_send:'Təklif göndər →',jd_yours:'Bu sizin elanınızdır',jd_cat:'Kateqoriya',jd_dur:'Müddət',jd_posted:'Yerləşdirilib',jd_client:'MÜŞTƏRİ',jd_back:'← Tapşırıqlara qayıt',jd_nf:'Bu elan mövcud deyil və ya silinib',accept:'Qəbul et',msg_btn:'💬 Mesaj',msg_send:'💬 Mesaj göndər',
pf_about:'Haqqında',pf_reviews:'Rəylər',pf_done:'tamamlanmış iş',pf_all:'← Bütün freelancerlər',pf_nf:'Bu istifadəçi mövcud deyil',
db_overview:'📊 İcmal',db_myjobs:'📋 Elanlarım',db_mybids:'💼 Təkliflərim',db_active:'🔄 Aktiv işlər',db_msgs:'💬 Mesajlar',db_set:'⚙️ Tənzimləmələr',db_balance:'Balans',db_done:'Tamamlanan',db_activew:'Aktiv iş',db_rating:'Reytinq',db_hello:'Salam',db_newjob:'+ Yeni elan',db_newjob_cta:'+ Yeni elan ver',db_find:'İş axtar →',db_client:'Müştəri',db_nojobs:'Hələ elan verməmisiniz',db_first:'+ İlk elanı ver',db_nobids:'Hələ təklif verməmisiniz',db_noactive:'Aktiv iş yoxdur',db_flworking:'Freelancer işləyir',db_acceptw:'✅ İşi qəbul et',db_saved:'✅ Yadda saxlanıldı',deleted_job:'(silinmiş elan)',auth_req:'Panelə daxil olmaq üçün hesabınıza giriş edin',
set_title:'İxtisas başlığı',set_title_s:'(məs: UI/UX Dizayner)',set_skills:'Bacarıqlar',set_skills_s:'(vergüllə ayırın)',set_rate:'Saatlıq qiymət (₼)',save:'Yadda saxla',
rate_t:'Freelanceri qiymətləndirin ⭐',rate_c:'Rəyiniz',rate_opt:'(istəyə bağlı)',rate_send:'Rəyi göndər ⭐',skip:'Keç',
cf_done:'İşi qəbul edib tamamlamaq istəyirsiniz?',cf_bid:'Bu təklifi qəbul etmək istəyirsiniz? İş bu freelancerə tapşırılacaq.',
ms_pick:'Söhbət seçin',ms_pick2:'Söhbət başlatmaq üçün sol tərəfdən kontakt seçin',ms_ph:'Mesaj yazın...',ms_send:'Göndər',ms_none:'Hələ söhbət yoxdur.<br>Elan səhifəsindən freelancerlə əlaqə qura bilərsiniz.',ms_first:'İlk mesajı göndərin',ms_auth:'Mesajlara baxmaq üçün hesabınıza daxil olun',
ct_h:'Əlaqə 📬',ct_s:'Sual, təklif və ya problemlə bağlı bizə yazın',ct_name:'Adınız',ct_subject:'Mövzu',ct_msg:'Mesajınız',ct_msg_ph:'Mesajınızı yazın...',ct_send:'Göndər 📨',ct_fill:'Bütün xanaları doldurun',ct_ok:'✅ Mesajınız göndərildi! Tezliklə cavab verəcəyik.',
ab_h:'Haqqımızda 🇦🇿',ab_s:'Freelan.az — Azərbaycanın ilk freelance platforması',ab_m_h:'Missiyamız',ab_m_p:'Azərbaycanda minlərlə istedadlı dizayner, proqramçı, kopirayter və digər mütəxəssis var. Eyni zamanda minlərlə biznes keyfiyyətli xidmət axtarır. Freelan.az bu iki tərəfi bir araya gətirir — yerli, etibarlı və azərbaycandilli platformada.',ab_w_h:'Niyə Freelan.az?',ab_w_l:'<li><b>Yerli bazar:</b> Azərbaycan müştəriləri və mütəxəssisləri — eyni dil, eyni valyuta (₼), eyni saat qurşağı.</li><li><b>Escrow təhlükəsizliyi:</b> Pul iş qəbul edilənə qədər platformada saxlanılır.</li><li><b>Moderasiya:</b> Bütün elanlar yoxlanılır — keyfiyyət və etibar təmin olunur.</li><li><b>Pulsuz başlanğıc:</b> Qeydiyyat, elan vermə və təklif göndərmə pulsuzdur.</li>',ab_v_h:'Dəyərlərimiz',ab_v_l:'<li><b>Şəffaflıq</b> — gizli ödəniş yoxdur, hər şey aydındır.</li><li><b>Etibar</b> — reytinq sistemi və moderasiya ilə keyfiyyət qorunur.</li><li><b>İnkişaf</b> — yerli freelance bazarının böyüməsinə töhfə veririk.</li>',ab_c_h:'Bizimlə əlaqə',ab_c_p:'Sualınız var? <a href="contact.html" style="color:var(--green);font-weight:600;">Əlaqə səhifəsindən</a> bizə yazın.',
bl_h:'Blog 📝',bl_s:'Freelance dünyasından məsləhətlər və yeniliklər',bl1t:'Freelance karyeraya necə başlamalı?',bl1p:'İlk profili yaratmaqdan ilk müştəriyə qədər — addım-addım bələdçi. Portfolionu necə qurmalı, qiyməti necə təyin etməli...',bl2t:'Qiymət təyin etməyin 5 qaydası',bl2p:'Çox aşağı qiymət — dəyərsizləşmə, çox yüksək — müştərisizlik. Balansı necə tapmalı və qiyməti nə vaxt artırmalı...',bl3t:'Qazandıran müraciət məktubu',bl3p:'Müştərinin diqqətini çəkən təklif necə yazılır? Şablon cümlələrdən qaçın, dəyər göstərin...',bl_soon:'📅 Tezliklə',bl_note:'Blog yazıları tezliklə əlavə olunacaq. İzləmədə qalın! 👀',
nf_p:'Axtardığınız səhifə tapılmadı 😕',nf_back:'← Ana səhifəyə qayıt',
hc1t:'Qeydiyyatdan keç',hc1p:'"Müştəri" rolunu seç — 1 dəqiqə çəkir, tamamilə pulsuzdur.',hc2t:'Elan yerləşdir',hc2p:'İşi təsvir et: nə lazımdır, büdcə nə qədərdir, müddət nə qədərdir.',hc3t:'Təklifləri müqayisə et',hc3p:'Freelancerlərin qiymət, müddət və təcrübəsini yan-yana gör.',hc4t:'Qəbul et və izlə',hc4p:'Ən yaxşı təklifi qəbul et. İş bitdikdə təsdiqlə — ödəniş yalnız o zaman keçir.',
hf1t:'Profil yarat',hf1p:'"Freelancer" rolunu seç, bacarıqlarını və saatlıq qiymətini göstər.',hf2t:'İş axtar',hf2p:'Kateqoriya və açar sözlərlə sənə uyğun tapşırıqları tap.',hf3t:'Təklif göndər',hf3p:'Qiymətini, müddətini yaz və güclü müraciət məktubu ilə fərqlən.',hf4t:'İşlə və qazan',hf4p:'Müştəri işi qəbul etdikdə pul balansına köçür. Reytinqin artır.',
hw_esc_t:'🔒 Escrow — təhlükəsizliyin təminatı',hw_esc_p:'Müştəri təklifi qəbul edən kimi ödəniş escrow hesabında "dondurulur". Freelancer işin pulunun platformada olduğunu bilərək arxayın işləyir. Müştəri işi qəbul etdikdə pul avtomatik freelancerə keçir. Mübahisə yaranarsa, moderasiya komandası işə baxır.',
trust_fl:'freelancer',trust_jobs:'aktiv elan',trust_esc:'təhlükəsiz ödəniş',idx_nojobs:'Hələ elan yoxdur — ilk elanı sən ver!',idx_nofl:'İlk freelancer sən ol!',
tm_h:'İstifadə şərtləri',tm_upd:'Son yenilənmə: İyun 2026',tm1h:'1. Ümumi müddəalar',tm1p:'Freelan.az platformasından ("Platforma") istifadə etməklə siz bu İstifadə şərtlərini qəbul etmiş sayılırsınız. Şərtlərlə razı deyilsinizsə, Platformadan istifadə etməyin.',tm2h:'2. Hesab',tm2l:'<li>Qeydiyyat üçün 18 yaşınız tamam olmalıdır.</li><li>Verdiyiniz məlumatlar doğru və aktual olmalıdır.</li><li>Hesabınızın təhlükəsizliyinə görə siz məsuliyyət daşıyırsınız.</li><li>Bir şəxs yalnız bir hesab yarada bilər.</li>',tm3h:'3. Platformanın rolu',tm3p:'Freelan.az müştərilər və freelancerlər arasında vasitəçi platformadır. Tərəflər arasındakı müqavilə birbaşa onların arasındadır. Platforma işin keyfiyyətinə birbaşa zəmanət vermir, lakin mübahisələrin həllində moderasiya dəstəyi göstərir.',tm4h:'4. Ödənişlər və komissiya',tm4l:'<li>Ödənişlər escrow sistemi vasitəsilə aparılır.</li><li>Platforma tamamlanmış işdən xidmət haqqı tutur (tariflər səhifəsində göstərilir).</li><li>Platformadan kənar ödəniş razılaşmaları qadağandır və hesabın bloklanmasına səbəb olur.</li>',tm5h:'5. Qadağan olunan davranışlar',tm5l:'<li>Saxta elan, saxta profil və ya saxta rəy yerləşdirmək</li><li>Digər istifadəçiləri aldatmaq və ya təhqir etmək</li><li>Qanunsuz xidmətlər təklif etmək</li><li>Platformadan kənara əlaqə məlumatı ötürərək komissiyadan yayınmaq</li>',tm6h:'6. Hesabın dayandırılması',tm6p:'Şərtləri pozan istifadəçilərin hesabı xəbərdarlıqla və ya xəbərdarlıqsız bloklana bilər.',tm7h:'7. Dəyişikliklər',tm7p:'Platforma bu şərtləri istənilən vaxt yeniləyə bilər. Əhəmiyyətli dəyişikliklər barədə istifadəçilər məlumatlandırılır.',tm8h:'8. Əlaqə',tm8p:'Suallarınız üçün <a href="contact.html" style="color:var(--green);font-weight:600;">əlaqə səhifəsindən</a> bizə yazın.',pv_h:'Gizlilik siyasəti',pv1h:'1. Topladığımız məlumatlar',pv1l:'<li><b>Hesab məlumatları:</b> ad, e-poçt, rol (müştəri/freelancer)</li><li><b>Profil məlumatları:</b> ixtisas, bacarıqlar, saatlıq qiymət, bio (özünüz daxil etdiyiniz)</li><li><b>Fəaliyyət məlumatları:</b> elanlar, təkliflər, mesajlar, reytinqlər</li>',pv2h:'2. Məlumatlardan istifadə',pv2l:'<li>Platforma xidmətlərinin göstərilməsi (elan, təklif, mesajlaşma)</li><li>Hesabınızın təhlükəsizliyinin qorunması</li><li>Xidmət keyfiyyətinin yaxşılaşdırılması</li>',pv2p:'Məlumatlarınızı üçüncü tərəflərə satmırıq.',pv3h:'3. Məlumatların saxlanması',pv3p:'Məlumatlar Google Firebase infrastrukturunda təhlükəsiz şəkildə saxlanılır. Şifrələr heşlənmiş formada qorunur və heç kim (platforma daxil olmaqla) onları görə bilməz.',pv4h:'4. İctimai görünən məlumatlar',pv4p:'Freelancer profili (ad, ixtisas, bacarıqlar, reytinq) digər istifadəçilərə görünür. E-poçt ünvanınız ictimai göstərilmir.',pv5h:'5. Hüquqlarınız',pv5l:'<li>Profil məlumatlarınızı istənilən vaxt dəyişə bilərsiniz</li><li>Hesabınızın silinməsini tələb edə bilərsiniz</li><li>Məlumatlarınızın hansılarının saxlandığını soruşa bilərsiniz</li>',pv6h:'6. Cookie-lər',pv6p:'Platforma giriş sessiyasını saxlamaq üçün zəruri texniki cookie-lərdən istifadə edir.',pv7h:'7. Əlaqə',pv7p:'Gizliliklə bağlı suallar üçün <a href="contact.html" style="color:var(--green);font-weight:600;">əlaqə səhifəsindən</a> yazın.',rl_h:'Platforma qaydaları',rl_upd:'Bütün istifadəçilər üçün məcburidir',rl1h:'📋 Elan qaydaları',rl1l:'<li>Elan başlığı və təsviri aydın, konkret olmalıdır</li><li>Büdcə real bazara uyğun göstərilməlidir</li><li>Bir iş üçün yalnız bir elan yerləşdirilməlidir</li><li>Qanunsuz, etik olmayan və ya aldadıcı elanlar qadağandır</li><li>Bütün elanlar dərc olunmazdan əvvəl moderasiyadan keçir</li>',rl2h:'💼 Təklif qaydaları',rl2l:'<li>Yalnız yerinə yetirə biləcəyiniz işlərə təklif göndərin</li><li>Müraciət məktubu konkret elana aid olmalıdır — kopyala-yapışdır şablonlardan çəkinin</li><li>Qəbul edilmiş təklifdən əsassız imtina reytinqə mənfi təsir edir</li>',rl3h:'💬 Ünsiyyət qaydaları',rl3l:'<li>Hörmətli və peşəkar ünsiyyət məcburidir</li><li>Təhqir, hədə və spam qadağandır</li><li>Platformadan kənar ödənişə yönləndirmə qadağandır</li>',rl4h:'⭐ Reytinq qaydaları',rl4l:'<li>Rəylər yalnız real əməkdaşlıq təcrübəsinə əsaslanmalıdır</li><li>Saxta rəy yazmaq və ya rəy almaq üçün ödəniş təklif etmək qadağandır</li>',rl5h:'🚫 Pozuntuların nəticələri',rl5l:'<li><b>1-ci pozuntu:</b> xəbərdarlıq</li><li><b>2-ci pozuntu:</b> müvəqqəti məhdudiyyət</li><li><b>Ağır pozuntu:</b> hesabın daimi bloklanması</li>',g_btn:'Google ilə davam et',au_or:'və ya',g_err:'Google ilə giriş alınmadı',ev_banner:'E-poçt ünvanınız təsdiqlənməyib — poçt qutunuzu yoxlayın.',ev_resend:'Təsdiq linkini göndər',ev_sent:'Təsdiq e-poçtu göndərildi',ev_wait:'Bir az sonra yenidən cəhd edin',th_dark:'Qaranlıq rejim',th_light:'İşıqlı rejim',fp_link:'Şifrəni unutdum?',fp_t:'Şifrəni sıfırla 🔑',fp_sub:'E-poçtunuzu daxil edin — sıfırlama linki göndərək',fp_btn:'Sıfırlama linkini göndər',fp_sent:'✅ Sıfırlama linki e-poçtunuza göndərildi. Poçt qutunuzu yoxlayın.',fp_back:'← Girişə qayıt',fp_err:'E-poçt ünvanını daxil edin',fp_nf:'Bu e-poçtla hesab tapılmadı',ph_t:'Profil şəkli',ph_upload:'📷 Şəkil yüklə',ph_change:'Şəkli dəyiş',ph_remove:'Sil',ph_big:'Şəkil çox böyükdür (maks. 5MB)',ph_bad:'Yalnız şəkil faylı yükləyin',ph_saved:'✅ Şəkil yadda saxlanıldı',
rl_p:'Pozuntu gördünüz? <a href="contact.html" style="color:var(--green);font-weight:600;">Bizə bildirin</a> — hər müraciətə baxılır.'},
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
hw_h:'Как это работает? 🛠',hw_s:'Процесс работы на Freelan.az — просто, прозрачно, безопасно',hw_c:'💼 Для клиентов',hw_f:'🧑‍💻 Для фрилансеров',hw_start:'Начать сейчас →',
ta_now:'только что',ta_min:'мин назад',ta_hr:'ч назад',ta_day:'дн назад',
day_s:'дн.',offers:'предл.',bid_sm:'Предложить',new_lbl:'Новый',per_hour:'/час',work_s:'работ',user_lbl:'Пользователь',loading:'Загрузка...',load_fail:'Не загрузилось',no_results:'Ничего не найдено',no_cat:'В этой категории нет заказов',reset_filter:'Сбросить фильтр',jobs_found:'заказов найдено',fl_word:'фрилансеров',
st_open:'Открыт',st_progress:'В работе',st_pending:'На модерации',st_done:'Завершён',st_wait:'Ожидает',st_accepted:'✅ Принято',
jd_desc:'Описание',jd_props:'Предложения',jd_no_props:'Пока нет предложений — будь первым!',jd_fixed:'Фиксированная цена',jd_bid_sent:'Ваше предложение отправлено',jd_send:'Отправить предложение →',jd_yours:'Это ваш заказ',jd_cat:'Категория',jd_dur:'Срок',jd_posted:'Размещено',jd_client:'КЛИЕНТ',jd_back:'← Назад к заказам',jd_nf:'Этот заказ не существует или был удалён',accept:'Принять',msg_btn:'💬 Написать',msg_send:'💬 Написать сообщение',
pf_about:'О себе',pf_reviews:'Отзывы',pf_done:'завершённых работ',pf_all:'← Все фрилансеры',pf_nf:'Этот пользователь не существует',
db_overview:'📊 Обзор',db_myjobs:'📋 Мои заказы',db_mybids:'💼 Мои предложения',db_active:'🔄 Активные работы',db_msgs:'💬 Сообщения',db_set:'⚙️ Настройки',db_balance:'Баланс',db_done:'Завершено',db_activew:'Активных',db_rating:'Рейтинг',db_hello:'Привет',db_newjob:'+ Новый заказ',db_newjob_cta:'+ Разместить заказ',db_find:'Искать работу →',db_client:'Клиент',db_nojobs:'Вы ещё не размещали заказы',db_first:'+ Разместить первый заказ',db_nobids:'Вы ещё не отправляли предложений',db_noactive:'Нет активных работ',db_flworking:'Фрилансер работает',db_acceptw:'✅ Принять работу',db_saved:'✅ Сохранено',deleted_job:'(удалённый заказ)',auth_req:'Войдите в аккаунт, чтобы открыть панель',
set_title:'Специальность',set_title_s:'(напр: UI/UX Дизайнер)',set_skills:'Навыки',set_skills_s:'(через запятую)',set_rate:'Почасовая ставка (₼)',save:'Сохранить',
rate_t:'Оцените фрилансера ⭐',rate_c:'Ваш отзыв',rate_opt:'(необязательно)',rate_send:'Отправить отзыв ⭐',skip:'Пропустить',
cf_done:'Принять и завершить эту работу?',cf_bid:'Принять это предложение? Работа будет поручена этому фрилансеру.',
ms_pick:'Выберите чат',ms_pick2:'Выберите контакт слева, чтобы начать чат',ms_ph:'Напишите сообщение...',ms_send:'Отправить',ms_none:'Пока нет чатов.<br>Свяжитесь с фрилансером со страницы заказа.',ms_first:'Отправьте первое сообщение',ms_auth:'Войдите, чтобы открыть сообщения',
ct_h:'Контакты 📬',ct_s:'Напишите нам по вопросам, предложениям или проблемам',ct_name:'Ваше имя',ct_subject:'Тема',ct_msg:'Ваше сообщение',ct_msg_ph:'Напишите сообщение...',ct_send:'Отправить 📨',ct_fill:'Заполните все поля',ct_ok:'✅ Ваше сообщение отправлено! Скоро ответим.',
ab_h:'О нас 🇦🇿',ab_s:'Freelan.az — первая фриланс-платформа Азербайджана',ab_m_h:'Наша миссия',ab_m_p:'В Азербайджане тысячи талантливых дизайнеров, программистов, копирайтеров и других специалистов. В то же время тысячи бизнесов ищут качественные услуги. Freelan.az объединяет обе стороны — на локальной, надёжной платформе.',ab_w_h:'Почему Freelan.az?',ab_w_l:'<li><b>Локальный рынок:</b> азербайджанские клиенты и специалисты — один язык, одна валюта (₼), один часовой пояс.</li><li><b>Безопасность escrow:</b> деньги хранятся на платформе до приёмки работы.</li><li><b>Модерация:</b> все заказы проверяются — качество и доверие гарантированы.</li><li><b>Бесплатный старт:</b> регистрация, размещение заказов и предложения бесплатны.</li>',ab_v_h:'Наши ценности',ab_v_l:'<li><b>Прозрачность</b> — никаких скрытых платежей, всё понятно.</li><li><b>Доверие</b> — качество защищено рейтингами и модерацией.</li><li><b>Развитие</b> — мы вносим вклад в рост местного фриланс-рынка.</li>',ab_c_h:'Связаться с нами',ab_c_p:'Есть вопрос? Напишите нам через <a href="contact.html" style="color:var(--green);font-weight:600;">страницу контактов</a>.',
bl_h:'Блог 📝',bl_s:'Советы и новости из мира фриланса',bl1t:'Как начать карьеру фрилансера?',bl1p:'От создания первого профиля до первого клиента — пошаговый гид. Как собрать портфолио, как назначить цену...',bl2t:'5 правил ценообразования',bl2p:'Слишком низкая цена — обесценивание, слишком высокая — без клиентов. Как найти баланс и когда поднимать цену...',bl3t:'Сопроводительное письмо, которое выигрывает',bl3p:'Как написать предложение, привлекающее внимание клиента? Избегайте шаблонных фраз, показывайте ценность...',bl_soon:'📅 Скоро',bl_note:'Статьи блога скоро появятся. Следите за обновлениями! 👀',
nf_p:'Страница не найдена 😕',nf_back:'← Вернуться на главную',
hc1t:'Зарегистрируйтесь',hc1p:'Выберите роль «Клиент» — это займёт 1 минуту, совершенно бесплатно.',hc2t:'Разместите заказ',hc2p:'Опишите задачу: что нужно, какой бюджет, какие сроки.',hc3t:'Сравните предложения',hc3p:'Смотрите цену, сроки и опыт фрилансеров рядом друг с другом.',hc4t:'Примите и следите',hc4p:'Примите лучшее предложение. Подтвердите завершение работы — только тогда проходит оплата.',
hf1t:'Создайте профиль',hf1p:'Выберите роль «Фрилансер», укажите навыки и почасовую ставку.',hf2t:'Ищите работу',hf2p:'Находите подходящие задачи по категориям и ключевым словам.',hf3t:'Отправьте предложение',hf3p:'Укажите цену, сроки и выделитесь сильным сопроводительным письмом.',hf4t:'Работайте и зарабатывайте',hf4p:'Когда клиент принимает работу, деньги поступают на баланс. Рейтинг растёт.',
hw_esc_t:'🔒 Escrow — гарантия безопасности',hw_esc_p:'Как только клиент принимает предложение, оплата «замораживается» на escrow-счёте. Фрилансер спокойно работает, зная, что деньги на платформе. Когда клиент принимает работу, деньги автоматически переходят фрилансеру. При споре подключается команда модерации.',
trust_fl:'фрилансеров',trust_jobs:'активных заказов',trust_esc:'безопасная оплата',idx_nojobs:'Пока нет заказов — разместите первый!',idx_nofl:'Станьте первым фрилансером!',
tm_h:'Условия использования',tm_upd:'Последнее обновление: июнь 2026',tm1h:'1. Общие положения',tm1p:'Используя платформу Freelan.az («Платформа»), вы принимаете настоящие Условия использования. Если вы не согласны с условиями, не используйте Платформу.',tm2h:'2. Аккаунт',tm2l:'<li>Для регистрации вам должно быть не менее 18 лет.</li><li>Предоставленные данные должны быть достоверными и актуальными.</li><li>Вы несёте ответственность за безопасность своего аккаунта.</li><li>Одно лицо может создать только один аккаунт.</li>',tm3h:'3. Роль платформы',tm3p:'Freelan.az — платформа-посредник между клиентами и фрилансерами. Договор между сторонами заключается напрямую между ними. Платформа не даёт прямой гарантии качества работы, но оказывает модерационную поддержку при разрешении споров.',tm4h:'4. Платежи и комиссия',tm4l:'<li>Платежи проводятся через систему escrow.</li><li>Платформа удерживает сервисный сбор с завершённой работы (указан на странице тарифов).</li><li>Договорённости об оплате вне платформы запрещены и ведут к блокировке аккаунта.</li>',tm5h:'5. Запрещённые действия',tm5l:'<li>Размещение фейковых заказов, профилей или отзывов</li><li>Обман или оскорбление других пользователей</li><li>Предложение незаконных услуг</li><li>Передача контактов для обхода комиссии вне платформы</li>',tm6h:'6. Приостановка аккаунта',tm6p:'Аккаунты пользователей, нарушающих условия, могут быть заблокированы с предупреждением или без него.',tm7h:'7. Изменения',tm7p:'Платформа может обновлять эти условия в любое время. О существенных изменениях пользователи будут уведомлены.',tm8h:'8. Контакты',tm8p:'По вопросам пишите нам через <a href="contact.html" style="color:var(--green);font-weight:600;">страницу контактов</a>.',pv_h:'Политика конфиденциальности',pv1h:'1. Какие данные мы собираем',pv1l:'<li><b>Данные аккаунта:</b> имя, e-mail, роль (клиент/фрилансер)</li><li><b>Данные профиля:</b> специализация, навыки, почасовая ставка, био (введённые вами)</li><li><b>Данные активности:</b> заказы, предложения, сообщения, рейтинги</li>',pv2h:'2. Как мы используем данные',pv2l:'<li>Предоставление услуг платформы (заказы, предложения, сообщения)</li><li>Защита безопасности вашего аккаунта</li><li>Улучшение качества сервиса</li>',pv2p:'Мы не продаём ваши данные третьим лицам.',pv3h:'3. Хранение данных',pv3p:'Данные надёжно хранятся в инфраструктуре Google Firebase. Пароли хранятся в хешированном виде, и никто (включая платформу) не может их увидеть.',pv4h:'4. Публично видимые данные',pv4p:'Профиль фрилансера (имя, специализация, навыки, рейтинг) виден другим пользователям. Ваш e-mail публично не отображается.',pv5h:'5. Ваши права',pv5l:'<li>Вы можете изменить данные профиля в любое время</li><li>Вы можете запросить удаление аккаунта</li><li>Вы можете узнать, какие данные о вас хранятся</li>',pv6h:'6. Cookie',pv6p:'Платформа использует только необходимые технические cookie для сохранения сессии входа.',pv7h:'7. Контакты',pv7p:'По вопросам конфиденциальности пишите через <a href="contact.html" style="color:var(--green);font-weight:600;">страницу контактов</a>.',rl_h:'Правила платформы',rl_upd:'Обязательны для всех пользователей',rl1h:'📋 Правила размещения заказов',rl1l:'<li>Заголовок и описание заказа должны быть ясными и конкретными</li><li>Бюджет должен соответствовать реальному рынку</li><li>Для одной работы размещается только один заказ</li><li>Незаконные, неэтичные или вводящие в заблуждение заказы запрещены</li><li>Все заказы проходят модерацию перед публикацией</li>',rl2h:'💼 Правила предложений',rl2l:'<li>Отправляйте предложения только на работы, которые можете выполнить</li><li>Сопроводительное письмо должно относиться к конкретному заказу — избегайте шаблонов «копировать-вставить»</li><li>Необоснованный отказ от принятого предложения негативно влияет на рейтинг</li>',rl3h:'💬 Правила общения',rl3l:'<li>Уважительное и профессиональное общение обязательно</li><li>Оскорбления, угрозы и спам запрещены</li><li>Перенаправление оплаты вне платформы запрещено</li>',rl4h:'⭐ Правила рейтинга',rl4l:'<li>Отзывы должны основываться только на реальном опыте сотрудничества</li><li>Писать фейковые отзывы или предлагать оплату за отзывы запрещено</li>',rl5h:'🚫 Последствия нарушений',rl5l:'<li><b>1-е нарушение:</b> предупреждение</li><li><b>2-е нарушение:</b> временное ограничение</li><li><b>Грубое нарушение:</b> постоянная блокировка аккаунта</li>',g_btn:'Продолжить с Google',au_or:'или',g_err:'Не удалось войти через Google',ev_banner:'Ваш e-mail не подтверждён — проверьте почтовый ящик.',ev_resend:'Отправить ссылку подтверждения',ev_sent:'Письмо с подтверждением отправлено',ev_wait:'Попробуйте позже',th_dark:'Тёмная тема',th_light:'Светлая тема',fp_link:'Забыли пароль?',fp_t:'Сброс пароля 🔑',fp_sub:'Введите e-mail — отправим ссылку для сброса',fp_btn:'Отправить ссылку',fp_sent:'✅ Ссылка для сброса отправлена на ваш e-mail. Проверьте почту.',fp_back:'← Назад ко входу',fp_err:'Введите адрес e-mail',fp_nf:'Аккаунт с таким e-mail не найден',ph_t:'Фото профиля',ph_upload:'📷 Загрузить фото',ph_change:'Изменить фото',ph_remove:'Удалить',ph_big:'Файл слишком большой (макс. 5MB)',ph_bad:'Загрузите только изображение',ph_saved:'✅ Фото сохранено',
rl_p:'Заметили нарушение? <a href="contact.html" style="color:var(--green);font-weight:600;">Сообщите нам</a> — каждое обращение рассматривается.'},
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
hw_h:'How it works 🛠',hw_s:'The Freelan.az workflow — simple, transparent, secure',hw_c:'💼 For clients',hw_f:'🧑‍💻 For freelancers',hw_start:'Start now →',
ta_now:'just now',ta_min:'min ago',ta_hr:'h ago',ta_day:'d ago',
day_s:'days',offers:'proposals',bid_sm:'Bid',new_lbl:'New',per_hour:'/hr',work_s:'jobs',user_lbl:'User',loading:'Loading...',load_fail:'Failed to load',no_results:'No results found',no_cat:'No jobs in this category',reset_filter:'Reset filter',jobs_found:'jobs found',fl_word:'freelancers',
st_open:'Open',st_progress:'In progress',st_pending:'Under review',st_done:'Completed',st_wait:'Pending',st_accepted:'✅ Accepted',
jd_desc:'Description',jd_props:'Proposals',jd_no_props:'No proposals yet — be the first!',jd_fixed:'Fixed price',jd_bid_sent:'Your proposal has been sent',jd_send:'Send proposal →',jd_yours:'This is your job',jd_cat:'Category',jd_dur:'Duration',jd_posted:'Posted',jd_client:'CLIENT',jd_back:'← Back to jobs',jd_nf:'This job does not exist or was deleted',accept:'Accept',msg_btn:'💬 Message',msg_send:'💬 Send message',
pf_about:'About',pf_reviews:'Reviews',pf_done:'completed jobs',pf_all:'← All freelancers',pf_nf:'This user does not exist',
db_overview:'📊 Overview',db_myjobs:'📋 My jobs',db_mybids:'💼 My proposals',db_active:'🔄 Active work',db_msgs:'💬 Messages',db_set:'⚙️ Settings',db_balance:'Balance',db_done:'Completed',db_activew:'Active',db_rating:'Rating',db_hello:'Hello',db_newjob:'+ New job',db_newjob_cta:'+ Post a new job',db_find:'Find work →',db_client:'Client',db_nojobs:'You have not posted any jobs yet',db_first:'+ Post your first job',db_nobids:'You have not sent any proposals yet',db_noactive:'No active work',db_flworking:'Freelancer is working',db_acceptw:'✅ Accept work',db_saved:'✅ Saved',deleted_job:'(deleted job)',auth_req:'Log in to access your dashboard',
set_title:'Professional title',set_title_s:'(e.g. UI/UX Designer)',set_skills:'Skills',set_skills_s:'(comma separated)',set_rate:'Hourly rate (₼)',save:'Save',
rate_t:'Rate the freelancer ⭐',rate_c:'Your review',rate_opt:'(optional)',rate_send:'Submit review ⭐',skip:'Skip',
cf_done:'Accept and complete this work?',cf_bid:'Accept this proposal? The job will be assigned to this freelancer.',
ms_pick:'Select a chat',ms_pick2:'Pick a contact on the left to start chatting',ms_ph:'Type a message...',ms_send:'Send',ms_none:'No chats yet.<br>Contact a freelancer from a job page.',ms_first:'Send the first message',ms_auth:'Log in to view your messages',
ct_h:'Contact 📬',ct_s:'Write to us about questions, suggestions or issues',ct_name:'Your name',ct_subject:'Subject',ct_msg:'Your message',ct_msg_ph:'Write your message...',ct_send:'Send 📨',ct_fill:'Please fill in all fields',ct_ok:'✅ Your message has been sent! We will reply soon.',
ab_h:'About us 🇦🇿',ab_s:"Freelan.az — Azerbaijan's first freelance platform",ab_m_h:'Our mission',ab_m_p:'Azerbaijan has thousands of talented designers, developers, copywriters and other professionals. At the same time, thousands of businesses are looking for quality services. Freelan.az brings both sides together — on a local, trusted platform.',ab_w_h:'Why Freelan.az?',ab_w_l:'<li><b>Local market:</b> Azerbaijani clients and professionals — same language, same currency (₼), same time zone.</li><li><b>Escrow security:</b> money is held on the platform until the work is accepted.</li><li><b>Moderation:</b> every job is reviewed — quality and trust are guaranteed.</li><li><b>Free start:</b> registration, posting jobs and sending proposals are free.</li>',ab_v_h:'Our values',ab_v_l:'<li><b>Transparency</b> — no hidden fees, everything is clear.</li><li><b>Trust</b> — quality is protected by ratings and moderation.</li><li><b>Growth</b> — we contribute to growing the local freelance market.</li>',ab_c_h:'Get in touch',ab_c_p:'Have a question? Write to us via the <a href="contact.html" style="color:var(--green);font-weight:600;">contact page</a>.',
bl_h:'Blog 📝',bl_s:'Tips and news from the freelance world',bl1t:'How to start a freelance career?',bl1p:'From creating your first profile to your first client — a step-by-step guide. How to build a portfolio, how to set your price...',bl2t:'5 rules of pricing',bl2p:'Too low — devaluation, too high — no clients. How to find the balance and when to raise your price...',bl3t:'A winning cover letter',bl3p:"How to write a proposal that catches the client's attention? Avoid template phrases, show value...",bl_soon:'📅 Coming soon',bl_note:'Blog posts are coming soon. Stay tuned! 👀',
nf_p:'The page you are looking for was not found 😕',nf_back:'← Back to home',
hc1t:'Sign up',hc1p:'Choose the "Client" role — takes 1 minute, completely free.',hc2t:'Post a job',hc2p:'Describe the task: what you need, your budget and deadline.',hc3t:'Compare proposals',hc3p:"See freelancers' prices, timelines and experience side by side.",hc4t:'Accept and track',hc4p:'Accept the best proposal. Approve when the work is done — only then is payment released.',
hf1t:'Create a profile',hf1p:'Choose the "Freelancer" role, list your skills and hourly rate.',hf2t:'Find work',hf2p:'Find matching tasks by category and keywords.',hf3t:'Send a proposal',hf3p:'Set your price and timeline, and stand out with a strong cover letter.',hf4t:'Work and earn',hf4p:'When the client accepts the work, money is added to your balance. Your rating grows.',
hw_esc_t:'🔒 Escrow — your safety guarantee',hw_esc_p:'As soon as the client accepts a proposal, the payment is "frozen" in escrow. The freelancer works with confidence knowing the money is on the platform. When the client approves the work, the money is automatically released. In case of a dispute, the moderation team steps in.',
trust_fl:'freelancers',trust_jobs:'active jobs',trust_esc:'secure payments',idx_nojobs:'No jobs yet — post the first one!',idx_nofl:'Be the first freelancer!',
tm_h:'Terms of Service',tm_upd:'Last updated: June 2026',tm1h:'1. General provisions',tm1p:'By using the Freelan.az platform ("Platform"), you accept these Terms of Service. If you do not agree with the terms, do not use the Platform.',tm2h:'2. Account',tm2l:'<li>You must be at least 18 years old to register.</li><li>The information you provide must be accurate and up to date.</li><li>You are responsible for the security of your account.</li><li>One person may create only one account.</li>',tm3h:'3. Role of the platform',tm3p:'Freelan.az is an intermediary platform between clients and freelancers. The agreement between the parties is made directly between them. The Platform does not directly guarantee the quality of work, but provides moderation support in dispute resolution.',tm4h:'4. Payments and fees',tm4l:'<li>Payments are processed through the escrow system.</li><li>The Platform charges a service fee on completed work (shown on the pricing page).</li><li>Off-platform payment arrangements are prohibited and lead to account suspension.</li>',tm5h:'5. Prohibited conduct',tm5l:'<li>Posting fake jobs, fake profiles or fake reviews</li><li>Deceiving or insulting other users</li><li>Offering illegal services</li><li>Sharing contact details to avoid fees off-platform</li>',tm6h:'6. Account suspension',tm6p:'Accounts of users who violate the terms may be blocked with or without warning.',tm7h:'7. Changes',tm7p:'The Platform may update these terms at any time. Users will be notified of significant changes.',tm8h:'8. Contact',tm8p:'For questions, write to us via the <a href="contact.html" style="color:var(--green);font-weight:600;">contact page</a>.',pv_h:'Privacy Policy',pv1h:'1. Information we collect',pv1l:'<li><b>Account data:</b> name, email, role (client/freelancer)</li><li><b>Profile data:</b> title, skills, hourly rate, bio (entered by you)</li><li><b>Activity data:</b> jobs, proposals, messages, ratings</li>',pv2h:'2. How we use your data',pv2l:'<li>Providing platform services (jobs, proposals, messaging)</li><li>Protecting the security of your account</li><li>Improving service quality</li>',pv2p:'We do not sell your data to third parties.',pv3h:'3. Data storage',pv3p:'Data is stored securely on Google Firebase infrastructure. Passwords are stored in hashed form and no one (including the platform) can see them.',pv4h:'4. Publicly visible information',pv4p:'A freelancer profile (name, title, skills, rating) is visible to other users. Your email address is not shown publicly.',pv5h:'5. Your rights',pv5l:'<li>You can change your profile information at any time</li><li>You can request deletion of your account</li><li>You can ask what data about you is stored</li>',pv6h:'6. Cookies',pv6p:'The platform uses only essential technical cookies to keep your login session.',pv7h:'7. Contact',pv7p:'For privacy questions, write via the <a href="contact.html" style="color:var(--green);font-weight:600;">contact page</a>.',rl_h:'Platform rules',rl_upd:'Mandatory for all users',rl1h:'📋 Job posting rules',rl1l:'<li>The job title and description must be clear and specific</li><li>The budget must reflect the real market</li><li>Only one job posting per task</li><li>Illegal, unethical or misleading jobs are prohibited</li><li>All jobs are moderated before publication</li>',rl2h:'💼 Proposal rules',rl2l:'<li>Only send proposals for work you can actually deliver</li><li>The cover letter must relate to the specific job — avoid copy-paste templates</li><li>Unjustified withdrawal from an accepted proposal negatively affects your rating</li>',rl3h:'💬 Communication rules',rl3l:'<li>Respectful and professional communication is mandatory</li><li>Insults, threats and spam are prohibited</li><li>Redirecting payment off-platform is prohibited</li>',rl4h:'⭐ Rating rules',rl4l:'<li>Reviews must be based only on real collaboration experience</li><li>Writing fake reviews or offering payment for reviews is prohibited</li>',rl5h:'🚫 Consequences of violations',rl5l:'<li><b>1st violation:</b> warning</li><li><b>2nd violation:</b> temporary restriction</li><li><b>Severe violation:</b> permanent account ban</li>',g_btn:'Continue with Google',au_or:'or',g_err:'Google sign-in failed',ev_banner:'Your email is not verified — check your inbox.',ev_resend:'Send verification link',ev_sent:'Verification email sent',ev_wait:'Try again later',th_dark:'Dark mode',th_light:'Light mode',fp_link:'Forgot password?',fp_t:'Reset password 🔑',fp_sub:'Enter your email — we will send a reset link',fp_btn:'Send reset link',fp_sent:'✅ A reset link has been sent to your email. Check your inbox.',fp_back:'← Back to login',fp_err:'Enter your email address',fp_nf:'No account found with this email',ph_t:'Profile photo',ph_upload:'📷 Upload photo',ph_change:'Change photo',ph_remove:'Remove',ph_big:'File is too large (max 5MB)',ph_bad:'Please upload an image file',ph_saved:'✅ Photo saved',
rl_p:'Spotted a violation? <a href="contact.html" style="color:var(--green);font-weight:600;">Report it to us</a> — every report is reviewed.'}
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
};

window.FB = {
  auth, db, user: null, userData: null, ready: false,
  collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc, query, limit, where, serverTimestamp
};

// ===== HELPERS =====
window.esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
window.azLower = s => String(s ?? '').toLocaleLowerCase('az-AZ');
window.clampStars = n => Math.max(0, Math.min(5, Math.round(Number(n) || 0)));

// Avatar inner content: photo <img> if present, else first letter
window.avaInner = (photo, name) => photo
  ? `<img src="${esc(photo)}" alt="${esc(name||'')}">`
  : esc(((name||'?')[0] || '?').toUpperCase());

// ===== THEME (light / dark) =====
window.applyTheme = function(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? t('th_light') : t('th_dark');
  }
};
window.currentTheme = function() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
};
window.toggleTheme = function() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
};
window.themeBtnHtml = function() {
  const dark = currentTheme() === 'dark';
  return `<button class="theme-btn" id="theme-btn" onclick="toggleTheme()" title="${dark ? t('th_light') : t('th_dark')}" aria-label="Theme">${dark ? '☀️' : '🌙'}</button>`;
};

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
  if (d < 60) return t('ta_now');
  if (d < 3600) return Math.floor(d/60) + ' ' + t('ta_min');
  if (d < 86400) return Math.floor(d/3600) + ' ' + t('ta_hr');
  return Math.floor(d/86400) + ' ' + t('ta_day');
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
      <a href="index.html" class="${act('index.html')}">${t('nav_home')}</a>
      <a href="jobs.html" class="${act('jobs.html')}">${t('nav_jobs')}</a>
      <a href="freelancers.html" class="${act('freelancers.html')}">${t('nav_freelancers')}</a>
      <a href="how-it-works.html" class="${act('how-it-works.html')}">${t('nav_how')}</a>
      <a href="pricing.html" class="${act('pricing.html')}">${t('nav_pricing')}</a>
      <a href="admin.html" id="nav-admin" style="display:none;color:var(--green);font-weight:700;">👑 Admin</a>
    </nav>
    <div class="hdr-right" id="hdr-right">
      ${themeBtnHtml()}
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
        <a href="messages.html">${t('nav_messages')}</a>
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
        <div class="auth-forgot"><a onclick="switchAuth('reset')">${t('fp_link')}</a></div>
        <div class="auth-or"><span>${t('au_or')}</span></div>
        <button class="btn btn-google" onclick="googleSignIn()"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 35.4 44 30.2 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg> ${t('g_btn')}</button>
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
        <div class="auth-or"><span>${t('au_or')}</span></div>
        <button class="btn btn-google" onclick="googleSignIn()"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 35.4 44 30.2 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg> ${t('g_btn')}</button>
        <div class="auth-sw">${t('au_have')} <a onclick="switchAuth('login')">${t('login')}</a></div>
      </div>
      <div id="auth-reset" style="display:none;">
        <h2>${t('fp_t')}</h2>
        <p class="sub">${t('fp_sub')}</p>
        <div id="reset-err" class="err-box"></div>
        <div id="reset-ok" class="ok-box"></div>
        <div class="form-group"><label class="form-label">${t('au_email')}</label>
          <input class="form-input" id="rs-email" type="email" placeholder="sizin@email.com" oninput="fbErrClear('reset-err')" onkeydown="if(event.key==='Enter')fbResetPass()"></div>
        <button class="btn btn-green" id="rs-btn" style="width:100%;" onclick="fbResetPass()">${t('fp_btn')}</button>
        <div class="auth-sw"><a onclick="switchAuth('login')">${t('fp_back')}</a></div>
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
  const rs = document.getElementById('auth-reset');
  if (rs) rs.style.display = mode === 'reset' ? 'block' : 'none';
};
window.pickRole = function(btn) {
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
};

// ===== AUTH ACTIONS =====
window.googleSignIn = async function() {
  const provider = new GoogleAuthProvider();
  try {
    const cred = await signInWithPopup(auth, provider);
    const user = cred.user;
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      // İlk dəfə Google ilə girir — profil yaradılır
      const role = document.querySelector('#auth-register .role-tab.active')?.dataset.role || 'client';
      await setDoc(ref, {
        name: user.displayName || user.email.split('@')[0],
        email: user.email, role,
        title: '', bio: '', skills: [], rate: 0,
        rating: 0, jobsDone: 0, balance: 0,
        status: 'active', createdAt: serverTimestamp()
      });
    }
    closeAuth();
    showToast('Xoş gəldiniz! 🎉');
    setTimeout(() => location.href = 'dashboard.html', 600);
  } catch(e) {
    if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') return;
    const errId = document.getElementById('auth-register')?.style.display !== 'none' ? 'reg-err' : 'login-err';
    fbErr(errId, t('g_err') + (e.code ? ' (' + e.code + ')' : ''));
  }
};

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
    try { await sendEmailVerification(cred.user); } catch(_) {}
    showToast('Xoş gəldiniz, ' + name + '! 📬 ' + t('ev_sent'));
    setTimeout(() => location.href = 'dashboard.html', 1200);
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

// ===== PASSWORD RESET =====
window.fbResetPass = async function() {
  const email = document.getElementById('rs-email').value.trim();
  if (!email) { fbErr('reset-err', t('fp_err')); return; }
  const btn = document.getElementById('rs-btn');
  btn.disabled = true; btn.textContent = '⏳...';
  try {
    await sendPasswordResetEmail(auth, email);
    const ok = document.getElementById('reset-ok');
    ok.textContent = t('fp_sent'); ok.style.display = 'block';
    fbErrClear('reset-err');
    btn.textContent = t('fp_btn');
  } catch(e) {
    const msg = e.code === 'auth/user-not-found' ? t('fp_nf') :
                e.code === 'auth/invalid-email' ? 'E-poçt düzgün deyil' : 'Xəta: ' + e.message;
    fbErr('reset-err', msg);
    btn.disabled = false; btn.textContent = t('fp_btn');
  }
};

// ===== EMAIL VERIFICATION BANNER =====
function showVerifyBanner() {
  if (document.getElementById('verify-banner')) return;
  const hdr = document.querySelector('header');
  if (!hdr) return;
  const bar = document.createElement('div');
  bar.id = 'verify-banner';
  bar.className = 'verify-banner';
  bar.innerHTML = `⚠️ ${t('ev_banner')} <button onclick="resendVerify(this)">${t('ev_resend')}</button>`;
  hdr.insertAdjacentElement('afterend', bar);
}
window.resendVerify = async function(btn) {
  if (!FB.user) return;
  btn.disabled = true;
  try {
    await sendEmailVerification(FB.user);
    btn.textContent = '✅ ' + t('ev_sent');
  } catch(e) {
    btn.textContent = e.code === 'auth/too-many-requests' ? t('ev_wait') : '❌';
    setTimeout(() => { btn.disabled = false; btn.textContent = t('ev_resend'); }, 30000);
  }
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
    if (user.providerData.some(p => p.providerId === 'password') && !user.emailVerified) showVerifyBanner();
  } else {
    FB.userData = null;
  }
  FB.ready = true;
  document.dispatchEvent(new CustomEvent('fb-ready', { detail: { user, userData: FB.userData } }));
});

window.updateHeaderUser = function() {
  const right = document.getElementById('hdr-right');
  if (!right || !FB.user) return;
  const d = FB.userData;
  const name = d?.name || FB.user.email.split('@')[0];
  const role = d?.role || 'client';
  right.innerHTML = `
    ${themeBtnHtml()}
    ${langSelHtml()}
    <a class="user-chip" href="dashboard.html">
      <div class="avatar">${avaInner(d?.photo, name)}</div><span>${esc(name)}</span>
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
  if (amount > 100000) { fbErr('bid-err', 'Məbləğ ən çox 100 000 ₼ ola bilər'); return; }
  if (!days || days < 1) { fbErr('bid-err', 'Müddəti daxil edin'); return; }
  if (days > 365) { fbErr('bid-err', 'Müddət ən çox 365 gün ola bilər'); return; }
  if (cover.length < 20) { fbErr('bid-err', 'Müraciət məktubu ən az 20 simvol olmalıdır'); return; }
  if (cover.length > 1500) { fbErr('bid-err', 'Müraciət məktubu ən çox 1500 simvol ola bilər'); return; }
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
  if (title.length < 10) { fbErr('pj-err', 'Başlıq ən az 10 simvol olmalıdır'); return; }
  if (title.length > 100) { fbErr('pj-err', 'Başlıq ən çox 100 simvol ola bilər'); return; }
  if (desc.length < 30) { fbErr('pj-err', 'Təsvir ən az 30 simvol olmalıdır'); return; }
  if (desc.length > 3000) { fbErr('pj-err', 'Təsvir ən çox 3000 simvol ola bilər'); return; }
  if (budget < 5) { fbErr('pj-err', 'Büdcə ən az 5 ₼ olmalıdır'); return; }
  if (budget > 100000) { fbErr('pj-err', 'Büdcə ən çox 100 000 ₼ ola bilər'); return; }
  if (deadline < 1 || deadline > 365) { fbErr('pj-err', 'Müddət 1-365 gün arası olmalıdır'); return; }
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
      <div class="job-meta"><span>⏱ ${esc(j.deadline)} ${t('day_s')}</span><span>💬 ${j.bids||0} ${t('offers')}</span><span>${timeAgo(j.createdAt)}</span></div>
      <button class="btn btn-line btn-sm" onclick="event.stopPropagation();openBid('${j.id}','${esc(j.title)}')">${t('bid_sm')}</button>
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
// Tema: inline <head> skripti data-theme təyin edir; burada ehtiyat tətbiq
(function initTheme(){
  if (!document.documentElement.getAttribute('data-theme')) {
    let th = null;
    try { th = localStorage.getItem('theme'); } catch(_) {}
    if (!th) th = (window.matchMedia && matchMedia('(prefers-color-scheme:dark)').matches) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', th);
  }
})();
renderHeader();
renderFooter();
applyI18n();
