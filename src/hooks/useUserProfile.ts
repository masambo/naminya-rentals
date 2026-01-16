import { useState, useEffect, useCallback } from 'react';
import { userProfileService, UserProfile } from '@/services/userProfile';

export function useUserProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await userProfileService.getProfile(userId);
      if (error) {
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await userProfileService.upsertProfile(userId, {
            role: 'customer',
          });
          if (createError) throw createError;
          setProfile(newProfile);
        } else {
          throw error;
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}

export function useUserStats(userId: string | undefined) {
  const [stats, setStats] = useState({
    savedProperties: 0,
    listings: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userStats = await userProfileService.getUserStats(userId);
      setStats(userStats);
    } catch (err) {
      console.error('Error fetching user stats:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
}
