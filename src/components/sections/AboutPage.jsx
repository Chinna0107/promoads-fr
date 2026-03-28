import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPalette, FaNetworkWired, FaChalkboardTeacher, FaBrain, FaMicrophone, FaStar, FaQuoteLeft } from 'react-icons/fa';
import '../../styles/about.css';
import BottomNavBar from './BottomNavBar';

const sections = [
  {
    title: 'Social Events',
    icon: <FaMicrophone />,
    color: '#00ff88',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85',
    points: ['Weddings & Receptions', 'Anniversary Celebrations', 'Engagement Parties', 'Birthday Bashes', 'Surprise Gift Events', 'Personal Milestones'],
    desc: 'We turn your most cherished personal moments into lifelong memories. From intimate gatherings to grand celebrations, our team handles every detail — décor, photography, coordination, and more.',
  },
  {
    title: 'Commercial Events',
    icon: <FaChalkboardTeacher />,
    color: '#00cfff',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85',
    points: ['Political Rallies & Campaigns', 'College & Shop Launches', 'Restaurant Openings', 'Corporate Conferences', 'Team Building Events', 'Award Ceremonies'],
    desc: 'From high-energy political rallies to polished corporate conferences, we deliver end-to-end commercial event management that makes your brand or cause leave a powerful, lasting impression.',
  },
  {
    title: 'Brand Promotions',
    icon: <FaPalette />,
    color: '#ff9900',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=85',
    points: ['Social Media Campaigns', 'Outdoor Advertising', 'Product Shoots', 'Influencer Events', 'Hoarding & Banner Ads', 'Digital Promotions'],
    desc: 'Amplify your brand with strategic promotional campaigns that cut through the noise. We craft visually stunning, audience-targeted promotions across digital and physical platforms.',
  },
  {
    title: 'Pan-India Operations',
    icon: <FaNetworkWired />,
    color: '#ff4488',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85',
    points: ['Metro Cities Coverage', 'Tier-2 & Tier-3 Cities', 'On-ground Execution Teams', 'Local Vendor Network', 'Fast Deployment', '24/7 On-site Support'],
    desc: "Wherever your event is, we show up. With active operations across metros and tier-2/3 cities, our on-ground teams ensure seamless execution no matter the location.",
  },
  {
    title: 'Cinematic Production',
    icon: <FaBrain />,
    color: '#aa44ff',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85',
    points: ['4K Video Coverage', 'Drone Aerial Shots', 'Professional Photography', 'Cinematic Editing', 'Reels & Highlight Videos', 'Same-day Delivery'],
    desc: "Every event deserves to look like a blockbuster. Our production team uses professional-grade cameras, drones, and cinematic editing to deliver stunning visuals.",
  },
];

const stats = [
  { num: 500, suffix: '+', label: 'Events Managed' },
  { num: 10, suffix: '+', label: 'Event Types' },
  { num: 100, suffix: '%', label: 'Satisfaction' },
  { num: 50, suffix: '+', label: 'Cities Covered' },
];

const steps = [
  { step: '01', title: 'Consultation', desc: 'Share your vision and requirements with our expert team.', color: '#00ff88' },
  { step: '02', title: 'Planning', desc: 'We craft a detailed plan tailored to your event and budget.', color: '#00cfff' },
  { step: '03', title: 'Execution', desc: 'Our on-ground team brings every detail to life flawlessly.', color: '#ff9900' },
  { step: '04', title: 'Delivery', desc: 'You enjoy the moment while we handle everything behind the scenes.', color: '#aa44ff' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Wedding Client', text: 'PromoAds made our wedding absolutely magical. Every detail was perfect!', rating: 5 },
  { name: 'Ravi Kumar', role: 'Corporate Client', text: 'Our product launch was a massive success. Professional team, flawless execution.', rating: 5 },
  { name: 'Anita Reddy', role: 'Birthday Event', text: 'The surprise party they organized left everyone speechless. Highly recommend!', rating: 5 },
];

// Animated counter hook
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const StatItem = ({ num, suffix, label, animate }) => {
  const count = useCounter(num, 1600, animate);
  return (
    <div className="about-stat-item">
      <span className="about-stat-num">{animate ? count : 0}{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
};

const AboutPage = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const statsRef = useRef(null);
  const stepsRef = useRef([]);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    // Cards observer
    const cardObserver = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('about-card-visible'); }),
      { threshold: 0.1 }
    );
    cardRefs.current.forEach(r => r && cardObserver.observe(r));

    // Steps observer
    const stepsObserver = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('step-visible'); }),
      { threshold: 0.15 }
    );
    stepsRef.current.forEach(r => r && stepsObserver.observe(r));

    // Stats observer
    const statsObserver = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => { cardObserver.disconnect(); stepsObserver.disconnect(); statsObserver.disconnect(); };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="about-root">

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="about-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }} />
          ))}
        </div>
        <div className="about-hero-glow" />
        <div className="about-hero-glow2" />

        <span className="about-hero-tag">✦ Your Vision. Our Expertise. ✦</span>
        <h1 className="about-hero-title">
          We Make Every<br />
          <span className="about-hero-highlight">Event</span> Extraordinary
        </h1>
        <p className="about-hero-sub">
          From intimate celebrations to large-scale corporate events — creativity, precision, and passion in every occasion.
        </p>
        <div className="about-hero-btns">
          <button onClick={() => navigate('/events')} className="about-btn-primary">
            <span>Get a Quote</span>
            <span className="about-btn-arrow">→</span>
          </button>
          <button onClick={() => navigate('/contact')} className="about-btn-outline">Contact Us</button>
        </div>

        {/* Scroll hint */}
        <div className="about-scroll-hint">
          <div className="about-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="about-stats" ref={statsRef}>
        {stats.map(s => (
          <StatItem key={s.label} {...s} animate={statsVisible} />
        ))}
      </div>

      {/* ── Services Cards ── */}
      <div className="about-section-label">
        <span className="about-section-tag">What We Do</span>
        <h2 className="about-section-heading">Our Services</h2>
      </div>

      <div className="about-cards-wrap">
        {sections.map((sec, i) => (
          <div
            key={sec.title}
            ref={el => cardRefs.current[i] = el}
            className={`about-card ${i % 2 !== 0 ? 'about-card-alt' : ''}`}
            style={{ '--accent': sec.color, '--delay': `${i * 0.1}s` }}
          >
            {/* Image */}
            <div className="about-card-img-wrap">
              <img src={sec.image} alt={sec.title} className="about-card-img" loading="lazy" />
              <div className="about-card-img-overlay" style={{ background: `linear-gradient(135deg, ${sec.color}33 0%, transparent 60%)` }} />
              <div className="about-card-img-badge" style={{ background: sec.color + '22', border: `1px solid ${sec.color}55`, color: sec.color }}>
                {sec.icon}
              </div>
            </div>

            {/* Content */}
            <div className="about-card-body">
              <div className="about-card-header">
                <h2 className="about-card-title" style={{ color: sec.color }}>{sec.title}</h2>
                <div className="about-card-line" style={{ background: `linear-gradient(90deg, ${sec.color}, transparent)` }} />
              </div>
              <p className="about-card-desc">{sec.desc}</p>
              <div className="about-card-tags">
                {sec.points.map(p => (
                  <span key={p} className="about-card-tag" style={{ color: sec.color, background: sec.color + '12', border: `1px solid ${sec.color}30` }}>
                    ✓ {p}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate('/events')}
                className="about-card-btn"
                style={{ background: `linear-gradient(90deg, ${sec.color}, ${sec.color}cc)`, boxShadow: `0 4px 20px ${sec.color}44` }}
              >
                Get Quote →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── How It Works ── */}
      <div className="about-section-label" style={{ marginTop: '3rem' }}>
        <span className="about-section-tag">Our Process</span>
        <h2 className="about-section-heading">How It Works</h2>
      </div>

      <div className="about-steps-wrap">
        {steps.map((s, i) => (
          <div key={s.step} ref={el => stepsRef.current[i] = el} className="about-step" style={{ '--scolor': s.color, '--sdelay': `${i * 0.15}s` }}>
            <div className="about-step-num" style={{ color: s.color, border: `2px solid ${s.color}44`, background: s.color + '10' }}>{s.step}</div>
            <div className="about-step-connector" />
            <h3 className="about-step-title" style={{ color: s.color }}>{s.title}</h3>
            <p className="about-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Testimonials ── */}
      <div className="about-section-label" style={{ marginTop: '3rem' }}>
        <span className="about-section-tag">Client Love</span>
        <h2 className="about-section-heading">What They Say</h2>
      </div>

      <div className="about-testimonials">
        <div className="about-testimonial-card">
          <FaQuoteLeft className="about-quote-icon" />
          <p className="about-testimonial-text">"{testimonials[activeTestimonial].text}"</p>
          <div className="about-testimonial-stars">
            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => <FaStar key={i} />)}
          </div>
          <div className="about-testimonial-author">
            <div className="about-testimonial-avatar">{testimonials[activeTestimonial].name[0]}</div>
            <div>
              <div className="about-testimonial-name">{testimonials[activeTestimonial].name}</div>
              <div className="about-testimonial-role">{testimonials[activeTestimonial].role}</div>
            </div>
          </div>
        </div>
        <div className="about-testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`about-dot ${i === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div className="about-cta-banner">
        <div className="about-cta-glow" />
        <span className="about-section-tag" style={{ marginBottom: '1rem', display: 'block' }}>Let's Connect</span>
        <h2 className="about-cta-title">Ready to Plan Your Event?</h2>
        <p className="about-cta-sub">Let's create something unforgettable together. One call — and we're there.</p>
        <div className="about-hero-btns" style={{ justifyContent: 'center' }}>
          <button onClick={() => navigate('/contact')} className="about-btn-primary">Contact Us Today</button>
          <button onClick={() => navigate('/events')} className="about-btn-outline">View Services</button>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AboutPage;
