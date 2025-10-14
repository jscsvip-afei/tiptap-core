'use client'

import { useEditor } from '@tiptap/react'
import { extensions } from './extensions'

interface UseEditorInstanceProps {
  content: string
  onUpdate: (content: string) => void
}

// 生成 JSON 内容
function genContent(rawContent: string) {
  try {
    return JSON.parse(rawContent)
  } catch (error) {
    return undefined
  }
}

export function useEditorInstance({ content, onUpdate }: UseEditorInstanceProps) {
  const editor = useEditor({
    extensions,
    content: genContent(content),
    onUpdate: ({ editor }) => {
      const data = editor.getJSON()
      onUpdate(JSON.stringify(data))
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-96 prose dark:prose-invert focus:outline-none max-w-none',
      },
    },
  })

  return editor
}
