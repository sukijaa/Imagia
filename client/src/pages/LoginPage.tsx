import { Button } from '@/components/ui/button';
import { Github, LogIn } from 'lucide-react'; // We use icons

// SVG for Google Icon
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-.97 2.48-1.98 3.27v2.84h3.64c2.13-1.96 3.38-4.9 3.38-8.12z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.64-2.84c-.98.66-2.23 1.06-3.64 1.06-2.8 0-5.18-1.88-6.04-4.42H2.3v2.92C4.1 20.19 7.74 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.96 14.05c-.2-.6-.31-1.25-.31-1.9s.11-1.3.31-1.9V7.34H2.3c-.66 1.31-1.02 2.77-1.02 4.31s.36 3 1.02 4.31l3.66-2.91z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.23-3.23C17.45 2.09 14.97 1 12 1 7.74 1 4.1 3.81 2.3 7.34l3.66 2.91c.86-2.54 3.24-4.42 6.04-4.42z"
      fill="#EA4335"
    />
  </svg>
);

const LoginPage = () => {
  // These are links, not buttons, because they perform a GET request
  // that navigates away from our React app.
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-card text-card-foreground">
        <div className="text-center">
          <LogIn className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Please log in to continue</p>
        </div>
        <div className="space-y-4">
          <a href="/api/auth/google">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="w-5 h-5 mr-2" />
              Sign in with Google
            </Button>
          </a>
          <a href="/api/auth/github">
            <Button variant="outline" className="w-full">
              <Github className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;