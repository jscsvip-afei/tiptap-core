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








export const extensions =  [
      Document,
      Columns,
      Column,
      StarterKit.configure({
        document: false,
        link: { openOnClick: false },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      SubScript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: '输入 / 设置格式',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SlashCommands,
      ImageBlock,
    ]