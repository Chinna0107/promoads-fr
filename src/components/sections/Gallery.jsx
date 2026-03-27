import React, { useState, useEffect } from 'react';
import BottomNavBar from './BottomNavBar';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('Weddings');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryData = {
    Weddings: [
      { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Wedding Ceremony', date: 'Social Events' },
      { id: 2, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', title: 'Wedding Reception', date: 'Social Events' },
      { id: 3, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', title: 'Bridal Decor', date: 'Social Events' },
      { id: 4, image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', title: 'Wedding Stage', date: 'Social Events' },
      { id: 5, image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', title: 'Couple Portrait', date: 'Social Events' },
    ],
    Corporate: [
      { id: 6, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Corporate Conference', date: 'Commercial Events' },
      { id: 7, image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', title: 'Product Launch', date: 'Commercial Events' },
      { id: 8, image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80', title: 'Business Meet', date: 'Commercial Events' },
      { id: 9, image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', title: 'Award Ceremony', date: 'Commercial Events' },
      { id: 10, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', title: 'Team Event', date: 'Commercial Events' },
    ],
    Promotions: [
      { id: 11, image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80', title: 'Brand Campaign', date: 'Advertising' },
      { id: 12, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', title: 'Outdoor Promotion', date: 'Advertising' },
      { id: 13, image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80', title: 'Social Media Shoot', date: 'Advertising' },
      { id: 14, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', title: 'Ad Campaign', date: 'Advertising' },
    ],
    Celebrations: [
      { id: 15, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', title: 'Birthday Party', date: 'Social Events' },
      { id: 16, image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80', title: 'Anniversary Celebration', date: 'Social Events' },
      { id: 17, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', title: 'Engagement Party', date: 'Social Events' },
      { id: 18, image: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?w=800&q=80', title: 'Surprise Event', date: 'Social Events' },
    ],
  };

  const photos = galleryData[activeTab];

  useEffect(() => setCurrentIndex(0), [activeTab]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % photos.length), 5000);
    return () => clearInterval(timer);
  }, [photos.length, isHovered]);

  const ArrowBtn = ({ onClick, direction }) => (
    <button onClick={onClick} style={{ position: 'absolute', [direction]: isMobile ? '8px' : '25px', top: '50%', transform: 'translateY(-50%)', width: isMobile ? '36px' : '55px', height: isMobile ? '36px' : '55px', background: 'rgba(0,255,136,0.15)', border: '2px solid #00ff88', borderRadius: '50%', color: '#00ff88', fontSize: isMobile ? '18px' : '28px', cursor: 'pointer', transition: 'all 0.3s ease', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', backdropFilter: 'blur(10px)' }} onMouseEnter={(e) => { e.target.style.background = 'rgba(0,255,136,0.3)'; e.target.style.transform = 'translateY(-50%) scale(1.1)'; }} onMouseLeave={(e) => { e.target.style.background = 'rgba(0,255,136,0.15)'; e.target.style.transform = 'translateY(-50%) scale(1)'; }}>
      {direction === 'left' ? '❮' : '❯'}
    </button>
  );

  const DotBtn = ({ idx }) => (
    <button onClick={() => setCurrentIndex(idx)} style={{ width: idx === currentIndex ? '12px' : '8px', height: idx === currentIndex ? '12px' : '8px', borderRadius: '50%', background: idx === currentIndex ? '#00ff88' : 'rgba(255,255,255,0.2)', border: idx === currentIndex ? '2px solid #00ff88' : 'none', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: idx === currentIndex ? '0 0 20px rgba(0,255,136,0.6)' : 'none' }} onMouseEnter={(e) => { if (idx !== currentIndex) { e.target.style.background = 'rgba(0,255,136,0.4)'; e.target.style.transform = 'scale(1.3)'; } }} onMouseLeave={(e) => { if (idx !== currentIndex) { e.target.style.background = 'rgba(255,255,255,0.2)'; e.target.style.transform = 'scale(1)'; } }} />
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000 0%, #1a1a2e 50%, #16213e 100%)', color: '#fff', overflow: 'hidden' }}>
      {/* Hero Section */}
      <div style={{ height: isMobile ? '35vh' : '60vh', backgroundImage: `url(${photos[currentIndex].image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: isMobile ? '30px 20px' : '60px 40px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: isMobile ? '1.8rem' : '3.5rem', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '2px', fontFamily: 'Orbitron, monospace' }}>PROMO ADS</h1>
          <p style={{ fontSize: isMobile ? '0.85rem' : '1.3rem', margin: '0 0 12px 0', color: '#00ff88', fontWeight: '600' }}>Our Work & Event Highlights</p>
          <div style={{ width: '50px', height: '3px', background: '#00ff88', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: isMobile ? '25px 15px' : '60px 40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}>
          <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.5rem', fontWeight: 'bold', color: '#00ff88', marginBottom: '10px', letterSpacing: '2px', fontFamily: 'Orbitron, monospace' }}>Gallery</h2>
          <p style={{ fontSize: isMobile ? '0.8rem' : '1rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'Orbitron, monospace' }}>Explore our work across events & campaigns</p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: isMobile ? '8px' : '15px', marginBottom: isMobile ? '30px' : '50px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(galleryData).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: isMobile ? '8px 14px' : '12px 32px', borderRadius: '12px', background: activeTab === tab ? '#00ff88' : 'rgba(255,255,255,0.1)', color: activeTab === tab ? '#000' : '#00ff88', border: `2px solid ${activeTab === tab ? '#00ff88' : 'rgba(0,255,136,0.3)'}`, fontWeight: 'bold', cursor: 'pointer', fontSize: isMobile ? '0.75rem' : '1rem', transition: 'all 0.3s ease', fontFamily: 'Orbitron, monospace', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => { if (activeTab !== tab) e.target.style.background = 'rgba(0,255,136,0.2)'; }} onMouseLeave={(e) => { if (activeTab !== tab) e.target.style.background = 'rgba(255,255,255,0.1)'; }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Main Carousel */}
        <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: isMobile ? '15px' : '40px', boxShadow: '0 20px 60px rgba(0,255,136,0.3)', border: '2px solid rgba(0,255,136,0.4)', marginBottom: isMobile ? '35px' : '60px' }}>
          <div style={{ position: 'relative', paddingBottom: '66.67%', overflow: 'hidden', borderRadius: '16px', background: '#000', boxShadow: '0 10px 40px rgba(0,255,136,0.2)' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img src={photos[currentIndex].image} alt={photos[currentIndex].title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', animation: 'fadeIn 0.8s ease-in-out', filter: 'brightness(0.9)' }} />
            
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,0,0,0.3) 100%)', borderRadius: '16px' }} />
            
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.5), transparent)', padding: isMobile ? '25px 15px 15px' : '50px 30px 30px', color: '#fff', fontSize: isMobile ? '1rem' : '1.5rem', fontWeight: 'bold', fontFamily: 'Orbitron, monospace', animation: 'slideUp 0.6s ease-out', letterSpacing: '1px' }}>
              {photos[currentIndex].title}
              <div style={{ fontSize: isMobile ? '0.7rem' : '0.85rem', color: '#00ff88', marginTop: '6px', opacity: 0.8 }}>
                {photos[currentIndex].date} • {currentIndex + 1} / {photos.length}
              </div>
            </div>
            
            <ArrowBtn onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)} direction="left" />
            <ArrowBtn onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)} direction="right" />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '8px' : '15px', marginTop: isMobile ? '18px' : '35px' }}>
            {photos.map((_, idx) => <DotBtn key={idx} idx={idx} />)}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div style={{ marginBottom: isMobile ? '35px' : '60px' }}>
          <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 'bold', color: '#00ff88', marginBottom: isMobile ? '18px' : '30px', letterSpacing: '1px', fontFamily: 'Orbitron, monospace' }}>All Photos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(140px, 1fr))' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: isMobile ? '10px' : '20px' }}>
            {photos.map((photo, idx) => (
              <div key={photo.id} onClick={() => setCurrentIndex(idx)} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease', transform: 'scale(1)', boxShadow: '0 8px 20px rgba(0,255,136,0.2)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,255,136,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,255,136,0.2)'; }}>
                <img src={photo.image} alt={photo.title} style={{ width: '100%', height: isMobile ? '100px' : '200px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: isMobile ? '10px 8px 8px' : '20px 15px 15px', color: '#fff' }}>
                  <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: isMobile ? '0.75rem' : '0.95rem' }}>{photo.title}</p>
                  <p style={{ margin: 0, fontSize: isMobile ? '0.65rem' : '0.8rem', color: '#00ff88' }}>{photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

      <div style={{ marginTop: isMobile ? '35px' : '80px' }}>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Gallery;
