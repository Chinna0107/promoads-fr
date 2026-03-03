import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import tkLogo from '../../assets/images/tk26.png'
import BottomNavBar from './BottomNavBar'

const coordinators = [
  { id: 1, name: "B GURU GANGADHAR REDDY", role: "Technical Lead", department: "ECE", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
  { id: 2, name: "K HEMANTH", role: "Technical Lead", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772561317/HEMANTH_modxg7.jpg" },
  { id: 3, name: "O JAGADEESH", role: "Technical Lead", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562301/co5_w8htcx.jpg" },
  { id: 4, name: "K EEKSHITHA", role: "Coordination Lead", department: "ECE", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" },
  { id: 5, name: "B GEETHIKA", role: "Coordination Lead", department: "ECE", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
  { id: 6, name: "ANKITHA", role: "Event Coordinator", department: "ECE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face" },
  { id: 7, name: "HEMA", role: "Event Coordinator", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562879/co10_ix201q.jpg" },
  { id: 8, name: "ANIL", role: "Technical Lead", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772562706/co7_or7cgr.jpg" },
  { id: 9, name: "HANEESH", role: "Logistics Manager", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772563256/co11_qzyl2o.jpg" },
  { id: 10, name: "SUSMITHA", role: "Event Coordinator", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772561924/co4_n5pjfw.jpg" },
  { id: 11, name: "VEENA", role: "Design Head", department: "ECE", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
  { id: 12, name: "MOHAN", role: "Technical Lead", department: "ECE", image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face" },
  { id: 13, name: "CHARAN", role: "Event Coordinator", department: "ECE", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
  { id: 14, name: "CHANDRIKA", role: "Marketing Lead", department: "ECE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face" },
  { id: 15, name: "KUMARI", role: "Design Head", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772565073/co2_usfssm.jpg" },
  { id: 16, name: "SANJANA", role: "Event Coordinator", department: "ECE", image: "https://res.cloudinary.com/dbkhniuzt/image/upload/v1772564658/co14_ci8f9h.jpg" },
  { id: 17, name: "RAKESH REDDY", role: "Technical Lead", department: "ECE", image:"https://res.cloudinary.com/dbkhniuzt/image/upload/v1772563542/co12_otnt3l.jpg" },
  { id: 18, name: "AKASH", role:"Logistics Manager" , department:"ECE" , image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"},
  { id : 19, name : 'BHARATH', role : 'Event Coordinator', department : 'ECE', image : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'},
  { id : 20, name : 'VARUN', role : 'Technical Lead', department : 'ECE', image : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'},
  { id : 21, name : 'TILAK', role : 'Design Head', department : 'ECE', image :'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'}
]

function Coordinators() {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0a1a2f 80%, #000 100%)',
      padding: '50px 20px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `repeating-linear-gradient(90deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(0,234,255,0.08) 0 1px, transparent 1px 80px)`,
        backgroundSize: '80px 80px',
      }} />
      
      {/* Enhanced TK Logo top left */}
      <div className="logo-container" style={{
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
      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
          50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @media (max-width: 768px) {
          .logo-container {
            top: 10px !important;
            left: 10px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}
        >
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#00eaff',
            textShadow: '0 0 20px rgba(0,234,255,0.5)',
            marginBottom: '20px',
            fontFamily: 'Orbitron, monospace'
          }}>
            🎯 Meet Our Team
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#00eaff',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'Orbitron, monospace',
            opacity: 0.8
          }}>
            The brilliant minds behind CODEATHON 2K26
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(coordinator.id)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                background: 'rgba(0,234,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
                border: '1px solid #00eaff33',
                boxShadow: hoveredCard === coordinator.id 
                  ? '0 20px 40px rgba(0,234,255,0.3)' 
                  : '0 10px 30px rgba(0,234,255,0.1)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  overflow: 'hidden',
                  border: '4px solid #00eaff55',
                  boxShadow: '0 10px 30px rgba(0,234,255,0.3)'
                }}
              >
                <img
                  src={coordinator.image}
                  alt={coordinator.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#00eaff',
                marginBottom: '8px',
                textShadow: '0 0 10px rgba(0,234,255,0.5)',
                fontFamily: 'Orbitron, monospace'
              }}>
                {coordinator.name}
              </h3>

              <div style={{
                background: 'linear-gradient(45deg, #00eaff, #667eea)',
                padding: '6px 16px',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                <span style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {coordinator.role}
                </span>
              </div>

              <p style={{
                color: '#00eaff',
                fontSize: '1rem',
                marginBottom: '15px',
                opacity: 0.9
              }}>
                📚 {coordinator.department}
              </p>

              {hoveredCard === coordinator.id && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '1.5rem',
                  animation: 'pulse 2s infinite'
                }}>
                  ✨
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '40px',
            background: 'rgba(0,234,255,0.08)',
            borderRadius: '20px',
            border: '1px solid #00eaff33'
          }}
        >
          <h3 style={{
            color: '#00eaff',
            fontSize: '1.8rem',
            marginBottom: '15px',
            fontFamily: 'Orbitron, monospace'
          }}>
            Ready to Join TechnoKriti 2K25? 🚀
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/events')}
            style={{
              padding: '15px 40px',
              background: 'linear-gradient(45deg, #00eaff, #667eea)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Orbitron, monospace'
            }}
          >
            Explore Events 🎯
          </motion.button>
        </motion.div>
      </div>
      
      <BottomNavBar />
    </div>
  )
}

export default Coordinators
