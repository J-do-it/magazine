'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, notFound } from 'next/navigation'
import type { NextPage } from 'next'

// 'articles' 테이블의 스키마에 맞게 이 타입을 수정해야 합니다.
type Article = {
  id: string;
  title: string | null;
  content: string | null;
  [key: string]: unknown;
}

const EditorPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      const { data: articleData, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !articleData) {
        console.error('Error fetching article:', error?.message)
        notFound()
      } else {
        setArticle(articleData as Article)
      }
      setIsLoading(false)
    }

    fetchArticle()
  }, [params.id, supabase, router])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!article) return
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    if (!article) return
    setIsSaving(true)
    const { title, content } = article
    const { error } = await supabase
      .from('articles')
      .update({ title, content })
      .eq('id', article.id)

    if (error) {
      alert(`게시물 저장 중 오류 발생: ${error.message}`)
    } else {
      alert('저장되었습니다!')
      router.refresh()
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div>Loading...</div>
      </main>
    )
  }

  if (!article) {
    // useEffect에서 notFound()가 호출되었으므로 이 부분은 거의 도달하지 않지만,
    // 만약을 위해 남겨둡니다.
    return notFound()
  }

  return (
    <main className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Editor Panel */}
      <div className="w-1/2 h-full flex flex-col p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">에디터</h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? '저장 중...' : '저장'}
            </button>
          </div>
          
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={article.title || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              placeholder="아티클 제목"
            />
          </div>
          <div className="flex-grow flex flex-col">
            <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              value={article.content || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full h-full flex-grow px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              placeholder="내용을 입력하세요..."
            />
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 h-full flex flex-col p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full overflow-y-auto">
          <article className="prose lg:prose-xl dark:prose-invert max-w-none">
            <h1>{article.title}</h1>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {article.content || ''}
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}

export default EditorPage
