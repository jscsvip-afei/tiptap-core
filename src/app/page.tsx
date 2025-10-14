"use client"
import Editor from '@/components/editor/Editor'
import { useState } from 'react'

export default function Home() {
    const [content, setContent] = useState('')
  
  function handleUpdate(newContent: string) {
    console.log('内容更新：', newContent.substring(0, 50) + '...')
    // setContent(newContent)
    // 可以在这里保存到服务器、localStorage 等
  }
  
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 flex flex-col flex-1 overflow-hidden h-full">
        {/* 页面标题 */}
        <div className="text-center py-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tiptap 富文本编辑器
          </h1>
          <p className="text-lg text-gray-600">
            基于 React 和 Next.js 的现代化编辑器
          </p>
        </div>
        
        {/* 编辑器容器 */}
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col pb-4 min-h-0">
          <div className="bg-white shadow-lg flex flex-col flex-1 min-h-0 overflow-hidden">
            <Editor rawContent={content} handleUpdate={handleUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}
