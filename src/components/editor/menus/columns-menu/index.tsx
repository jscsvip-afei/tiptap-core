import { Editor, findParentNode, posToDOMRect } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { Columns2, PanelLeft, PanelRight, Trash2 } from 'lucide-react'
import { ColumnLayout } from '@/components/editor/extensions/column/Columns'
import { Button } from '@/components/ui/button'
import Wrapper from '../bubble-menu-wrapper'


interface IProps {
  editor: Editor | null
}

export default function ColumnsMenu(props: IProps) {
  const { editor } = props

  // 菜单是否应该显示
  const shouldShow = useCallback(() => {
    if (editor == null) return false
    const isColumns = editor.isActive('columns')
    if (!isColumns) return false

    const { empty } = editor.state.selection
    if (!empty) return false

    return true
 }, [editor])

  // 获取 columns 节点的虚拟元素，用于定位
  const getReferencedVirtualElement = useCallback(() => {
    if (!editor) return null
    
    const parentNode = findParentNode(
      node => node.type.name === 'columns'
    )(editor.state.selection)
    
    if (parentNode) {
      const domRect = posToDOMRect(editor.view, parentNode.start, parentNode.start + parentNode.node.nodeSize)
      return {
        getBoundingClientRect: () => domRect,
        getClientRects: () => [domRect],
      }
    }
    return null
  }, [editor])

  // left
  const onColumnLeft = useCallback(() => {
    editor && editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
  }, [editor])
  const isLeftActive = useCallback(() => {
    return (
      editor &&
      editor.isActive('columns', {
        layout: ColumnLayout.SidebarLeft,
      })
    )
  }, [editor])

  // right
  const onColumnRight = useCallback(() => {
    editor && editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
  }, [editor])
  const isRightActive = useCallback(() => {
    return (
      editor &&
      editor.isActive('columns', {
        layout: ColumnLayout.SidebarRight,
      })
    )
  }, [editor])

  // two
  const onColumnTwo = useCallback(() => {
    editor && editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
  }, [editor])
  const isTwoActive = useCallback(() => {
    return (
      editor &&
      editor.isActive('columns', {
        layout: ColumnLayout.TwoColumn,
      })
    )
  }, [editor])

  if (editor == null) return

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`} // 多个菜单，需要不同的 key
      updateDelay={100}
      shouldShow={shouldShow}
      getReferencedVirtualElement={getReferencedVirtualElement}
      options={{
        placement: 'top',
        offset: 8,
      }}
    >
      <Wrapper>
        <Button
          size="sm"
          onClick={onColumnLeft}
          variant={isLeftActive() ? 'secondary' : 'ghost'}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onColumnTwo}
          variant={isTwoActive() ? 'secondary' : 'ghost'}
        >
          <Columns2 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onColumnRight}
          variant={isRightActive() ? 'secondary' : 'ghost'}
        >
          <PanelRight className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().deleteColumns().run()}
          variant="ghost"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Wrapper>
    </BubbleMenu>
  )
}