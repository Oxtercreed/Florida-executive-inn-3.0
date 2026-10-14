// Booking engine adapted for The Kensington Grand Hotel.
// Storage sits behind `repo` for localStorage persistence.
import { HOTEL, ROOMS, type Room } from "./hotel"

export type Status = "requested" | "confirmed" | "declined" | "cancelled" | "expired" | "checked_in" | "checked_out"
export type Currency = "GBP" | "USD" | "TZS"

export type Booking = {
  id: string
  roomId: string
  rooms: number
  guests: number
  checkIn: string
  checkOut: string
  name: string
  phone: string
  email: string
  notes: string
  estimate: number
  currency?: Currency
  status: Status
  createdAt: string
}

const NEXT: Record<Status, Status[]> = {
  requested: ["confirmed", "declined", "cancelled", "expired"],
  confirmed: ["checked_in", "cancelled"],
  checked_in: ["checked_out"],
  declined: [],
  cancelled: [],
  expired: [],
  checked_out: [],
}
export const canTransition = (from: Status, to: Status) => NEXT[from].includes(to)

const HOLD_HOURS = 12
export const MAX_NIGHTS = 30

const pad = (n: number) => String(n).padStart(2, "0")
export const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const today = () => toKey(new Date())
export const addDays = (key: string, n: number) => {
  const d = new Date(`${key}T12:00:00`)
  d.setDate(d.getDate() + n)
  return toKey(d)
}
export const nightsBetween = (a: string, b: string) =>
  Math.max(1, Math.round((+new Date(`${b}T12:00:00`) - +new Date(`${a}T12:00:00`)) / 864e5))
export const fmtDate = (key: string) =>
  new Date(`${key}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })

export const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`
export const usd = (n: number) => `US$${n.toLocaleString("en-US")}`
export const tzs = (n: number) => `£${n.toLocaleString("en-GB")}`

export function fmtMoney(amount: number, cur: Currency = "GBP") {
  return cur === "USD" ? usd(amount) : gbp(amount)
}

export function fmtRoomPrice(room: Room, cur: Currency = "GBP") {
  return cur === "USD" ? usd(room.rate) : gbp(room.rateGbp ?? room.rateTzs)
}

export function calcEstimate(room: Room, rooms: number, nights: number, cur: Currency = "GBP") {
  const rate = cur === "USD" ? room.rate : (room.rateGbp ?? room.rateTzs)
  return rate * rooms * nights
}

// UK mobiles (07XXXXXXXXX / +447XXXXXXXXX) or any international number.
export function normalizePhone(input: string) {
  const raw = input.replace(/[^\d+]/g, "")
  const digits = raw.replace(/\D/g, "")
  if (digits.startsWith("44") && digits.length === 12) return `0${digits.slice(2)}`
  return raw.startsWith("+") ? `+${digits}` : digits
}
export const isValidPhone = (input: string) => {
  const p = normalizePhone(input)
  return /^07\d{9}$/.test(p) || /^\+\d{8,15}$/.test(p)
}

const live = (b: Booking, now = Date.now()) =>
  b.status === "confirmed" ||
  b.status === "checked_in" ||
  (b.status === "requested" && now - +new Date(b.createdAt) < HOLD_HOURS * 36e5)

export function roomsLeft(room: Room, checkIn: string, checkOut: string, bookings: Booking[]) {
  const used = bookings
    .filter((b) => b.roomId === room.id && live(b) && b.checkIn < checkOut && b.checkOut > checkIn)
    .reduce((n, b) => n + b.rooms, 0)
  return Math.max(0, room.count - used)
}

export const estimate = (room: Room, rooms: number, nights: number) => room.rate * rooms * nights

const KEY = "fei.bookings.v1"
export const repo = {
  list(): Booking[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]")
    } catch {
      return []
    }
  },
  save(all: Booking[]) {
    try {
      localStorage.setItem(KEY, JSON.stringify(all))
    } catch {
      /* storage blocked */
    }
  },
}

export function createRequest(
  input: Omit<Booking, "id" | "status" | "createdAt" | "estimate"> & { currency?: Currency }
): Booking | null {
  const room = ROOMS.find((r) => r.id === input.roomId)
  const all = repo.list()
  const nights = nightsBetween(input.checkIn, input.checkOut)
  if (!room || nights < 1 || nights > MAX_NIGHTS || roomsLeft(room, input.checkIn, input.checkOut, all) < input.rooms) {
    return null
  }
  const id = `FEI-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  const cur = input.currency ?? "TZS"
  const total = calcEstimate(room, input.rooms, nights, cur)
  const booking: Booking = {
    ...input,
    id,
    currency: cur,
    status: "requested",
    createdAt: new Date().toISOString(),
    estimate: total,
  }
  repo.save([booking, ...all])
  return booking
}

export function whatsappLink(b: Booking) {
  const room = ROOMS.find((r) => r.id === b.roomId)
  const nights = nightsBetween(b.checkIn, b.checkOut)
  const cur = b.currency ?? "TZS"
  const costStr = fmtMoney(b.estimate, cur)
  const equivUsd = cur === "TZS" && room ? ` (~US$${room.rate * b.rooms * nights})` : ""

  const text = [
    `Hello ${HOTEL.name}, I would like to request a room reservation (ref ${b.id}).`,
    `Room: ${b.rooms} × ${room?.name} (${b.guests} guest${b.guests > 1 ? "s" : ""})`,
    `Dates: ${fmtDate(b.checkIn)} → ${fmtDate(b.checkOut)} (${nights} night${nights > 1 ? "s" : ""})`,
    `Estimated Total: ${costStr}${equivUsd}`,
    `Name: ${b.name} · Phone: ${b.phone}`,
    b.notes && `Notes: ${b.notes}`,
  ]
    .filter(Boolean)
    .join("\n")

  return `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(text)}`
}
