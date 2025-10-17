'use client'

import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { Separator } from '@/components/ui/separator'
import HighlightMenu from './highlight-menu'
import AlignMenu from './align-menu'
import MoreMenu from './more-menu'

import BasicMenu from './basic-menu'
import ContentTypeMenu from './content-type'
import { isTextSelected } from '@/components/editor/utils/isTextSelected'
import SetLinkMenu from './set-link-menu'
import Wrapper from '../bubble-menu-wrapper'



interface IProps {
  editor: Editor | null
}

export default function TextMenu(props: IProps) {
  const { editor } = props
  
  if (editor == null) return
  
  function shouldShow(editor: Editor) {
    // 某些类型， 代码块 不显示文本菜单
    if (editor?.isActive('codeBlock')) return false

    // 其他，看是否选中了文本
    return isTextSelected({ editor })
  }
  
  return (
    <BubbleMenu
      editor={editor}
      updateDelay={100}
      shouldShow={() => shouldShow(editor)}
    >
      <Wrapper>
        <ContentTypeMenu editor={editor} />
        <BasicMenu editor={editor} />
        <SetLinkMenu editor={editor} />
        <Separator orientation="vertical" className="border !h-auto" />
        <HighlightMenu editor={editor} />
         <Separator orientation="vertical" className="border !h-auto" />
        <AlignMenu editor={editor} />
        <Separator orientation="vertical" className="border !h-auto" />
        <MoreMenu editor={editor} />
      </Wrapper>
    </BubbleMenu>
  )
}