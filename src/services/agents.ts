import { supabase } from '@/lib/supabase';

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  image: string | null;
  speciality: string | null;
  location: string | null;
  bio: string | null;
  languages: string[] | null;
  response_time: string | null;
  verified: boolean;
  rating: number;
  reviews_count: number;
  listings_count: number;
  joined_date: string;
  created_at: string;
  updated_at: string;
}

export const agentsService = {
  // Get all agents
  async getAll() {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('verified', true)
      .order('rating', { ascending: false });

    return { data, error };
  },

  // Get agent by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('agents')
      .select(`
        *,
        properties (
          id,
          title,
          location,
          price,
          images,
          bedrooms,
          bathrooms,
          size,
          type,
          rental_type,
          daily_price,
          weekly_price,
          monthly_price,
          is_new,
          status
        )
      `)
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Get agent by user ID
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', userId)
      .single();

    return { data, error };
  },

  // Create agent profile
  async create(agent: Partial<Agent>) {
    const { data, error } = await supabase
      .from('agents')
      .insert(agent)
      .select()
      .single();

    return { data, error };
  },

  // Update agent
  async update(id: string, updates: Partial<Agent>) {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Get agent reviews
  async getReviews(agentId: string) {
    const { data, error } = await supabase
      .from('agent_reviews')
      .select(`
        *,
        user_profiles (
          id,
          full_name
        ),
        properties (
          id,
          title
        )
      `)
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    return { data, error };
  },
};
