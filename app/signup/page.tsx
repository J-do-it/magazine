'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // 핸드폰 번호 형식 변환 함수
  const formatPhoneNumber = (phone: string) => {
    // 숫자만 추출
    const numbersOnly = phone.replace(/\D/g, '');
    
    // 11자리인 경우 010-0000-0000 형태로 변환
    if (numbersOnly.length === 11 && numbersOnly.startsWith('010')) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7)}`;
    }
    
    return phone;
  };

  // 실시간 유효성 검사
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'phone':
        const numbersOnly = value.replace(/\D/g, '');
        if (value && numbersOnly.length !== 11) {
          return '올바른 핸드폰 번호를 입력해주세요';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          return '올바른 이메일을 작성해주세요';
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          return '비밀번호는 6자 이상이어야 합니다';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          return '올바른 비밀번호를 입력해주세요';
        }
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // 실시간 유효성 검사
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // 비밀번호 확인 필드 재검증 (비밀번호가 변경될 때)
  useEffect(() => {
    if (formData.confirmPassword) {
      const error = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: error
      }));
    }
  }, [formData.password, formData.confirmPassword]);

  // 폼 유효성 검사 (제출 시)
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '핸드폰 번호를 입력해주세요.';
    } else {
      const phoneError = validateField('phone', formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (!formData.email.trim()) {
      newErrors.email = '아이디를 입력해주세요.';
    } else {
      const emailError = validateField('email', formData.email);
      if (emailError) newErrors.email = emailError;
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else {
      const passwordError = validateField('password', formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else {
      const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 버튼 활성화 조건 확인
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.email.trim() &&
      formData.password &&
      formData.confirmPassword &&
      Object.values(errors).every(error => !error) &&
      !validateField('phone', formData.phone) &&
      !validateField('email', formData.email) &&
      !validateField('password', formData.password) &&
      !validateField('confirmPassword', formData.confirmPassword)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 핸드폰 번호 형식 변환
      const formattedPhone = formatPhoneNumber(formData.phone);

      // Supabase Auth를 사용한 회원가입
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formattedPhone
          }
        }
      });

      if (error) {
        console.error('회원가입 오류:', error);
        if (error.message.includes('User already registered')) {
          setErrors({ email: '이미 등록된 이메일입니다.' });
        } else {
          setErrors({ general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' });
        }
        return;
      }

      // 회원가입 성공 후 핸드폰 번호를 Auth의 phone 필드에 저장
      if (data.user) {
        const { error: updateError } = await supabase.auth.updateUser({
          phone: formattedPhone,
          data: {
            name: formData.name,
            phone: formattedPhone
          }
        });

        if (updateError) {
          console.error('사용자 정보 업데이트 오류:', updateError);
          // 업데이트 실패해도 회원가입은 성공했으므로 계속 진행
        }
      }

      // 회원가입 성공 시 로그인 페이지로 이동
      router.push('/signin');
      
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrors({ general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          회원가입
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          FBK Magazine 회원이 되어보세요
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="text-sm text-red-600 text-center">{errors.general}</div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="이름을 입력하세요"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                핸드폰 번호
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="핸드폰 번호를 입력하세요"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="이메일을 입력하세요"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="비밀번호를 입력하세요 (6자 이상)"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                  isFormValid() && !isSubmitting
                    ? 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? '가입 중...' : '회원가입'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link 
                href="/signin" 
                className="font-medium text-black hover:text-gray-700 transition-colors"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 