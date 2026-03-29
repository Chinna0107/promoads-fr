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

const StarIntro = ({ onDone }) => {
  const [phase, setPhase] = useState('stars');  // stars | zoom | flash | done
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const cx = w / 2, cy = h / 2;

    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      pz: 0,
    }));

    let speed = 2;
    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, 0, w, h);

      speed = Math.min(speed + 0.08, 28);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * w;
          s.y = (Math.random() - 0.5) * h;
          s.z = w;
          s.pz = s.z;
        }
        const sx = (s.x / s.z) * w + cx;
        const sy = (s.y / s.z) * h + cy;
        const px = (s.x / s.pz) * w + cx;
        const py = (s.y / s.pz) * h + cy;
        const size = Math.max(0.3, (1 - s.z / w) * 3.5);
        const bright = Math.floor((1 - s.z / w) * 255);
        const g = Math.floor(bright * 0.9);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(${bright},${255},${g},${(1 - s.z / w) * 0.9})`;
        ctx.lineWidth = size;
        ctx.stroke();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, []);

  // Phase sequence
  useEffect(() => {
    const t = [];
    t.push(setTimeout(() => setPhase('zoom'), 2200));
    t.push(setTimeout(() => setPhase('flash'), 2800));
    t.push(setTimeout(() => setPhase('done'), 3400));
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    if (phase === 'done') { setTimeout(onDone, 10); }
  }, [phase, onDone]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'flash' ? 0 : 1,
      transition: phase === 'flash' ? 'opacity 0.55s ease' : 'none',
    }}>
      {/* Starfield */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Center logo / text reveal */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        animation: phase === 'zoom' ? 'starZoomIn 0.6s cubic-bezier(0.34,1.4,0.64,1) forwards' : 'starFadeIn 1.2s ease forwards',
      }}>
        {/* Star burst */}
        <svg viewBox="0 0 120 120" style={{
          width: 'clamp(60px,12vw,110px)',
          filter: 'drop-shadow(0 0 18px #00ff88) drop-shadow(0 0 40px #00ff8866)',
          animation: 'starSpin 6s linear infinite',
        }}>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
            <line key={i}
              x1="60" y1="60"
              x2={60 + Math.cos(angle * Math.PI / 180) * (i % 2 === 0 ? 52 : 32)}
              y2={60 + Math.sin(angle * Math.PI / 180) * (i % 2 === 0 ? 52 : 32)}
              stroke={i % 2 === 0 ? '#00ff88' : '#00cfff'}
              strokeWidth={i % 2 === 0 ? 2.5 : 1.2}
              strokeLinecap="round"
            />
          ))}
          <circle cx="60" cy="60" r="10" fill="#00ff88" opacity="0.9" />
          <circle cx="60" cy="60" r="6" fill="#fff" />
        </svg>

        <div style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: 'clamp(1.2rem,4vw,2.2rem)',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '0.3em',
          textShadow: '0 0 30px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.3)',
          animation: 'starFadeIn 1.5s ease 0.4s both',
        }}>PROMOADS</div>

        <div style={{
          color: 'rgba(0,255,136,0.7)',
          fontFamily: 'Orbitron, monospace',
          fontSize: 'clamp(0.5rem,1.5vw,0.75rem)',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          animation: 'starFadeIn 1.5s ease 0.8s both',
        }}>Your Vision. Our Execution.</div>

        {/* Horizontal lines */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'starFadeIn 1.5s ease 1s both' }}>
          <div style={{ width: 'clamp(40px,8vw,80px)', height: 1, background: 'linear-gradient(90deg, transparent, #00ff88)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
          <div style={{ width: 'clamp(40px,8vw,80px)', height: 1, background: 'linear-gradient(90deg, #00ff88, transparent)' }} />
        </div>
      </div>

      {/* Corner decorations */}
      {[['0','0','right','bottom'],['0','auto','right','top'],['auto','0','left','bottom'],['auto','auto','left','top']].map(([b,t,r,l], i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: b !== 'auto' ? 'clamp(16px,4vw,40px)' : 'auto',
          top: t !== 'auto' ? 'clamp(16px,4vw,40px)' : 'auto',
          right: r !== 'auto' ? 'clamp(16px,4vw,40px)' : 'auto',
          left: l !== 'auto' ? 'clamp(16px,4vw,40px)' : 'auto',
          width: 'clamp(20px,4vw,40px)', height: 'clamp(20px,4vw,40px)',
          borderTop: (t !== 'auto') ? '2px solid rgba(0,255,136,0.4)' : 'none',
          borderBottom: (b !== 'auto') ? '2px solid rgba(0,255,136,0.4)' : 'none',
          borderLeft: (l !== 'auto') ? '2px solid rgba(0,255,136,0.4)' : 'none',
          borderRight: (r !== 'auto') ? '2px solid rgba(0,255,136,0.4)' : 'none',
          animation: `starFadeIn 1s ease ${0.3 + i * 0.1}s both`,
        }} />
      ))}

      <style>{`
        @keyframes starFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes starZoomIn {
          from { transform: scale(1); }
          to   { transform: scale(4); opacity: 0; }
        }
        @keyframes starSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
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
      {showIntro && <StarIntro onDone={() => setShowIntro(false)} />}
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
