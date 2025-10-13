'use client'

import { Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'

interface ToolbarProps {
  editor: Editor
}

export default function Toolbar({ editor }: ToolbarProps) {
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    const updateHistoryState = () => {
      setCanUndo(editor.can().undo())
      setCanRedo(editor.can().redo())
    }

    // 初始状态
    updateHistoryState()

    // 监听编辑器更新
    editor.on('transaction', updateHistoryState)

    return () => {
      editor.off('transaction', updateHistoryState)
    }
  }, [editor])

  return (
    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('bold')
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          粗体
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('italic')
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          斜体
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('strike')
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          删除线
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          无序列表
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          有序列表
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          引用
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          onClick={() => {
            console.log('Undo clicked, can undo:', canUndo)
            if (canUndo) {
              editor.chain().focus().undo().run()
            }
          }}
          disabled={!canUndo}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            canUndo
              ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:shadow-sm'
              : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title={canUndo ? '撤销 (Ctrl+Z)' : '没有可撤销的操作'}
        >
          ↶ 撤销
        </button>
        <button
          onClick={() => {
            console.log('Redo clicked, can redo:', canRedo)
            if (canRedo) {
              editor.chain().focus().redo().run()
            }
          }}
          disabled={!canRedo}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            canRedo
              ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:shadow-sm'
              : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
          }`}
          title={canRedo ? '重做 (Ctrl+Y)' : '没有可重做的操作'}
        >
          ↷ 重做
        </button>
      </div>
    </div>
  )
}