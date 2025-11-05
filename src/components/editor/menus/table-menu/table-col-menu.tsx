import { BubbleMenu } from '@tiptap/react/menus'
import React, { useCallback } from 'react'
import { ArrowLeftToLine, ArrowRightToLine, Trash2 } from 'lucide-react'
import { MenuProps, ShouldShowProps } from '../types'
import Wrapper from '../bubble-menu-wrapper'
import { Button } from '@/components/ui/button'
import { isColumnGripSelected } from './utils'

export const TableColMenu = (props: MenuProps) => {
  const { editor } = props

  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (editor == null || !state || typeof from !== 'number') {
        return false
      }
      
      return isColumnGripSelected({ editor, view, state, from })
    },
    [editor]
  )

  // 前面插入列
  const onAddColumnBefore = useCallback(() => {
    editor && editor.chain().focus().addColumnBefore().run()
  }, [editor])

  // 后面插入列
  const onAddColumnAfter = useCallback(() => {
    editor && editor.chain().focus().addColumnAfter().run()
  }, [editor])

  // 删除列
  const onDeleteColumn = useCallback(() => {
    editor && editor.chain().focus().deleteColumn().run()
  }, [editor])

  if (editor == null) return

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableColMenu"
      updateDelay={0}
      shouldShow={shouldShow}
      options={{
        placement: 'bottom',
        offset: { mainAxis: 10, crossAxis: 0 },
        flip: true 
      }}
    >
      <Wrapper className="flex-col items-start">
        <Button onClick={onAddColumnBefore} size="sm" variant="ghost">
          <ArrowLeftToLine className="w-4 h-4 mr-1" />
          前面插入一列
        </Button>
        <Button onClick={onAddColumnAfter} size="sm" variant="ghost">
          <ArrowRightToLine className="w-4 h-4 mr-1" />
          后面插入一列
        </Button>
        <Button onClick={onDeleteColumn} size="sm" variant="ghost">
          <Trash2 className="w-4 h-4 mr-1" />
          删除列
        </Button>
      </Wrapper>
    </BubbleMenu>
  )
}