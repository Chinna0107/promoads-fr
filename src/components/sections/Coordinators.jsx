import React, { useState } from 'react'
import tkLogo from '../../assets/images/tk26.png'
import BottomNavBar from './BottomNavBar'

const topTechLeads = [
  { id: 2, name: "K HEMANTH", role: "Core Team", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772561317/HEMANTH_modxg7.jpg", desc: "IV - ECE" },
  { id: 3, name: "O JAGADEESH", role: "Core Team", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562301/co5_w8htcx.jpg", desc: "IV - ECE" },
]

const eventTeams = {
  'Event coordinators': [

    { id: 18, name: "K EEKSHITHA", image: "https://res.cloudinary.com/dgyykbmt6/image/upload/v1773056217/oo00_vqdfcf.jpg", desc: "IV - ECE" },
    { id: 20, name: "B GEETHIKA", image: "https://res.cloudinary.com/dgyykbmt6/image/upload/v1773056040/co90_hjxvww.jpg", desc: "IV - ECE" },
    // { id: 21, name: "TILAK", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772697361/thilak_kbwu1c.jpg", desc: "II - ECE" },
  ],
  'Web Development': [

    { id: 18, name: "AKASH", image: "https://res.cloudinary.com/dgyykbmt6/image/upload/v1773056040/co99_kmi0az.jpg", desc: "III - ECE" },
    { id: 20, name: "VARUN", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772649022/imgtourl/ccbad2d0d0e9438c98ff96482890cc51.jpg", desc: "II - ECE" },
    { id: 21, name: "TILAK", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772697361/thilak_kbwu1c.jpg", desc: "II - ECE" },
  ],
  'Hackathon': [
    { id: 16, name: "SANJANA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772564658/co14_ci8f9h.jpg", desc: "III - ECE" },
    { id: 15, name: "KUMARI", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772565073/co2_usfssm.jpg", desc: "III - ECE" },
    { id: 17, name: "RAKESH REDDY", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772563542/co12_otnt3l.jpg", desc: "III - ECE" },
  ],
  'Circuitron': [
    { id: 6, name: "ANKITHA", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772649157/imgtourl/2640d289225f41f890fab8cabf914189.jpg", desc: "III - ECE" },
    { id: 8, name: "ANIL KUMAR", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562706/co7_or7cgr.jpg", desc: "III - ECE" },
    { id: 9, name: "HANEESH", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772563256/co11_qzyl2o.jpg", desc: "III - ECE" },
    { id: 12, name: "MOHAN", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772696432/imgtourl/f9b34e8689e44f3396d71d9c239e7da6.jpg ", desc: "II - ECE" },
  ],
  'Crack the Code': [
    { id: 10, name: "SUSMITHA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772561924/co4_n5pjfw.jpg", desc: "III - ECE" },
    { id: 11, name: "SIVA SAI VEENA", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772648691/imgtourl/fcc11df5e63148d4b14d88fcd10f4732.jpg", desc: "III - ECE" },
    { id: 13, name: "CHARAN", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772644187/imgtourl/ad508dc67e134b3894ea1749e0a3fe38.jpg", desc: "II - ECE" },
  ],
  'Tech Quiz': [
    { id: 7, name: "HEMA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562879/co10_ix201q.jpg", desc: "III - ECE" },
    { id: 19, name: "BHARATH", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772697231/co099_b92fbg.jpg", desc: "III - ECE" },
    { id: 22, name: "ASIN", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772696116/imgtourl/6a521d861e0d41dd83338905d43b9b5b.jpg", desc: "II - ECE" },
    { id: 14, name: "CHANDRIKA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772697455/chandrika_uikmtt.jpg", desc: "II - ECE" },
  ],
}

const eventColors = {
  'Event coordinators': '#00eaff',
  'Web Development': '#00eaff',
  'Hackathon': '#00ff88',
  'Circuitron': '#ffaa00',
  'Codeathon': '#a78bfa',
  'Tech Quiz': '#34d399',
}

function Teams() {
  const [hoveredId, setHoveredId] = useState(null)
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth < 1024

  const CardComponent = ({ member, color, isCore }) => (
    <div
      onMouseEnter={() => setHoveredId(member.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '30px 20px',
        boxShadow: hoveredId === member.id ? `0 15px 40px ${color}40` : '0 8px 20px rgba(0,255,136,0.2)',
        transition: 'all 0.3s ease',
        transform: hoveredId === member.id ? 'translateY(-8px) scale(1.02)' : 'scale(1)',
        cursor: 'pointer',
        textAlign: 'center',
        border: '1px solid rgba(0,255,136,0.3)'
      }}
    >
      <div style={{ position: 'relative', marginBottom: '20px', display: 'inline-block' }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '12px',
            objectFit: 'cover',
            border: `3px solid ${color}`
          }}
        />
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: '#FFC107',
          color: '#000',
          padding: '8px 14px',
          borderRadius: '20px',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(255,193,7,0.4)'
        }}>
          {isCore ? 'Core' : 'Lead'}
        </div>
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00ff88', margin: '15px 0 8px', fontFamily: 'Orbitron, monospace' }}>
        {member.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '16px', lineHeight: '1.5' }}>
        {member.desc}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {['in', 'f', '𝕏'].map((icon, idx) => (
          <a key={idx} href="#" style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: `${color}20`,
            border: `2px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            fontSize: '1rem',
            fontWeight: 'bold'
          }} onMouseEnter={(e) => {
            e.target.style.background = color
            e.target.style.color = '#000'
          }} onMouseLeave={(e) => {
            e.target.style.background = `${color}20`
            e.target.style.color = color
          }}>
            {icon}
          </a>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: '60px 20px',
      position: 'relative'
    }}>
      <img src={tkLogo} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', height: '35px', zIndex: 10 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '40px' }}>
          <h1 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 'bold', color: '#00ff88', marginBottom: '15px', letterSpacing: '2px', fontFamily: 'Orbitron, monospace' }}>
            Meet Our Team
          </h1>
          <div style={{ width: '100px', height: '3px', background: '#00ff88', margin: '15px auto 25px' }} />
          <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', fontFamily: 'Orbitron, monospace' }}>
            The brilliant minds orchestrating CODEATHON 2K26
          </p>
        </div>

        {/* Core Team Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '30px',
            paddingBottom: '15px',
            borderBottom: `2px solid #00eaff40`
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              color: '#00eaff',
              margin: 0,
              letterSpacing: '1px',
              fontFamily: 'Orbitron, monospace'
            }}>
              Core Team
            </h2>
            <span style={{
              marginLeft: 'auto',
              background: `#00eaff20`,
              color: '#00eaff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: `1px solid #00eaff60`,
              fontFamily: 'Orbitron, monospace'
            }}>
              {topTechLeads.length} members
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '40px',
            maxWidth: isTablet ? '100%' : '600px',
            margin: '0 auto'
          }}>
            {topTechLeads.map((member) => (
              <CardComponent key={member.id} member={member} color="#00eaff" isCore={true} />
            ))}
          </div>
        </div>

        {/* Event Sections */}
        {Object.entries(eventTeams).map(([event, members]) => {
          const color = eventColors[event]
          const isEventCoordinators = event === 'Event coordinators'
          return (
            <div key={event} style={{ marginBottom: '80px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '30px',
                paddingBottom: '15px',
                borderBottom: `2px solid ${color}40`
              }}>
                <h2 style={{
                  fontSize: isMobile ? '1.5rem' : '2rem',
                  fontWeight: 'bold',
                  color: color,
                  margin: 0,
                  letterSpacing: '1px',
                  fontFamily: 'Orbitron, monospace'
                }}>
                  {event}
                </h2>
                <span style={{
                  marginLeft: 'auto',
                  background: `${color}20`,
                  color: color,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  border: `1px solid ${color}60`,
                  fontFamily: 'Orbitron, monospace'
                }}>
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isEventCoordinators ? (isMobile ? '1fr' : 'repeat(2, 1fr)') : (isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
                gap: '40px',
                maxWidth: isEventCoordinators ? (isTablet ? '100%' : '600px') : '100%',
                margin: isEventCoordinators ? '0 auto' : '0'
              }}>
                {members.map((member) => (
                  <CardComponent key={member.id} member={member} color={color} isCore={false} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <BottomNavBar />
    </div>
  )
}

export default Teams
