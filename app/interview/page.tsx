import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TypePage() {
  const typeTitle = "interview";
  
  const supabase = await createClient();
  
  // 해당 type의 발행된 아티클만 가져오기
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, intro, image, created_at')
    .eq('type', typeTitle)
    .eq('status', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return notFound();
  }

  if (!articles || articles.length === 0) {
    return (
      <>
        <main className="pt-10 container mx-auto px-4 py-8 bg-white">
          <div className="mb-8">
            <Link href="/" className="text-jj hover:text-black font-medium mb-4 inline-block">
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl lg:text-4xl text-black font-extrabold mb-6">
              {typeTitle}
            </h1>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">해당 카테고리에 아티클이 없습니다.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="pt-10 container mx-auto px-4 py-8 bg-white">
        <div className="mb-8">
          <Link href="/" className="text-jj hover:text-black font-medium mb-4 inline-block">
            ← 홈으로 돌아가기
          </Link>
          <h1 className="text-3xl lg:text-4xl text-black font-extrabold mb-6">
            {typeTitle}
          </h1>
          <p className="text-gray-600 mb-8">
            총 {articles.length}개의 아티클
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              style={{ textDecoration: 'none' }} // 기본 밑줄 제거
            >
              {article.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-black mb-3 hover:text-jj transition-colors">
                  {article.title}
                </h2>
                {article.intro && (
                  <div 
                    className="text-gray-600 mb-4 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: article.intro || ''
                    }} />
                )}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gray-400 text-sm">
                    {new Date(article.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

// 메타데이터 생성
export async function generateMetadata() {
  return {
    title: `FBK 인터뷰`,
    description: `FBK 인터뷰 카테고리의 모든 아티클을 확인하세요.`,
  };
} 