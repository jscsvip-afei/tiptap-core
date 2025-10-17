import { Editor, useEditorState } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Code, Underline } from 'lucide-react'

interface IProps {
  editor: Editor | null
}

export default function BasicMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return null

  const { isBold, isUnderline, isItalic, isCode } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isUnderline: ctx.editor.isActive('underline'),
      isItalic: ctx.editor.isActive('italic'),
      isCode: ctx.editor.isActive('code'),
    }),
  })

  return (
    <>
      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={isBold ? 'secondary' : 'ghost'}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        variant={isUnderline ? 'secondary' : 'ghost'}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={isItalic ? 'secondary' : 'ghost'}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        variant={isCode ? 'secondary' : 'ghost'}
      >
        <Code className="h-4 w-4" />
      </Button>
    </>
  )
}