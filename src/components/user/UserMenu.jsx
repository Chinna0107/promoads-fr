import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faUser, faSignOutAlt, faBars, faTimes, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const UserMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutDialog(false);
    toast.success('Logged out successfully.', { position: 'top-right', autoClose: 1500 });
    setTimeout(() => navigate('/login'), 1000);
  };

  const menuItems = [
    { icon: faHome, label: 'Dashboard', path: '/home' },
    { icon: faCalendarCheck, label: 'My Quotations', path: '/my-events' },
    { icon: faUser, label: 'Profile', path: '/profile' },
  ];

  const handleNavClick = (path) => { setIsOpen(false); navigate(path); };

  const activeStyle = {
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
    color: '#000',
    border: '2px solid rgba(0,255,136,0.5)',
    boxShadow: '0 4px 15px rgba(0,255,136,0.3)',
    transform: 'translateX(5px)',
  };
  const inactiveStyle = {
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  return (
    <>
      <style>{`
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .promoads-sidebar { transform: translateX(${isOpen ? '0' : '-100%'}) !important; animation: ${isOpen ? 'slideIn 0.3s ease-out' : 'none'}; }
          .overlay { display: ${isOpen ? 'block' : 'none'} !important; }
        }
      `}</style>

      {/* Hamburger */}
      <button onClick={() => setIsOpen(true)} className="mobile-toggle"
        style={{ display: 'none', position: 'fixed', top: 20, left: 20, zIndex: 2000, padding: 12, background: '#0a1a0a', border: '1px solid rgba(0,255,136,0.3)', borderRadius: 10, color: '#00ff88', fontSize: '1.3rem', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Overlay */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'none', animation: 'fadeIn 0.3s' }} />}

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: '#0a1a0a', padding: 30, borderRadius: 15, border: '1px solid rgba(0,255,136,0.3)', maxWidth: 380, width: '90%' }}>
            <h3 style={{ color: '#00ff88', marginBottom: 12 }}>Logout?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>Are you sure you want to logout?</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowLogoutDialog(false)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmLogout} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #00ff88, #00cc66)', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Yes, logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="promoads-sidebar" style={{ width: 260, background: 'linear-gradient(180deg, #050f05 0%, #0a1a0a 100%)', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 1000, transition: 'transform 0.3s', borderRight: '1px solid rgba(0,255,136,0.15)' }}>
        <div style={{ padding: '28px 20px 0', marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: '#00ff88', fontFamily: 'Orbitron, monospace' }}>PromoAds</h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Customer Portal</p>
          </div>
          {isOpen && (
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '1.1rem', cursor: 'pointer', padding: '6px 10px' }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 12px 30px' }}>
          {menuItems.map((item, idx) => (
            <button key={idx} onClick={() => handleNavClick(item.path)}
              style={{ padding: '14px 18px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.95rem', fontWeight: 600, transition: 'all 0.2s', textAlign: 'left', ...(location.pathname === item.path ? activeStyle : inactiveStyle) }}
              onMouseOver={(e) => { if (location.pathname !== item.path) e.currentTarget.style.background = 'rgba(0,255,136,0.08)'; }}
              onMouseOut={(e) => { if (location.pathname !== item.path) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '16px 0', paddingTop: 16 }}>
            <button onClick={() => setShowLogoutDialog(true)}
              style={{ width: '100%', padding: '14px 18px', background: 'transparent', border: 'none', borderRadius: 10, color: 'rgba(255,100,100,0.8)', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.08)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
};

export default UserMenu;
