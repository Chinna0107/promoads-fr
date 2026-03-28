import React, { useState, useRef, useEffect } from 'react';
import '../../styles/user/AdminDashboard.css';
import AdminEvents from './AdminEvents';
import AdminUsers from './AdminUsers';
import AdminSchedules from './AdminSchedules';
import AdminNotifications from './AdminNotifications';
import AdminProfile from './AdminProfile';
import AdminCoordinators from './AdminCoordinators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCalendarAlt, faUsers, faUserTie, faBell, faCommentDots, faUserCircle, faSignOutAlt, faBars, faTimes, faClock, faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import TrishnaLogo from '../../assets/images/logo260.png';
import config from '../../config';

// Simple Modal Component (can be moved to its own file if preferred)
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`logout-modal-overlay ${isOpen ? 'active' : ''}`}> {/* Added active class toggle */}
      <div className="logout-modal-content">
        <h4>Logout Confirmation</h4>
        <p>Are you sure you want to logout?</p>
        <div className="logout-modal-actions">
          {/* Using sci-fi-button class for consistency if desired, or specific classes */}
          <button onClick={onConfirm} className="sci-fi-button confirm-logout-button">Yes, Logout</button>
          <button onClick={onClose} className="sci-fi-button cancel-logout-button">No, Cancel</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarWidth, setSidebarWidth] = useState(60);
  const [isResizing, setIsResizing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [events, setEvents] = useState([]);
  const [registrationStats, setRegistrationStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) {
      navigate('/login');
    } else {
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const adminToken = localStorage.getItem('admintoken');
      const res = await fetch(`${config.BASE_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrationStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = (page, event) => {
    event.preventDefault();
    setActivePage(page);
  };

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing && sidebarRef.current) {
        let newWidth = mouseMoveEvent.clientX;
        if (newWidth > 180 && newWidth < 500) { // Min 180px, Max 500px
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const handleLogoutRequest = () => {
    setShowLogoutModal(true); // Show the modal
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('admintoken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newCollapsedState);
    if (newCollapsedState) {
      // Collapsing
      setSidebarWidth(60);
    } else {
      // Expanding
      setSidebarWidth(250); // Set to default expanded width
    }
  };

  const renderContent = () => {
    switch (activePage) {
              case 'events':
        return <AdminEvents />;
      case 'users':
        return <AdminUsers />;
      case 'schedules':
        return <AdminSchedules />;
      case 'notifications':
        return <AdminNotifications />;
      case 'profile':
        return <AdminProfile />;
      case 'coordinators':
        return <AdminCoordinators />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-welcome">
            <h2>Quotation Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { label: 'Total Quotations', value: registrationStats.total || 0, color: '#FFD700', icon: '📋' },
                { label: 'Pending', value: registrationStats.pending || 0, color: '#ffd700', icon: '⏳' },
                { label: 'Confirmed', value: registrationStats.confirmed || 0, color: '#00ff88', icon: '✅' },
                { label: 'Rejected', value: registrationStats.rejected || 0, color: '#ff4444', icon: '❌' },
                { label: 'Customers', value: registrationStats.customers || 0, color: '#00eaff', icon: '👥' },
              ].map((card, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.07)', padding: '24px 20px', borderRadius: '15px', border: `1px solid ${card.color}44`, boxShadow: `0 4px 20px ${card.color}22` }}>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>{card.icon}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: card.color }}>{loading ? '...' : card.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 6, fontSize: '0.9rem' }}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`admin-dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div
        ref={sidebarRef}
        className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
        style={{ width: `${isSidebarCollapsed ? 60 : sidebarWidth}px` }}
      >
        <div className="admin-sidebar-header">
          <button onClick={toggleSidebar} className="sidebar-toggle-button">
            <FontAwesomeIcon icon={isSidebarCollapsed ? faBars : faTimes} />
          </button>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <a href="#" onClick={(e) => handleNavClick('dashboard', e)} className={activePage === 'dashboard' ? 'active' : ''}>
                <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" /> <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('events', e)} className={activePage === 'events' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" /> <span className="nav-text">Quotations</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('users', e)} className={activePage === 'users' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUsers} className="nav-icon" /> <span className="nav-text">Customers</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('notifications', e)} className={activePage === 'notifications' ? 'active' : ''}>
                <FontAwesomeIcon icon={faBell} className="nav-icon" /> <span className="nav-text">Notifications</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleNavClick('profile', e)} className={activePage === 'profile' ? 'active' : ''}>
                <FontAwesomeIcon icon={faUserCircle} className="nav-icon" /> <span className="nav-text">Profile</span>
              </a>
            </li>
            
          </ul>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogoutRequest} className="sidebar-logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> <span className="nav-text">Logout</span>
          </button>
        </div>
            
        {!isSidebarCollapsed && (
          <div
            className="sidebar-resizer"
            onMouseDown={startResizing} // Attach onMouseDown to the resizer element
          />
        )}
        
        
               
      </div>

      <div className="admin-main-content" style={{ marginLeft: `${isSidebarCollapsed ? 60 : sidebarWidth}px` }}>
        <header className="admin-header">
          <div className="header-logo">
            <img src={TrishnaLogo} alt="Trishna Logo" /> 
          </div>
          <div className="header-title">
            <span>PromoAds Admin</span>
          </div>
          <div className="header-icons">
            <button className="icon-button" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="icon-button" aria-label="Chat">
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
            <button className="icon-button" aria-label="Admin Profile" onClick={(e) => { e.preventDefault(); setActivePage('profile'); }}>
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
            
          </div>

        </header>
        <div className="admin-content-area">
          {renderContent()}
        </div>
        <footer className="admin-footer">
          <p>&copy; {new Date().getFullYear()} PromoAds. All rights reserved.</p>
          
        </footer>
      </div>
      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default AdminDashboard;
