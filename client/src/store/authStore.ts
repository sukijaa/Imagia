import { create } from 'zustand';
import axios from 'axios';

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
  fetchUser: () => Promise<void>;
}

// Get the API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  fetchUser: async () => {
    set({ isLoading: true });
    console.log('authStore: fetchUser() called');

    try {
      // FIXED: Use absolute URL to backend
      const res = await axios.get<User>(`${API_URL}/api/auth/current_user`, {
        withCredentials: true, // Important for cookies
      });
      
      console.log('authStore: fetchUser() success', res.data);
      
      if (res.data) {
        set({ user: res.data, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('authStore: Error fetching user', error);
      set({ user: null, isLoading: false });
    }
  },
}));

export default useAuthStore;