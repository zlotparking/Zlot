'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookPage() {
  const params = useSearchParams()
  const parkingId = params.get('parkingId')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const createBooking = async () => {
    if (!parkingId) {
      setMessage('Missing parkingId in the URL.')
      return
    }

    setIsLoading(true)
    setMessage(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setIsLoading(false)
      setMessage('Please log in before booking.')
      return
    }

    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      parking_id: parkingId,
      start_time: new Date(),
      end_time: new Date(Date.now() + 60 * 60 * 1000),
      total_amount: 50,
    })

    setIsLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Booking successful!')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-xl border border-slate-100 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Booking
          </p>
          <h1 className="text-2xl font-black text-zlot-dark mt-2">
            Confirm your parking slot
          </h1>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm font-medium text-slate-600">
          Parking ID: <span className="font-bold">{parkingId ?? 'Not set'}</span>
        </div>

        {message && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-bold text-slate-700">
            {message}
          </div>
        )}

        <button
          onClick={createBooking}
          disabled={isLoading}
          className={`w-full rounded-xl px-6 py-4 text-sm font-black uppercase tracking-widest transition-all ${
            isLoading
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-zlot-dark text-white hover:bg-black'
          }`}
        >
          {isLoading ? 'Processing...' : 'Book Parking'}
        </button>
      </div>
    </div>
  )
}
