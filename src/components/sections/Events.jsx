// src/components/sections/Events.jsx
// src/components/sections/Events.jsx
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaGamepad, FaChalkboardTeacher, FaMicrophone, FaLaptopCode, FaPalette, FaLightbulb, FaCube, FaUtensils, FaBrain, FaGithub, FaNetworkWired } from 'react-icons/fa';
import tkLogo from '../../assets/images/tk26.png';
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
    { key: 'Social', label: 'Social Events', icon: <FaMicrophone size={20} /> },
    { key: 'Commercial', label: 'Commercial', icon: <FaLaptopCode size={20} /> },
    { key: 'Promotions', label: 'Advertising', icon: <FaBrain size={20} /> },
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
        { !category && (
          <img src='https://res.cloudinary.com/dwmjz9csc/image/upload/v1772687256/imgtourl/fd552f0611c2449ca663aa95e1788309.png' alt="Theme Pic moscot" className="mascot-image" style={{ position: 'absolute', right: 18, bottom: 18, width: 320, height: 'auto', zIndex: 101, opacity: 0.95 }} />
        )}
        {!category && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', marginTop: '5rem', padding: '0 2rem', paddingBottom: '120px', minHeight: '60vh', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
            {categories.map((cat) => {
              const categoryImages = {
                'Social': 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772685897/co2_gr2len.jpg',
                'Commercial': 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772685892/co1_o7auwb.jpg',
                'Promotions': 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647792/5_i0dcqp.png'
              };
              
              return (
                <div
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  style={{
                    width: '300px',
                    height: '350px',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0,255,136,0.2)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    position: 'relative',
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
                      src={categoryImages[cat.key]} 
                      alt={cat.label} 
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
                  
                  <div style={{ padding: '1.5rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '2.5rem', color: '#00ff88', marginBottom: '1rem' }}>{cat.icon}</div>
                    <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{cat.label}</h3>
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
                      {event.icon && <span style={{ color: '#00ff88', fontSize: '1.2rem' }}>{event.icon}</span>}
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
                    
                    <a 
                      href={event.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        ...sciFiBtnStyle,
                        minWidth: 90,
                        minHeight: 32,
                        fontSize: '0.9rem',
                        background: 'rgba(0,255,136,0.1)',
                        color: '#00ff88',
                        border: '1px solid #00ff88',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px'
                      }}
                    >
                      View Details
                    </a>
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
      { id: '1', eventId: 'weddings', title: 'Weddings', description: 'Capture and celebrate the most special day with elegant event coverage.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647792/5_i0dcqp.png', pdf: Webdev, icon: <FaPalette /> },
      { id: '2', eventId: 'anniversaries', title: 'Anniversaries', description: 'Celebrate milestones of love and togetherness with memorable events.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647786/4_p9eplw.png', pdf: CracktheCode, icon: <FaCode /> },
      { id: '3', eventId: 'engagement-parties', title: 'Engagement Parties', description: 'Mark the beginning of a lifelong journey with a beautiful engagement event.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647798/6_pbrkg5.png', pdf: Hackathon, icon: <FaLaptopCode /> },
      { id: '4', eventId: 'surprise-gifts', title: 'Surprise Gifts', description: 'Plan and execute the perfect surprise gift experience for your loved ones.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647786/4_p9eplw.png', pdf: CracktheCode, icon: <FaLightbulb /> },
      { id: '5', eventId: 'birthday-celebrations', title: 'Birthday Celebrations', description: 'Make every birthday unforgettable with custom-themed celebrations.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647798/6_pbrkg5.png', pdf: Hackathon, icon: <FaGamepad /> },
      { id: '6', eventId: 'personal-events', title: 'Personal Events', description: 'Tailored event management for any personal milestone or gathering.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647772/2_fdomhf.png', pdf: Presentation, icon: <FaMicrophone /> },
    ],
    Commercial: [
      { id: '7', eventId: 'political-events', title: 'Political Events', description: 'Professional management for rallies, campaigns, and political gatherings.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647765/1_vcbzgr.png', pdf: Circuitron, icon: <FaNetworkWired /> },
      { id: '8', eventId: 'launching-events', title: 'Launching Events', description: 'Grand launch events for colleges, shops, restaurants, and more.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647772/2_fdomhf.png', pdf: Presentation, icon: <FaChalkboardTeacher /> },
      { id: '9', eventId: 'corporate-events', title: 'Corporate Events', description: 'End-to-end management for corporate meets, conferences, and team events.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647779/3_ci7xts.png', pdf: TechQuiz, icon: <FaBrain /> },
    ],
    Promotions: [
      { id: '10', eventId: 'advertising-promoting', title: 'Advertising / Promoting', description: 'Strategic advertising and promotional campaigns to boost your brand visibility.', tags: ['Individual'], image: 'https://res.cloudinary.com/dgyykbmt6/image/upload/v1772647792/5_i0dcqp.png', pdf: Webdev, icon: <FaPalette /> },
    ]
  };
  return allEvents[category] || [];
}

export default Events;
