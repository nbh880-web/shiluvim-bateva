'use client';
import { useState, useEffect, useCallback } from "react";

const LOGO = "/logo.png";

const T = {
  he: {
    dir: "rtl",
    nav: { home: "ראשי", units: "יחידות", reviews: "חוות דעת", contact: "צור קשר", book: "הזמינו עכשיו" },
    hero: { sub: "צימרים בגליל המערבי", title: "שילובים בטבע", desc: "חוויית אירוח יוקרתית בלב הטבע הגלילי — שקט, נוף עוצר נשימה, ופינוק ברמה אחרת", cta: "גלו את היחידות" },
    features: [
      { icon: "leaf", title: "טבע פראי", desc: "מוקפים ביערות, כרמים ונחלים שזורמים בין ההרים" },
      { icon: "spa", title: "פינוק מלא", desc: "ג'קוזי, בריכה פרטית מחוממת, סאונה וספא" },
      { icon: "wine", title: "קולינריה גלילית", desc: "ארוחת בוקר עשירה מתוצרת מקומית טרייה" },
      { icon: "lock", title: "פרטיות מוחלטת", desc: "כל יחידה מבודדת לחלוטין עם כניסה נפרדת" },
    ],
    units: { title: "היחידות שלנו", sub: "בחרו את הפינה שלכם בגן עדן", perNight: "ללילה", guests: "אורחים", all: "הכל", couple: "זוגי", family: "משפחתי", group: "קבוצתי", villa: "וילה" },
    unitDetail: { back: "חזרה ליחידות", amenities: "מתקנים ושירותים", prices: "מחירון", regular: "רגיל", weekend: "סופ\"ש", holiday: "חג/עונה", book: "שלחו פנייה", perNight: "₪ / לילה" },
    booking: { title: "שלחו פנייה", sub: "מלאו את הפרטים ונחזור אליכם בהקדם", name: "שם מלא", phone: "טלפון", email: "אימייל (אופציונלי)", unit: "יחידה מועדפת", flexible: "אני גמיש", checkin: "תאריך כניסה", checkout: "תאריך יציאה", adults: "מבוגרים", children: "ילדים", notes: "הערות / בקשות מיוחדות", send: "שליחת פנייה", success: "הפנייה נשלחה בהצלחה!", successDesc: "נחזור אליכם בהקדם. תודה!", another: "שליחת פנייה נוספת" },
    reviews: { title: "מה האורחים אומרים", sub: "חוויות של אורחים שכבר ביקרו" },
    contact: { title: "צור קשר", sub: "נשמח לענות על כל שאלה", phone: "טלפון", whatsapp: "וואטסאפ", email: "אימייל", address: "כתובת", hours: "שעות פעילות", hoursText: "א׳–ה׳ 9:00–21:00, ו׳ 9:00–14:00" },
    footer: { rights: "כל הזכויות שמורות", privacy: "מדיניות פרטיות", terms: "תקנון", cancel: "מדיניות ביטולים" },
  },
  en: {
    dir: "ltr",
    nav: { home: "Home", units: "Units", reviews: "Reviews", contact: "Contact", book: "Book Now" },
    hero: { sub: "LUXURY ZIMMER IN WESTERN GALILEE", title: "Shiluvim BaTeva", desc: "A luxurious hospitality experience in the heart of Galilean nature — tranquility, breathtaking views, and indulgence at another level", cta: "Discover Our Units" },
    features: [
      { icon: "leaf", title: "Wild Nature", desc: "Surrounded by forests, vineyards and streams flowing between the hills" },
      { icon: "spa", title: "Full Pampering", desc: "Jacuzzi, heated private pool, sauna and spa" },
      { icon: "wine", title: "Galilean Cuisine", desc: "Rich breakfast from fresh local produce" },
      { icon: "lock", title: "Complete Privacy", desc: "Each unit is fully secluded with a separate entrance" },
    ],
    units: { title: "Our Units", sub: "Choose your corner of paradise", perNight: "/ night", guests: "guests", all: "All", couple: "Couples", family: "Family", group: "Groups", villa: "Villa" },
    unitDetail: { back: "Back to units", amenities: "Amenities", prices: "Pricing", regular: "Regular", weekend: "Weekend", holiday: "Holiday", book: "Send Inquiry", perNight: "₪ / night" },
    booking: { title: "Send Inquiry", sub: "Fill in your details and we'll get back to you soon", name: "Full Name", phone: "Phone", email: "Email (optional)", unit: "Preferred Unit", flexible: "I'm flexible", checkin: "Check-in", checkout: "Check-out", adults: "Adults", children: "Children", notes: "Notes / Special Requests", send: "Send Inquiry", success: "Inquiry sent successfully!", successDesc: "We'll get back to you soon. Thank you!", another: "Send another inquiry" },
    reviews: { title: "Guest Reviews", sub: "Experiences from guests who visited" },
    contact: { title: "Contact Us", sub: "We'd love to answer any question", phone: "Phone", whatsapp: "WhatsApp", email: "Email", address: "Address", hours: "Working Hours", hoursText: "Sun–Thu 9:00–21:00, Fri 9:00–14:00" },
    footer: { rights: "All rights reserved", privacy: "Privacy Policy", terms: "Terms", cancel: "Cancellation Policy" },
  },
};

const DEFAULT_UNITS = [
  { id: "u1", name: { he: "סוויטת הזית", en: "The Olive Suite" }, description: { he: "סוויטה רומנטית עם נוף פנורמי לגליל, ג'קוזי פרטי ומרפסת מרווחת מול השקיעה", en: "Romantic suite with panoramic Galilee views, private jacuzzi and spacious sunset terrace" }, type: "couple", capacity: 2, amenities: ["ג'קוזי פרטי", "מרפסת נוף", "מיני בר", "WiFi", "מקרן", "חלוקי רחצה"], prices: { regular: 1450, weekend: 1750, holiday: 2100 }, active: true, order: 1 },
  { id: "u2", name: { he: "בקתת האלון", en: "The Oak Cabin" }, description: { he: "בקתת עץ אותנטית עם אח, מוקפת טבע ושקט מוחלט. חוויה כפרית אמיתית", en: "Authentic wooden cabin with fireplace, surrounded by nature and complete silence" }, type: "couple", capacity: 2, amenities: ["אח", "מטבחון", "חצר פרטית", "WiFi", "ערסל", "מנגל"], prices: { regular: 1200, weekend: 1500, holiday: 1800 }, active: true, order: 2 },
  { id: "u3", name: { he: "סוויטת הגפן", en: "The Vine Suite" }, description: { he: "סוויטה מעוצבת בהשראת כרמי הגליל, עם בריכה פרטית מחוממת וסאונה יבשה", en: "Suite inspired by Galilee vineyards, with heated private pool and dry sauna" }, type: "couple", capacity: 2, amenities: ["בריכה פרטית", "סאונה", "מיני בר", "WiFi", "מקרן", "חלוקי רחצה"], prices: { regular: 1850, weekend: 2200, holiday: 2600 }, active: true, order: 3 },
  { id: "u4", name: { he: "הבית בכרם", en: "The Vineyard House" }, description: { he: "יחידה משפחתית מרווחת עם גינה ירוקה, נדנדה ופינת משחקים לילדים", en: "Spacious family unit with green garden, swing and children's play area" }, type: "family", capacity: 6, amenities: ["גינה", "מטבח מלא", "מנגל", "WiFi", "חניה", "עריסה"], prices: { regular: 1600, weekend: 1900, holiday: 2300 }, active: true, order: 4 },
  { id: "u5", name: { he: "פנטהאוז הגליל", en: "Galilee Penthouse" }, description: { he: "יחידה יוקרתית בקומה העליונה עם נוף 360 מעלות, מתאימה למשפחות גדולות", en: "Luxury top-floor unit with 360 views, perfect for large families" }, type: "family", capacity: 8, amenities: ["גג פרטי", "ג'קוזי", "מטבח מלא", "WiFi", "מנגל", "חניה"], prices: { regular: 2200, weekend: 2600, holiday: 3000 }, active: true, order: 5 },
  { id: "u6", name: { he: "אכסניית הגורן", en: "The Goren Lodge" }, description: { he: "מתחם מרווח לקבוצות עם סלון גדול, מטבח תעשייתי ושטח פתוח נרחב", en: "Spacious compound for groups with large lounge, industrial kitchen and open grounds" }, type: "group", capacity: 16, amenities: ["סלון גדול", "מטבח תעשייתי", "בריכה", "WiFi", "מנגל", "חניה"], prices: { regular: 4500, weekend: 5500, holiday: 6500 }, active: true, order: 6 },
  { id: "u7", name: { he: "חדר השמש", en: "The Sun Room" }, description: { he: "סטודיו אינטימי ומואר עם חלונות גדולים, מושלם לזוג שמחפש פשטות ויוקרה", en: "Intimate sunlit studio with large windows, perfect for couples seeking simplicity and luxury" }, type: "couple", capacity: 2, amenities: ["מרפסת", "מיני בר", "WiFi", "מקרן", "חלוקי רחצה"], prices: { regular: 950, weekend: 1200, holiday: 1450 }, active: true, order: 7 },
  { id: "u8", name: { he: "הווילה", en: "The Villa" }, description: { he: "וילה ענקית ומפוארת עם גינה פרטית נרחבת, בריכה, מטבח שף מאובזר ומרחבי אירוח יוקרתיים. מושלמת לאירועים, חגיגות משפחתיות ושהייה בלתי נשכחת", en: "Magnificent grand villa with expansive private garden, pool, fully-equipped chef's kitchen and luxurious hosting spaces. Perfect for events, family celebrations and unforgettable stays" }, type: "villa", capacity: 20, amenities: ["בריכה פרטית", "גינה ענקית", "מטבח שף", "סלון מרווח", "6 חדרי שינה", "4 חדרי רחצה", "מנגל", "WiFi", "חניה פרטית", "ג'קוזי"], prices: { regular: 6500, weekend: 8000, holiday: 9500 }, active: true, order: 8 },
];

const DEFAULT_REVIEWS = [
  { id: "r1", guestName: "מיכל ורון", unitId: "u1", rating: 5, text: { he: "חוויה מושלמת! הנוף עוצר נשימה והשירות חם ואישי. חזרנו כבר פעמיים.", en: "Perfect experience! Breathtaking views and warm personal service." }, date: "2026-03-15", visible: true },
  { id: "r2", guestName: "דנה כ.", unitId: "u3", rating: 5, text: { he: "הבריכה הפרטית הייתה חלום. ישבנו על המרפסת עם כוס יין ולא רצינו לעזוב.", en: "The private pool was a dream. We didn't want to leave." }, date: "2026-02-20", visible: true },
  { id: "r3", guestName: "עומר ושירה", unitId: "u4", rating: 5, text: { he: "הילדים השתגעו מהגינה. הכל היה מושלם עד הפרט האחרון.", en: "The kids loved the garden. Everything was perfect." }, date: "2026-01-10", visible: true },
  { id: "r4", guestName: "יעל ואלון", unitId: "u2", rating: 5, text: { he: "הבקתה מדהימה. האח, השקט, הטבע — בדיוק מה שהיינו צריכים.", en: "Amazing cabin. The fireplace, silence, nature — exactly what we needed." }, date: "2025-12-25", visible: true },
];

const DEFAULT_SETTINGS = { whatsapp: "972501234567", email: "info@shiluvim-bateva.co.il", phone: "04-1234567", address: { he: "שתולה, גליל המערבי", en: "Shtula, Western Galilee, Israel" }, siteName: { he: "שילובים בטבע", en: "Shiluvim BaTeva" }, social: { instagram: "https://instagram.com/shiluvim.bateva", facebook: "https://facebook.com/shiluvimbateva" } };

const storage = {
  async get(k) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch { return null; } },
  async set(k, v) { try { await window.storage.set(k, JSON.stringify(v)); } catch {} },
};

function useStore(key, def) {
  const [d, setD] = useState(def);
  const [loading, setL] = useState(true);
  useEffect(() => { storage.get(key).then(v => { if (v) setD(v); setL(false); }); }, [key]);
  const save = useCallback(n => { setD(n); storage.set(key, n); }, [key]);
  return [d, save, loading];
}

const Ic = {
  leaf: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.5C9.56 19 14.8 13.4 17 8z"/><path d="M2 2s7.28 1.72 11.5 6c3.35 3.4 4.4 8.1 4.5 12-1-2-4-5-8.5-7.5"/></svg>,
  spa: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22c6-3 8-9 8-14-3 0-6 1-8 4-2-3-5-4-8-4 0 5 2 11 8 14z"/></svg>,
  wine: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2h8l-1 7a5 5 0 0 1-3 4.5A5 5 0 0 1 9 9L8 2z"/><path d="M12 13.5V22M8 22h8"/></svg>,
  lock: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  star: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  arrow: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  phone: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.07 5.18 2 2 0 0 1 5.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>,
  ig: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>,
  fb: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  users: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  check: s => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
};

export default function App() {
  const [lang, setLang] = useState("he");
  const [page, setPage] = useState("home");
  const [selUnit, setSelUnit] = useState(null);
  const [units] = useStore("site-units", DEFAULT_UNITS);
  const [reviews] = useStore("site-reviews", DEFAULT_REVIEWS);
  const [settings] = useStore("site-settings", DEFAULT_SETTINGS);
  const [inquiries, setInquiries] = useStore("site-inquiries", []);
  const [filter, setFilter] = useState("all");
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang]; const dir = t.dir;
  const au = units.filter(u => u.active);

  useEffect(() => { const f = () => setScrollY(window.scrollY); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (p, uid) => { setPage(p); if (uid) setSelUnit(uid); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const submit = form => { const inq = { ...form, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), status: "pending", adminNotes: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; setInquiries([inq, ...inquiries]); };

  const navBg = scrollY > 60;

  return (
    <div style={{ direction: dir, fontFamily: "'Heebo',sans-serif", background: "#FAF8F2", color: "#1a1a18", minHeight: "100vh" }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&family=Cormorant+Garamond:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
::selection{background:#1B433244}
@keyframes fu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
.fu{animation:fu .7s ease both}.fi{animation:fi .5s ease both}
.gb{background:#1B4332;color:#FAF8F2;border:none;padding:14px 36px;font-family:'Heebo',sans-serif;font-size:15px;font-weight:500;letter-spacing:.5px;cursor:pointer;transition:all .3s}
.gb:hover{background:#143728;transform:translateY(-1px)}
.go{background:transparent;color:#1B4332;border:1.5px solid #1B4332;padding:12px 32px;font-family:'Heebo',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .3s}
.go:hover{background:#1B4332;color:#FAF8F2}
input,textarea,select{font-family:'Heebo',sans-serif;font-size:15px;border:1px solid #d4cfc4;padding:12px 16px;background:#fff;color:#1a1a18;width:100%;transition:border-color .3s;outline:none}
input:focus,textarea:focus,select:focus{border-color:#1B4332}
.uc{transition:transform .4s ease,box-shadow .4s ease}
.uc:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(27,67,50,.08)}
.nav-links{display:flex;align-items:center;gap:24px}
.hamburger{display:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px}
.hamburger span{display:block;width:22px;height:2px;background:currentColor;transition:all .3s}
.mobile-menu{display:none}
@media(max-width:768px){
.nav-logo{height:60px !important}
.nav-links{display:none !important}
.hamburger{display:flex !important}
.mobile-menu.open{display:flex !important;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(250,248,242,.98);z-index:200;align-items:center;justify-content:center;gap:28px}
.mobile-menu.open a,.mobile-menu.open span{font-size:20px;cursor:pointer;color:#1B4332;font-weight:400}
}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: navBg ? "rgba(250,248,242,.95)" : "transparent", backdropFilter: navBg ? "blur(12px)" : "none", borderBottom: navBg ? "1px solid rgba(27,67,50,.08)" : "none", transition: "all .4s", padding: navBg ? "8px 24px" : "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => go("home")} style={{ cursor: "pointer", marginInlineStart: 8 }}>
          <img src={LOGO} alt="שילובים בטבע" className="nav-logo" style={{ height: 72, objectFit: "contain" }} />
        </div>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["home", "units", "reviews", "contact"].map(p => (
            <span key={p} onClick={() => go(p)} style={{ cursor: "pointer", fontSize: 14, fontWeight: 400, color: navBg ? "#1a1a18" : "#FAF8F2cc", transition: "color .3s", borderBottom: page === p ? `2px solid ${navBg ? "#1B4332" : "#B8955A"}` : "2px solid transparent", paddingBottom: 2 }}>
              {t.nav[p]}
            </span>
          ))}
          <button className="gb" onClick={() => go("book")} style={{ padding: "8px 24px", fontSize: 13 }}>{t.nav.book}</button>
          <span onClick={() => setLang(lang === "he" ? "en" : "he")} style={{ cursor: "pointer", fontSize: 12, fontWeight: 500, color: navBg ? "#1B4332" : "#FAF8F2", border: `1px solid ${navBg ? "#1B4332" : "#FAF8F2"}`, padding: "4px 10px", letterSpacing: 1 }}>
            {lang === "he" ? "EN" : "עב"}
          </span>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ color: navBg ? "#1B4332" : "#FAF8F2" }}>
          <span /><span /><span />
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, left: 24, cursor: "pointer", fontSize: 28, color: "#1B4332" }}>✕</div>
        <img src={LOGO} alt="שילובים בטבע" style={{ height: 48, objectFit: "contain", marginBottom: 12 }} />
        {["home", "units", "reviews", "contact"].map(p => (
          <span key={p} onClick={() => { go(p); setMenuOpen(false); }}>{t.nav[p]}</span>
        ))}
        <button className="gb" onClick={() => { go("book"); setMenuOpen(false); }} style={{ padding: "12px 36px", fontSize: 16 }}>{t.nav.book}</button>
        <span onClick={() => { setLang(lang === "he" ? "en" : "he"); setMenuOpen(false); }} style={{ fontSize: 14, color: "#1B4332", border: "1px solid #1B4332", padding: "6px 16px" }}>
          {lang === "he" ? "EN" : "עב"}
        </span>
      </div>

      {page === "home" && <Home t={t} lang={lang} units={au} reviews={reviews} settings={settings} go={go} />}
      {page === "units" && <Units t={t} lang={lang} units={au} filter={filter} setFilter={setFilter} go={go} />}
      {page === "unit" && <UnitDetail t={t} lang={lang} unit={au.find(u => u.id === selUnit)} go={go} />}
      {page === "book" && <Book t={t} lang={lang} units={au} selUnit={selUnit} onSubmit={submit} />}
      {page === "reviews" && <Reviews t={t} lang={lang} reviews={reviews.filter(r => r.visible)} units={au} />}
      {page === "contact" && <Contact t={t} lang={lang} settings={settings} />}

      {/* FOOTER */}
      <footer style={{ background: "#1B4332", color: "#FAF8F2", padding: "60px 40px 30px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src={LOGO} alt="שילובים בטבע" style={{ height: 72, objectFit: "contain", filter: "brightness(1.8)" }} />
            </div>
            <p style={{ fontSize: 14, opacity: .7, lineHeight: 1.8 }}>{t.hero.desc?.slice(0, 80)}...</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12, opacity: .4, letterSpacing: 2 }}>{t.nav.contact}</div>
            <p style={{ fontSize: 14, opacity: .7, lineHeight: 2 }}>{settings.phone}<br />{settings.email}<br />{settings.address?.[lang]}</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12, opacity: .4, letterSpacing: 2 }}>{lang === "he" ? "עקבו אחרינו" : "Follow Us"}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {settings.social?.instagram && <a href={settings.social.instagram} target="_blank" rel="noopener" style={{ color: "#FAF8F2", opacity: .7 }}>{Ic.ig(24)}</a>}
              {settings.social?.facebook && <a href={settings.social.facebook} target="_blank" rel="noopener" style={{ color: "#FAF8F2", opacity: .7 }}>{Ic.fb(24)}</a>}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "40px auto 0", paddingTop: 20, borderTop: "1px solid rgba(250,248,242,.1)", display: "flex", justifyContent: "space-between", fontSize: 12, opacity: .4 }}>
          <span>© 2026 {settings.siteName?.[lang]}. {t.footer.rights}</span>
          <div style={{ display: "flex", gap: 20 }}><span>{t.footer.privacy}</span><span>{t.footer.terms}</span><span>{t.footer.cancel}</span></div>
        </div>
      </footer>
    </div>
  );
}

function Home({ t, lang, units, reviews, settings, go }) {
  return <>
    <header style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #1B4332 0%, #2D5A3D 35%, #3A6B4A 55%, #1B4332 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: "radial-gradient(circle at 25% 40%, #B8955A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 680, padding: "0 24px" }} className="fu">
        <div style={{ fontSize: 12, letterSpacing: 6, color: "#B8955A", marginBottom: 28 }}>{t.hero.sub}</div>
        <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#FAF8F2", lineHeight: 1.1, marginBottom: 24, fontWeight: 300 }}>{t.hero.title}</h1>
        <p style={{ color: "rgba(250,248,242,.6)", fontSize: 17, lineHeight: 1.9, fontWeight: 300, maxWidth: 520, margin: "0 auto 44px" }}>{t.hero.desc}</p>
        <button className="gb" onClick={() => go("units")} style={{ padding: "16px 52px", fontSize: 16, letterSpacing: 1 }}>{t.hero.cta}</button>
      </div>
    </header>

    <section style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
        {t.features.map((f, i) => (
          <div key={i} className="fu" style={{ animationDelay: `${i * .12}s`, textAlign: "center" }}>
            <div style={{ color: "#1B4332", marginBottom: 16, display: "flex", justifyContent: "center" }}>{Ic[f.icon](32)}</div>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 10, color: "#1B4332" }}>{f.title}</h3>
            <p style={{ color: "#6b6860", fontSize: 14, lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <div style={{ maxWidth: 100, margin: "0 auto", height: 1, background: "#1B433220" }} />

    <section style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontSize: 12, letterSpacing: 5, color: "#B8955A", marginBottom: 12 }}>{t.units.sub}</div>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: "#1B4332" }}>{t.units.title}</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
        {units.slice(0, 3).map(u => <Card key={u.id} u={u} lang={lang} t={t} onClick={() => go("unit", u.id)} />)}
      </div>
      {units.length > 3 && <div style={{ textAlign: "center", marginTop: 48 }}><button className="go" onClick={() => go("units")}>{lang === "he" ? "כל היחידות →" : "All Units →"}</button></div>}
    </section>

    <section style={{ padding: "60px 24px", textAlign: "center" }}>
      <button className="gb" onClick={() => go("book")} style={{ padding: "18px 60px", fontSize: 18, letterSpacing: 1 }}>{t.nav.book}</button>
    </section>

    <section style={{ padding: "80px 24px", background: "#1B433208" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: "#1B4332", marginBottom: 48 }}>{t.reviews.title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {reviews.filter(r => r.visible).slice(0, 3).map(r => (
            <div key={r.id} style={{ background: "#fff", padding: 28, textAlign: lang === "he" ? "right" : "left" }}>
              <div style={{ color: "#B8955A", display: "flex", gap: 2, marginBottom: 12 }}>{[...Array(r.rating)].map((_, i) => <span key={i}>{Ic.star(14)}</span>)}</div>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: "#4a4a45", fontWeight: 300, marginBottom: 16 }}>"{r.text?.[lang] || r.text?.he}"</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#1B4332" }}>{r.guestName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ padding: "100px 24px", textAlign: "center", background: "#1B4332" }}>
      <h2 style={{ fontSize: 32, fontWeight: 300, color: "#FAF8F2", marginBottom: 16 }}>{lang === "he" ? "מוכנים לחוויה?" : "Ready for the experience?"}</h2>
      <p style={{ color: "rgba(250,248,242,.5)", fontSize: 15, marginBottom: 36, fontWeight: 300 }}>{lang === "he" ? "שלחו פנייה ונחזור אליכם תוך שעות ספורות" : "Send an inquiry and we'll get back within hours"}</p>
      <button className="gb" onClick={() => go("book")} style={{ background: "#B8955A", padding: "16px 52px", fontSize: 16 }}>{t.nav.book}</button>
    </section>
  </>;
}

function Card({ u, lang, t, onClick }) {
  return (
    <div className="uc" onClick={onClick} style={{ background: "#fff", cursor: "pointer", overflow: "hidden" }}>
      <div style={{ height: 220, background: "linear-gradient(135deg, #1B433318, #2D5A3D18, #B8955A10)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ fontSize: 48, opacity: .12, fontWeight: 300, color: "#1B4332" }}>{u.name?.[lang]?.charAt(0)}</div>
        <div style={{ position: "absolute", top: 16, [lang === "he" ? "right" : "left"]: 16, fontSize: 11, padding: "4px 12px", background: "#1B4332", color: "#FAF8F2", letterSpacing: 1 }}>{t.units[u.type]}</div>
      </div>
      <div style={{ padding: "24px 24px 28px" }}>
        <h3 style={{ fontSize: 20, fontWeight: 500, color: "#1B4332", marginBottom: 8 }}>{u.name?.[lang]}</h3>
        <p style={{ fontSize: 13, color: "#8a8880", lineHeight: 1.7, marginBottom: 16, fontWeight: 300, minHeight: 44 }}>{u.description?.[lang]?.slice(0, 80)}...</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#8a8880" }}>{Ic.users(14)} {u.capacity} {t.units.guests}</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#1B4332" }}>₪{u.prices?.regular?.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 300, color: "#8a8880" }}>{t.units.perNight}</span></div>
        </div>
      </div>
    </div>
  );
}

function Units({ t, lang, units, filter, setFilter, go }) {
  const f = filter === "all" ? units : units.filter(u => u.type === filter);
  return <div style={{ paddingTop: 120 }}>
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 12, letterSpacing: 5, color: "#B8955A", marginBottom: 12 }}>{t.units.sub}</div>
        <h1 style={{ fontSize: 40, fontWeight: 300, color: "#1B4332" }}>{t.units.title}</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48 }}>
        {["all", "couple", "family", "group", "villa"].map(x => (
          <button key={x} onClick={() => setFilter(x)} style={{ padding: "8px 24px", fontSize: 13, fontFamily: "'Heebo',sans-serif", background: filter === x ? "#1B4332" : "transparent", color: filter === x ? "#FAF8F2" : "#1B4332", border: "1px solid #1B4332", cursor: "pointer", transition: "all .3s" }}>{t.units[x]}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
        {f.map((u, i) => <div key={u.id} className="fu" style={{ animationDelay: `${i * .08}s` }}><Card u={u} lang={lang} t={t} onClick={() => go("unit", u.id)} /></div>)}
      </div>
    </section>
  </div>;
}

function UnitDetail({ t, lang, unit: u, go }) {
  if (!u) return <div style={{ paddingTop: 140, textAlign: "center" }}>Not found</div>;
  return <div style={{ paddingTop: 100 }}>
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
      <button onClick={() => go("units")} className="go" style={{ padding: "8px 20px", fontSize: 12, marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 8 }}>{t.unitDetail.back}</button>
      <div style={{ height: 400, background: "linear-gradient(135deg, #1B433320, #2D5A3D15, #B8955A08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 72, opacity: .06, fontWeight: 300, color: "#1B4332" }}>{u.name?.[lang]}</div>
      </div>
      <h1 style={{ fontSize: 40, fontWeight: 300, color: "#1B4332", marginBottom: 12 }}>{u.name?.[lang]}</h1>
      <p style={{ fontSize: 16, color: "#6b6860", lineHeight: 1.9, fontWeight: 300, marginBottom: 40 }}>{u.description?.[lang]}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: "#1B4332", marginBottom: 16 }}>{t.unitDetail.amenities}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{u.amenities?.map((a, i) => <span key={i} style={{ padding: "6px 16px", background: "#1B433208", fontSize: 13, color: "#1B4332" }}>{a}</span>)}</div>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: "#1B4332", marginBottom: 16 }}>{t.unitDetail.prices}</h3>
          {[["regular", u.prices?.regular], ["weekend", u.prices?.weekend], ["holiday", u.prices?.holiday]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e8e4dc" }}>
              <span style={{ fontSize: 14, color: "#6b6860" }}>{t.unitDetail[k]}</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#1B4332" }}>₪{v?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="gb" onClick={() => go("book", u.id)} style={{ padding: "14px 48px", fontSize: 16 }}>{t.unitDetail.book}</button>
    </section>
  </div>;
}

function Book({ t, lang, units, selUnit, onSubmit }) {
  const [form, setForm] = useState({ guestName: "", phone: "", email: "", unitId: selUnit || "", checkin: "", checkout: "", guests: { adults: 2, children: 0 }, notes: "" });
  const [done, setDone] = useState(false);
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));
  if (done) return <div style={{ paddingTop: 160, textAlign: "center", minHeight: "70vh" }} className="fu">
    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#1B433215", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>{Ic.check(32)}</div>
    <h2 style={{ fontSize: 32, fontWeight: 300, color: "#1B4332", marginBottom: 12 }}>{t.booking.success}</h2>
    <p style={{ fontSize: 15, color: "#6b6860", fontWeight: 300, marginBottom: 36 }}>{t.booking.successDesc}</p>
    <button className="go" onClick={() => { setDone(false); setForm({ guestName: "", phone: "", email: "", unitId: "", checkin: "", checkout: "", guests: { adults: 2, children: 0 }, notes: "" }); }}>{t.booking.another}</button>
  </div>;
  return <div style={{ paddingTop: 120 }}>
    <section style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 36, fontWeight: 300, color: "#1B4332", marginBottom: 8 }}>{t.booking.title}</h1>
        <p style={{ fontSize: 14, color: "#8a8880", fontWeight: 300 }}>{t.booking.sub}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Fl l={t.booking.name} r><input value={form.guestName} onChange={e => up("guestName", e.target.value)} /></Fl>
        <Fl l={t.booking.phone} r><input type="tel" value={form.phone} onChange={e => up("phone", e.target.value)} dir="ltr" /></Fl>
        <Fl l={t.booking.email}><input type="email" value={form.email} onChange={e => up("email", e.target.value)} dir="ltr" /></Fl>
        <Fl l={t.booking.unit}><select value={form.unitId} onChange={e => up("unitId", e.target.value)}><option value="">{t.booking.flexible}</option>{units.map(u => <option key={u.id} value={u.id}>{u.name?.[lang]}</option>)}</select></Fl>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Fl l={t.booking.checkin} r><input type="date" value={form.checkin} onChange={e => up("checkin", e.target.value)} dir="ltr" /></Fl>
          <Fl l={t.booking.checkout} r><input type="date" value={form.checkout} onChange={e => up("checkout", e.target.value)} dir="ltr" /></Fl>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Fl l={t.booking.adults}><input type="number" min={1} max={20} value={form.guests.adults} onChange={e => up("guests", { ...form.guests, adults: +e.target.value })} /></Fl>
          <Fl l={t.booking.children}><input type="number" min={0} max={10} value={form.guests.children} onChange={e => up("guests", { ...form.guests, children: +e.target.value })} /></Fl>
        </div>
        <Fl l={t.booking.notes}><textarea rows={4} value={form.notes} onChange={e => up("notes", e.target.value)} style={{ resize: "vertical" }} /></Fl>
        <button className="gb" onClick={() => { if (form.guestName && form.phone && form.checkin && form.checkout) { onSubmit(form); setDone(true); } }} style={{ padding: "16px", fontSize: 16, width: "100%", marginTop: 8 }}>{t.booking.send}</button>
      </div>
    </section>
  </div>;
}

function Fl({ l, r, children }) {
  return <label style={{ display: "block" }}><span style={{ fontSize: 13, color: "#6b6860", marginBottom: 6, display: "block" }}>{l} {r && <span style={{ color: "#B8955A" }}>*</span>}</span>{children}</label>;
}

function Reviews({ t, lang, reviews, units }) {
  return <div style={{ paddingTop: 120 }}>
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 36, fontWeight: 300, color: "#1B4332", marginBottom: 8 }}>{t.reviews.title}</h1>
        <p style={{ fontSize: 14, color: "#8a8880", fontWeight: 300 }}>{t.reviews.sub}</p>
      </div>
      {reviews.map((r, i) => { const u = units.find(x => x.id === r.unitId); return (
        <div key={r.id} className="fu" style={{ animationDelay: `${i * .08}s`, background: "#fff", padding: 32, marginBottom: 16, borderRight: lang === "he" ? "3px solid #1B4332" : "none", borderLeft: lang === "en" ? "3px solid #1B4332" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div><span style={{ fontWeight: 500, fontSize: 16, color: "#1B4332" }}>{r.guestName}</span>{u && <span style={{ fontSize: 12, color: "#8a8880", marginInlineStart: 12 }}>• {u.name?.[lang]}</span>}</div>
            <div style={{ color: "#B8955A", display: "flex", gap: 2 }}>{[...Array(r.rating)].map((_, i) => <span key={i}>{Ic.star(12)}</span>)}</div>
          </div>
          <p style={{ fontSize: 15, color: "#4a4a45", lineHeight: 1.9, fontWeight: 300 }}>{r.text?.[lang] || r.text?.he}</p>
          <p style={{ fontSize: 12, color: "#aaa8a0", marginTop: 12 }}>{new Date(r.date).toLocaleDateString(lang === "he" ? "he-IL" : "en-US")}</p>
        </div>
      ); })}
    </section>
  </div>;
}

function Contact({ t, lang, settings }) {
  return <div style={{ paddingTop: 120 }}>
    <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 36, fontWeight: 300, color: "#1B4332", marginBottom: 8 }}>{t.contact.title}</h1>
        <p style={{ fontSize: 14, color: "#8a8880", fontWeight: 300 }}>{t.contact.sub}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
        {[[Ic.phone, t.contact.phone, settings.phone], [Ic.phone, t.contact.whatsapp, settings.whatsapp?.replace("972", "0")], [Ic.mail, t.contact.email, settings.email]].map(([ic, lbl, val], i) => (
          <div key={i} style={{ background: "#fff", padding: 28, textAlign: "center" }}>
            <div style={{ color: "#1B4332", marginBottom: 12, display: "flex", justifyContent: "center" }}>{ic(24)}</div>
            <div style={{ fontSize: 12, color: "#8a8880", marginBottom: 6, letterSpacing: 1 }}>{lbl}</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1B4332" }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, background: "#fff", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 14, color: "#6b6860" }}>{t.contact.address}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1B4332" }}>{settings.address?.[lang]}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, color: "#6b6860" }}>{t.contact.hours}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1B4332" }}>{t.contact.hoursText}</span>
        </div>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 16, justifyContent: "center" }}>
        {settings.social?.instagram && <a href={settings.social.instagram} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", background: "#fff", color: "#1B4332", fontSize: 14, textDecoration: "none" }}>{Ic.ig(18)} Instagram</a>}
        {settings.social?.facebook && <a href={settings.social.facebook} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", background: "#fff", color: "#1B4332", fontSize: 14, textDecoration: "none" }}>{Ic.fb(18)} Facebook</a>}
      </div>
    </section>
  </div>;
}
