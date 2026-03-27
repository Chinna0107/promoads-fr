import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import useProfile from '../../hooks/useProfile';

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading } = useProfile();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) navigate('/login');
  }, [navigate]);

  const fields = profile ? [
    { label: 'Full Name', value: profile.name, icon: '👤' },
    { label: 'Email ID', value: profile.email, icon: '📧' },
    { label: 'Mobile', value: profile.mobile || '—', icon: '📱' },
    { label: 'Address', value: profile.address || '—', icon: '📍' },
  ] : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <UserMenu />
      <div className="profile-content" style={{ marginLeft: 260, flex: 1, background: '#050f05', minHeight: '100vh', padding: '40px 36px' }}>
        <style>{`
          @media (max-width: 768px) {
            .profile-content { margin-left: 0 !important; padding: 20px !important; padding-top: 80px !important; }
          }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        `}</style>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '2rem', color: '#00ff88', fontFamily: 'Orbitron, monospace', margin: 0 }}>My Profile</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Your account details</p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
            <div style={{ width: 44, height: 44, border: '3px solid rgba(0,255,136,0.2)', borderTop: '3px solid #00ff88', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : !profile ? (
          <div style={{ color: '#ff4444', textAlign: 'center', padding: 40 }}>Failed to load profile.</div>
        ) : (
          <div style={{ maxWidth: 600 }}>
            {/* Avatar + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, animation: 'fadeUp 0.4s ease' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,255,136,0.1)', border: '2px solid rgba(0,255,136,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700, color: '#00ff88' }}>
                {profile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>{profile.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', fontSize: '0.9rem' }}>Customer</p>
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {fields.map((field, i) => (
                <div key={i} style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)', borderRadius: 12, padding: '16px 20px', animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {field.icon} {field.label}
                  </div>
                  <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 500, wordBreak: 'break-word' }}>
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
