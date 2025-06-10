"use client"

import { useEffect, useState } from "react"
import { createClient } from '@supabase/supabase-js'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ArticlePage() {
  const params = useParams()
  const id = params?.id

  const [article, setArticle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    if (!id) return
    const fetchArticle = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        console.error("Error fetching article:", error)
        setArticle(null)
      } else {
        setArticle(data)
      }
      setIsLoading(false)
    }
    fetchArticle()
  }, [id])

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollableHeight > 0) {
        const scrolled = window.scrollY
        const scrollPercent = (scrolled / scrollableHeight) * 100
        setScrollPercentage(scrollPercent)
      } else {
        setScrollPercentage(100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 로드 시 호출

    return () => window.removeEventListener('scroll', handleScroll)
  }, [article, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-400">로딩 중...</span>
      </div>
    )
  }
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-400">게시글을 찾을 수 없습니다.</span>
      </div>
    )
  }
 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-1 bg-jj transition-all duration-75"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>
      <div className="max-w-5xl mx-auto sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <article className="bg-white rounded-none sm:rounded-lg shadow-lg overflow-hidden">
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
          <div className="pt-8 pb-8 pl-4 pr-4 sm:p-8 md:p-10 lg:p-12">
            {/* 제목 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-col mb-8 pb-6 border-b border-gray-300">
              <div className="text-sm text-gray-900 mb-2">
                {article.author && (
                  <span className="font-medium">에디터 {article.author}</span>
                )}
              </div>
              <div className="text-sm text-gray-900">
                <span className="font-medium">작성일: </span>
                {new Date(article.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-sm text-gray-900">
                <span className="font-medium">수정일: </span>
                {new Date(article.updated_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* 요약 */}
            {article.intro && (
              <div className="mb-8 p-3 border-l-4 border-jj">
                <p className="text-gray-700 font-medium">
                  {article.intro}
                </p>
              </div>
            )}

            {/* 본문 내용 */}
            <div
              className="prose prose-lg max-w-none prose-gray
                prose-h1:text-gray-900 prose-h1:font-bold
                prose-h2:text-gray-900 prose-h2:font-bold prose-h2:p-3 prose-h2:rounded-lg prose-h2:border-l-4 prose-h2:border-t-4 prose-h2:border-jj prose-h2:tracking-tighter
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-li:text-gray-700
                prose-blockquote:text-gray-600 prose-blockquote:border-l-blue-500               
                prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
                prose-figcaption:text-center prose-figcaption:text-gray-500 prose-figcaption:text-sm"
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
