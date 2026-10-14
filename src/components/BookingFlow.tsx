import { useMemo, useState } from "react"
import { HOTEL, ROOMS } from "../lib/hotel"
import {
  MAX_NIGHTS,
  addDays,
  createRequest,
  fmtDate,
  isValidPhone,
  nightsBetween,
  normalizePhone,
  repo,
  roomsLeft,
  today,
  whatsappLink,
  type Booking,
} from "../lib/booking"

const STEPS = ["Dates", "Room", "Details", "Review"]
const field = "form-field"

type BookingFlowProps = {
  onClose: () => void
  initialRoom?: string
  initialDates?: { checkIn: string; checkOut: string; guests: number; rooms: number }
}

export default function BookingFlow({
  onClose,
  initialRoom,
  initialDates,
}: BookingFlowProps) {
  const [step, setStep] = useState(initialDates?.checkIn ? 1 : 0)
  const [checkIn, setCheckIn] = useState(initialDates?.checkIn ?? today())
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut ?? addDays(today(), 1))
  const [rooms, setRooms] = useState(initialDates?.rooms ?? 1)
  const [guests, setGuests] = useState(initialDates?.guests ?? 2)
  const [roomId, setRoomId] = useState(initialRoom ?? "")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState<Booking | null>(null)

  const nights = nightsBetween(checkIn, checkOut)
  const datesOk = checkIn >= today() && nights >= 1 && nights <= MAX_NIGHTS
  const bookings = useMemo(() => repo.list(), [step, done])
  const room = ROOMS.find((r) => r.id === roomId)
  const left = room ? roomsLeft(room, checkIn, checkOut, bookings) : 0
  const detailsOk = name.trim().length >= 2 && isValidPhone(phone)
  const canNext = [datesOk, !!room && left >= rooms, detailsOk, true][step]

  function setIn(v: string) {
    setCheckIn(v)
    if (v && checkOut <= v) setCheckOut(addDays(v, 1))
  }

  function setRoomCount(n: number) {
    setRooms(n)
    setGuests((g) => Math.min(g, n * 2))
  }

  function submit() {
    const b = createRequest({
      roomId,
      rooms,
      guests,
      checkIn,
      checkOut,
      name: name.trim(),
      phone: normalizePhone(phone),
      email: email.trim(),
      notes: notes.trim(),
      currency: "TZS",
    })
    if (!b) {
      setError("Those rooms were just taken for these dates. Please choose another room or dates.")
      setStep(1)
      return
    }
    setDone(b)
  }

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-end bg-ink/65 backdrop-blur-sm sm:place-items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-h-[94svh] w-full max-w-2xl overflow-y-auto bg-cream p-7 shadow-2xl sm:m-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">
              <span /> {done ? "Request saved" : `Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
            </p>
            <h2 id="booking-title" className="font-display text-4xl sm:text-5xl">
              {done
                ? "Almost done"
                : ["When are you staying?", "Choose your room", "Who is staying?", "Review your request"][step]}
            </h2>
          </div>
          <button
            className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-cream"
            onClick={onClose}
            aria-label="Close booking form"
          >
            ✕
          </button>
        </div>

        {!done && (
          <div className="mt-6 flex gap-2" aria-hidden="true">
            {STEPS.map((_, i) => (
              <span key={i} className={`h-1 flex-1 transition-colors ${i <= step ? "bg-ink" : "bg-ink/15"}`} />
            ))}
          </div>
        )}
        {error && !done && (
          <p role="alert" className="mt-5 border border-clay/40 bg-clay/10 p-3 text-sm text-clay">
            {error}
          </p>
        )}

        {done ? (
          <div className="mt-8">
            <p className="text-sm leading-6 text-ink/70">
              Your reference is <strong className="text-ink">{done.id}</strong>. The hotel confirms every request personally,
              so <strong className="text-ink">send it on WhatsApp</strong> (or call) to reach the front desk. Rooms are
              held for 12 hours pending confirmation.
            </p>
            <dl className="mt-6 space-y-2 border-t border-ink/15 pt-5 text-sm">
              <Row k="Stay" v={`${fmtDate(done.checkIn)} → ${fmtDate(done.checkOut)} (${nights} nights)`} />
              <Row k="Room" v={`${done.rooms} × ${ROOMS.find((r) => r.id === done.roomId)?.name}`} />
              <Row
                k="Estimate"
                v={`£${((ROOMS.find((r) => r.id === done.roomId)?.rateGbp ?? 85) * done.rooms * nights).toLocaleString()} (~US$${
                  ROOMS.find((r) => r.id === done.roomId)!.rate * done.rooms * nights
                }) · Indicative`}
              />
              <Row k="Payment" v="Pay upon check-in at reception (Credit/Debit Card, Apple Pay, Cash)" />
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn-dark flex-1" href={whatsappLink(done)} target="_blank" rel="noreferrer">
                Send on WhatsApp
              </a>
              <a
                className="btn-light flex-1 !border-ink/25 !text-ink hover:!bg-ink hover:!text-cream"
                href={`tel:${HOTEL.phoneTel}`}
              >
                Call {HOTEL.phone}
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {step === 0 && (
                <>
                  <label className={field}>
                    <span>Check in</span>
                    <input type="date" min={today()} value={checkIn} onChange={(e) => setIn(e.target.value)} />
                  </label>
                  <label className={field}>
                    <span>Check out</span>
                    <input
                      type="date"
                      min={addDays(checkIn, 1)}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </label>
                  <label className={field}>
                    <span>Rooms</span>
                    <select value={rooms} onChange={(e) => setRoomCount(+e.target.value)}>
                      {[1, 2, 3].map((n) => (
                        <option key={n} value={n}>
                          {n} room{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={field}>
                    <span>Guests</span>
                    <select value={guests} onChange={(e) => setGuests(+e.target.value)}>
                      {Array.from({ length: rooms * 2 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} guest{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="text-xs text-ink/55 sm:col-span-2">
                    {datesOk
                      ? `${nights} night${nights > 1 ? "s" : ""} · ${HOTEL.frontDesk.toLowerCase()}`
                      : `Choose future dates, up to ${MAX_NIGHTS} nights.`}
                  </p>
                </>
              )}

              {step === 1 && (
                <div className="grid gap-3 sm:col-span-2">
                  {ROOMS.map((r) => {
                    const n = roomsLeft(r, checkIn, checkOut, bookings)
                    const sold = n < rooms
                    const totalGbp = (r.rateGbp ?? r.rateTzs) * rooms * nights
                    const totalUsd = r.rate * rooms * nights
                    return (
                      <button
                        key={r.id}
                        type="button"
                        disabled={sold}
                        onClick={() => {
                          setRoomId(r.id)
                          setError("")
                        }}
                        className={`group relative flex flex-col border p-5 text-left transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                          sold
                            ? "border-ink/10 opacity-45"
                            : roomId === r.id
                            ? "border-ink bg-sand/80 shadow-xs"
                            : "border-ink/20 hover:border-ink/50"
                        }`}
                      >
                        <div className="flex-1">
                          <span className="flex items-baseline justify-between gap-4">
                            <span className="font-display text-2xl">{r.name}</span>
                            <span className="text-sm font-semibold sm:hidden">
                              £{(r.rateGbp ?? r.rateTzs).toLocaleString()}
                              <span className="font-normal text-ink/50"> (~US${r.rate})</span>
                            </span>
                          </span>
                          <span className="mt-1 block text-sm text-ink/60">
                            {r.bed} · {r.size} · {r.view}
                          </span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {r.features.slice(0, 3).map((f) => (
                              <span
                                key={f}
                                className="rounded bg-ink/5 px-2 py-0.5 text-[0.62rem] font-semibold text-ink/70"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                          <span className="mt-3 block text-xs text-ink/50">
                            {sold
                              ? "Not available for these dates"
                              : `${nights} night${nights > 1 ? "s" : ""} ≈ £${totalGbp.toLocaleString()} (~US$${totalUsd}) · indicative`}
                          </span>
                        </div>
                        <div className="hidden text-right sm:block">
                          <div className="text-base font-semibold">£{(r.rateGbp ?? r.rateTzs).toLocaleString()}</div>
                          <div className="text-xs text-ink/60">≈ US${r.rate} / night</div>
                        </div>
                      </button>
                    )
                  })}
                  <p className="text-xs text-ink/50">Rates are indicative; the hotel confirms the final price upon reservation.</p>
                </div>
              )}

              {step === 2 && (
                <>
                  <label className={`${field} sm:col-span-2`}>
                    <span>Full name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </label>
                  <label className={field}>
                    <span>Phone / WhatsApp</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s]/g, ""))}
                      onBlur={() => phone && setPhone(normalizePhone(phone))}
                      placeholder="07XXXXXXXX or +255…"
                      aria-invalid={!!phone && !isValidPhone(phone)}
                    />
                  </label>
                  <label className={field}>
                    <span>Email (optional)</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label className={`${field} sm:col-span-2`}>
                    <span>Notes (arrival time, special requests)</span>
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Arriving on Zanzibar ferry around 5 PM"
                    />
                  </label>
                  {phone && !isValidPhone(phone) && (
                    <p className="text-xs text-clay sm:col-span-2">Enter a valid number like 07XXXXXXXX or +255…</p>
                  )}
                </>
              )}

              {step === 3 && room && (
                <div className="sm:col-span-2">
                  <dl className="space-y-3 text-sm">
                    <Row
                      k="Stay"
                      v={`${fmtDate(checkIn)} → ${fmtDate(checkOut)} · ${nights} night${nights > 1 ? "s" : ""}`}
                    />
                    <Row k="Room" v={`${rooms} × ${room.name} · ${guests} guest${guests > 1 ? "s" : ""}`} />
                    <Row k="Guest" v={`${name} · ${normalizePhone(phone)}`} />
                    <Row
                      k="Estimate"
                      v={`£${(((room.rateGbp ?? room.rateTzs)) * rooms * nights).toLocaleString()} (~US$${room.rate * rooms * nights})`}
                    />
                    <Row k="Payment Policy" v="No online pre-payment required. Pay at desk." />
                  </dl>
                  <p className="mt-6 border-t border-ink/15 pt-5 text-xs leading-5 text-ink/55">
                    {HOTEL.timesNote} Free cancellation up to 24 hours prior to arrival.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  className="btn-light !border-ink/25 !text-ink hover:!bg-ink hover:!text-cream"
                  onClick={() => {
                    setError("")
                    setStep(step - 1)
                  }}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                disabled={!canNext}
                className="btn-dark flex-1 disabled:opacity-40"
                onClick={() => (step < 3 ? setStep(step + 1) : submit())}
              >
                {step < 3 ? "Continue" : "Send request"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="text-ink/55">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  )
}
