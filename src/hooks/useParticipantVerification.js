import { useState, useCallback } from 'react';
import { useCache } from '../context/CacheContext';
import config from '../config';

const useParticipantVerification = () => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanTimestamp, setScanTimestamp] = useState(null);
  const { getCache, setCache } = useCache();

  const verifyParticipant = useCallback(async (rollNumber) => {
    if (!rollNumber || rollNumber.trim() === '') {
      setError('Please enter a valid roll number');
      return false;
    }

    const cacheKey = `participant-${rollNumber}`;
    const cached = getCache(cacheKey);
    
    if (cached) {
      setParticipant(cached);
      setScanTimestamp(new Date().toLocaleTimeString());
      setError(null);
      return true;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${config.BASE_URL}/api/participant?roll=${rollNumber.toUpperCase()}`);
      const data = await response.json();

      if (response.ok && data) {
        const participantData = {
          ...data,
          registrationId: data.registrationId || `REG-${rollNumber}-${Date.now()}`,
          paymentStatus: data.paymentStatus || 'Completed',
          verificationTimestamp: new Date().toISOString()
        };
        
        setCache(cacheKey, participantData);
        setParticipant(participantData);
        setScanTimestamp(new Date().toLocaleTimeString());
        return true;
      } else {
        setError('Participant Not Found. Please check the Roll Number or contact the Help Desk.');
        setParticipant(null);
        return false;
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify participant. Please try again.');
      setParticipant(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, [getCache, setCache]);

  const reset = useCallback(() => {
    setParticipant(null);
    setError(null);
    setScanTimestamp(null);
  }, []);

  return {
    participant,
    loading,
    error,
    scanTimestamp,
    verifyParticipant,
    reset
  };
};

export default useParticipantVerification;
