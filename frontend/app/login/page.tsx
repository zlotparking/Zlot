'use client'
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  ParkingSquare,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push('/')
    })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop"
            alt="City Parking"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/30 to-transparent"></div>

        <div className="relative z-10 p-12 max-w-lg">
          <Link href="/" className="inline-flex items-center space-x-3 mb-12 group">
            <div className="bg-yellow-400 p-2.5 rounded-lg">
              <ParkingSquare className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              ZLOT
            </span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Stress-free parking for Namma Bengaluru.
          </h1>

          <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-md">
            Access verified parking spots across Indiranagar, Koramangala, and Whitefield.
          </p>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 font-medium">
              Log in to your ZLOT account to continue.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3 text-red-600">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                  text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-slate-100 focus:border-slate-300 outline-none font-medium"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Password
                </label>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                  text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-slate-100 focus:border-slate-300 outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-[0_8px_20px_rgba(0,0,0,0.2)]
              ${loading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-slate-900 active:scale-[0.98]'}
              `}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign in to ZLOT
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don&apos;t have an account?
              <Link href="/signup" className="ml-1 font-bold text-slate-900 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
