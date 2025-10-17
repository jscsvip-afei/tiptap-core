'use client'

import { Editor, useEditorState } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from 'lucide-react'

interface IProps {
  editor: Editor | null
}

export default function AlignMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return null

  const { isLeft, isCenter, isRight } = useEditorState({
    editor,
    selector: (ctx) => ({
      isLeft: ctx.editor.isActive({ textAlign: 'left' }),
      isCenter: ctx.editor.isActive({ textAlign: 'center' }),
      isRight: ctx.editor.isActive({ textAlign: 'right' }),
    }),
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <AlignLeft className="h-4 w-4" />
          &nbsp;
          <ChevronDown className="h-2 w-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Button
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          variant={isLeft ? 'secondary' : 'ghost'}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          variant={isCenter ? 'secondary' : 'ghost'}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          variant={isRight ? 'secondary' : 'ghost'}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </PopoverContent>
    </Popover>
  )
}