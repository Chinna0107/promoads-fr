import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import useHomeStats from '../../hooks/useHomeStats';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { stats, registeredEvents, loading } = useHomeStats();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) { navigate('/login'); return; }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  const statCards = [
    { label: 'Total Quotations', value: loading ? '...' : (stats.myRegistrations ?? 0), icon: '📋', color: '#00ff88' },
    { label: 'Pending Review', value: loading ? '...' : (stats.pending ?? 0), icon: '⏳', color: '#ffd700' },
    { label: 'Confirmed Events', value: loading ? '...' : (stats.confirmed ?? 0), icon: '✅', color: '#00eaff' },
  ];

  const quickActions = [
    { label: 'Request a Quotation', icon: '📝', path: '/events', color: '#00ff88' },
    { label: 'My Quotations', icon: '📋', path: '/my-events', color: '#00eaff' },
    { label: 'My Profile', icon: '👤', path: '/profile', color: '#ffd700' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div className="dashboard-wrapper" style={{ marginLeft: 260, flex: 1, padding: '40px 36px', background: '#050f05', minHeight: '100vh', position: 'relative' }}>
        <style>{`
          @media (max-width: 768px) {
            .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
          }
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        `}</style>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: '2rem', color: '#00ff88', fontFamily: 'Orbitron, monospace', margin: 0 }}>
            Welcome back, {user.name?.split(' ')[0]} 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 6, fontSize: '1rem' }}>
            Manage your event quotations and bookings from here.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
          {statCards.map((card, i) => (
            <div key={i} style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)', borderRadius: 14, padding: '20px 22px', animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: card.color, lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {quickActions.map((action, i) => (
              <button key={i} onClick={() => navigate(action.path)}
                style={{ padding: '18px 20px', background: 'rgba(0,255,136,0.04)', border: `1px solid rgba(0,255,136,0.2)`, borderRadius: 12, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, fontSize: '1rem', fontWeight: 600, transition: 'all 0.2s', textAlign: 'left' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                <span style={{ color: action.color }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Quotations */}
        <div>
          <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Recent Quotations</h3>
          {loading ? (
            <div style={{ color: 'rgba(255,255,255,0.4)', padding: 30, textAlign: 'center' }}>Loading...</div>
          ) : registeredEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {registeredEvents.slice(0, 5).map((event, idx) => (
                <div key={idx} style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#00ff88', fontWeight: 600, fontSize: '1rem' }}>{event.eventName || event.event_name || 'Event'}</div>
                    {event.registrationDate && <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: 3 }}>{new Date(event.registrationDate).toLocaleDateString()}</div>}
                  </div>
                  <span style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600 }}>Submitted</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: 14, padding: '40px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📋</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>No quotations submitted yet.</p>
              <button onClick={() => navigate('/events')}
                style={{ padding: '12px 28px', background: 'linear-gradient(90deg, #00ff88, #00cc66)', color: '#000', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                Request a Quotation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
