import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import { TaskList, TaskItem  } from '@tiptap/extension-list'



export const extensions =  [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      SubScript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: '开始编写您的内容...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      })
    ]