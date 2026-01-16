import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://siutwkvarytqrjkwnyxv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_pUUZZ6Rz1Fj2jl3SqeWQcg_NOlazCo6';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (will be generated from Supabase later)
export type Database = {
  public: {
    Tables: {
      // Tables will be defined here based on your schema
    };
  };
};
