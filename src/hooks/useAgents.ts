import { useState, useEffect } from 'react';
import { agentsService, Agent } from '@/services/agents';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const { data, error } = await agentsService.getAll();
        if (error) throw error;
        setAgents(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, loading, error };
}

export function useAgent(id: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchAgent = async () => {
      try {
        setLoading(true);
        const { data, error } = await agentsService.getById(id);
        if (error) throw error;
        setAgent(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  return { agent, loading, error };
}
