import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'agent' | 'admin';
  created_at: string;
  updated_at: string;
}

export const userProfileService = {
  // Get user profile
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  },

  // Create or update user profile
  async upsertProfile(userId: string, profile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    return { data, error };
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  // Get user stats (saved properties count, listings count, etc.)
  async getUserStats(userId: string) {
    const [savedCount, listingsCount, bookingsCount] = await Promise.all([
      supabase
        .from('saved_properties')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId),
      supabase
        .from('properties')
        .select('id', { count: 'exact', head: true })
        .eq('owner_id', userId),
      supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId),
    ]);

    return {
      savedProperties: savedCount.count || 0,
      listings: listingsCount.count || 0,
      bookings: bookingsCount.count || 0,
    };
  },

  // Upload avatar image
  async uploadAvatar(userId: string, file: File): Promise<{ url: string | null; error: Error | null }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage (you'll need to create a 'avatars' bucket)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        // If storage bucket doesn't exist, use a data URL as fallback
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ url: reader.result as string, error: null });
          };
          reader.onerror = () => {
            resolve({ url: null, error: new Error('Failed to read file') });
          };
          reader.readAsDataURL(file);
        });
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return { url: data.publicUrl, error: null };
    } catch (error) {
      return { url: null, error: error as Error };
    }
  },
};
