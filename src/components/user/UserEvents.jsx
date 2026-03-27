import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import config from '../../config';

const UserEvents = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) { navigate('/login'); return; }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    fetchQuotations();
  }, [navigate]);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.BASE_URL}/api/users/quotation`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const quotations = Array.isArray(data) ? data : data && !data.error ? [data] : [];
      setQuotations(quotations);
    } catch (err) {
      console.error('Error fetching quotations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div className="dashboard-wrapper" style={{ marginLeft: 260, flex: 1, padding: '40px 36px', background: '#050f05', minHeight: '100vh' }}>
        <style>{`
          @media (max-width: 768px) {
            .dashboard-wrapper { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
          }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        `}</style>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '2rem', color: '#00ff88', fontFamily: 'Orbitron, monospace', margin: 0 }}>My Quotations</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
            {loading ? 'Loading...' : `${quotations.length} quotation${quotations.length !== 1 ? 's' : ''} submitted`}
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
            <div style={{ width: 44, height: 44, border: '3px solid rgba(0,255,136,0.2)', borderTop: '3px solid #00ff88', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : quotations.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {quotations.map((q, idx) => (
              <div key={idx} style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.18)', borderRadius: 16, padding: 24, animation: `fadeUp 0.4s ease ${idx * 0.07}s both`, transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,255,136,0.12)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <h3 style={{ color: '#00ff88', fontSize: '1.1rem', fontWeight: 700, margin: 0, flex: 1, paddingRight: 10 }}>
                    {q.eventName || q.event_name || 'Event'}
                  </h3>
                  <span style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    Submitted
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {q.eventDate && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', minWidth: 80 }}>📅 Date</span>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{new Date(q.eventDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {q.eventTime && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', minWidth: 80 }}>🕐 Time</span>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{q.eventTime}</span>
                    </div>
                  )}
                  {q.priceRange && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', minWidth: 80 }}>💰 Budget</span>
                      <span style={{ fontSize: '0.9rem', color: '#ffd700', fontWeight: 600 }}>{q.priceRange}</span>
                    </div>
                  )}
                  {q.registrationDate && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', minWidth: 80 }}>🗓 Submitted</span>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{new Date(q.registrationDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: 16, padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📋</div>
            <h3 style={{ color: '#00ff88', marginBottom: 10 }}>No Quotations Yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Submit a quotation request to get started with your event.</p>
            <button onClick={() => navigate('/events')}
              style={{ padding: '13px 32px', background: 'linear-gradient(90deg, #00ff88, #00cc66)', color: '#000', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
              Request a Quotation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEvents;
