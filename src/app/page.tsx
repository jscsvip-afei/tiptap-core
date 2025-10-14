"use client"
import Editor from '@/components/editor/Editor'
import Toolbar from '@/components/editor/Toolbar'
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEditorInstance } from '@/components/editor/useEditorInstance'

export default function Home() {
  const [content] = useState('{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"欢迎使用Tiptap编辑器！"}]}]}')
  
  function handleUpdate(content: string) {
    console.log('内容更新：', content)
  }
  
  const editor = useEditorInstance({
    content,
    onUpdate: handleUpdate
  })
  
  if (!editor) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">加载编辑器中...</div>
      </div>
    )
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
            {/* 工具栏 */}
            <Toolbar editor={editor} />
            
            {/* 编辑器内容区域 */}
            <ScrollArea id="work-content-scroll-container" className="min-h-[400px]">
              <div className="p-6">
                <Editor editor={editor} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
