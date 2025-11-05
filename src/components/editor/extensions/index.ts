import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import { TaskList, TaskItem  } from '@tiptap/extension-list'
import { SlashCommands } from './slash-commands'
import Document from './document'
import { Columns, Column } from './column'
import ImageBlock from './image-block'
import { ImageUpload } from './image-upload'
import FileHandler from '@tiptap/extension-file-handler'
import { uploadImageAPI } from '@/components/editor/utils/api'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import { Table, TableCell, TableRow, TableHeader } from './table/index'


export const extensions =  [
      Document,
      Columns,
      Column,
      StarterKit.configure({
        document: false,
        dropcursor: false,
        link: { openOnClick: false },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      SubScript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      Table,
      TableCell,
      TableRow,
      TableHeader,
      Placeholder.configure({
        placeholder: '输入 / 设置格式',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SlashCommands,
      ImageBlock,
      ImageUpload,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(async () => {
            const url = await uploadImageAPI()

            currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
          })
        },
        onPaste: (currentEditor, files) => {
          files.forEach(async () => {
            const url = await uploadImageAPI()

            return currentEditor
              .chain()
              .setImageBlockAt({
                pos: currentEditor.state.selection.anchor,
                src: url,
              })
              .focus()
              .run()
          })
        },
      }),
      Dropcursor.configure({
        width: 2,
        class: 'ProseMirror-dropcursor border-black',
      }),
    ]