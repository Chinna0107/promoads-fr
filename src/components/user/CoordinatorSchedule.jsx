import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CoordinatorMenu from './CoordinatorMenu';
import tkLogo from '../../assets/images/tk26.png';

const CoordinatorSchedule = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coordinatorToken = localStorage.getItem('coordinatortoken');
    
    if (!coordinatorToken) {
      navigate('/coordinator-login');
      return;
    }
    
    const mockSchedules = [
      { eventName: 'Inauguration', category: 'Ceremony', date: '24th March 2026', time: '09:30 AM', duration: '1 hour', venue: 'Main Auditorium', desc: 'Opening ceremony & welcome address' },
      { eventName: 'Web Development', category: 'Development', date: '24th March 2026', time: '10:30 AM', duration: '24 hours', venue: 'E - Class Room', desc: 'Build responsive websites' },
      { eventName: 'Hackathon', category: 'Development', date: '24th March 2026', time: '10:30 AM', duration: '24 hours', venue: 'E - Class Room', desc: '24-hour coding marathon' },
      { eventName: 'Crack The Code', category: 'Development', date: '24th March 2026', time: '10:30 AM', duration: '4 hours', venue: 'D & E Labs', desc: 'Test your technical knowledge' },
      { eventName: 'Tech Quiz', category: 'Competitive', date: '25th March 2026', time: '09:30 AM', duration: '5 hours', venue: 'MPMC Lab', desc: 'Test your technical knowledge' },
      { eventName: 'Circuitron', category: 'Competitive', date: '25th March 2026', time: '09:30 AM', duration: '5 hours', venue: 'EDC & STLD Lab', desc: 'Electronics & circuit design' },
      { eventName: 'Presentation', category: 'Competitive', date: '25th March 2026', time: '09:30 AM', duration: '1.5 hours', venue: 'MBA Seminar Hall', desc: 'Showcase your projects' },
      { eventName: 'Closing Ceremony', category: 'Ceremony', date: '25th March 2026', time: '05:30 PM', duration: '1 hour', venue: 'E - Class Room', desc: 'Prize distribution & awards' }
    ];
    
    setTimeout(() => {
      setSchedules(mockSchedules);
      setLoading(false);
    }, 500);
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <CoordinatorMenu />
        <div style={{ marginLeft: '280px', flex: 1, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="schedule-content">
          <style>
            {`
              @media (max-width: 768px) {
                .schedule-content { margin-left: 0 !important; padding-top: 80px !important; }
              }
            `}
          </style>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', border: '6px solid rgba(255,255,255,0.3)', borderTop: '6px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>Loading schedules...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CoordinatorMenu />
      <div style={{ marginLeft: '280px', flex: 1, background: '#000', padding: 'clamp(10px, 3vw, 20px) clamp(10px, 3vw, 20px) clamp(180px, 10vw, 200px)', position: 'relative' }} className="schedule-content">
        <style>
          {`
            @keyframes glow {
              0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
              50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
            }
            @media (max-width: 768px) {
              .schedule-content { margin-left: 0 !important; padding: 10px !important; padding-top: 80px !important; padding-bottom: 180px !important; }
            }
          `}
        </style>
        
        {/* Logo in top right corner */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(15px, 4vw, 30px)' }}>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '5px' }}>Event Schedules</h1>
            <p style={{ color: '#ccc', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>View all event timings</p>
          </div>

          {schedules.length > 0 ? (
            <div style={{ display: 'grid', gap: '20px' }}>
              {schedules.map((schedule, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '15px', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ fontSize: '2.5rem' }}>📅</div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', margin: '0 0 5px 0', fontWeight: 'bold' }}>{schedule.eventName}</h2>
                      <p style={{ color: '#ccc', fontSize: 'clamp(0.85rem, 2vw, 1rem)', margin: 0 }}>{schedule.category}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '5px' }}>📆 Date</p>
                      <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.date}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '5px' }}>🕐 Time</p>
                      <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.time}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '5px' }}>⏱️ Duration</p>
                      <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.duration}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '5px' }}>📍 Venue</p>
                      <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{schedule.venue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', padding: '60px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📅</div>
              <h3 style={{ color: '#fff', marginBottom: '10px' }}>No Schedules Available</h3>
              <p style={{ color: '#ccc' }}>Event schedules will appear here once they are published.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorSchedule;
