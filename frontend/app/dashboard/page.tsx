import Link from 'next/link'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  LayoutGrid,
  MapPin,
  ParkingSquare,
  Star,
} from 'lucide-react'

const STATS = [
  {
    label: 'Active bookings',
    value: '2',
    detail: 'Next check-in today at 6:30 PM',
    icon: Clock,
  },
  {
    label: 'Saved spaces',
    value: '6',
    detail: 'Top picks in Indiranagar and HSR',
    icon: Star,
  },
  {
    label: 'Total spent',
    value: 'Rs 1,840',
    detail: 'Last 30 days',
    icon: ParkingSquare,
  },
]

const UPCOMING = [
  {
    id: 'BK-2041',
    title: 'Indiranagar 100ft Road',
    address: 'Near Toit, Bengaluru',
    time: 'Today, 6:30 PM - 9:30 PM',
    price: 'Rs 120/hr',
    status: 'Confirmed',
  },
  {
    id: 'BK-2099',
    title: 'Koramangala 4th Block',
    address: '80ft Road, Bengaluru',
    time: 'Tomorrow, 9:00 AM - 11:00 AM',
    price: 'Rs 90/hr',
    status: 'Confirmed',
  },
]

const SPACES = [
  {
    id: 'SP-77',
    title: 'Whitefield Office Driveway',
    address: 'Phoenix Marketcity area',
    rate: 'Rs 70/hr',
    occupancy: '72% this week',
  },
  {
    id: 'SP-81',
    title: 'HSR Layout Basement Slot',
    address: '27th Main Road, HSR',
    rate: 'Rs 60/hr',
    occupancy: '64% this week',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-zlot-dark pt-28 pb-16 text-white">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-zlot-yellow/10 blur-[120px]"></div>
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-zlot-yellow">
                <Cpu className="h-4 w-4" />
                ZLOT Dashboard
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Welcome back, Arjun.
              </h1>
              <p className="text-lg text-slate-300 font-medium max-w-xl">
                Track upcoming bookings, manage your listed spaces, and discover
                new parking nodes across Bengaluru.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/find-parking"
                  className="btn-primary px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center"
                >
                  Find Parking <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/list-space"
                  className="rounded-xl border border-white/20 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white hover:border-zlot-yellow hover:text-zlot-yellow transition-colors"
                >
                  List a Space
                </Link>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-black">
                    Membership
                  </p>
                  <h2 className="text-2xl font-black text-white mt-2">
                    ZLOT Pioneer
                  </h2>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-zlot-yellow/20 flex items-center justify-center">
                  <LayoutGrid className="h-6 w-6 text-zlot-yellow" />
                </div>
              </div>
              <div className="mt-8 space-y-3 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-zlot-yellow" />
                  Priority support for Bangalore pilot zones
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-zlot-yellow" />
                  Early access to verified residential spots
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-zlot-yellow" />
                  Upcoming monthly passes in 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 -mt-10 pb-20 space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="card-premium p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-black">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-zlot-dark mt-3">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-2">
                    {stat.detail}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-zlot-dark" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-black">
                  Upcoming bookings
                </p>
                <h3 className="text-2xl font-black text-zlot-dark mt-2">
                  Your next arrivals
                </h3>
              </div>
              <Link
                href="/find-parking"
                className="text-[11px] font-black uppercase tracking-[0.2em] text-zlot-dark hover:text-zlot-yellow transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="space-y-6">
              {UPCOMING.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      {booking.status}
                    </div>
                    <h4 className="text-lg font-black text-zlot-dark">
                      {booking.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {booking.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {booking.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-zlot-dark">
                      {booking.price}
                    </p>
                    <button className="mt-3 rounded-full border border-slate-200 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-zlot-dark hover:text-zlot-dark transition-colors">
                      Manage booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-seamless p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-black">
                    Quick actions
                  </p>
                  <h3 className="text-xl font-black text-zlot-dark mt-2">
                    Jump back in
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-zlot-yellow/10 flex items-center justify-center">
                  <LayoutGrid className="h-5 w-5 text-zlot-dark" />
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/find-parking"
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 text-sm font-black text-zlot-dark hover:border-zlot-dark transition-colors"
                >
                  Explore parking near you
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/list-space"
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 text-sm font-black text-zlot-dark hover:border-zlot-dark transition-colors"
                >
                  List a new space
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 text-sm font-black text-zlot-dark hover:border-zlot-dark transition-colors"
                >
                  Contact the Bengaluru hub
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="card-premium p-8 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-black">
                    Your spaces
                  </p>
                  <h3 className="text-xl font-black text-zlot-dark mt-2">
                    Host performance
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <ParkingSquare className="h-5 w-5 text-zlot-dark" />
                </div>
              </div>
              <div className="space-y-5">
                {SPACES.map((space) => (
                  <div key={space.id} className="rounded-2xl border border-slate-100 p-4">
                    <h4 className="text-sm font-black text-zlot-dark">
                      {space.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {space.address}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>{space.rate}</span>
                      <span>{space.occupancy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
