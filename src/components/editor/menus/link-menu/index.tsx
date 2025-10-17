import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { useCallback, useState } from 'react'
import Wrapper from '../bubble-menu-wrapper'
import { LinkPreviewMenu } from './preview-menu'
import { LinkEditPanel } from './edit-panel'

interface IProps {
  editor: Editor | null
}

export default function LinkMenu(props: IProps) {
  const { editor } = props

  const [showEdit, setShowEdit] = useState(false)

  const shouldShow = (editor: Editor) => {
    if (editor == null) return false
    const isActive = editor.isActive('link')
    return isActive
  }

  const { href, target } = editor?.getAttributes('link') || {}

  const setLink = (url: string, openInNewTab?: boolean) => {
    editor &&
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
    setShowEdit(false)
  }

  const unsetLink = () => {
    editor && editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)
    return null
  }

  if (editor == null) return null

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={0}
      shouldShow={() => shouldShow(editor)}
      
    >
      <Wrapper>
        {showEdit ? (
          <LinkEditPanel
            initialUrl={href}
            initialOpenInNewTab={target === '_blank'}
            onSetLink={setLink}
          />
        ) : (
          <LinkPreviewMenu
            url={href}
            onEdit={() => setShowEdit(true)}
            onClear={unsetLink}
          />
        )}
      </Wrapper>
    </BubbleMenu>
  )
}