'use client'
import { signOut, useSession } from 'next-auth/react'
import { Bell, LogOut, Zap } from 'lucide-react'

export function TopBar() {
  const { data: session } = useSession()
  return (
    <header className="h-10 flex items-center justify-between px-4 bg-ide-surface border-b border-ide-border shrink-0">
      <div className="flex items-center gap-2 text-xs text-ide-muted">
        <Zap size={12} className="text-brand-green" />
        <span>A2IDE</span>
        <span className="text-ide-border">•</span>
        <span className="text-ide-text">{(session?.user as any)?.orgId ?? 'workspace'}</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-ide-muted hover:text-ide-text transition-colors">
          <Bell size={15} />
        </button>
        <div className="flex items-center gap-2">
          {session?.user?.image && (
            <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
          )}
          <span className="text-xs text-ide-muted">{session?.user?.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="text-ide-muted hover:text-red-400 transition-colors"
          title="Sign out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </header>
  )
}
