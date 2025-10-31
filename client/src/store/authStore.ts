import { create } from 'zustand';
import axios from 'axios';

// This is the shape of our User, based on the backend User.model
export interface User {
  _id: string;
  googleId?: string;
  githubId?: string;
  displayName: string;
  email?: string;
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  testCounter: number; // <-- 1. ADD THIS
  fetchUser: () => Promise<void>;
}

// Create the store
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Start as true on initial load
  testCounter: 0, // <-- 2. ADD THIS

  fetchUser: async () => {
    // --- 3. ADD THIS LOG ---
    set((state) => ({ 
      isLoading: true, 
      testCounter: state.testCounter + 1 
    }));
    console.log('authStore: fetchUser() called');

    try {
      // Our Vite proxy will send this to http://localhost:8000/api/auth/current_user
      const res = await axios.get<User>('/api/auth/current_user');
      console.log('authStore: fetchUser() success', res.data);
      if (res.data) {
        set({ user: res.data, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('authStore: Error fetching user', error); // <-- 4. IMPROVE THIS LOG
      set({ user: null, isLoading: false });
    }
  },
}));

export default useAuthStore;