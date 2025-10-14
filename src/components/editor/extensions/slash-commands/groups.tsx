import { Editor } from '@tiptap/core'
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  SquareCode,
  Minus,
} from 'lucide-react'
import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: '格式',
    commands: [
      {
        name: 'heading1',
        label: 'Heading1 标题1',
        Icon: Heading1,
        description: 'High priority section title',
        aliases: ['h1'],
        action: (editor: Editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading2 标题2',
        Icon: Heading2,
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: (editor: Editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading3 标题3',
        Icon: Heading3,
        description: 'Low priority section title',
        aliases: ['h3'],
        action: (editor: Editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'BulletList 列表',
        Icon: List,
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: (editor: Editor) => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: 'NumberedList 有序列表',
        Icon: ListOrdered,
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: (editor: Editor) => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'TaskList 任务列表',
        Icon: ListTodo,
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: (editor: Editor) => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        name: 'blockquote',
        label: 'Blockquote 引用',
        Icon: Quote,
        description: 'Element for quoting',
        action: (editor: Editor) => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'CodeBlock 代码块',
        Icon: SquareCode,
        description: 'Code block with syntax highlighting',
        shouldBeHidden: (editor: Editor) => editor.isActive('columns'),
        action: (editor: Editor) => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: '插入',
    commands: [
      // TODO: table image column

      {
        name: 'horizontalRule',
        label: 'HR 分割线',
        Icon: Minus,
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: (editor: Editor) => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
    ],
  },
]