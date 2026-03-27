import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import tkLogo from '../../assets/images/tk26.png';

const BASE_URL = `${config.BASE_URL}/api/users/register-quotation`;

const priceRanges = [
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  '₹5,00,000+',
  'Not Sure Yet'
];

const EventQuotation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventNameFromUrl = searchParams.get('name');

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    eventName: eventNameFromUrl || '',
    eventDate: '',
    eventTime: '',
    priceRange: '',
    description: '',
    password: '',
    confirmPassword: '',
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    if (eventNameFromUrl) setForm(f => ({ ...f, eventName: eventNameFromUrl }));
  }, [eventNameFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const sendOtp = async () => {
    if (!form.email) { toast.warning('Please enter your email first.'); return; }
    setSendingOtp(true);
    try {
      const res = await fetch(`${config.BASE_URL}/api/users/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (res.ok) { setOtpSent(true); if (data.isExistingUser) setIsExistingUser(true); toast.success(`OTP sent to ${form.email}`); }
      else toast.error(data.message || 'Failed to send OTP.');
    } catch { toast.error('Failed to connect to server.'); }
    finally { setSendingOtp(false); }
  };

  const verifyOtp = async () => {
    setVerifyingOtp(true);
    try {
      const res = await fetch(`${config.BASE_URL}/api/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });
      const data = await res.json();
      if (res.ok) { setEmailVerified(true); toast.success('Email verified!'); }
      else toast.error(data.message || 'Invalid OTP.');
    } catch { toast.error('Failed to verify OTP.'); }
    finally { setVerifyingOtp(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) { toast.error('Please verify your email first.'); return; }
    if (!isExistingUser && form.password !== form.confirmPassword) { toast.error('Passwords do not match!'); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          address: form.address,
          description: form.description,
          eventName: form.eventName,
          eventDate: form.eventDate,
          eventTime: form.eventTime,
          priceRange: form.priceRange,
          password: form.password,
          isExistingUser,
        }),
      });
      const data = await res.json();
      if (res.ok) { setShowPopup(true); }
      else toast.error(data.error || 'Something went wrong.');
    } catch { toast.error('Failed to connect to server.'); }
    finally { setSubmitting(false); }
  };

  const inputStyle = {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(0,255,136,0.3)',
    outline: 'none',
    fontSize: '1rem',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    width: '100%',
    transition: 'border 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000 0%, #0a1a0a 50%, #001a10 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,0,0.8)) brightness(1.2); }
          50% { filter: drop-shadow(0 0 12px rgba(255,255,0,1)) brightness(1.4); }
        }
        input::placeholder, textarea::placeholder, select option[value=""] { color: rgba(255,255,255,0.4); }
        select option { background: #0a1a0a; color: #fff; }
      `}</style>

      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <img src={tkLogo} alt="Logo" style={{ height: 35, width: 'auto', animation: 'glow 2s ease-in-out infinite alternate' }} />
      </div>

      <h2 style={{ fontFamily: 'Orbitron, monospace', color: '#00ff88', fontSize: '2rem', marginBottom: 6, marginTop: 20, textAlign: 'center' }}>
        Event Quotation
      </h2>
      {form.eventName && (
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 30, fontSize: '1rem' }}>{form.eventName}</p>
      )}

      <form onSubmit={handleSubmit} style={{
        maxWidth: 600,
        width: '100%',
        background: 'rgba(0,255,136,0.04)',
        border: '1px solid rgba(0,255,136,0.2)',
        borderRadius: 20,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Email + OTP send */}
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            name="email"
            type="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
            disabled={emailVerified}
            style={{
              ...inputStyle,
              flex: 1,
              border: emailVerified ? '1px solid #00ff88' : inputStyle.border,
              background: emailVerified ? 'rgba(0,255,136,0.08)' : inputStyle.background,
            }}
          />
          {!emailVerified && (
            <button
              type="button"
              onClick={sendOtp}
              disabled={sendingOtp || otpSent}
              style={{
                padding: '0 18px',
                borderRadius: 12,
                background: otpSent ? '#00cc66' : '#00ff88',
                color: '#000',
                fontWeight: 700,
                border: 'none',
                cursor: sendingOtp || otpSent ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '0.9rem',
              }}
            >
              {sendingOtp ? 'Sending...' : otpSent ? 'Sent ✓' : 'Send OTP'}
            </button>
          )}
          {emailVerified && <span style={{ color: '#00ff88', fontSize: '1.5rem', alignSelf: 'center' }}>✓</span>}
        </div>

        {/* OTP input */}
        {!emailVerified && otpSent && (
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={verifyOtp}
              disabled={verifyingOtp}
              style={{
                padding: '0 18px',
                borderRadius: 12,
                background: '#00ff88',
                color: '#000',
                fontWeight: 700,
                border: 'none',
                cursor: verifyingOtp ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
              }}
            >
              {verifyingOtp ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        )}

        {/* Mobile */}
        <input
          name="mobile"
          type="tel"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        {/* Event Name */}
        <input
          name="eventName"
          placeholder="Event Name"
          value={form.eventName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Event Date & Time */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4, display: 'block' }}>Event Date</label>
            <input
              name="eventDate"
              type="date"
              value={form.eventDate}
              onChange={handleChange}
              required
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4, display: 'block' }}>Event Time</label>
            <input
              name="eventTime"
              type="time"
              value={form.eventTime}
              onChange={handleChange}
              required
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
        </div>

        {/* Price Range */}
        <select
          name="priceRange"
          value={form.priceRange}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: form.priceRange ? '#fff' : 'rgba(255,255,255,0.4)' }}
        >
          <option value="" disabled>Select Price Range</option>
          {priceRanges.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Describe your event in detail (theme, requirements, expected guests, etc.)"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        {/* Password - only for new users */}
        {!isExistingUser && (<div style={{ position: 'relative' }}>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required={!isExistingUser}
            style={inputStyle}
          />
          <button type="button" onClick={() => setShowPassword(p => !p)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>)}

        {/* Confirm Password - only for new users */}
        {!isExistingUser && (<div style={{ position: 'relative' }}>
          <input
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required={!isExistingUser}
            style={inputStyle}
          />
          <button type="button" onClick={() => setShowConfirm(p => !p)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}>
            {showConfirm ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>)}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 12,
              background: submitting ? '#555' : 'linear-gradient(90deg, #00ff88, #00cc66)',
              color: '#000',
              fontWeight: 700,
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontFamily: 'Orbitron, monospace',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Quotation'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: '14px 20px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'linear-gradient(135deg, #0a1a0a, #001a10)', border: '1px solid rgba(0,255,136,0.4)', borderRadius: 20, padding: '48px 40px', maxWidth: 420, width: '90%', textAlign: 'center', boxShadow: '0 0 40px rgba(0,255,136,0.15)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
            <h3 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', marginBottom: 14 }}>Quotation Submitted!</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
              Our team will contact you as soon as possible.<br />
              <span style={{ color: '#00ff88', fontWeight: 600 }}>Thanks for choosing us! 🙏</span>
            </p>
            <button
              onClick={() => { setShowPopup(false); navigate('/'); }}
              style={{ padding: '12px 36px', background: 'linear-gradient(90deg, #00ff88, #00cc66)', color: '#000', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'Orbitron, monospace' }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </motion.div>
  );
};

export default EventQuotation;
