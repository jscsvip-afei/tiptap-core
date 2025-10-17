import { Editor } from '@tiptap/react'
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react/menus'
import { useCallback, useState, useEffect } from 'react'
import Wrapper from '../bubble-menu-wrapper'
import { LinkPreviewMenu } from './preview-menu'
import { LinkEditPanel } from './edit-panel'

interface IProps {
  editor: Editor | null
}

export default function LinkMenu(props: IProps) {
  const { editor } = props

  const [showEdit, setShowEdit] = useState(false)
  const [url, setUrl] = useState('')

  // 监听编辑器选区变化,更新链接URL
  useEffect(() => {
    if (!editor) return

    const updateUrl = () => {
      if (editor.isActive('link')) {
        const href = editor.getAttributes('link').href
        setUrl(href || '')
      }
    }

    // 初始化时更新一次
    updateUrl()

    // 监听选区更新事件
    editor.on('selectionUpdate', updateUrl)
    editor.on('transaction', updateUrl)

    return () => {
      editor.off('selectionUpdate', updateUrl)
      editor.off('transaction', updateUrl)
    }
  }, [editor])

  const shouldShow = useCallback(() => {
    if (editor == null) return false
    return editor.isActive('link')
  }, [editor])

  const setLink = useCallback((url: string, openInNewTab?: boolean) => {
    editor &&
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
    setShowEdit(false)
  }, [editor])

  const unsetLink = useCallback(() => {
    editor && editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)
    return null
  }, [editor])

  if (editor == null) return null

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={0}
      shouldShow={shouldShow}
    >
      <Wrapper>
        {showEdit ? (
          <LinkEditPanel
            initialUrl={url}
            initialOpenInNewTab={editor.getAttributes('link').target === '_blank'}
            onSetLink={setLink}
          />
        ) : (
          <LinkPreviewMenu
            url={url}
            onEdit={() => setShowEdit(true)}
            onClear={unsetLink}
          />
        )}
      </Wrapper>
    </BubbleMenu>
  )
}