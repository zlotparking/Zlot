'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const isAdmin = localStorage.getItem('zlot_admin')

    if (!isAdmin) {
      router.replace('/admin/login')
    } else {
      setChecked(true)
    }
  }, [router])

  // Prevent rendering before auth check
  if (!checked) return null

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
  )
}
