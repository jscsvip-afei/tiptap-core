import { Editor, useEditorState } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Ellipsis, Superscript, Subscript, Strikethrough } from 'lucide-react'

interface IProps {
  editor: Editor | null
}

export default function MoreMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return null

  const { isStrike, isSuperscript, isSubscript } = useEditorState({
    editor,
    selector: (ctx) => ({
      isStrike: ctx.editor.isActive('strike'),
      isSuperscript: ctx.editor.isActive('superscript'),
      isSubscript: ctx.editor.isActive('subscript'),
    }),
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={isStrike ? 'secondary' : 'ghost'}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          variant={isSuperscript ? 'secondary' : 'ghost'}
        >
          <Superscript className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          variant={isSubscript ? 'secondary' : 'ghost'}
        >
          <Subscript className="h-4 w-4" />
        </Button>
      </PopoverContent>
    </Popover>
  )
}