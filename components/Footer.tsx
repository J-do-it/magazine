import Link from 'next/link';
import { 
  FaYoutube, 
  FaInstagram, 
  FaFacebook, 
  FaGlobe 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* 상단 섹션 */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-8">
          {/* 로고 및 네비게이션 */}
          <div className="flex flex-col space-y-6">
            <div className="text-sm">
              © 2025 FBK
            </div>
            
            <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                홈
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">
                FBK 소개
              </Link>
              <Link href="/insight" className="hover:text-gray-300 transition-colors">
                인사이트
              </Link>
              <Link href="/global" className="hover:text-gray-300 transition-colors">
                글로벌
              </Link>
              <Link href="/interview" className="hover:text-gray-300 transition-colors">
                인터뷰
              </Link>
            </nav>
          </div>

            {/* 비즈니스 연락처 */}
            <div className="text-right">
              <div className="text-sm mb-1">협업 및 제휴 문의</div>
              <a 
                href="mailto:info@fbk.com" 
                className="text-white hover:text-gray-300 transition-colors underline"
              >
                info@fbk.com
              </a>
            </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 pt-6">
          {/* 사업자 정보 */}
          <div className="text-xs text-gray-400 space-y-2">
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-1 sm:space-y-0">
              <span>(주)FBK</span>
              <span>사업자등록번호 | 123-45-67890</span>
              <span>통신판매업신고번호 | 제 2025-서울마포-0000</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-1 sm:space-y-0">
              <span>대표번호 | 010-1234-5678</span>
              <span>주소 | 000000 서울특별시 강남구 000000</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 