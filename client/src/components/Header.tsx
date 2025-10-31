import useAuthStore, { User } from '@/store/authStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, Search, LayoutDashboard, Globe } from 'lucide-react'; // <-- ADD 'Globe'

// Helper to get initials from display name
export const getInitials = (name: string) => { // <-- ADD 'export'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const Header = () => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Search className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">Imagia</span>
        </Link>

        {user ? <UserMenu user={user} /> : <LoginButton />}
      </nav>
    </header>
  );
};

// This is the menu for logged-in users
const UserMenu = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profilePhoto} alt={user.displayName} />
          <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div>Signed in as</div>
          <div className="font-medium">{user.displayName}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
  <Link to="/discover">
    <Globe className="w-4 h-4 mr-2" />
    Discover
  </Link>
</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* This is a link to our backend logout route */}
          <a href="http://localhost:8000/api/auth/logout">
            <Button variant="ghost" className="w-full justify-start h-auto p-0 m-0">
              <LogIn className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// This is the button for logged-out users
const LoginButton = () => {
  return (
    <Button asChild>
      <Link to="/login">
        <LogIn className="w-4 h-4 mr-2" />
        Login
      </Link>
    </Button>
  );
};

export default Header;