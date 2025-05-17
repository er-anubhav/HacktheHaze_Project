
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, History, LogOut } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useUser();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container font-serif mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl flex items-center text-black">
          <ImageIcon className="mr-2" />
          <span>Hack The Haze</span>
        </Link>

        {user && (
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                <span>Scraper</span>
              </Button>
            </Link>
            <Link to="/history">
              <Button 
                variant={location.pathname === '/history' ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
