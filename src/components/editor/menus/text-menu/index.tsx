'use client'

import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import HighlightMenu from './highlight-menu'
import AlignMenu from './align-menu'
import MoreMenu from './more-menu'

import { Bold, Italic, Code, Underline } from 'lucide-react'


interface IProps {
  editor: Editor | null
}

export default function TextMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={100}
    >
      <div
        className="
          border rounded p-1 shadow
          bg-background dark:bg-background-dark dark:border-gray-800 dark:shadow-lg 
          inline-flex space-x-1
        "
      >
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('code') ? 'secondary' : 'ghost'}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="border !h-auto" />
        <HighlightMenu editor={editor} />
         <Separator orientation="vertical" className="border !h-auto" />
        <AlignMenu editor={editor} />
        <Separator orientation="vertical" className="border !h-auto" />
        <MoreMenu editor={editor} />
      </div>
    </BubbleMenu>
  )
}