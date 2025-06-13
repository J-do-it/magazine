'use client'

import React, { useState } from 'react';
import Logo from './Logo';
import HamburgerIcon from './HamburgerIcon';
import MyIcon from './My';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black text-white z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button className="p-2" onClick={toggleMenu}>
            <HamburgerIcon className="h-6 w-6" />
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/">
                <Logo className="h-10" />
              </Link>
          </div>
          <button className="p-2">
            <MyIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* 슬라이드 메뉴 */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-black text-white z-40 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="pt-20 px-6">
          <nav>
            <ul className="space-y-6">
              <li>
                <Link 
                  href="/about" 
                  className="block text-lg font-medium hover:text-gray-300 transition-colors"
                  onClick={closeMenu}
                >
                  FBK 소개
                </Link>
              </li>
              <li>
                <Link 
                  href="/insight" 
                  className="block text-lg font-medium hover:text-gray-300 transition-colors"
                  onClick={closeMenu}
                >
                  인사이트
                </Link>
              </li>
              <li>
                <Link 
                  href="/global" 
                  className="block text-lg font-medium hover:text-gray-300 transition-colors"
                  onClick={closeMenu}
                >
                  글로벌
                </Link>
              </li>
              <li>
                <Link 
                  href="/interview" 
                  className="block text-lg font-medium hover:text-gray-300 transition-colors"
                  onClick={closeMenu}
                >
                  인터뷰
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* 오버레이 (메뉴가 열렸을 때 배경 클릭으로 닫기) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header; 