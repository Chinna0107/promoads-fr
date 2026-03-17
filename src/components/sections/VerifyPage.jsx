import React, { useState } from 'react';
import useParticipantVerification from '../../hooks/useParticipantVerification';
import tkLogo from '../../assets/images/tk26.png';
import '../../styles/verify.css';

const VerifyPage = () => {
  const [rollInput, setRollInput] = useState('');
  const { participant, loading, error, scanTimestamp, verifyParticipant, reset } = useParticipantVerification();

  const handleVerify = async (e) => {
    e.preventDefault();
    await verifyParticipant(rollInput);
  };

  const handleNewScan = () => {
    reset();
    setRollInput('');
  };

  // Check if events is an array (multiple events) or string (single event)
  const events = participant?.events || participant?.event;
  const isMultipleEvents = Array.isArray(events);
  const eventsList = isMultipleEvents ? events : (events ? [events] : []);

  return (
    <div className="verify-container">
      <style>
        {`
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)) brightness(1.1); }
            50% { filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.9)) brightness(1.2); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>

      {/* Background gradient */}
      <div className="verify-bg"></div>

      {/* Logo */}
      <div className="verify-logo">
        <img 
          src={tkLogo} 
          alt="Codeathon 2K26" 
          style={{ 
            height: '50px', 
            width: 'auto',
            animation: 'glow 2s ease-in-out infinite'
          }} 
        />
      </div>

      <div className="verify-content">
        {!participant ? (
          // Input Form
          <div className="verify-form-card">
            <h1 className="verify-title">Participant Verification</h1>
            <p className="verify-subtitle">CODEATHON 2K26</p>

            <form onSubmit={handleVerify} className="verify-form">
              <div className="form-group">
                <label htmlFor="roll-input" className="form-label">
                  Enter Roll Number
                </label>
                <input
                  id="roll-input"
                  type="text"
                  value={rollInput}
                  onChange={(e) => setRollInput(e.target.value.toUpperCase())}
                  placeholder="e.g., 22AK1A0447"
                  className="form-input"
                  disabled={loading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="verify-btn"
                disabled={loading || !rollInput.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Verifying...
                  </>
                ) : (
                  '✓ Verify'
                )}
              </button>
            </form>

            <div className="verify-info">
              <p> Enter your <b>Roll Number</b> to get <b>Verified....</b> </p>
            </div>
          </div>
        ) : (
          // Verification Result Card
          <div className="verify-result-card">
            {/* Verified Badge */}
            <div className="verified-badge">
              <div className="badge-icon">✓</div>
              <div className="badge-text">VERIFIED PARTICIPANT</div>
            </div>

            {/* Event Name(s) */}
            <div className="event-section">
              <h2 className="event-name">CODEATHON 2K26</h2>
              {isMultipleEvents ? (
                <div className="multiple-events-container">
                  <p className="events-count">Registered for {eventsList.length} Events</p>
                  <div className="events-list">
                    {eventsList.map((evt, idx) => (
                      <div key={idx} className="event-badge">
                        <span className="event-number">{idx + 1}</span>
                        <span className="event-name-badge">{evt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="event-detail">{eventsList[0] || 'Event Registration'}</p>
              )}
            </div>

            {/* Participant Details */}
            <div className="details-section">
              <h3 className="section-title">Participant Details</h3>
              
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">{participant.name}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Roll Number</span>
                  <span className="detail-value">{participant.roll}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">{participant.year}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{participant.department}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Section</span>
                  <span className="detail-value">{participant.section || 'N/A'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">College</span>
                  <span className="detail-value">{participant.college}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value email-value">{participant.email}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Mobile</span>
                  <span className="detail-value">{participant.mobile}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Registration ID</span>
                  <span className="detail-value">{participant.registrationId}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Payment Status</span>
                  <span className="detail-value payment-status">{participant.paymentStatus}</span>
                </div>

                {participant.teamName && (
                  <div className="detail-item">
                    <span className="detail-label">Team Name</span>
                    <span className="detail-value">{participant.teamName}</span>
                  </div>
                )}

                <div className="detail-item">
                  <span className="detail-label">Registration Status</span>
                  <span className="detail-value status-active">Active</span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="security-section">
              <div className="security-item">
                <span className="security-label">Last Verified</span>
                <span className="security-value">{scanTimestamp}</span>
              </div>
              <div className="security-item">
                <span className="security-label">Verified By</span>
                <span className="security-value">Device ID: {navigator.userAgent.substring(0, 20)}...</span>
              </div>
            </div>

            {/* Action Button */}
            <button onClick={handleNewScan} className="new-scan-btn">
              🔄 Scan Another Participant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
