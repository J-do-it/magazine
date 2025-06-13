'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/signin');
      return;
    }

    // 사용자 정보 불러오기
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">마이페이지</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">회원 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <p className="text-gray-900">{userInfo.name || '정보 없음'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
              <p className="text-gray-900">{userInfo.email || '정보 없음'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">핸드폰 번호</label>
              <p className="text-gray-900">{userInfo.phone || '정보 없음'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">계정 관리</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              회원정보 수정
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              비밀번호 변경
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              알림 설정
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">내 활동</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              북마크한 글
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              댓글 관리
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              읽은 글 기록
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
} 