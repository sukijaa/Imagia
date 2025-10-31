import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import { Loader2 } from 'lucide-react';

interface AuthLoaderProps {
  children: React.ReactNode;
}

const AuthLoader = ({ children }: AuthLoaderProps) => {
  // --- 1. GET ALL STATE VALUES ---
  const { isLoading, fetchUser, testCounter, user } = useAuthStore();

  // --- 2. ADD A LOG HERE ---
  console.log(
    `AuthLoader render. Counter: ${testCounter}, isLoading: ${isLoading}, User:`, user
  );

  useEffect(() => {
    // This effect will only run on the first render
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    // We are now logging, so we can see if we are stuck here
    console.log('AuthLoader: Rendering SPINNER');
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If we get here, loading is false
  console.log('AuthLoader: Rendering CHILDREN');
  return <>{children}</>;
};

export default AuthLoader;