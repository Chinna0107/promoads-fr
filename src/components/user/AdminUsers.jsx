import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) { navigate('/login'); return; }
    fetchCustomers();
  }, [navigate]);

  const fetchCustomers = async () => {
    try {
      const res = await authFetch('/api/admin/users');
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = customers.filter(c =>
    !search ||
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.mobile?.includes(search)
  );

  const thStyle = { padding: '12px 14px', textAlign: 'left', color: '#00ff88', fontWeight: 600, fontSize: '0.85rem', borderBottom: '1px solid rgba(0,255,136,0.2)', whiteSpace: 'nowrap' };
  const tdStyle = { padding: '12px 14px', color: '#fff', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.06)' };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', marginBottom: 24 }}>Customers</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          placeholder="Search by name, email, mobile..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.04)', color: '#fff', fontSize: '0.9rem', outline: 'none', minWidth: 260 }}
        />
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginLeft: 'auto' }}>{filtered.length} customer{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.5)', padding: 40, textAlign: 'center' }}>Loading customers...</div>
      ) : filtered.length === 0 ? (
        <div style={{ color: 'rgba(255,255,255,0.4)', padding: 40, textAlign: 'center' }}>No customers found.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,255,136,0.02)', borderRadius: 12 }}>
            <thead>
              <tr style={{ background: 'rgba(0,255,136,0.06)' }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Joined</th>
                <th style={thStyle}>Quotations</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => (
                <tr key={c._id || c.id || idx}>
                  <td style={tdStyle}>{idx + 1}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff88', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                        {c.name?.charAt(0).toUpperCase()}
                      </div>
                      {c.name}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.7)' }}>{c.email}</td>
                  <td style={tdStyle}>{c.mobile || '—'}</td>
                  <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.6)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.address || '—'}</td>
                  <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td style={{ ...tdStyle, color: '#00ff88', fontWeight: 600 }}>{c.quotationCount ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
