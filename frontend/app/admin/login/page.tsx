'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ParkingSquare,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // TEMP: replace with Supabase / backend later
      if (email === 'admin@zlot.in' && password === 'admin123') {
        localStorage.setItem('zlot_admin', 'true')
        router.replace('/admin/dashboard')
      } else {
        setError('Invalid admin credentials')
      }
    } catch {
      setError('Admin login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT PANEL */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop"
            alt="Admin Control"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 .bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        <div className="relative z-10 p-12 max-w-lg text-white">
          <Link href="/" className="inline-flex items-center space-x-2 mb-12">
            <div className="bg-zlot-yellow p-2 rounded-lg">
              <ParkingSquare className="text-zlot-dark w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">ZLOT</span>
          </Link>

          <h1 className="text-4xl font-extrabold mb-6">
            Admin Control Panel
          </h1>
          <p className="text-slate-300 text-lg font-medium">
            Secure access for operations, devices, and system monitoring.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 relative">
        <Link
          href="/"
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-widest"
        >
          Back to Main Site
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black mb-2">Admin Login</h2>
          <p className="text-slate-500 mb-3">Authorized personnel only.</p>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            <ShieldCheck className="w-4 h-4 text-zlot-yellow" />
            <span>Secure admin access • All actions are logged</span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex space-x-3 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-slate-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-slate-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-zlot-dark text-white rounded-xl font-bold flex items-center justify-center hover:bg-black transition"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign in as Admin
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
