import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPalette, FaNetworkWired, FaChalkboardTeacher, FaBrain, FaMicrophone } from 'react-icons/fa';
import '../../styles/Home.css';
import '../../styles/about.css';
import BottomNavBar from './BottomNavBar';

const sections = [
  {
    title: 'Social Events',
    icon: <FaMicrophone />,
    color: '#00ff88',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80',
    points: ['Weddings & Receptions', 'Anniversary Celebrations', 'Engagement Parties', 'Birthday Bashes', 'Surprise Gift Events', 'Personal Milestones'],
    desc: 'We turn your most cherished personal moments into lifelong memories. From intimate gatherings to grand celebrations, our team handles every detail — décor, photography, coordination, and more — so you can simply enjoy the moment.',
  },
  {
    title: 'Commercial Events',
    icon: <FaChalkboardTeacher />,
    color: '#00cfff',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
    points: ['Political Rallies & Campaigns', 'College & Shop Launches', 'Restaurant Openings', 'Corporate Conferences', 'Team Building Events', 'Award Ceremonies'],
    desc: 'From high-energy political rallies to polished corporate conferences, we deliver end-to-end commercial event management. We ensure your brand or cause makes a powerful, lasting impression on every audience.',
  },
  {
    title: 'Brand Promotions',
    icon: <FaPalette />,
    color: '#ff9900',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=700&q=80',
    points: ['Social Media Campaigns', 'Outdoor Advertising', 'Product Shoots', 'Influencer Events', 'Hoarding & Banner Ads', 'Digital Promotions'],
    desc: 'Amplify your brand with strategic promotional campaigns that cut through the noise. We craft visually stunning, audience-targeted promotions across digital and physical platforms to maximize your reach and impact.',
  },
  {
    title: 'Pan-India Operations',
    icon: <FaNetworkWired />,
    color: '#ff4488',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80',
    points: ['Metro Cities Coverage', 'Tier-2 & Tier-3 Cities', 'On-ground Execution Teams', 'Local Vendor Network', 'Fast Deployment', '24/7 On-site Support'],
    desc: 'Wherever your event is, we show up. With active operations across metros and tier-2/3 cities, our on-ground teams ensure seamless execution no matter the location. One call — and we\'re there.',
  },
  {
    title: 'Cinematic Production',
    icon: <FaBrain />,
    color: '#aa44ff',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&q=80',
    points: ['4K Video Coverage', 'Drone Aerial Shots', 'Professional Photography', 'Cinematic Editing', 'Reels & Highlight Videos', 'Same-day Delivery'],
    desc: 'Every event deserves to look like a blockbuster. Our production team uses professional-grade cameras, drones, and cinematic editing to deliver stunning visuals that you\'ll want to watch over and over again.',
  },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) ref.classList.add('visible');
        else ref.classList.remove('visible');
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">

      {/* Hero */}
      <section style={{
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #000 0%, #0a1428 60%, #001a2e 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '5rem 2rem 3rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <span style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', letterSpacing: 4, textTransform: 'uppercase', marginBottom: '1rem' }}>Your Vision. Our Expertise.</span>
        <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1.2rem', lineHeight: 1.1 }}>
          We Make Every <span style={{ color: '#00ff88' }}>Event</span> Extraordinary
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, marginBottom: '2rem', lineHeight: 1.7 }}>
          From intimate celebrations to large-scale corporate events — we bring creativity, precision, and passion to every occasion.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/events')} style={{ background: 'linear-gradient(90deg, #00ff88, #00cc66)', color: '#000', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1rem', padding: '0.8rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', letterSpacing: 1 }}>
            Get a Quote
          </button>
          <button onClick={() => navigate('/events')} style={{ background: 'transparent', color: '#00ff88', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1rem', padding: '0.8rem 2rem', borderRadius: 8, border: '2px solid #00ff88', cursor: 'pointer', letterSpacing: 1 }}>
            Explore Events
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ background: 'rgba(0,255,136,0.07)', borderTop: '1px solid rgba(0,255,136,0.2)', borderBottom: '1px solid rgba(0,255,136,0.2)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 6rem)', flexWrap: 'wrap' }}>
        {[['10+', 'Event Types'], ['500+', 'Events Managed'], ['100%', 'Client Satisfaction'], ['24/7', 'Support']].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '2rem', fontWeight: 900, color: '#00ff88' }}>{num}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: 1 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Alternating Sections */}
      <div className="about-gradient-bg" style={{ padding: '2rem 4vw' }}>
        {sections.map((sec, i) => (
          <section
            key={sec.title}
            ref={el => sectionRefs.current[i] = el}
            className={`about-section${i % 2 !== 0 ? ' alt' : ''}`}
            style={{ gap: '3rem', padding: '4rem 0' }}
          >
            {/* Image */}
            <div className="about-section-img">
              <img
                src={sec.image}
                alt={sec.title}
                style={{ borderColor: sec.color + '66' }}
              />
            </div>

            {/* Content */}
            <div className="about-section-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <span style={{ color: sec.color, fontSize: '1.6rem' }}>{sec.icon}</span>
                <h2 style={{ color: sec.color, margin: 0 }}>{sec.title}</h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '1rem' }}>
                {sec.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {sec.points.map(p => (
                  <li key={p} style={{ background: sec.color + '18', border: `1px solid ${sec.color}44`, color: sec.color, borderRadius: 20, padding: '4px 14px', fontSize: '0.82rem', fontFamily: 'Orbitron, monospace', fontWeight: 600, letterSpacing: 0.5 }}>
                    {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/events')}
                style={{ background: `linear-gradient(90deg, ${sec.color}, ${sec.color}aa)`, color: '#000', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.9rem', padding: '0.7rem 1.8rem', borderRadius: 8, border: 'none', cursor: 'pointer', letterSpacing: 1 }}
              >
                Get Quote →
              </button>
            </div>
          </section>
        ))}
      </div>

      <div style={{ marginTop: '60px' }}>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AboutPage;
