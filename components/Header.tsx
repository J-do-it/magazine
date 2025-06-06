import React from 'react';
import Logo from './Logo';
import HamburgerIcon from './HamburgerIcon';
import SearchIcon from './SearchIcon';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button className="p-2">
          <HamburgerIcon className="h-6 w-6" />
        </button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo className="h-10" />
        </div>
        <button className="p-2">
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header; 