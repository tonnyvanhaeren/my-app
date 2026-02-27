import * as React from "react"
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../../server/AuthContext'
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/sheet';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavLink } from './NavLink';
import { NavLinkMobile } from "./NavLinkMobile";
import { LogIn, House, CircleUser, LucideSquareArrowRight } from 'lucide-react';

export function MainNavbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      toast.success('U bent uitgelogd');
      navigate({ to: '/home' });
    } catch (error) {
      toast.error('Er is een fout opgetreden bij het uitloggen');
    }
  };

  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto items-center">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img className="hidden md:flex" src="/ITLogoSchool_4.png" alt="head" width={100} height={20} />

            {/* Main Menu (links) - Desktop */}
            <div className="hidden md:flex space-x-4">
              <div className='flex gap-1 items-center'>
                <House size={15} color="green" /> <NavLink to={'/home'} from={'/home'} >Home</NavLink>
              </div>

              <NavLink to='/courses' from='/courses' >Cursussen</NavLink>
              <NavLink to={"/events"} from={'/events'} >Events</NavLink>
              <NavLink to={"/teachers"} from={'/teachers'} >Teachers</NavLink>

              {auth.user?.role === 'admin' && (
                <NavLink to={"/admin/"} from={'/admin/'} >Admin</NavLink>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {/* Auth Menu (rechts) - Desktop */}
            <div className="hidden md:flex space-x-4">
              {!auth.isAuthenticated ? (
                <>
                  <div className='flex gap-1 items-center'>
                    <LogIn size={15} color="orange" />
                    <NavLink to="/auth/login" from='/auth/login'>
                      Login
                    </NavLink>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <LogIn size={15} color="orange" />
                    <NavLink to="/auth/register" from='/auth/register'>
                      Register
                    </NavLink>
                  </div>

                </>
              ) : (
                <>
                  <div className='flex gap-1 items-center'>
                    <CircleUser size={15} color="orange" />
                    <NavLink to="/profile" from='/profile'>
                      Profile
                    </NavLink>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <LucideSquareArrowRight size={15} color="orange" />
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium hover:text-orange-400 hover:border-b-2 hover:border-b-orange-400"
                    >
                      Logout
                    </button>

                  </div>


                </>
              )}
            </div>
          </div>
        </div>


      </div>


      <div className="container mx-auto flex justify-between items-center">
        {/* Mobiel Menu (Hamburger) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent aria-description="mobile-menu" side="left" className="bg-gray-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-2xl text-orange-400 ml-4">Menu</SheetTitle>
                <SheetDescription className="text-sm  ml-4">
                  Mobile menu
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-2 ml-4 mr-2">
                <NavLinkMobile from="/home" to="/home" >Home</NavLinkMobile>
                <NavLinkMobile from="/courses" to="/courses" >Cursussen</NavLinkMobile>
                <NavLinkMobile from="/events" to="/events" >Evenementen</NavLinkMobile>
                <NavLinkMobile from="/teachers" to="/teachers" >Leraren</NavLinkMobile>
                {auth.user?.role === 'admin' && (
                  <NavLinkMobile from="/admin/" to="/admin/" >Admins</NavLinkMobile>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth Menu (rechts) - Mobiel */}
        <div className="md:hidden">
          {!auth.isAuthenticated ? (
            <div className="flex space-x-2">
              <div className='flex gap-1 items-center'>
                <LogIn size={15} color="orange" />
                <NavLink to="/auth/login" from='/auth/login'>
                  Login
                </NavLink>
              </div>
              <div className='flex gap-1 items-center'>
                <LogIn size={15} color="orange" />
                <NavLink to="/auth/register" from='/auth/register'>
                  Register
                </NavLink>
              </div>
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
                    logout
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
