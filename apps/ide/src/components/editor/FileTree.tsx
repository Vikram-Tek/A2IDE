'use client'
import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, RefreshCw } from 'lucide-react'

type TreeNode = { name: string; type: 'file' | 'dir'; children?: TreeNode[] }

const MOCK_TREE: TreeNode[] = [
  { name: 'apps', type: 'dir', children: [
    { name: 'ide', type: 'dir', children: [
      { name: 'src', type: 'dir', children: [
        { name: 'app', type: 'dir', children: [
          { name: 'layout.tsx', type: 'file' },
          { name: 'page.tsx', type: 'file' },
        ]},
        { name: 'components', type: 'dir', children: [
          { name: 'editor', type: 'dir', children: [
            { name: 'IDELayout.tsx', type: 'file' },
            { name: 'CodeEditor.tsx', type: 'file' },
            { name: 'AgentPanel.tsx', type: 'file' },
          ]},
        ]},
      ]},
    ]},
  ]},
  { name: 'packages', type: 'dir', children: [
    { name: 'ui', type: 'dir', children: [] },
    { name: 'types', type: 'dir', children: [] },
    { name: 'sdk', type: 'dir', children: [] },
  ]},
  { name: 'AGENTS.md', type: 'file' },
  { name: 'package.json', type: 'file' },
]

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2)
  const isDir = node.type === 'dir'
  return (
    <div>
      <button
        onClick={() => isDir && setOpen(!open)}
        className="flex items-center gap-1 w-full text-left px-2 py-0.5 hover:bg-white/5 rounded text-xs group"
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        {isDir ? (
          <>
            {open ? <ChevronDown size={10} className="text-ide-muted shrink-0" /> : <ChevronRight size={10} className="text-ide-muted shrink-0" />}
            {open ? <FolderOpen size={13} className="text-brand-teal shrink-0" /> : <Folder size={13} className="text-brand-teal shrink-0" />}
          </>
        ) : (
          <>
            <span className="w-[10px] shrink-0" />
            <File size={13} className="text-ide-muted shrink-0" />
          </>
        )}
        <span className={isDir ? 'text-ide-text' : 'text-ide-muted group-hover:text-ide-text'}>{node.name}</span>
      </button>
      {isDir && open && node.children?.map((child, i) => (
        <TreeItem key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export function FileTree() {
  return (
    <div className="h-full flex flex-col bg-ide-surface border-r border-ide-border">
      <div className="flex items-center justify-between px-3 py-2 border-b border-ide-border">
        <span className="text-xs font-medium text-ide-muted uppercase tracking-wider">Explorer</span>
        <div className="flex gap-1">
          <button className="text-ide-muted hover:text-ide-text transition-colors" title="New file">
            <Plus size={13} />
          </button>
          <button className="text-ide-muted hover:text-ide-text transition-colors" title="Refresh">
            <RefreshCw size={13} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {MOCK_TREE.map((node, i) => <TreeItem key={i} node={node} />)}
      </div>
    </div>
  )
}
