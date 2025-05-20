
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const navLinks = user?.role === 'admin' 
    ? [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Reports', path: '/admin/reports' },
        { name: 'Settings', path: '/admin/settings' },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'My Progress', path: '/progress' },
        { name: 'Badges', path: '/badges' },
      ];

  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="font-bold text-lg text-primary">
              <span className="text-accent">G</span>APLMS
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className="text-sm px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-right">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.department}</div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Button>
          </div>
        )}
      </div>
      
      {showMobileMenu && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className="px-4 py-3 border-b text-sm"
                onClick={() => setShowMobileMenu(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
