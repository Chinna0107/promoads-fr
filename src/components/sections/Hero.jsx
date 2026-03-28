import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import MatterBackground from '../MatterBackground'; // Import MatterBackground
import BottomNavBar from './BottomNavBar'; // Import the new BottomNavBar component
import Countdown from './Countdown';
import VisitorCounter from './VisitorCounter';
import Playground from '../games/Playground';
import { TracingBeam } from '../TracingBeam'; // Import TracingBeam
import Details from './Details'; // Import Details component


// Image imports

import namepic from '../../assets/images/logo260.png';

// Mascot/Logo imports for top-right section
import ieteMascot from '../../assets/images/ietelogo.png';
import eceMascot from '../../assets/images/deptlogo.png';
import aittMascot from '../../assets/images/aittlogo.png';



// import coderImg from '../../assets/images/about tk.png'; // Moved to BottomNavBar

// Social icons
import linkedinIcon from '../../assets/images/linkedin.svg';
import instagramIcon from '../../assets/images/instagram.svg';

//about logins and games
import games from '../../assets/images/gameicon.png';
import loginIcon from '../../assets/images/userbg.png'; 
import whatsapp from '../../assets/images/whatsapp.svg';

const SOCIAL_ICONS = [
  { key: 'linkedin', icon: linkedinIcon, url: 'https://www.linkedin.com/in/aits-tirupati-41142927b/', alt: 'LinkedIn' },
  { key: 'instagram', icon: instagramIcon, url: 'https://www.instagram.com/codeathon_aitt/', alt: 'Instagram' },
  { key: 'whatsapp', icon: whatsapp, url: 'https://wa.me/919652945626', alt: 'WhatsApp' },
];

const ThunderIntro = ({ onDone }) => {
  const [phase, setPhase] = useState('static');   // static | colorbar | thunder | poweron | done
  const [flashOn, setFlashOn] = useState(false);
  const [boltVisible, setBoltVisible] = useState(false);
  const [scanline, setScanline] = useState(true);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Draw CRT static noise on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let running = true;
    const draw = () => {
      if (!running) return;
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 180;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 200;
      }
      ctx.putImageData(img, 0, 0);
      animRef.current = requestAnimationFrame(draw);
    };
    if (phase === 'static' || phase === 'thunder') draw();
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, [phase]);

  // Master sequence
  useEffect(() => {
    const t = [];
    // Phase 1: static (0–900ms)
    t.push(setTimeout(() => setPhase('colorbar'), 900));
    // Phase 2: color bars (900–1600ms)
    t.push(setTimeout(() => setPhase('thunder'), 1600));
    // Phase 3: thunder flashes
    const flashes = [1700, 1850, 1950, 2080, 2180, 2300];
    const durations = [70, 50, 100, 40, 130, 80];
    flashes.forEach((delay, i) => {
      t.push(setTimeout(() => {
        setFlashOn(true);
        if (i === 0) setBoltVisible(true);
        setTimeout(() => {
          setFlashOn(false);
          if (i === 0) setTimeout(() => setBoltVisible(false), 200);
        }, durations[i]);
      }, delay));
    });
    // Phase 4: power-on (2500ms)
    t.push(setTimeout(() => { setPhase('poweron'); setScanline(false); }, 2500));
    // Phase 5: done (3100ms)
    t.push(setTimeout(() => { setPhase('done'); onDone(); }, 3100));
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  if (phase === 'done') return null;

  const colorBars = ['#fff', '#ff0', '#0ff', '#0f0', '#f0f', '#f00', '#00f', '#000'];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'monospace',
      opacity: phase === 'poweron' ? 0 : 1,
      transition: phase === 'poweron' ? 'opacity 0.6s ease' : 'none',
    }}>

      {/* Outer cinema dark frame */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.95) 100%)',
        pointerEvents: 'none', zIndex: 10,
      }} />

      {/* Thunder flash overlay */}
      {flashOn && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: 'rgba(220,240,255,0.92)',
          boxShadow: '0 0 200px 100px rgba(180,220,255,0.8) inset',
        }} />
      )}

      {/* TV Frame */}
      <div style={{
        position: 'relative',
        width: 'clamp(280px, 80vw, 900px)',
        aspectRatio: '16/10',
        background: '#111',
        borderRadius: 'clamp(12px, 3vw, 28px)',
        boxShadow: '0 0 0 clamp(8px,2vw,20px) #1a1a1a, 0 0 0 clamp(10px,2.5vw,26px) #0a0a0a, 0 30px 80px rgba(0,0,0,0.9), 0 0 60px rgba(0,255,136,0.08)',
        overflow: 'hidden',
        zIndex: 5,
      }}>

        {/* Screen bezel inner shadow */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
          borderRadius: 'inherit',
        }} />

        {/* CRT curvature vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 29, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
          borderRadius: 'inherit',
        }} />

        {/* Scanlines */}
        {scanline && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 28, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
            borderRadius: 'inherit',
          }} />
        )}

        {/* ── STATIC phase ── */}
        {phase === 'static' && (
          <>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', zIndex: 15,
            }}>
              <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 'clamp(0.6rem,2vw,1rem)', letterSpacing: 6, fontFamily: 'monospace' }}>NO SIGNAL</div>
              <div style={{ color: 'rgba(255,255,255,0.08)', fontSize: 'clamp(0.5rem,1.5vw,0.75rem)', marginTop: 8, letterSpacing: 3 }}>CH 01</div>
            </div>
          </>
        )}

        {/* ── COLOR BARS phase ── */}
        {phase === 'colorbar' && (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            {colorBars.map((c, i) => (
              <div key={i} style={{ flex: 1, background: c, height: '100%' }} />
            ))}
            <div style={{
              position: 'absolute', bottom: '12%', left: 0, right: 0,
              textAlign: 'center', color: '#000', fontWeight: 900,
              fontSize: 'clamp(0.6rem,2vw,1rem)', letterSpacing: 4,
              fontFamily: 'monospace', mixBlendMode: 'difference',
              filter: 'invert(1)',
            }}>PROMOADS BROADCAST</div>
          </div>
        )}

        {/* ── THUNDER phase ── */}
        {phase === 'thunder' && (
          <>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', opacity: 0.4 }} />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 16,
            }}>
              {/* Lightning bolt */}
              <svg
                viewBox="0 0 80 160"
                style={{
                  width: 'clamp(40px,8vw,90px)',
                  opacity: boltVisible ? 1 : 0.15,
                  transition: 'opacity 0.04s',
                  filter: boltVisible
                    ? 'drop-shadow(0 0 20px #fff) drop-shadow(0 0 50px #a0d8ff) drop-shadow(0 0 80px #ffffff)'
                    : 'drop-shadow(0 0 6px rgba(255,255,255,0.2))',
                }}
              >
                <polygon points="50,0 20,90 45,90 30,160 70,60 44,60" fill="white" />
              </svg>
              <div style={{
                color: boltVisible ? '#fff' : 'rgba(255,255,255,0.2)',
                fontSize: 'clamp(0.55rem,1.8vw,0.85rem)',
                letterSpacing: 6, fontFamily: 'monospace',
                transition: 'color 0.04s',
              }}>INCOMING SIGNAL</div>
            </div>
          </>
        )}

        {/* ── POWER ON phase ── */}
        {phase === 'poweron' && (
          <div style={{
            width: '100%', height: '100%',
            background: '#fff',
            animation: 'tvPowerOn 0.5s ease-out forwards',
          }} />
        )}

        {/* Reflection glare */}
        <div style={{
          position: 'absolute', top: '5%', left: '8%',
          width: '35%', height: '18%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 31,
          transform: 'rotate(-15deg)',
        }} />
      </div>

      {/* TV stand */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(4%, 8vh, 12%)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 4,
      }}>
        <div style={{ width: 'clamp(40px,8vw,80px)', height: 'clamp(10px,2vw,20px)', background: '#1a1a1a', borderRadius: '0 0 4px 4px' }} />
        <div style={{ width: 'clamp(80px,16vw,160px)', height: 'clamp(6px,1.2vw,12px)', background: '#111', borderRadius: 4, marginTop: 2 }} />
      </div>

      {/* Bottom channel info */}
      <div style={{
        position: 'absolute', bottom: 'clamp(1.5rem,4vh,3rem)',
        left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.18)', fontSize: 'clamp(0.5rem,1.5vw,0.7rem)',
        letterSpacing: 4, fontFamily: 'monospace', zIndex: 6, whiteSpace: 'nowrap',
      }}>
        {phase === 'static' && '▶ SEARCHING CHANNEL...'}
        {phase === 'colorbar' && '▶ SIGNAL FOUND — PROMOADS'}
        {phase === 'thunder' && '⚡ CONNECTING...'}
      </div>

      <style>{`
        @keyframes tvPowerOn {
          0%   { clip-path: inset(50% 0 50% 0); opacity: 1; }
          60%  { clip-path: inset(0% 0 0% 0); opacity: 1; }
          100% { clip-path: inset(0% 0 0% 0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Hero = () => {
  const [iconActive, setIconActive] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const handleIconClick = (key, url) => {
    setIconActive((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setIconActive((prev) => ({ ...prev, [key]: false }));
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  // Only render MatterBackground on desktop/tablet (not mobile, not in inspect mode for small screens)
  const [showMatter, setShowMatter] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  // Responsive check for resize/inspect mode
  useEffect(() => {
    function handleResize() {
      setShowMatter(window.matchMedia('(min-width: 768px)').matches);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Falling dots animation for mobile glass effect
  useEffect(() => {
    if (!showMatter) {
      const canvas = document.getElementById('falling-dots-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = canvas.parentElement.offsetWidth;
      let height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      // More, smaller, brighter dots
      let dots = Array.from({ length: 80 }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 40, // start at bottom
        r: 0.7 + Math.random() * 1.1, // much smaller
        speed: 0.5 + Math.random() * 1.2,
        alpha: 0.85 + Math.random() * 0.15,
        state: 'falling' // 'falling' or 'waiting'
      }));
      let animationId;
      function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let dot of dots) {
          if (dot.state === 'falling') {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(0,220,255,${dot.alpha})`;
            ctx.shadowColor = 'rgba(0,220,255,0.7)';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            dot.y -= dot.speed;
            if (dot.y - dot.r <= 0) {
              dot.state = 'waiting';
              dot.waitTime = 0;
            }
          } else if (dot.state === 'waiting') {
            // Stay at top for a short time, then respawn at bottom
            dot.waitTime++;
            if (dot.waitTime > 10 + Math.random() * 20) {
              dot.y = height + dot.r;
              dot.x = Math.random() * width;
              dot.r = 0.7 + Math.random() * 1.1;
              dot.speed = 0.5 + Math.random() * 1.2;
              dot.alpha = 0.85 + Math.random() * 0.15;
              dot.state = 'falling';
            }
          }
        }
        animationId = requestAnimationFrame(animate);
      }
      animate();
      // Responsive resize
      function handleResize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
      };
    }
  }, [showMatter]);

  return (
    <>
      {showIntro && <ThunderIntro onDone={() => setShowIntro(false)} />}
    <TracingBeam className="w-full" beamPosition="250px">
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        {showMatter && <MatterBackground />}

        {/* Canvas for falling dots on mobile (if it exists) */}
        {!showMatter && (
          <canvas 
            id="falling-dots-canvas" 
            className="absolute inset-0 w-full h-full z-0" 
          />
        )}

       

        {/* Visitor Counter - Top Left beside Logo with Reduced Height */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40" style={{marginLeft: '1rem' }}>
          <VisitorCounter />
        </div>

        {/* Top-right section with logos - Desktop/Tablet only */}
        <div className="absolute top-4 right-5 md:top-9 md:right-6 hidden md:flex items-center gap-2 z-30">
          {/* Three logos with links */}
          {/* <a href="https://aits-tpt.edu.in/" target="_blank" rel="noopener noreferrer" title="AITT College">
            <img src={aittMascot} alt="AITT Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover hover:scale-110 transition-transform duration-200" />
          </a>
          <a href="https://aits-tpt.edu.in/electronics-and-communication-engineering-2/" target="_blank" rel="noopener noreferrer" title="ECE Department">
            <img src={eceMascot} alt="ECE Department Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover hover:scale-110 transition-transform duration-200" />
          </a>
          <a href="https://www.iete.org/" target="_blank" rel="noopener noreferrer" title="IETE">
            <img src={ieteMascot} alt="IETE Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover hover:scale-110 transition-transform duration-200" />
          </a> */}
        </div>

      
       

        {/* Center-right icons (Social, Login, Games) - Responsive positioning */}
        <div className="absolute right-6 top-6 md:right-7 md:top-1/3 md:transform md:-translate-y-1/2 flex flex-col space-y-3 md:space-y-3 z-40">
          {SOCIAL_ICONS.map(social => (
            <a
              key={social.key}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleIconClick(social.key, social.url)}
              className={`group w-10 h-10 md:w-12 md:h-12 border border-sky-500/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-360 ${
                iconActive[social.key] ? 'scale-125 bg-sky-500/70' : ''
              } ${
                social.key === 'linkedin' 
                  ? 'hover:bg-blue-600/80 hover:border-blue-600' 
                  : social.key === 'instagram' 
                  ? 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500' 
                  : 'hover:bg-sky-500/80 hover:border-sky-500'
              }`}
              title={social.alt}
            >
              <img src={social.icon} alt={social.alt} className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
          ))}
          <Link // Changed div to Link for navigation
            to="/login" // Navigate to /login page
            className="group w-10 h-10 md:w-12 md:h-12 border border-sky-500/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-360 hover:bg-green-600/80 hover:border-green-600"
            title="Login/Register"
          >
            <img src={loginIcon} alt="User Login" className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          {/* <Link
            to="#" // Assuming /games is the route for games page
            className="group w-10 h-10 md:w-12 md:h-12 border border-sky-500/30 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-360 hover:bg-purple-600/80 hover:border-purple-600"
            title="Games"
          >
            <img src={games} alt="Games" className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link> */}
        </div>
        
        {/* Main Hero Content Container - Updated Structure */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 md:p-8 w-full">
        
          {/* Section 2: Logo and Buttons */}
          <div className="hero-logo-and-buttons flex flex-col items-center w-full">
            {/* Logo - Centered, further reduced bottom margin to bring buttons closer */}
            <div className="name-logo flex justify-center">
              <span className="mobile-only">
                <img src={namepic} alt="Trishna 2K25 Logo" className="h-auto max-w-[320px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px]" style={{ marginTop: '16rem' }} />
              </span>

              
              <span className="hide-on-mobile">
                <img src={namepic} alt="Trishna 2K25 Logo" className="h-auto max-w-[1200px] sm:max-w-[1200px] md:max-w-[1200px] lg:max-w-[900px]" style={{ marginTop: '11rem' }} />
              </span>
              

            </div>

            {/* Buttons - In a row, centered below logo */}
            <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 -mt-8" style={{ marginTop: '-2rem' }}>
              <button onClick={() => navigate('/events')} className="px-6 py-2.5 
px-6 py-2.5 
bg-green-400 
text-black 
text-base 
font-sci-fi 
font-medium 
rounded-full 
shadow-xl 
transform 
hover:scale-105 
hover:bg-transparent 
hover:text-green-400 
transition-all 
duration-300 
focus:outline-none 
focus:ring-2 
focus:ring-green-300 
focus:ring-opacity-75 
border-2 
border-green-400">
                <span className="menu-btn-text">Explore Us</span>
              </button>
            </div>
          </div>
        </div>



        <BottomNavBar />
       
        
        {/* New Section for Countdown and Visitor Counter */}
        <section className="hero-next-section flex flex-col md:flex-row items-center justify-center" style={{ marginTop: '200px' }}>
          {/* Countdown Component */}
          <Countdown />
        </section>
        {/* Details Component */}
       
        
        
       
      </section>
      {/* <section> */}
         <section className="relative z-10 w-full" style={{ marginTop: '-50px' }}>
          <Details />
        </section>
      {/* </section> */}
       
         
        <section className="hero-next-section flex flex-col md:flex-row items-center justify-center" style={{ marginTop: '180px' }}>
        
        </section>

      
    </TracingBeam>
    </>
  );
};

export default Hero;
