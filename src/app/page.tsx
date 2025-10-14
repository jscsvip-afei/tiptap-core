"use client"
import Editor from '@/components/editor/Editor'
import { useState } from 'react';

export default function Home() {
  const [content] = useState('{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"欢迎使用Tiptap编辑器！"}]}]}')
  function handleUpdate(content: string) {
    // setContent(content)
    console.log('内容更新：', content)
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tiptap 富文本编辑器
          </h1>
          <p className="text-lg text-gray-600">
            基于 React 和 Next.js 的现代化编辑器
          </p>
        </div>
        
        {/* 编辑器容器 */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Editor rawContent={content} handleUpdate={handleUpdate} />
          </div>
        </div>
        
        {/* 页脚信息 */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            支持 Markdown 语法、快捷键操作和丰富的文本格式
          </p>
        </div>
      </div>
    </div>
  );
}
