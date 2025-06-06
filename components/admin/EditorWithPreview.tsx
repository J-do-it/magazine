'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'

// 'articles' 테이블의 스키마에 맞게 이 타입을 수정해야 합니다.
// 현재는 id, title, content 필드가 있다고 가정했습니다.
type Article = {
  id: string;
  title: string | null;
  content: string | null;
  [key: string]: unknown;
}

export default function EditorWithPreview({ article: initialArticle }: { article: Article }) {
  const supabase = createClient()
  const router = useRouter()
  const [article, setArticle] = useState(initialArticle)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true)
    // title과 content 필드만 업데이트하도록 설정했습니다. 필요에 따라 수정하세요.
    const { title, content } = article
    const { error } = await supabase
      .from('articles')
      .update({ title, content })
      .eq('id', article.id)

    if (error) {
      alert(`게시물 저장 중 오류 발생: ${error.message}`)
    } else {
      alert('저장되었습니다!')
      // 서버 컴포넌트의 데이터를 새로고침하여 최신 상태를 반영합니다.
      router.refresh()
    }
    setIsSaving(false)
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