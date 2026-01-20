import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { User } from '../backend';
import { toast } from 'sonner';

export function useIsRegistered() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isRegistered'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isRegistered();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllUsers() {
  const { actor, isFetching } = useActor();

  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegister() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.register(name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isRegistered'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Registration successful!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}
