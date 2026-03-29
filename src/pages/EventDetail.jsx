import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { FaCode, FaGamepad, FaChalkboardTeacher, FaMicrophone, FaLaptopCode, FaPalette, FaLightbulb, FaNetworkWired, FaBrain, FaCheckCircle, FaArrowLeft, FaCalendarAlt, FaUsers, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import BottomNavBar from '../components/sections/BottomNavBar';
import tkLogo from '../assets/images/tk26.png';

const allEvents = {
  Social: [
    {
      eventId: 'weddings',
      title: 'Weddings',
      icon: <FaPalette />,
      color: '#00ff88',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90',
      description: 'Capture and celebrate the most special day with elegant event coverage. We handle every detail from décor to photography.',
      longDesc: 'Your wedding day is the most cherished moment of your life. At PromoAds, we transform your dream wedding into a breathtaking reality. From floral arrangements and stage décor to professional photography, videography, and on-day coordination — our dedicated team ensures every moment is perfect. We work with top vendors, caterers, and artists to deliver a seamless, stress-free experience that you and your guests will remember forever.',
      highlights: ['Custom Theme Décor', 'Professional Photography & Videography', 'Floral Arrangements', 'Stage & Mandap Setup', 'Catering Coordination', 'Guest Management', 'Live Music & Entertainment', 'Same-day Photo Delivery'],
      process: ['Initial Consultation & Vision Board', 'Vendor Selection & Booking', 'Décor & Theme Finalization', 'Rehearsal & Coordination', 'On-day Execution', 'Post-event Highlights Delivery'],
      tags: ['Social', 'Personal', 'Celebration'],
    },
    {
      eventId: 'anniversaries',
      title: 'Anniversaries',
      icon: <FaCode />,
      color: '#00ff88',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1200&q=90',
      description: 'Celebrate milestones of love and togetherness with memorable events crafted just for you.',
      longDesc: 'Every anniversary is a milestone worth celebrating in style. Whether it\'s your 1st or 50th, PromoAds creates intimate and grand anniversary celebrations tailored to your story. From surprise setups and romantic dinners to large family gatherings, we handle every detail with care and creativity.',
      highlights: ['Surprise Setup Planning', 'Romantic Décor', 'Personalized Themes', 'Photography & Reels', 'Cake & Catering', 'Invitation Design', 'Entertainment Booking', 'Memory Wall Setup'],
      process: ['Story & Theme Discussion', 'Venue Selection', 'Décor & Surprise Planning', 'Vendor Coordination', 'Day-of Execution', 'Memory Delivery'],
      tags: ['Social', 'Romantic', 'Milestone'],
    },
    {
      eventId: 'engagement-parties',
      title: 'Engagement Parties',
      icon: <FaLaptopCode />,
      color: '#00ff88',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90',
      description: 'Mark the beginning of a lifelong journey with a beautiful engagement event.',
      longDesc: 'An engagement is the first chapter of your forever story. PromoAds designs stunning engagement ceremonies that reflect your personalities and set the tone for your wedding. From intimate ring ceremonies to grand celebrations with family and friends, we make every moment magical.',
      highlights: ['Ring Ceremony Setup', 'Stage & Backdrop Design', 'Floral Décor', 'Photography & Videography', 'Catering & Cake', 'Invitation Cards', 'Entertainment', 'Guest Coordination'],
      process: ['Concept & Theme Planning', 'Venue Booking', 'Décor Setup', 'Ceremony Coordination', 'Photography Direction', 'Highlights Delivery'],
      tags: ['Social', 'Celebration', 'Personal'],
    },
    {
      eventId: 'surprise-gifts',
      title: 'Surprise Gifts',
      icon: <FaLightbulb />,
      color: '#00ff88',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=90',
      description: 'Plan and execute the perfect surprise gift experience for your loved ones.',
      longDesc: 'Nothing says love like a perfectly planned surprise. PromoAds specializes in creating unforgettable surprise experiences — from surprise birthday setups and gift reveals to flash mobs and personalized video messages. We handle the planning so you can enjoy the moment.',
      highlights: ['Surprise Setup & Decoration', 'Flash Mob Coordination', 'Personalized Gift Curation', 'Video Message Production', 'Secret Planning', 'Photography', 'Balloon & Floral Décor', 'Cake Delivery'],
      process: ['Secret Consultation', 'Theme & Concept Design', 'Vendor Coordination', 'Setup on D-day', 'Surprise Execution', 'Memory Capture'],
      tags: ['Social', 'Surprise', 'Personal'],
    },
    {
      eventId: 'birthday-celebrations',
      title: 'Birthday Celebrations',
      icon: <FaGamepad />,
      color: '#00ff88',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=90',
      description: 'Make every birthday unforgettable with custom-themed celebrations.',
      longDesc: 'Birthdays deserve to be celebrated in the grandest way possible. PromoAds creates custom-themed birthday parties for all ages — from kids\' fantasy parties to milestone adult celebrations. We handle décor, entertainment, catering, and photography so every moment is picture-perfect.',
      highlights: ['Custom Theme Décor', 'Balloon Arrangements', 'Cake Design & Delivery', 'Photography & Reels', 'Entertainment & Games', 'Invitation Design', 'Catering Coordination', 'Return Gifts'],
      process: ['Theme Selection', 'Venue & Vendor Booking', 'Décor Planning', 'Entertainment Setup', 'Day-of Coordination', 'Photo & Video Delivery'],
      tags: ['Social', 'Birthday', 'Celebration'],
    },
    {
      eventId: 'personal-events',
      title: 'Personal Events',
      icon: <FaMicrophone />,
      color: '#00ff88',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=90',
      description: 'Tailored event management for any personal milestone or gathering.',
      longDesc: 'Life is full of moments worth celebrating — baby showers, house warmings, graduation parties, farewell events, and more. PromoAds provides end-to-end event management for any personal occasion, ensuring every gathering is warm, memorable, and stress-free.',
      highlights: ['Custom Event Planning', 'Venue Selection', 'Décor & Setup', 'Catering Coordination', 'Photography', 'Entertainment', 'Invitation Design', 'Guest Management'],
      process: ['Event Brief & Planning', 'Vendor Selection', 'Décor & Theme Setup', 'Day-of Coordination', 'Photography Direction', 'Post-event Delivery'],
      tags: ['Social', 'Personal', 'Custom'],
    },
  ],
  Commercial: [
    {
      eventId: 'political-events',
      title: 'Political Events',
      icon: <FaNetworkWired />,
      color: '#00cfff',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=90',
      description: 'Professional management for rallies, campaigns, and political gatherings.',
      longDesc: 'Political events demand precision, scale, and impact. PromoAds delivers comprehensive management for political rallies, roadshows, campaign launches, and public meetings. Our experienced team handles logistics, stage setup, crowd management, media coordination, and live coverage to ensure your message reaches every corner.',
      highlights: ['Stage & LED Screen Setup', 'Crowd Management', 'Sound & Lighting Systems', 'Media & Press Coordination', 'Branding & Banners', 'Security Coordination', 'Live Streaming', 'Logistics & Transport'],
      process: ['Event Brief & Scale Planning', 'Venue & Permissions', 'Vendor & Logistics Setup', 'Branding Installation', 'Day-of Coordination', 'Media Coverage'],
      tags: ['Commercial', 'Political', 'Large Scale'],
    },
    {
      eventId: 'launching-events',
      title: 'Launching Events',
      icon: <FaChalkboardTeacher />,
      color: '#00cfff',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=90',
      description: 'Grand launch events for colleges, shops, restaurants, and more.',
      longDesc: 'First impressions matter. PromoAds creates powerful launch events that put your brand, business, or institution on the map. Whether you\'re opening a restaurant, launching a product, or inaugurating a college, we design experiences that generate buzz, attract media, and leave a lasting impression on your audience.',
      highlights: ['Grand Inauguration Setup', 'Celebrity & Guest Management', 'Media Invitations & PR', 'Stage & Backdrop Design', 'Product Display Setup', 'Photography & Videography', 'Live Streaming', 'Branding & Signage'],
      process: ['Launch Strategy Planning', 'Venue & Date Finalization', 'Vendor & Media Coordination', 'Setup & Branding', 'Launch Day Execution', 'Post-event Coverage'],
      tags: ['Commercial', 'Launch', 'Brand'],
    },
    {
      eventId: 'corporate-events',
      title: 'Corporate Events',
      icon: <FaBrain />,
      color: '#00cfff',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=90',
      description: 'End-to-end management for corporate meets, conferences, and team events.',
      longDesc: 'Corporate events are a reflection of your company\'s culture and values. PromoAds delivers seamless corporate event management — from annual conferences and product launches to team-building retreats and award ceremonies. We handle every detail professionally so your team can focus on what matters.',
      highlights: ['Conference & Seminar Setup', 'AV & Tech Equipment', 'Team Building Activities', 'Award Ceremony Design', 'Corporate Branding', 'Catering & Hospitality', 'Photography & Documentation', 'Virtual & Hybrid Events'],
      process: ['Requirements & Brief', 'Venue & Tech Planning', 'Vendor Coordination', 'Setup & Rehearsal', 'Event Execution', 'Documentation Delivery'],
      tags: ['Commercial', 'Corporate', 'Professional'],
    },
  ],
  Promotions: [
    {
      eventId: 'advertising-promoting',
      title: 'Advertising / Promoting',
      icon: <FaPalette />,
      color: '#ff9900',
      image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&q=90',
      description: 'Strategic advertising and promotional campaigns to boost your brand visibility.',
      longDesc: 'In a crowded market, visibility is everything. PromoAds crafts strategic advertising and promotional campaigns that cut through the noise and connect with your target audience. From outdoor hoardings and social media campaigns to influencer events and product shoots, we amplify your brand across every platform.',
      highlights: ['Social Media Campaigns', 'Hoarding & Banner Ads', 'Product Photography & Shoots', 'Influencer Event Management', 'Digital Ad Creatives', 'Brand Activation Events', 'Outdoor Advertising', 'Campaign Analytics'],
      process: ['Brand Brief & Audience Analysis', 'Campaign Strategy Design', 'Creative Production', 'Platform Deployment', 'Campaign Monitoring', 'Performance Report'],
      tags: ['Promotions', 'Digital', 'Brand'],
    },
  ],
};

// Flatten all events for lookup
const allEventsFlat = Object.values(allEvents).flat();

const EventDetail = () => {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category') || '';

  const event = allEventsFlat.find(e => e.eventId === eventId);

  if (!event) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
        <h2 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', marginBottom: 12 }}>Event Not Found</h2>
        <button onClick={() => navigate('/events')} style={{ padding: '12px 28px', background: 'linear-gradient(90deg,#00ff88,#00cc66)', color: '#000', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'Orbitron, monospace' }}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden', color: '#fff' }}>
      <style>{`
        @keyframes glow { 0%,100%{filter:drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2)} 50%{filter:drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      {/* Logo */}
      {/* <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 100 }}>
        <img src={tkLogo} alt="Logo" style={{ height: 32, animation: 'glow 2s ease-in-out infinite alternate' }} />
      </div> */}

      {/* Back button */}
      <div style={{ position: 'fixed', top: 16, left: 70, zIndex: 100 }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1 }}>
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      {/* Hero Image */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(220px, 45vw, 500px)', overflow: 'hidden', marginTop: '70px' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, #000 100%)` }} />
        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px,4vw,48px)', animation: 'fadeUp 0.6s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ color: event.color, fontSize: 'clamp(1.2rem,3vw,2rem)', filter: `drop-shadow(0 0 8px ${event.color})` }}>{event.icon}</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {event.tags.map(t => (
                <span key={t} style={{ background: event.color + '20', border: `1px solid ${event.color}44`, color: event.color, padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontFamily: 'Orbitron, monospace', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.4rem,5vw,3rem)', fontWeight: 900, color: '#fff', margin: 0, textShadow: `0 0 30px ${event.color}66` }}>
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,48px)' }}>

        {/* Description */}
        <div style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.95rem,2vw,1.15rem)', lineHeight: 1.85, margin: 0 }}>{event.longDesc}</p>
        </div>

        {/* Quick info bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {[
            { icon: <FaCalendarAlt />, label: 'Flexible Dates', sub: 'Book anytime' },
            { icon: <FaUsers />, label: 'All Scales', sub: 'Intimate to grand' },
            { icon: <FaClock />, label: '24/7 Support', sub: 'Always available' },
            { icon: <FaMapMarkerAlt />, label: 'Pan India', sub: 'Any location' },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${event.color}22`, borderRadius: 14, padding: '16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: event.color, fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>{item.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: 2 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two column: Highlights + Process */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(16px,3vw,32px)', animation: 'fadeUp 0.6s ease 0.3s both' }}>

          {/* Highlights */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${event.color}22`, borderRadius: 20, padding: 'clamp(20px,3vw,32px)' }}>
            <h3 style={{ fontFamily: 'Orbitron, monospace', color: event.color, fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 700, marginBottom: 20, letterSpacing: 1 }}>
              ✦ What's Included
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {event.highlights.map(h => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FaCheckCircle style={{ color: event.color, flexShrink: 0, fontSize: '0.9rem' }} />
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.85rem,1.8vw,0.95rem)' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${event.color}22`, borderRadius: 20, padding: 'clamp(20px,3vw,32px)' }}>
            <h3 style={{ fontFamily: 'Orbitron, monospace', color: event.color, fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 700, marginBottom: 20, letterSpacing: 1 }}>
              ✦ Our Process
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {event.process.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: event.color + '18', border: `2px solid ${event.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: event.color, fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.85rem,1.8vw,0.95rem)', paddingTop: 4 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: `linear-gradient(135deg, ${event.color}0a, transparent)`, border: `1px solid ${event.color}22`, borderRadius: 20, padding: 'clamp(24px,4vw,40px)', textAlign: 'center', animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <h3 style={{ fontFamily: 'Orbitron, monospace', color: '#fff', fontSize: 'clamp(1rem,3vw,1.5rem)', fontWeight: 900, marginBottom: 10 }}>
            Ready to Plan Your {event.title}?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 24, fontSize: 'clamp(0.85rem,2vw,1rem)' }}>
            Get a personalized quote from our team today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(`/quotation?name=${encodeURIComponent(event.title)}`)}
              style={{ padding: 'clamp(10px,2vw,14px) clamp(24px,4vw,36px)', background: `linear-gradient(90deg, ${event.color}, ${event.color}cc)`, color: '#000', fontWeight: 700, fontSize: 'clamp(0.8rem,1.8vw,1rem)', border: 'none', borderRadius: '50px', cursor: 'pointer', fontFamily: 'Orbitron, monospace', letterSpacing: 1, boxShadow: `0 0 24px ${event.color}55` }}
            >
              Get a Quote →
            </button>
            <button
              onClick={() => navigate('/contact')}
              style={{ padding: 'clamp(10px,2vw,14px) clamp(24px,4vw,36px)', background: 'transparent', color: event.color, fontWeight: 700, fontSize: 'clamp(0.8rem,1.8vw,1rem)', border: `2px solid ${event.color}55`, borderRadius: '50px', cursor: 'pointer', fontFamily: 'Orbitron, monospace', letterSpacing: 1 }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '100px' }}>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default EventDetail;
