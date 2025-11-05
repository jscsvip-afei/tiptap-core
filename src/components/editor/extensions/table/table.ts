import { TableKit } from '@tiptap/extension-table'
export const Table = TableKit.configure({
  table: { 
    resizable: true, // 拖拽列宽
    lastColumnResizable: false, // 最后一列不可拖拽
  },
})