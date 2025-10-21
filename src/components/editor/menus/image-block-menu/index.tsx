import { Editor, useEditorState, posToDOMRect } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { useCallback, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { AlignLeft, AlignCenter, AlignRight, ChevronDown } from 'lucide-react'
import Wrapper from '../bubble-menu-wrapper'
import { Button } from '@/components/ui/button'
import { EditorState, NodeSelection } from '@tiptap/pm/state'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface IProps {
  editor: Editor | null
  appendTo: React.RefObject<any>
}

export default function ImageBlockMenu(props: IProps) {
  const { editor, appendTo } = props

  if (editor == null) return null

  const pluginKeyRef = useRef(`imageBlockMenu-${uuid()}`)

  const { isAlignLeft, isAlignCenter, isAlignRight, imageWidth } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes('imageBlock') ?? {}
      return {
        isAlignLeft: ctx.editor.isActive('imageBlock', { align: 'left' }),
        isAlignCenter: ctx.editor.isActive('imageBlock', { align: 'center' }),
        isAlignRight: ctx.editor.isActive('imageBlock', { align: 'right' }),
        imageWidth: attrs.width,
      }
    },
  })

  // 是否显示菜单 - 使用回调参数中的实时 state，而不是闭包中的旧 selection
  const shouldShow = useCallback(
    ({ state }: { state: EditorState; view: any; from: number; to: number }) => {
      const { selection } = state
      

      
      if (!(selection instanceof NodeSelection)) {

        return false
      }
      

      
      const isImageBlock = selection.node.type.name === 'imageBlock'

      
      return isImageBlock
    },
    []
  )

  const onAlignImageLeft = useCallback(() => {
    editor &&
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockAlign('left')
        .run()
  }, [editor])

  const onAlignImageCenter = useCallback(() => {
    editor &&
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockAlign('center')
        .run()
  }, [editor])

  const onAlignImageRight = useCallback(() => {
    editor &&
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockAlign('right')
        .run()
  }, [editor])

  const changeWidth = useCallback(
    (value: number) => {
      editor &&
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setImageBlockWidth(value)
          .run()
    },
    [editor]
  )

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={pluginKeyRef.current} // 多个菜单，需要不同的 key
      updateDelay={0}
      shouldShow={shouldShow}
    >
      <Wrapper>
        <Button
          size="sm"
          onClick={onAlignImageLeft}
          variant={isAlignLeft ? 'secondary' : 'ghost'}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onAlignImageCenter}
          variant={isAlignCenter ? 'secondary' : 'ghost'}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onAlignImageRight}
          variant={isAlignRight ? 'secondary' : 'ghost'}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="ghost">
              {imageWidth ?? ''}
              &nbsp;
              <ChevronDown className="h-2 w-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <Button size="sm" variant="ghost" onClick={() => changeWidth(25)}>
              25%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => changeWidth(50)}>
              50%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => changeWidth(75)}>
              75%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => changeWidth(100)}>
              100%
            </Button>
          </PopoverContent>
        </Popover>
      </Wrapper>
    </BubbleMenu>
  )
}