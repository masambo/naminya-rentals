import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

// Generic hook for fetching data from Supabase
export function useSupabaseQuery<T>(
  table: string,
  options?: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from(table).select(options?.select || '*');

    // Apply filters
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    // Apply ordering
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    query
      .then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setData(data as T[]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [table, JSON.stringify(options)]);

  return { data, error, loading };
}

// Hook for inserting data
export function useSupabaseInsert<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const insert = async (table: string, values: T | T[]) => {
    setLoading(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from(table)
      .insert(values)
      .select();

    setLoading(false);
    if (insertError) {
      setError(insertError);
      return { data: null, error: insertError };
    }

    return { data, error: null };
  };

  return { insert, loading, error };
}

// Hook for updating data
export function useSupabaseUpdate<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const update = async (table: string, id: string | number, values: Partial<T>) => {
    setLoading(true);
    setError(null);

    const { data, error: updateError } = await supabase
      .from(table)
      .update(values)
      .eq('id', id)
      .select();

    setLoading(false);
    if (updateError) {
      setError(updateError);
      return { data: null, error: updateError };
    }

    return { data, error: null };
  };

  return { update, loading, error };
}

// Hook for deleting data
export function useSupabaseDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const remove = async (table: string, id: string | number) => {
    setLoading(true);
    setError(null);

    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    setLoading(false);
    if (deleteError) {
      setError(deleteError);
      return { error: deleteError };
    }

    return { error: null };
  };

  return { remove, loading, error };
}
