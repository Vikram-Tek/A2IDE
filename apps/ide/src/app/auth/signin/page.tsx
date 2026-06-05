'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl: '/workspace' })
  }

  return (
    <div className="min-h-screen bg-ide-bg flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-ide-surface border border-ide-border rounded-xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-teal flex items-center justify-center">
            <span className="text-black font-bold text-sm">A2</span>
          </div>
          <div>
            <h1 className="text-ide-text font-semibold text-lg leading-none">A2IDE</h1>
            <p className="text-ide-muted text-xs">Cloud IDE Platform</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-ide-text mb-2">Sign in to your workspace</h2>
        <p className="text-ide-muted text-sm mb-8">
          Use your organisation Google Workspace account to access your team&apos;s skills and tools.
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-60"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Signing in…' : 'Continue with Google Workspace'}
        </button>

        <p className="text-ide-muted text-xs text-center mt-6">
          By signing in you agree to the TechIEG platform terms.
        </p>
      </div>
    </div>
  )
}
