'use client'

import { EditorContent, Editor as TiptapEditor } from '@tiptap/react'
// 气泡框
import TextMenu from './menus/text-menu'

interface IProps {
  editor: TiptapEditor
}

export default function Editor(props: IProps) {
  const { editor } = props

  return (
    <div className="w-full max-w-none mx-auto">
      {/* 编辑器内容区域 */}
      <EditorContent 
        editor={editor} 
        className="h-full"
      />
      <TextMenu editor={editor} />
    </div>
  )
}