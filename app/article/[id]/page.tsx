import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Article {
  id: string
  title: string
  content: string
  image?: string
  created_at: string
  author?: string
  excerpt?: string
}

export default async function ArticlePage({ params }) { 
  const { id } = await params
  const supabase = await createClient()
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 헤더 이미지 */}
          {article.image && (
            <div className="relative w-full h-48 sm:h-60 md:h-96">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          )}
          
          {/* 콘텐츠 영역 */}
          <div className="p-6 md:p-8 lg:p-12">
            {/* 제목 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            {/* 메타 정보 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                {article.author && (
                  <span className="font-medium">Written by {article.author}</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(article.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            {/* 요약 */}
            {article.excerpt && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 font-medium italic">
                  {article.excerpt}
                </p>
              </div>
            )}
            
            {/* 본문 내용 */}
            <div 
              className="prose prose-lg max-w-none prose-gray
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-li:text-gray-700
                prose-blockquote:text-gray-600 prose-blockquote:border-l-blue-500               
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, '<br />')
              }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}
