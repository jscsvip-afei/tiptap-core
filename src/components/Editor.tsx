'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Toolbar from './Toolbar'

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '开始编写您的内容...',
      }),
    ],
    content: '<p>欢迎使用Tiptap编辑器！</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 工具栏 */}
      <Toolbar editor={editor} />
      
      {/* 编辑器内容区域 */}
      <div className="border border-t-0 border-gray-300 rounded-b-lg bg-white">
        <EditorContent 
          editor={editor} 
          className="min-h-[400px] p-6 rounded-b-lg"
        />
      </div>
    </div>
  )
}