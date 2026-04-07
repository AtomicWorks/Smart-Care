export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c3436] via-[#134e50] to-[#1a6365] px-8 py-10 text-white shadow-xl">
      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/[0.03]" />

      <p className="relative mb-1 text-sm font-medium tracking-wide text-teal-200/80">
        MediAI SmartCare
      </p>
      <h1 className="relative text-3xl font-bold tracking-tight md:text-4xl">
        Appointment Booking System
      </h1>
      <p className="relative mt-2 max-w-xl text-sm text-teal-100/70 md:text-base">
        Search doctors by department or specialization, select available slots,
        and confirm bookings.
      </p>
    </header>
  );
}
