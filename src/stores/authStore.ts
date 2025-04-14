import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      fetchUser: async () => {
        set({ isLoading: true });
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          set({ user: null, isLoading: false });
          return;
        }
        set({
          user: data.user,
          isLoading: false
        });
      },
      signOut: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ user: null });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
);
