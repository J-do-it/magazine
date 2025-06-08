/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'saakdezjrdahrmwlzdgk.supabase.co',  // 네가 사용하는 supabase 프로젝트의 storage 호스트
          // 필요하면 더 추가
        ],
      },
    // 여기에 Next.js 설정을 추가할 수 있습니다.
};

module.exports = nextConfig; 