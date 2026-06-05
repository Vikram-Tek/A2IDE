'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Code2, Layers, Wrench, Terminal, Settings, ChevronRight,
  Zap, Database, GitBranch, Play
} from 'lucide-react'

const nav = [
  { icon: Code2,    label: 'Workspace',  href: '/workspace' },
  { icon: Layers,   label: 'Skills',     href: '/registry/skills' },
  { icon: Wrench,   label: 'Tools',      href: '/registry/tools' },
  { icon: Database, label: 'MCP',        href: '/registry/mcp' },
  { icon: Play,     label: 'Evals',      href: '/evals' },
  { icon: GitBranch,label: 'Pipelines',  href: '/pipelines' },
  { icon: Terminal, label: 'Agents',     href: '/agents' },
  { icon: Settings, label: 'Settings',   href: '/settings' },
]

export function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-14 flex flex-col items-center bg-ide-surface border-r border-ide-border py-3 gap-1 shrink-0">
      {/* Logo */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-teal flex items-center justify-center mb-4">
        <span className="text-black font-bold text-xs">A2</span>
      </div>
      {nav.map(({ icon: Icon, label, href }) => {
        const active = path.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={`relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors group
              ${active ? 'bg-brand-green/10 text-brand-green' : 'text-ide-muted hover:text-ide-text hover:bg-white/5'}`}
          >
            <Icon size={18} />
            {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-green rounded-r" />}
            <span className="absolute left-full ml-2 px-2 py-1 bg-ide-surface border border-ide-border text-ide-text text-xs rounded
              opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              {label}
            </span>
          </Link>
        )
      })}
    </aside>
  )
}
