import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../../server/AuthContext'
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavLink } from './NavLink';

export function MainNavbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      toast.success('U bent uitgelogd');
      navigate({ to: '/' });
    } catch (error) {
      toast.error('Er is een fout opgetreden bij het uitloggen');
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Main Menu (links) - Desktop */}
        <div className="hidden md:flex space-x-4">
          <NavLink to={'/'} from={'/'} >Home</NavLink>
          <NavLink to={'/courses'} from={'/courses'} >Cursussen</NavLink>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/courses" className="hover:text-gray-300">
            Cursussen
          </Link>
          <Link to="/events" className="hover:text-gray-300">
            Evenementen
          </Link>
          <Link to="/teachers" className="hover:text-gray-300">
            Docenten
          </Link>
          {auth.user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          )}
        </div>

        {/* Mobiel Menu (Hamburger) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-800 text-white">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
                <Link to="/courses" className="hover:text-gray-300">
                  Cursussen
                </Link>
                <Link to="/events" className="hover:text-gray-300">
                  Evenementen
                </Link>
                <Link to="/teachers" className="hover:text-gray-300">
                  Docenten
                </Link>
                {auth.user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-gray-300">
                    Admin
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth Menu (rechts) - Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {!auth.isAuthenticated ? (
            <>
              <Link to="/auth/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/auth/register" className="hover:text-gray-300">
                Registreren
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-gray-300">
                Profiel
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hover:text-gray-300 text-white"
              >
                Uitloggen
              </Button>
            </>
          )}
        </div>

        {/* Auth Menu (rechts) - Mobiel */}
        <div className="md:hidden">
          {!auth.isAuthenticated ? (
            <div className="flex space-x-2">
              <Link to="/auth/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/auth/register" className="hover:text-gray-300">
                Registreren
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="hover:text-gray-300">
                    Profiel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start hover:text-gray-300 text-white"
                  >
                    Uitloggen
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
