// src/components/sections/Events.jsx
// src/components/sections/Events.jsx
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRing, FaHeart, FaGlassCheers, FaGift, FaBirthdayCake, FaUserFriends, FaLandmark, FaRocket, FaBriefcase, FaBullhorn, FaMicrophone, FaLaptopCode, FaBrain } from 'react-icons/fa';
import { MdCelebration, MdCampaign, MdStorefront } from 'react-icons/md';
import { GiPartyPopper, GiDiamondRing, GiFilmProjector } from 'react-icons/gi';
import { BsFillStarFill, BsMegaphoneFill } from 'react-icons/bs';
import tkLogo from '../../assets/images/logo260.png';
import '../../styles/Home.css';
import BottomNavBar from './BottomNavBar';
import TechQuiz from '../../assets/Rules/techquiz.pdf';
import Webdev from '../../assets/Rules/WebDevelopmentRules.pdf';
import Hackathon from '../../assets/Rules/Hackathon.pdf';
import Circuitron from '../../assets/Rules/Circuitron2.pdf';
import Presentation from '../../assets/Rules/Pppt.pdf';
import CracktheCode from '../../assets/Rules/Crack.pdf';

const Events = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const categories = [
    { key: 'Social', label: 'Social Events', icon: <GiPartyPopper size={22} /> },
    { key: 'Commercial', label: 'Commercial', icon: <FaBriefcase size={20} /> },
    { key: 'Promotions', label: 'Advertising', icon: <BsMegaphoneFill size={20} /> },
  ];

  const sciFiBtnStyle = {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#00ff88',
    background: 'rgba(0,0,0,0.18)',
    border: '2px solid #00ff8855',
    borderRadius: 8,
    padding: '0.7em 0',
    textAlign: 'center',
    letterSpacing: 2,
    boxShadow: '0 0 4px #00ff8822',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    position: 'relative',
    overflow: 'hidden',
    outline: 'none',
    margin: 0,
    minWidth: 160,
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <section id="events" ref={ref} style={{
      minHeight: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10
      }}>
        <img 
          src={tkLogo} 
          alt="TK26 Logo" 
          style={{ 
            height: '35px', 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)',
            animation: 'glow 2s ease-in-out infinite alternate'
          }} 
        />
      </div>
      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        
        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
            @media (max-width: 768px) {
              .mascot-image {
                display: none !important;
              }
            }
          `}
        </style>
        {/* { !category && (
          <img src='https://res.cloudinary.com/dwmjz9csc/image/upload/v1772687256/imgtourl/fd552f0611c2449ca663aa95e1788309.png' alt="Theme Pic moscot" className="mascot-image" style={{ position: 'absolute', right: 18, bottom: 18, width: 320, height: 'auto', zIndex: 101, opacity: 0.95 }} />
        )} */}
        {!category && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '0 1.5rem',
            marginTop: '4rem',
            paddingBottom: '100px',
            minHeight: '70vh',
            flexWrap: 'wrap',
          }}>
            {categories.map((cat) => {
              const categoryImages = {
                'Social': 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772515317/pm1_fd9py4.jpg',
                'Commercial': 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772515587/pm9_yeknsm.jpg',
                'Promotions': 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772515594/pm10_jyvqi4.jpg'
              };
              return (
                <div
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  style={{
                    width: 'clamp(240px, 28vw, 320px)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
                    boxShadow: '0 4px 24px rgba(0,255,136,0.12)',
                    border: '1px solid rgba(0,255,136,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,255,136,0.35)';
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,255,136,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(0,255,136,0.2)';
                  }}
                >
                  {/* Image — taller, no gap */}
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={categoryImages[cat.key]}
                      alt={cat.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    {/* Icon badge on image */}
                    <div style={{
                      position: 'absolute', bottom: 12, left: 14,
                      background: 'rgba(0,255,136,0.15)',
                      border: '1px solid rgba(0,255,136,0.4)',
                      borderRadius: '10px',
                      width: 40, height: 40,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#00ff88', fontSize: '1.2rem',
                      backdropFilter: 'blur(8px)',
                      filter: 'drop-shadow(0 0 6px rgba(0,255,136,0.5))',
                    }}>
                      {cat.icon}
                    </div>
                  </div>

                  {/* Content — compact */}
                  <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 700, margin: 0, letterSpacing: '0.5px' }}>
                      {cat.label}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>
                      {cat.key === 'Social' && 'Weddings, birthdays, anniversaries & more'}
                      {cat.key === 'Commercial' && 'Launches, rallies, corporate events'}
                      {cat.key === 'Promotions' && 'Campaigns, ads & brand activations'}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <span style={{ color: '#00ff88', fontSize: '0.72rem', fontFamily: 'Orbitron, monospace', fontWeight: 600, letterSpacing: 1 }}>EXPLORE</span>
                      <span style={{ color: '#00ff88', fontSize: '0.8rem' }}>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {category && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '5rem' }}>
              <button
                onClick={() => setCategory('')}
                style={{ ...sciFiBtnStyle, minWidth: 100, minHeight: 36, fontSize: '1rem', background: 'rgba(0,0,0,0.18)', color: '#00ff88', border: '2px solid #00ff8855', marginBottom: 0, marginRight: 8, cursor: 'pointer' }}
              >
                Back
              </button>
              <span style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.1rem', marginLeft: 8, alignSelf: 'center' }}>{categories.find(c => c.key === category)?.label}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 300px))', gap: '2rem', padding: '0 2rem', paddingBottom: '120px', justifyContent: 'center' }}>
              {filteredEvents(category).map((event, index) => (
                <div
                  key={event.id}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,255,136,0.2)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 0.1}s`,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,255,136,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,136,0.2)';
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden', flex: 'none' }}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      {event.icon && <span style={{ color: '#00ff88', fontSize: '1.4rem', background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.25)', borderRadius: '10px', width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, filter: 'drop-shadow(0 0 6px rgba(0,255,136,0.5))' }}>{event.icon}</span>}
                      <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{event.title}</h3>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem', flex: 1 }}>{event.description}</p>
                    
                    <button
                      onClick={() => navigate(`/quotation?name=${encodeURIComponent(event.title)}`)}
                      style={{
                        background: 'linear-gradient(90deg, #00ff88 0%, #00cc66 100%)',
                        color: '#000',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                        transition: 'all 0.2s',
                        width: '100%',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,255,136,0.4)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      Get Quote
                    </button>
                    
                    <button
                      onClick={() => navigate(`/event/${event.eventId}?category=${category}`)}
                      style={{
                        ...sciFiBtnStyle,
                        minWidth: 90,
                        minHeight: 32,
                        fontSize: '0.9rem',
                        background: 'rgba(0,255,136,0.1)',
                        color: '#00ff88',
                        border: '1px solid #00ff88',
                        padding: '0.5rem 1rem',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
      <BottomNavBar />
    </section>
  );
};

function filteredEvents(category) {
  const allEvents = {
    Social: [
      { id: '1', eventId: 'weddings', title: 'Weddings', description: 'Capture and celebrate the most special day with elegant event coverage.', tags: ['Individual'], image: 'https://cbeditz.com/public/cbeditz/preview/hindu-wedding-marriage-background-hd-wallpaper-eykcs.jpg', pdf: Webdev, icon: <FaRing /> },
      { id: '2', eventId: 'anniversaries', title: 'Anniversaries', description: 'Celebrate milestones of love and togetherness with memorable events.', tags: ['Individual'], image: 'https://m.media-amazon.com/images/I/71S4Vf4v5JL._AC_UF1000,1000_QL80_.jpg', pdf: CracktheCode, icon: <FaHeart /> },
      { id: '3', eventId: 'engagement-parties', title: 'Engagement Parties', description: 'Mark the beginning of a lifelong journey with a beautiful engagement event.', tags: ['Individual'], image: 'https://images.pexels.com/photos/3156648/pexels-photo-3156648.jpeg?cs=srgb&dl=pexels-westernsydneyweddings-3156648.jpg&fm=jpg', pdf: Hackathon, icon: <GiDiamondRing /> },
      { id: '4', eventId: 'surprise-gifts', title: 'Surprise Gifts', description: 'Plan and execute the perfect surprise gift experience for your loved ones.', tags: ['Individual'], image: 'https://static.vecteezy.com/system/resources/thumbnails/075/502/320/small/wrapped-presents-holiday-stacked-gifts-festive-celebration-surprise-boxes-new-year-photo.jpg', pdf: CracktheCode, icon: <FaGift /> },
      { id: '5', eventId: 'birthday-celebrations', title: 'Birthday Celebrations', description: 'Make every birthday unforgettable with custom-themed celebrations.', tags: ['Individual'], image: 'https://i.ytimg.com/vi/xQUaoteTShM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDEI83DXHCc6LDT_HGIkqyBKpNs6w', pdf: Hackathon, icon: <FaBirthdayCake /> },
      { id: '6', eventId: 'personal-events', title: 'Personal Events', description: 'Tailored event management for any personal milestone or gathering.', tags: ['Individual'], image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJjHy569runRU6YJYr1cKLqlOEzfb2oXdbUg&s', pdf: Presentation, icon: <FaUserFriends /> },
    ],
    Commercial: [
      { id: '7', eventId: 'political-events', title: 'Political Events', description: 'Professional management for rallies, campaigns, and political gatherings.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772515323/pm2_vbmn4j.jpg', pdf: Circuitron, icon: <FaLandmark /> },
      { id: '8', eventId: 'launching-events', title: 'Launching Events', description: 'Grand launch events for colleges, shops, restaurants, and more.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772515336/pm4_k7ij03.jpg', pdf: Presentation, icon: <FaRocket /> },
      { id: '9', eventId: 'corporate-events', title: 'Corporate Events', description: 'End-to-end management for corporate meets, conferences, and team events.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772515329/pm3_qgv8wm.jpg', pdf: TechQuiz, icon: <FaBriefcase /> },
    ],
    Promotions: [
      { id: '10', eventId: 'advertising-promoting', title: 'Advertising / Promoting', description: 'Strategic advertising and promotional campaigns to boost your brand visibility.', tags: ['Individual'], image: 'https://wallpapercave.com/wp/wp7929986.jpg', pdf: Webdev, icon: <BsMegaphoneFill /> },
    ]
  };
  return allEvents[category] || [];
}

export default Events;
