'use client'
import { useEffect, useRef, useState } from 'react'
import { X, Circle } from 'lucide-react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const TABS = [
  { name: 'IDELayout.tsx', lang: 'typescript' },
  { name: 'AGENTS.md',     lang: 'markdown' },
]

const DEFAULT_CODE = `// A2IDE — Web IDE Shell Scaffold
// Story: A2IDE-9 | Epic: Phase 1 — IDE Shell & Authentication

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { FileTree } from './FileTree'
import { CodeEditor } from './CodeEditor'
import { AgentPanel } from './AgentPanel'

export function IDELayout() {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={18} minSize={12} maxSize={30}>
        <FileTree />
      </Panel>
      <PanelResizeHandle className="w-px bg-ide-border hover:bg-brand-green/40 cursor-col-resize" />
      <Panel defaultSize={55} minSize={30}>
        <CodeEditor />
      </Panel>
      <PanelResizeHandle className="w-px bg-ide-border hover:bg-brand-green/40 cursor-col-resize" />
      <Panel defaultSize={27} minSize={20} maxSize={45}>
        <AgentPanel />
      </Panel>
    </PanelGroup>
  )
}`

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="h-full flex flex-col bg-ide-bg">
      {/* Tab bar */}
      <div className="flex items-center bg-ide-surface border-b border-ide-border overflow-x-auto shrink-0">
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-4 py-2 text-xs border-r border-ide-border whitespace-nowrap transition-colors
              ${activeTab === i
                ? 'text-ide-text bg-ide-bg border-t border-t-brand-green'
                : 'text-ide-muted hover:text-ide-text hover:bg-white/5'
              }`}
          >
            <span>{tab.name}</span>
            <span className="opacity-0 hover:opacity-100 text-ide-muted hover:text-red-400">
              <X size={10} />
            </span>
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language={TABS[activeTab].lang}
          value={DEFAULT_CODE}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'gutter',
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-ide-surface border-t border-ide-border text-xs text-ide-muted shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Circle size={7} className="text-brand-green fill-brand-green" /> TypeScript</span>
          <span>A2IDE-9 · Epic: Phase 1</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>
    </div>
  )
}
