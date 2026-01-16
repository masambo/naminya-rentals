import { supabase } from '@/lib/supabase';

export interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  agent_id: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}

export const bookingsService = {
  // Create booking
  async create(booking: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select(`
        *,
        properties (
          id,
          title,
          images,
          location
        )
      `)
      .single();

    return { data, error };
  },

  // Get user bookings
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties (
          id,
          title,
          images,
          location,
          type
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Get property bookings
  async getByProperty(propertyId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('property_id', propertyId)
      .in('status', ['pending', 'confirmed'])
      .order('check_in', { ascending: true });

    return { data, error };
  },

  // Update booking
  async update(id: string, updates: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Cancel booking
  async cancel(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};
