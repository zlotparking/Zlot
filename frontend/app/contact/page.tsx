export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-zlot-dark">
          Reach the Bengaluru Hub
        </h1>
        <p className="text-slate-500 text-lg font-medium">
          Tell us what you need. We will respond with parking options, bulk
          booking details, or owner onboarding guidance.
        </p>
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 text-left space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Email
            </p>
            <p className="text-lg font-bold text-zlot-dark">zlotparking@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Phone
            </p>
            <p className="text-lg font-bold text-zlot-dark">+91 80 0000 0000</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Location
            </p>
            <p className="text-lg font-bold text-zlot-dark">
              Yelahanka, Bengaluru, Karnataka
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
