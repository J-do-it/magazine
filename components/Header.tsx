'use client'

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import HamburgerIcon from './HamburgerIcon';
import MyIcon from './My';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // 초기 로그인 상태 확인
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email || '');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', session.user.email || '');
      } else {
        // Supabase 세션이 없으면 localStorage도 정리
        setIsLoggedIn(false);
        setUserEmail('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
      }
    };

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setIsLoggedIn(true);
          setUserEmail(session.user.email || '');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', session.user.email || '');
        } else {
          setIsLoggedIn(false);
          setUserEmail('');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userEmail');
        }
      }
    );

    checkAuthState();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleMyIconClick = () => {
    if (isLoggedIn) {
      toggleUserMenu();
    } else {
      router.push('/signin');
    }
  };

  const handleLogout = async () => {
    try {
      // Supabase에서 로그아웃 (onAuthStateChange가 자동으로 상태를 업데이트함)
      await supabase.auth.signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black text-white z-[9997]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            className="p-2" 
            onClick={toggleMenu}
            style={{ zIndex: 10000 }}
          >
            <HamburgerIcon className="h-6 w-6" />
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/">
                <Logo className="h-10" />
              </Link>
          </div>
          <div className="relative">
            <button className="p-2" onClick={handleMyIconClick}>
              <MyIcon className="h-6 w-6" />
            </button>
            
            {/* 사용자 메뉴 드롭다운 */}
            {isLoggedIn && showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg border">
                <div className="p-4 border-b">
                  <p className="text-sm text-gray-600">로그인됨</p>
                  <p className="font-medium truncate">{userEmail}</p>
                </div>
                <div className="p-2">
                  <Link 
                    href="/my" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    onClick={() => setShowUserMenu(false)}
                  >
                    마이페이지
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 슬라이드 메뉴 */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-black text-white z-[9999] transform translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl border-r border-gray-700">
          {/* 메뉴 상단 헤더 영역 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">FBK</h2>
            <button 
              onClick={closeMenu}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="메뉴 닫기"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          
          {/* 메뉴 내용 */}
          <div className="pt-6 px-6">
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
      )}

      {/* 오버레이 */}
      {(isMenuOpen || (isLoggedIn && showUserMenu)) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={() => {
            closeMenu();
            setShowUserMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Header; 