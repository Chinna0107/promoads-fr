import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminEvents = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admintoken');
    if (!adminToken) { navigate('/login'); return; }
    fetchQuotations();
  }, [navigate]);

  const fetchQuotations = async () => {
    try {
      const res = await authFetch('/api/admin/quotations');
      const data = await res.json();
      setQuotations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching quotations:', err);
      setQuotations([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await authFetch(`/api/admin/quotations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setQuotations(prev => prev.map(q => q._id === id || q.id === id ? { ...q, status } : q));
      setExpanded(null);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filtered = quotations.filter(q => {
    const matchFilter = filter === 'all' || q.status === filter;
    const matchSearch = !search ||
      q.name?.toLowerCase().includes(search.toLowerCase()) ||
      q.email?.toLowerCase().includes(search.toLowerCase()) ||
      q.eventName?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const statusColor = { pending: '#ffd700', confirmed: '#00ff88', rejected: '#ff4444' };

  const thStyle = { padding: '12px 14px', textAlign: 'left', color: '#00ff88', fontWeight: 600, fontSize: '0.85rem', borderBottom: '1px solid rgba(0,255,136,0.2)', whiteSpace: 'nowrap' };
  const tdStyle = { padding: '12px 14px', color: '#fff', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top' };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ color: '#00ff88', fontFamily: 'Orbitron, monospace', marginBottom: 24 }}>Quotations</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          placeholder="Search by name, email, event..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.04)', color: '#fff', fontSize: '0.9rem', outline: 'none', minWidth: 240 }}
        />
        {['all', 'pending', 'confirmed', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '8px 18px', borderRadius: 8, border: `1px solid ${filter === f ? '#00ff88' : 'rgba(255,255,255,0.15)'}`, background: filter === f ? 'rgba(0,255,136,0.15)' : 'transparent', color: filter === f ? '#00ff88' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: filter === f ? 700 : 400, fontSize: '0.85rem', textTransform: 'capitalize' }}>
            {f}
          </button>
        ))}
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.5)', padding: 40, textAlign: 'center' }}>Loading quotations...</div>
      ) : filtered.length === 0 ? (
        <div style={{ color: 'rgba(255,255,255,0.4)', padding: 40, textAlign: 'center' }}>No quotations found.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,255,136,0.02)', borderRadius: 12, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(0,255,136,0.06)' }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Mobile</th>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Budget</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q, idx) => {
                const id = q._id || q.id;
                return (
                  <React.Fragment key={id}>
                    <tr style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === id ? null : id)}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{q.name}</td>
                      <td style={tdStyle}>{q.email}</td>
                      <td style={tdStyle}>{q.mobile || '—'}</td>
                      <td style={{ ...tdStyle, color: '#00ff88', fontWeight: 600 }}>{q.eventName}</td>
                      <td style={tdStyle}>{q.eventDate ? new Date(q.eventDate).toLocaleDateString() : '—'}</td>
                      <td style={{ ...tdStyle, color: '#ffd700' }}>{q.priceRange || '—'}</td>
                      <td style={tdStyle}>
                        <span style={{ background: `${statusColor[q.status] || '#999'}22`, color: statusColor[q.status] || '#999', padding: '3px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize' }}>
                          {q.status || 'pending'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button onClick={e => { e.stopPropagation(); setExpanded(expanded === id ? null : id); }}
                          style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid rgba(0,255,136,0.3)', background: 'transparent', color: '#00ff88', cursor: 'pointer', fontSize: '0.8rem' }}>
                          {expanded === id ? 'Close' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expanded === id && (
                      <tr>
                        <td colSpan={9} style={{ padding: '16px 20px', background: 'rgba(0,255,136,0.04)', borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
                            {[
                              ['Address', q.address],
                              ['Event Time', q.eventTime],
                            ].map(([label, val]) => val && (
                              <div key={label}>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{label}</div>
                                <div style={{ color: '#fff', fontSize: '0.9rem' }}>{val}</div>
                              </div>
                            ))}
                          </div>
                          {q.description && (
                            <div style={{ marginBottom: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(0,255,136,0.1)' }}>
                              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Description</div>
                              <div style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{q.description}</div>
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: 10 }}>
                            {['confirmed', 'pending', 'rejected'].map(s => (
                              <button key={s} onClick={() => updateStatus(id, s)}
                                style={{ padding: '7px 18px', borderRadius: 8, border: `1px solid ${statusColor[s]}`, background: q.status === s ? `${statusColor[s]}22` : 'transparent', color: statusColor[s], cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize' }}>
                                {s}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
