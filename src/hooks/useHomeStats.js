import { useState, useEffect } from 'react';
import { useCache } from '../context/CacheContext';
import config from '../config';

const useHomeStats = () => {
  const [stats, setStats] = useState({ myRegistrations: 0, pending: 0, confirmed: 0 });
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCache, setCache } = useCache();
  const CACHE_KEY = 'home-stats';

  useEffect(() => {
    const fetchStats = async () => {
      const cached = getCache(CACHE_KEY);
      if (cached) {
        setStats(cached.stats);
        setRegisteredEvents(cached.events);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${config.BASE_URL}/api/users/quotation`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        const quotations = Array.isArray(data) ? data : data && !data.error ? [data] : [];

        const newStats = {
          myRegistrations: quotations.length,
          pending: quotations.length,
          confirmed: 0,
        };

        setCache(CACHE_KEY, { stats: newStats, events: quotations });
        setStats(newStats);
        setRegisteredEvents(quotations);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, registeredEvents, loading };
};

export default useHomeStats;
