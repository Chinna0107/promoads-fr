import React, { useState } from 'react'
import tkLogo from '../../assets/images/tk26.png'
import BottomNavBar from './BottomNavBar'

const topTechLeads = [
  { id: 1, name: "B GURU GANGADHAR REDDY", role: "Technical Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
  { id: 2, name: "K HEMANTH", role: "Technical Lead", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772561317/HEMANTH_modxg7.jpg" },
  { id: 3, name: "O JAGADEESH", role: "Technical Lead", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562301/co5_w8htcx.jpg" },
]

const eventTeams = {
  'Web Development': [
    { id: 20, name: "VARUN", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772649022/imgtourl/ccbad2d0d0e9438c98ff96482890cc51.jpg" },
    { id: 21, name: "TILAK", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
    { id: 18, name: "AKASH", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
  ],
  'Hackathon': [
    { id: 16, name: "SANJANA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772564658/co14_ci8f9h.jpg" },
    { id: 15, name: "KUMARI", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772565073/co2_usfssm.jpg" },
    { id: 17, name: "RAKESH REDDY", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772563542/co12_otnt3l.jpg" },
  ],
  'Circuitron': [
    { id: 6, name: "ANKITHA", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772649157/imgtourl/2640d289225f41f890fab8cabf914189.jpg" },
    { id: 8, name: "ANIL KUMAR", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562706/co7_or7cgr.jpg" },
    { id: 9, name: "HANEESH", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772563256/co11_qzyl2o.jpg" },
    { id: 12, name: "MOHAN", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
  ],
  'Crack the Code': [
    { id: 10, name: "SUSMITHA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772561924/co4_n5pjfw.jpg" },
    { id: 11, name: "SIVA SAI VEENA", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772648691/imgtourl/fcc11df5e63148d4b14d88fcd10f4732.jpg" },
    { id: 13, name: "CHARAN", image: "https://res.cloudinary.com/dwmjz9csc/image/upload/v1772644187/imgtourl/ad508dc67e134b3894ea1749e0a3fe38.jpg" },
  ],
  'Tech Quiz': [
    { id: 7, name: "HEMA", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562879/co10_ix201q.jpg" },
    { id: 19, name: "BHARATH", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
    { id: 22, name: "AFRIN", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop" },
    { id: 14, name: "CHANDRIKA", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop" },
  ],
}

const eventColors = {
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

  const CardComponent = ({ member, color }) => (
    <div
      onMouseEnter={() => setHoveredId(member.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        background: '#1a3a52',
        borderRadius: '16px',
        padding: '30px 20px',
        boxShadow: hoveredId === member.id ? `0 15px 40px ${color}40` : '0 8px 20px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        transform: hoveredId === member.id ? 'translateY(-8px) scale(1.02)' : 'scale(1)',
        cursor: 'pointer',
        textAlign: 'center'
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
          Lead
        </div>
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', margin: '15px 0 8px' }}>
        {member.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#a0a0a0', marginBottom: '16px', lineHeight: '1.5' }}>
        Passionate about innovation and excellence
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
      background: 'linear-gradient(135deg, #001a33 0%, #0d2d4d 100%)',
      padding: '60px 20px',
      position: 'relative'
    }}>
      <img src={tkLogo} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', height: '35px', zIndex: 10 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '40px' }}>
          <h1 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '15px', letterSpacing: '2px' }}>
            Meet Our Teams
          </h1>
          <div style={{ width: '100px', height: '3px', background: '#FFC107', margin: '15px auto 25px' }} />
          <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#b0b0b0', maxWidth: '600px', margin: '0 auto' }}>
            The brilliant minds orchestrating CODEATHON 2K26
          </p>
        </div>

        {/* Technical Leads Section */}
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
              letterSpacing: '1px'
            }}>
              Technical Lead
            </h2>
            <span style={{
              marginLeft: 'auto',
              background: `#00eaff20`,
              color: '#00eaff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: `1px solid #00eaff60`
            }}>
              3 members
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '40px'
          }}>
            {topTechLeads.map((member) => (
              <CardComponent key={member.id} member={member} color="#00eaff" />
            ))}
          </div>
        </div>

        {/* Event Sections */}
        {Object.entries(eventTeams).map(([event, members]) => {
          const color = eventColors[event]
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
                  letterSpacing: '1px'
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
                  border: `1px solid ${color}60`
                }}>
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '40px'
              }}>
                {members.map((member) => (
                  <CardComponent key={member.id} member={member} color={color} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Yellow Footer */}
      <div style={{
        background: '#FFC107',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        marginTop: '60px'
      }}>
        <p style={{ color: '#000', fontWeight: 'bold', margin: 0, fontSize: isMobile ? '0.9rem' : '1rem' }}>
          www.codeathon2k26.com
        </p>
        <p style={{ color: '#000', fontWeight: 'bold', margin: 0, fontSize: isMobile ? '0.9rem' : '1rem' }}>
          CODEATHON 2K26
        </p>
      </div>

      <BottomNavBar />
    </div>
  )
}

export default Teams
