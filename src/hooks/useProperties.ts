import { useState, useEffect } from 'react';
import { propertiesService, Property, PropertyFilters } from '@/services/properties';

export function useProperties(filters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data, error } = await propertiesService.getAll(filters);
        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [JSON.stringify(filters)]);

  return { properties, loading, error };
}

export function useProperty(id: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data, error } = await propertiesService.getById(id);
        if (error) throw error;
        setProperty(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
}

export function useSearchProperties(query: string, filters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setProperties([]);
      return;
    }

    const searchProperties = async () => {
      try {
        setLoading(true);
        const { data, error } = await propertiesService.search(query, filters);
        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProperties, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, JSON.stringify(filters)]);

  return { properties, loading, error };
}
