'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Toolbar from './Toolbar'
// 自定义编辑器样式
import '../styles/tiptap-editor.css'

import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextMenu from './menus/text-menu'

interface IProps {
  rawContent: string
  handleUpdate: (content: string) => void
}

// 生成 JSON 内容
function gen_content(rawContent: string) {
  try {
    return JSON.parse(rawContent)
  } catch (error) {
    return undefined
  }
}

export default function Editor(props: IProps) {
  const { rawContent, handleUpdate } = props
  console.log('Editor received rawContent:', rawContent)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      SubScript,
      Superscript,
      Placeholder.configure({
        placeholder: '开始编写您的内容...',
      }),
    ],
    content: gen_content(rawContent),
    onUpdate: ({ editor }) => {
      const data = editor.getJSON()
      handleUpdate(JSON.stringify(data))
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-96 prose dark:prose-invert focus:outline-none max-w-none',
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
        <TextMenu editor={editor} />
      </div>
    </div>
  )
}