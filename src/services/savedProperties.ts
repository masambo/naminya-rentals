import { supabase } from '@/lib/supabase';

export const savedPropertiesService = {
  // Get user's saved properties
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('saved_properties')
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
          status,
          agents (
            id,
            name,
            image,
            verified
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Save property
  async save(userId: string, propertyId: string) {
    const { data, error } = await supabase
      .from('saved_properties')
      .insert({
        user_id: userId,
        property_id: propertyId,
      })
      .select()
      .single();

    return { data, error };
  },

  // Remove saved property
  async remove(userId: string, propertyId: string) {
    const { error } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId);

    return { error };
  },

  // Check if property is saved
  async isSaved(userId: string, propertyId: string) {
    const { data, error } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

    return { isSaved: !!data, error };
  },
};
