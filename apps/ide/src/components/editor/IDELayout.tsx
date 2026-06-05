'use client'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { FileTree } from './FileTree'
import { CodeEditor } from './CodeEditor'
import { AgentPanel } from './AgentPanel'

export function IDELayout() {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      {/* File tree */}
      <Panel defaultSize={18} minSize={12} maxSize={30}>
        <FileTree />
      </Panel>
      <PanelResizeHandle className="w-px bg-ide-border hover:bg-brand-green/40 transition-colors cursor-col-resize" />

      {/* Code editor */}
      <Panel defaultSize={55} minSize={30}>
        <CodeEditor />
      </Panel>
      <PanelResizeHandle className="w-px bg-ide-border hover:bg-brand-green/40 transition-colors cursor-col-resize" />

      {/* Agent panel */}
      <Panel defaultSize={27} minSize={20} maxSize={45}>
        <AgentPanel />
      </Panel>
    </PanelGroup>
  )
}
