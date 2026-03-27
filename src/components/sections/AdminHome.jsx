import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken') || localStorage.getItem('adminToken');
    const user = localStorage.getItem('user');
    if (!adminToken && (!user || JSON.parse(user).role !== 'admin')) { navigate('/login'); return; }
    if (user) setAdmin(JSON.parse(user));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admintoken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!admin) return null;

  const cards = [
    { icon: '📋', title: 'Quotations', desc: 'View and manage all customer quotations', path: '/admin/dashboard' },
    { icon: '👥', title: 'Customers', desc: 'View all registered customers', path: '/admin/dashboard' },
    { icon: '🔔', title: 'Notifications', desc: 'Send updates to customers', path: '/admin/dashboard' },
    { icon: '⚙️', title: 'Settings', desc: 'Configure system settings', path: '/admin/dashboard' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #050f05 0%, #0a1a0a 100%)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, padding: '20px 24px', background: 'rgba(0,255,136,0.04)', borderRadius: 14, border: '1px solid rgba(0,255,136,0.15)' }}>
        <h1 style={{ color: '#00ff88', fontSize: '1.8rem', fontWeight: 800, margin: 0, fontFamily: 'Orbitron, monospace' }}>PromoAds Admin</h1>
        <button onClick={handleLogout} style={{ background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)', padding: '10px 22px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)', padding: '28px 24px', borderRadius: 14, textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: '0 0 8px' }}>Welcome, {admin.name}!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Administrator — PromoAds</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
        {cards.map((card, i) => (
          <div key={i} onClick={() => navigate(card.path)}
            style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)', padding: 28, borderRadius: 14, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{card.icon}</div>
            <h3 style={{ color: '#00ff88', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
