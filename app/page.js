import BookingForm from "./components/BookingForm";
import RevealObserver from "./components/RevealObserver";
import PurchaseProof from "./components/PurchaseProof";

const PARTNER_LOGOS = ["Hotel Aurora", "Metro Fitness", "Bayview Residences", "Cafe Luna"];

const FAQS = [
  {
    q: "How do I schedule a pickup?",
    a: "Use the booking form at the top of this page — it takes under a minute. Tell us where you are, pick a date and time slot, and we'll text you to confirm. Prefer to chat? Message us on WhatsApp or Messenger and we'll set it up for you.",
  },
  {
    q: "What are your service hours?",
    a: "We're open Monday to Saturday from 7 AM to 8 PM, and Sunday from 8 AM to 5 PM. Pickup and delivery slots run from 9 AM to 7 PM, so you can hand off your basket before work and have it back the next day.",
  },
  {
    q: "How fast will I get my laundry back?",
    a: "Most wash & fold orders are back at your door within 24 hours. Dry cleaning, bedding, and heavily soiled items can take a little longer — your hero will give you an exact timeline at pickup, and rush service is available when you need it faster.",
  },
  {
    q: "How do I pay?",
    a: "You pay only after your laundry is delivered — no deposits, no upfront charges. We accept cash and GCash on delivery.",
  },
  {
    q: "Can you handle delicate items?",
    a: "Absolutely. Barongs, gowns, suits, and other delicate fabrics get gentle, garment-appropriate care through our dry cleaning service. Just mention them in the \"Notes for your hero\" box when you book so we handle them accordingly.",
  },
  {
    q: "What areas do you serve?",
    a: "We pick up and deliver across all seven districts of Iloilo City — City Proper, Jaro, La Paz, Lapuz, Mandurriao, Molo, and Villa Arevalo. Just outside the city? Send us a message and we'll see if we can reach you.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  name: "WASHERO",
  description:
    "Laundry pickup and delivery service in Iloilo City — wash & fold, ironing, and dry cleaning, back within 24 hours.",
  email: "hello@washero.com",
  priceRange: "₱",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iloilo City",
    addressRegion: "Iloilo",
    addressCountry: "PH",
  },
  geo: { "@type": "GeoCoordinates", latitude: 10.7202, longitude: 122.5621 },
  areaServed: [
    "City Proper",
    "Jaro",
    "La Paz",
    "Lapuz",
    "Mandurriao",
    "Molo",
    "Villa Arevalo",
  ].map((name) => ({ "@type": "Place", name: `${name}, Iloilo City` })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <RevealObserver />
      <PurchaseProof />

      {/* ===== HEADER ===== */}
      <header>
        <div className="wrap nav">
          <a href="#" className="brand" aria-label="WASHERO home">
            <img src="/logo.png" alt="WASHERO" className="logo" />
          </a>
          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#services">Services</a>
            <a href="#why">Why WASHERO</a>
            <a href="#areas">Service area</a>
          </nav>
          <div className="nav-cta">
            <span className="nav-phone">(000) 000-0000</span>
            <a href="#book" className="btn btn-primary">
              Schedule a pickup
            </a>
            <button className="burger" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg"></div>

        <div className="wrap hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">Iloilo City&apos;s laundry hero</span>
            <h1>
              <span className="h1-line">Get clean laundry</span>
              <span className="h1-line">
                in <span className="hl">3 easy steps.</span>
              </span>
            </h1>
            <p className="lead">
              Laundry in Iloilo, made effortless. Schedule a pickup anywhere
              in the city — we grab your basket from your door and bring it
              back washed, folded, and fresh within 24 hours.
            </p>
            <div className="hero-actions">
              <a href="#book" className="btn btn-primary">
                Schedule a pickup
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#how" className="btn btn-ghost">
                See how it works
              </a>
            </div>
            <div className="trust">
              <span>
                ★ <b>4.9</b> from Ilonggo families
              </span>
              <span className="dot"></span>
              <span>
                <b>24-hour</b> turnaround
              </span>
              <span className="dot"></span>
              <span>
                <b>Free</b> pickup &amp; delivery
              </span>
            </div>
          </div>

          <div className="hero-visual reveal"></div>
        </div>
      </section>

      {/* ===== BOOKING FORM ===== */}
      <div className="wrap booking-shell" id="book">
        <BookingForm />
      </div>

      {/* ===== PARTNERS (hidden for now) =====
      <section className="partners reveal">
        <div className="wrap">
          <p className="partners-label">Trusted by local businesses</p>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
              <div className="partner-logo" key={i}>
                <span className="partner-badge">{name.charAt(0)}</span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ===== HOW IT WORKS ===== */}
      <section className="steps" id="how">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">How it works</span>
            <h2>Laundry, without the laundry</h2>
            <p>
              Three simple steps stand between you and a fresh, folded basket
              at your door — anywhere in Iloilo City.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step reveal">
              <div className="step-num">STEP 01</div>
              <div className="step-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3>Schedule</h3>
              <p>Book a pickup online in under a minute. Pick the day and time that fits your life.</p>
              <svg className="step-line" width="34" height="16" viewBox="0 0 34 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 8h30M24 2l6 6-6 6" />
              </svg>
            </div>
            <div className="step reveal">
              <div className="step-num">STEP 02</div>
              <div className="step-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <path d="M16 8h4l3 3v5h-7z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3>Pickup</h3>
              <p>Our hero arrives at your door — no bagging or prep needed. Free of charge, every time.</p>
              <svg className="step-line" width="34" height="16" viewBox="0 0 34 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 8h30M24 2l6 6-6 6" />
              </svg>
            </div>
            <div className="step reveal">
              <div className="step-num">STEP 03</div>
              <div className="step-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                  <path d="M3 12v7a2 2 0 002 2h14a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3>Deliver</h3>
              <p>Get it back clean, folded, and neatly packed — right where we picked it up, within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Our services</span>
            <h2>One team for every basket</h2>
            <p>
              Complete laundry services in Iloilo — from everyday loads to the
              barongs and gowns you&apos;d never risk in a machine.
            </p>
          </div>
          <div className="svc-grid">
            <div className="svc reveal">
              <div className="svc-img">
                <img src="/services/wash-fold.jpg" alt="Wash and fold laundry service in Iloilo City" />
              </div>
              <div className="svc-body">
                <h3>Wash &amp; Fold</h3>
                <p>Everyday laundry washed, dried, and folded the way you like it.</p>
                <div className="price">from ₱—/kg</div>
              </div>
            </div>
            <div className="svc reveal">
              <div className="svc-img">
                <img src="/services/ironing-press.jpg" alt="Ironing and pressing service in Iloilo City" />
              </div>
              <div className="svc-body">
                <h3>Ironing &amp; Press</h3>
                <p>Crisp, wrinkle-free shirts and uniforms, pressed to perfection.</p>
                <div className="price">from ₱—/pc</div>
              </div>
            </div>
            <div className="svc reveal">
              <div className="svc-img">
                <img src="/services/dry-cleaning.jpg" alt="Dry cleaning service in Iloilo City" />
              </div>
              <div className="svc-body">
                <h3>Dry Cleaning</h3>
                <p>Gentle care for suits, barongs, gowns, and delicate fabrics.</p>
                <div className="price">from ₱—/pc</div>
              </div>
            </div>
            <div className="svc reveal">
              <div className="svc-img">
                <img src="/services/bedding-comforters.jpg" alt="Bedding and comforter cleaning in Iloilo City" />
              </div>
              <div className="svc-body">
                <h3>Bedding &amp; Comforters</h3>
                <p>Bulky sheets, blankets, and comforters, fresh and fluffy again.</p>
                <div className="price">from ₱—/pc</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY ===== */}
      <section id="why" style={{ padding: 0 }}>
        <div className="why">
          <div className="wrap">
            <div className="sec-head why-head reveal">
              <span className="eyebrow">Why WASHERO</span>
              <h2>Powers your laundry deserves</h2>
              <p>Reliable, local, and genuinely convenient — the way laundry day in Iloilo should be.</p>
            </div>
            <div className="why-grid">
              <div className="feat reveal">
                <div className="feat-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <h3>24-hour turnaround</h3>
                  <p>Drop it off in the evening, get it back the next day. Rush service available too.</p>
                </div>
              </div>
              <div className="feat reveal">
                <div className="feat-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <path d="M16 8h4l3 3v5h-7z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3>Free pickup &amp; delivery</h3>
                  <p>No delivery fees, no minimums. We come to your door on your schedule.</p>
                </div>
              </div>
              <div className="feat reveal">
                <div className="feat-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3>Local team you trust</h3>
                  <p>Same friendly, background-checked riders serving your barangay.</p>
                </div>
              </div>
              <div className="feat reveal">
                <div className="feat-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
                    <path d="M9 9c1 1.5 5 1.5 6 0" />
                  </svg>
                </div>
                <div>
                  <h3>Gentle, eco detergents</h3>
                  <p>Skin-friendly, low-waste washing that&apos;s kind to your clothes and the planet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCAL / SERVICE AREA ===== */}
      <section id="areas">
        <div className="wrap local-grid">
          <div className="local-copy reveal">
            <span className="eyebrow">Proudly Ilonggo</span>
            <h2>Laundry service across Iloilo City</h2>
            <p>
              We&apos;re not a faceless chain. We&apos;re your neighbors —
              picking up, washing, and delivering across all seven districts
              of Iloilo City, one basket at a time.
            </p>
            <div className="chips">
              <div className="chip-col">
                <span className="chip on">City Proper</span>
                <span className="chip">Jaro</span>
                <span className="chip">La Paz</span>
                <span className="chip">Lapuz</span>
              </div>
              <div className="chip-col">
                <span className="chip">Mandurriao</span>
                <span className="chip">Molo</span>
                <span className="chip">Villa Arevalo</span>
              </div>
            </div>
          </div>
          <div className="local-img reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125441.35929173874!2d122.4652982561792!3d10.731207259642266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee56fe538d781%3A0xe8250cd6bc30a488!2sIloilo%20City%2C%20Iloilo!5e0!3m2!1sen!2sph!4v1783129051370!5m2!1sen!2sph"
              title="WASHERO service area — Iloilo City map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="quotes">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Loved by Ilonggos</span>
            <h2>Neighbors who never fold laundry anymore</h2>
          </div>
          <div className="q-grid">
            <div className="q reveal">
              <div className="stars">★★★★★</div>
              <p>
                &quot;Booked at night, had everything back by lunch the next
                day — folded better than I ever do it. WASHERO really is a
                lifesaver.&quot;
              </p>
              <div className="q-person">
                <span className="q-av">MR</span>
                <div>
                  <b>Maria R.</b>
                  <small>Jaro</small>
                </div>
              </div>
            </div>
            <div className="q reveal">
              <div className="stars">★★★★★</div>
              <p>
                &quot;Same driver every week, always on time, and my
                kids&apos; uniforms come back spotless. Feels like having a
                helper on call.&quot;
              </p>
              <div className="q-person">
                <span className="q-av">JC</span>
                <div>
                  <b>Jomar C.</b>
                  <small>Molo</small>
                </div>
              </div>
            </div>
            <div className="q reveal">
              <div className="stars">★★★★★</div>
              <p>
                &quot;Free pickup and delivery genuinely won me over. I
                haven&apos;t touched a washing machine in two months. Highly
                recommend.&quot;
              </p>
              <div className="q-person">
                <span className="q-av">AL</span>
                <div>
                  <b>Anna L.</b>
                  <small>La Paz</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <div className="cta reveal">
        <h2>Laundry day, handled.</h2>
        <p>
          Schedule your first pickup in under a minute — free pickup and
          delivery anywhere in Iloilo City, pay only after it&apos;s delivered.
        </p>
        <a href="#book" className="btn">
          Schedule a pickup
        </a>
      </div>

      {/* ===== FAQ ===== */}
      <section id="faq">
        <div className="wrap faq-wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Good to know</span>
            <h2>Frequently asked questions</h2>
            <p>Everything about laundry day in Iloilo City, answered.</p>
          </div>
          <div className="faq-list reveal">
            {FAQS.map(({ q, a }, i) => (
              <details className="faq-item" key={q} name="faq-accordion" open={i === 0}>
                <summary>
                  {q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <img src="/logo.png" alt="WASHERO" className="logo logo-white" />

              <p>
                Iloilo City&apos;s laundry hero — free doorstep pickup and
                delivery across all 7 districts, washed and folded within 24
                hours.
              </p>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#how">How it works</a>
              <a href="#services">Services</a>
              <a href="#why">Why WASHERO</a>
              <a href="#areas">Service area</a>
            </div>
            <div className="foot-col">
              <h4>Get in touch</h4>
              <a href="tel:0000000000">(000) 000-0000</a>
              <a href="mailto:hello@washero.com">hello@washero.com</a>
              <a href="#book">Schedule a pickup</a>
            </div>
            <div className="foot-col">
              <h4>Hours</h4>
              <a href="#">Mon–Sat · 7 AM – 8 PM</a>
              <a href="#">Sun · 8 AM – 5 PM</a>
              <a href="#areas">Serving Iloilo City &amp; nearby areas</a>
            </div>
          </div>
          <div className="foot-bot">
            <span>© 2026 WASHERO. All rights reserved.</span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
