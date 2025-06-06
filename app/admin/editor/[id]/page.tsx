import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import EditorWithPreview from '@/components/admin/EditorWithPreview'

// 'articles' 테이블의 스키마에 맞게 이 타입을 수정해야 합니다.
type Article = {
  id: string;
  title: string | null;
  content: string | null;
  [key: string]: unknown;
}

export default async function EditorPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const supabase = createClient()

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching article:', error.message)
    // 아티클을 찾지 못하거나 에러가 발생하면 not-found 페이지를 보여줍니다.
    notFound()
  }

  return <EditorWithPreview article={article as Article} />
}
