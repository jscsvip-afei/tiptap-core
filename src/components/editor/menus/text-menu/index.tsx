'use client'

import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { Separator } from '@/components/ui/separator'
import HighlightMenu from './highlight-menu'
import AlignMenu from './align-menu'
import MoreMenu from './more-menu'

import BasicMenu from './basic-menu'
import ContentTypeMenu from './content-type'


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
        <ContentTypeMenu editor={editor} />
        <BasicMenu editor={editor} />
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