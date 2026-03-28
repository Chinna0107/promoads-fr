import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaMicrophone, FaChalkboardTeacher, FaPalette,
  FaNetworkWired, FaFilm, FaStar, FaQuoteLeft,
  FaArrowRight, FaCheckCircle
} from 'react-icons/fa';
import '../../styles/about.css';
import BottomNavBar from './BottomNavBar';

const sections = [
  {
    title: 'Social Events',
    icon: <FaMicrophone />,
    color: '#00ff88',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    points: ['Weddings & Receptions', 'Anniversary Celebrations', 'Engagement Parties', 'Birthday Bashes', 'Surprise Gift Events', 'Personal Milestones'],
    desc: 'We turn your most cherished personal moments into lifelong memories. From intimate gatherings to grand celebrations, our team handles every detail — décor, photography, coordination, and more — so you can simply enjoy the moment.',
  },
  {
    title: 'Commercial Events',
    icon: <FaChalkboardTeacher />,
    color: '#00cfff',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    points: ['Political Rallies & Campaigns', 'College & Shop Launches', 'Restaurant Openings', 'Corporate Conferences', 'Team Building Events', 'Award Ceremonies'],
    desc: 'From high-energy political rallies to polished corporate conferences, we deliver end-to-end commercial event management that makes your brand or cause leave a powerful, lasting impression on every audience.',
  },
  {
    title: 'Brand Promotions',
    icon: <FaPalette />,
    color: '#ff9900',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80',
    points: ['Social Media Campaigns', 'Outdoor Advertising', 'Product Shoots', 'Influencer Events', 'Hoarding & Banner Ads', 'Digital Promotions'],
    desc: 'Amplify your brand with strategic promotional campaigns that cut through the noise. We craft visually stunning, audience-targeted promotions across digital and physical platforms to maximize your reach.',
  },
  {
    title: 'Pan-India Operations',
    icon: <FaNetworkWired />,
    color: '#ff4488',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    points: ['Metro Cities Coverage', 'Tier-2 & Tier-3 Cities', 'On-ground Execution Teams', 'Local Vendor Network', 'Fast Deployment', '24/7 On-site Support'],
    desc: "Wherever your event is, we show up. With active operations across metros and tier-2/3 cities, our on-ground teams ensure seamless execution no matter the location. One call — and we're there.",
  },
  {
    title: 'Cinematic Production',
    icon: <FaFilm />,
    color: '#aa44ff',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    points: ['4K Video Coverage', 'Drone Aerial Shots', 'Professional Photography', 'Cinematic Editing', 'Reels & Highlight Videos', 'Same-day Delivery'],
    desc: "Every event deserves to look like a blockbuster. Our production team uses professional-grade cameras, drones, and cinematic editing to deliver stunning visuals you'll want to watch over and over again.",
  },
];

const stats = [
  { num: '500+', label: 'Events Managed' },
  { num: '10+',  label: 'Event Types' },
  { num: '100%', label: 'Satisfaction' },
  { num: '50+',  label: 'Cities Covered' },
];

const steps = [
  { n: '01', title: 'Consultation',  desc: 'Share your vision and requirements with our expert team.',              color: '#00ff88' },
  { n: '02', title: 'Planning',      desc: 'We craft a detailed plan tailored to your event and budget.',           color: '#00cfff' },
  { n: '03', title: 'Execution',     desc: 'Our on-ground team brings every detail to life flawlessly.',            color: '#ff9900' },
  { n: '04', title: 'Delivery',      desc: 'You enjoy the moment while we handle everything behind the scenes.',    color: '#aa44ff' },
];

const testimonials = [
  { name: 'Priya Sharma',  role: 'Wedding Client',    text: 'PromoAds made our wedding absolutely magical. Every detail was perfect and beyond our expectations!', rating: 5 },
  { name: 'Ravi Kumar',    role: 'Corporate Client',  text: 'Our product launch was a massive success. Professional team, flawless execution from start to finish.', rating: 5 },
  { name: 'Anita Reddy',   role: 'Birthday Event',    text: 'The surprise party they organized left everyone speechless. Highly recommend PromoAds to everyone!', rating: 5 },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const cardRefs  = useRef([]);
  const stepRefs  = useRef([]);
  const statsRef  = useRef(null);
  const [statsIn, setStatsIn]   = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);

  useEffect(() => {
    const io = (refs, cls, threshold = 0.12) => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(cls); }),
        { threshold }
      );
      refs.current.forEach(r => r && obs.observe(r));
      return obs;
    };
    const c = io(cardRefs, 'pa-card-in');
    const s = io(stepRefs, 'pa-step-in');
    const statsObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsIn(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) statsObs.observe(statsRef.current);
    return () => { c.disconnect(); s.disconnect(); statsObs.disconnect(); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTesti(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pa-root">

      {/* ── HERO ── */}
      <section className="pa-hero">
        <div className="pa-hero-bg" />
        <div className="pa-hero-glow" />
        <div className="pa-hero-glow pa-hero-glow2" />

        <p className="pa-eyebrow">✦ Your Vision. Our Expertise. ✦</p>
        <h1 className="pa-hero-h1">
          We Make Every<br />
          <span className="pa-green">Event</span> Extraordinary
        </h1>
        <p className="pa-hero-sub">
          From intimate celebrations to large-scale corporate events —<br className="pa-br" />
          creativity, precision, and passion in every occasion.
        </p>
        <div className="pa-hero-btns">
          <button className="pa-btn-solid" onClick={() => navigate('/events')}>
            Get a Quote <FaArrowRight className="pa-btn-icon" />
          </button>
          <button className="pa-btn-ghost" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
        </div>

        <div className="pa-scroll-hint">
          <div className="pa-scroll-bar" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="pa-stats" ref={statsRef}>
        {stats.map((s, i) => (
          <div key={s.label} className={`pa-stat ${statsIn ? 'pa-stat-in' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="pa-stat-num">{s.num}</span>
            <span className="pa-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <div className="pa-section-head">
        <span className="pa-eyebrow">What We Do</span>
        <h2 className="pa-section-h2">Our Services</h2>
      </div>

      <div className="pa-services">
        {sections.map((sec, i) => (
          <div
            key={sec.title}
            ref={el => cardRefs.current[i] = el}
            className={`pa-card ${i % 2 !== 0 ? 'pa-card-rev' : ''}`}
            style={{ '--c': sec.color }}
          >
            {/* Image side */}
            <div className="pa-card-img-side">
              <img src={sec.image} alt={sec.title} className="pa-card-img" loading="lazy" />
              <div className="pa-card-img-tint" />
              <div className="pa-card-badge">
                <span className="pa-card-badge-icon">{sec.icon}</span>
              </div>
              <div className="pa-card-num">0{i + 1}</div>
            </div>

            {/* Content side */}
            <div className="pa-card-content">
              <div className="pa-card-accent-line" />
              <h3 className="pa-card-title">{sec.title}</h3>
              <p className="pa-card-desc">{sec.desc}</p>
              <ul className="pa-card-list">
                {sec.points.map(p => (
                  <li key={p} className="pa-card-li">
                    <FaCheckCircle className="pa-check" />
                    {p}
                  </li>
                ))}
              </ul>
              <button className="pa-card-btn" onClick={() => navigate('/events')}>
                Get Quote <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="pa-section-head">
        <span className="pa-eyebrow">Our Process</span>
        <h2 className="pa-section-h2">How It Works</h2>
      </div>

      <div className="pa-steps">
        {steps.map((s, i) => (
          <div
            key={s.n}
            ref={el => stepRefs.current[i] = el}
            className="pa-step"
            style={{ '--sc': s.color, '--sd': `${i * 0.12}s` }}
          >
            <div className="pa-step-num">{s.n}</div>
            <h4 className="pa-step-title">{s.title}</h4>
            <p className="pa-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="pa-section-head">
        <span className="pa-eyebrow">Client Love</span>
        <h2 className="pa-section-h2">What They Say</h2>
      </div>

      <div className="pa-testi-wrap">
        <div className="pa-testi-card">
          <FaQuoteLeft className="pa-quote-icon" />
          <p className="pa-testi-text">"{testimonials[activeTesti].text}"</p>
          <div className="pa-testi-stars">
            {[...Array(testimonials[activeTesti].rating)].map((_, i) => <FaStar key={i} />)}
          </div>
          <div className="pa-testi-author">
            <div className="pa-testi-avatar">{testimonials[activeTesti].name[0]}</div>
            <div>
              <div className="pa-testi-name">{testimonials[activeTesti].name}</div>
              <div className="pa-testi-role">{testimonials[activeTesti].role}</div>
            </div>
          </div>
        </div>
        <div className="pa-testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`pa-dot ${i === activeTesti ? 'pa-dot-active' : ''}`}
              onClick={() => setActiveTesti(i)}
            />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="pa-cta">
        <div className="pa-cta-glow" />
        <span className="pa-eyebrow" style={{ display: 'block', marginBottom: '0.8rem' }}>Let's Connect</span>
        <h2 className="pa-cta-h2">Ready to Plan Your Event?</h2>
        <p className="pa-cta-sub">Let's create something unforgettable together. One call — and we're there.</p>
        <div className="pa-hero-btns" style={{ justifyContent: 'center' }}>
          <button className="pa-btn-solid" onClick={() => navigate('/contact')}>Contact Us Today</button>
          <button className="pa-btn-ghost" onClick={() => navigate('/events')}>View Services</button>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AboutPage;
