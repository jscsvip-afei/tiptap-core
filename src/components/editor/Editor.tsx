'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { extensions } from './extensions'
// 气泡框
import TextMenu from './menus/text-menu'
import Toolbar from './Toolbar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface IProps {
  rawContent: string
  handleUpdate: (content: string) => void
}

// 生成 JSON 内容
function genContent(rawContent: string) {
  try {
    if (!rawContent) return undefined
    return JSON.parse(rawContent)
  } catch (error) {
    return undefined
  }
}

export default function Editor(props: IProps) {
  const { rawContent, handleUpdate } = props

  const editor = useEditor({
    extensions,
    content: genContent(rawContent),
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
    <div className="w-full h-full flex flex-col">
      {/* 工具栏 */}
      <Toolbar editor={editor} />
      
      {/* 编辑器内容区域 - 使用 flex-1 占据剩余空间 */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full" id='work-content-scroll-container'>
          <div className="p-6">
            <EditorContent editor={editor} />
          </div>
        </ScrollArea>
      </div>
      
      <TextMenu editor={editor} />
    </div>
  )
}