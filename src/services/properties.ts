import { supabase } from '@/lib/supabase';

export interface Property {
  id: string;
  agent_id: string | null;
  owner_id: string;
  title: string;
  description: string | null;
  location: string;
  full_address: string | null;
  latitude: number | null;
  longitude: number | null;
  type: 'room' | 'house' | 'apartment' | 'guesthouse' | 'hotel' | 'lodge' | 'camp' | 'lodges-camps' | 'commercial' | 'airbnb' | 'mbashu';
  rental_type: 'long-term' | 'short-term';
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number | null;
  images: string[];
  verified: boolean;
  status: 'active' | 'pending' | 'sold' | 'rented' | 'inactive';
  is_new: boolean;
  available_from: string | null;
  deposit: number | null;
  lease_term: string | null;
  pets_allowed: boolean;
  furnished: boolean;
  daily_price: number | null;
  weekly_price: number | null;
  monthly_price: number | null;
  minimum_stay: number | null;
  max_guests: number | null;
  cleaning_fee: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
  instant_book: boolean;
  cancellation_policy: 'flexible' | 'moderate' | 'strict' | null;
  availability: any;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  type?: string;
  rentalType?: 'long-term' | 'short-term';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  verified?: boolean;
  location?: string;
  status?: string;
}

export const propertiesService = {
  // Get all properties with optional filters
  async getAll(filters?: PropertyFilters) {
    let query = supabase
      .from('properties')
      .select(`
        *,
        agents (
          id,
          name,
          image,
          verified,
          rating
        )
      `)
      .eq('status', filters?.status || 'active')
      .order('created_at', { ascending: false });

    if (filters?.type) {
      if (filters.type === 'lodges-camps') {
        query = query.in('type', ['lodge', 'camp']);
      } else {
        query = query.eq('type', filters.type);
      }
    }

    if (filters?.rentalType) {
      query = query.eq('rental_type', filters.rentalType);
    }

    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.bedrooms) {
      query = query.gte('bedrooms', filters.bedrooms);
    }

    if (filters?.bathrooms) {
      query = query.gte('bathrooms', filters.bathrooms);
    }

    if (filters?.verified) {
      query = query.eq('verified', true);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get single property by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        agents (
          id,
          name,
          image,
          phone,
          email,
          verified,
          rating,
          listings_count
        )
      `)
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Get properties by agent
  async getByAgent(agentId: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('agent_id', agentId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Get user's properties
  async getByOwner(ownerId: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Create new property
  async create(property: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();

    return { data, error };
  },

  // Update property
  async update(id: string, updates: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete property
  async delete(id: string) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Search properties
  async search(query: string, filters?: PropertyFilters) {
    let supabaseQuery = supabase
      .from('properties')
      .select(`
        *,
        agents (
          id,
          name,
          image,
          verified,
          rating
        )
      `)
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (filters?.type) {
      if (filters.type === 'lodges-camps') {
        supabaseQuery = supabaseQuery.in('type', ['lodge', 'camp']);
      } else {
        supabaseQuery = supabaseQuery.eq('type', filters.type);
      }
    }

    if (filters?.rentalType) {
      supabaseQuery = supabaseQuery.eq('rental_type', filters.rentalType);
    }

    const { data, error } = await supabaseQuery;
    return { data, error };
  },
};
