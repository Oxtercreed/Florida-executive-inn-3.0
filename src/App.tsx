import { useEffect, useRef, useState } from "react"
import BookingFlow from "./components/BookingFlow"
import GalleryModal from "./components/GalleryModal"
import {
  FAQS,
  GOOGLE_REVIEWS,
  HOTEL,
  PHOTOS,
  ROOMS,
} from "./lib/hotel"
import { addDays, today } from "./lib/booking"

const MAPS_URL = HOTEL.mapsUrl
const images = PHOTOS

type IconName =
  | "arrow"
  | "calendar"
  | "chevron"
  | "clock"
  | "heart"
  | "location"
  | "menu"
  | "moon"
  | "parking"
  | "people"
  | "restaurant"
  | "star"
  | "wifi"
  | "whatsapp"
  | "phone"
  | "camera"
  | "x"

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 2v3M17 2v3M3 9h18" />
        <rect x="3" y="4" width="18" height="17" rx="2" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    moon: <path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z" />,
    parking: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </>
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    restaurant: <path d="M6 2v8M3 2v5a3 3 0 0 0 6 0V2M6 10v12M17 2v20M17 2c-3 2-4 6-4 10h4" />,
    star: (
      <path
        fill="currentColor"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    ),
    wifi: (
      <>
        <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r=".5" fill="currentColor" />
      </>
    ),
    whatsapp: (
      <path
        fill="currentColor"
        d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"
      />
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    camera: (
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center gap-3 ${light ? "text-cream" : "text-ink"}`}
      aria-label="Florida Executive Inn home"
    >
      <span
        className={`grid size-11 place-items-center rounded-full border ${
          light ? "border-white/35" : "border-ink/20"
        }`}
      >
        <span className="font-display text-2xl italic">F</span>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.4rem] tracking-[0.04em]">Florida</span>
        <span className="mt-1 block text-[0.56rem] font-semibold uppercase tracking-[0.32em] opacity-70">
          Executive Inn
        </span>
      </span>
    </a>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [bookingRoom, setBookingRoom] = useState<string | undefined>()

  // Quick booking bar state in Hero
  const [quickCheckIn, setQuickCheckIn] = useState(today())
  const [quickCheckOut, setQuickCheckOut] = useState(addDays(today(), 1))
  const [quickGuests, setQuickGuests] = useState(2)
  const [quickRooms, setQuickRooms] = useState(1)

  // Mobile horizontal swipe track refs and tracking
  const roomsTrackRef = useRef<HTMLDivElement>(null)
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)

  const reviewsTrackRef = useRef<HTMLDivElement>(null)
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)

  const scrollRooms = (direction: "left" | "right") => {
    if (!roomsTrackRef.current) return
    const cardWidth = roomsTrackRef.current.clientWidth * 0.85
    roomsTrackRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    })
  }

  const scrollRoomsToIndex = (index: number) => {
    if (!roomsTrackRef.current) return
    const cardWidth = roomsTrackRef.current.clientWidth * 0.85
    roomsTrackRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    })
  }

  const handleRoomsScroll = () => {
    if (!roomsTrackRef.current) return
    const { scrollLeft, clientWidth } = roomsTrackRef.current
    const index = Math.round(scrollLeft / (clientWidth * 0.85))
    setActiveRoomIndex(Math.min(Math.max(index, 0), ROOMS.length - 1))
  }

  const scrollReviews = (direction: "left" | "right") => {
    if (!reviewsTrackRef.current) return
    const cardWidth = reviewsTrackRef.current.clientWidth * 0.85
    reviewsTrackRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    })
  }

  const scrollReviewsToIndex = (index: number) => {
    if (!reviewsTrackRef.current) return
    const cardWidth = reviewsTrackRef.current.clientWidth * 0.85
    reviewsTrackRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    })
  }

  const handleReviewsScroll = () => {
    if (!reviewsTrackRef.current) return
    const { scrollLeft, clientWidth } = reviewsTrackRef.current
    const index = Math.round(scrollLeft / (clientWidth * 0.85))
    setActiveReviewIndex(Math.min(Math.max(index, 0), GOOGLE_REVIEWS.length - 1))
  }

  // Track window scroll to make navbar follow smoothly
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const openBooking = (roomId?: string) => {
    setBookingRoom(roomId)
    setBookingOpen(true)
  }

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingOpen(true)
  }

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-cream text-ink">
      {/* Sticky / Following Top Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ink/90 py-3 text-cream shadow-xl backdrop-blur-md border-b border-white/10"
            : "bg-transparent py-5 text-white border-b border-white/20"
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 lg:px-10">
          <Logo light />

          <nav
            className="hidden items-center gap-8 text-[0.72rem] font-semibold uppercase tracking-[0.18em] lg:flex"
            aria-label="Main navigation"
          >
            <a className="nav-link" href="#stay">
              The stay
            </a>
            <a className="nav-link" href="#rooms">
              Rooms
            </a>
            <a className="nav-link" href="#reviews">
              Reviews
            </a>
            <a className="nav-link" href="#experience">
              Experience
            </a>
            <a className="nav-link" href="#location">
              Location
            </a>
            <a className="nav-link" href="#faq">
              FAQ
            </a>

            <button className="btn-light" onClick={() => openBooking()}>
              Book your stay
            </button>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="grid size-11 place-items-center rounded-full border border-white/30 text-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-ink p-6 text-cream lg:hidden">
          <div className="flex items-center justify-between">
            <Logo light />
            <button
              className="grid size-11 place-items-center rounded-full border border-white/20"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <Icon name="x" />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6 font-display text-4xl" aria-label="Mobile navigation">
            <a href="#stay" onClick={closeMenu}>
              The stay
            </a>
            <a href="#rooms" onClick={closeMenu}>
              Rooms
            </a>
            <a href="#reviews" onClick={closeMenu}>
              Reviews
            </a>
            <a href="#experience" onClick={closeMenu}>
              Experience
            </a>
            <a href="#location" onClick={closeMenu}>
              Location
            </a>
            <a href="#faq" onClick={closeMenu}>
              FAQ
            </a>
          </nav>
          <div className="mt-10">
            <button
              className="btn-accent w-full"
              onClick={() => {
                closeMenu()
                openBooking()
              }}
            >
              Book your stay <Icon name="arrow" />
            </button>
          </div>
        </div>
      )}

      <main>
        {/* HERO SECTION - Pure typography headline, NO banner on top */}
        <section className="relative min-h-[52rem] bg-ink pb-12 pt-32 lg:min-h-[58rem] lg:pt-36">
          <picture className="absolute inset-0 size-full">
            <source media="(max-width: 768px)" srcSet={images.heroMobile} type="image/webp" />
            <source srcSet={images.hero} type="image/webp" />
            <img
              src={images.hero}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          </picture>
          <div className="hero-shade absolute inset-0" />

          <div className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-end px-6 lg:px-10">
            <div className="max-w-4xl text-white">
              <div className="eyebrow mb-6 text-white/80">
                <span /> Your place in Dar es Salaam
              </div>
              <h1 className="max-w-4xl font-display text-[clamp(3.8rem,8.4vw,8.2rem)] font-medium leading-[0.82] tracking-[-0.045em]">
                Stay close.
                <br />
                <em className="font-normal">Feel at ease.</em>
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-white/80">
                A well-placed city stay between Gerezani and Kariakoo: 24-hour front desk, free Wi-Fi and secure
                parking, and the commercial market a short walk away.
              </p>
            </div>

            {/* Interactive Hero Search Ribbon (Compare Prices / Check Availability Widget) */}
            <div className="mt-10 rounded-sm border border-white/20 bg-ink/75 p-5 shadow-2xl backdrop-blur-md lg:p-6">
              <form onSubmit={handleQuickSearch} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
                <label className="form-field !text-white">
                  <span className="!text-white/75">Check in</span>
                  <input
                    type="date"
                    min={today()}
                    value={quickCheckIn}
                    onChange={(e) => {
                      setQuickCheckIn(e.target.value)
                      if (e.target.value && quickCheckOut <= e.target.value) {
                        setQuickCheckOut(addDays(e.target.value, 1))
                      }
                    }}
                    className="!min-h-[3.25rem] !border-white/30 !bg-white/10 !text-white"
                  />
                </label>

                <label className="form-field !text-white">
                  <span className="!text-white/75">Check out</span>
                  <input
                    type="date"
                    min={addDays(quickCheckIn, 1)}
                    value={quickCheckOut}
                    onChange={(e) => setQuickCheckOut(e.target.value)}
                    className="!min-h-[3.25rem] !border-white/30 !bg-white/10 !text-white"
                  />
                </label>

                <label className="form-field !text-white">
                  <span className="!text-white/75">Rooms</span>
                  <select
                    value={quickRooms}
                    onChange={(e) => setQuickRooms(+e.target.value)}
                    className="!min-h-[3.25rem] !border-white/30 !bg-ink/80 !text-white"
                  >
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} Room{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field !text-white">
                  <span className="!text-white/75">Guests</span>
                  <select
                    value={quickGuests}
                    onChange={(e) => setQuickGuests(+e.target.value)}
                    className="!min-h-[3.25rem] !border-white/30 !bg-ink/80 !text-white"
                  >
                    {[1, 2, 3, 4, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Guest{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <button type="submit" className="btn-accent w-full font-bold">
                    Check availability <Icon name="arrow" />
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-3 text-xs text-white/65">
                <div className="flex items-center gap-2">
                  <Icon name="location" className="size-4 text-sunset" />
                  <span>Congo Street (Omari Londo St), Gerezani · Kariakoo</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Free cancellation up to 24h</span>
                  <span>·</span>
                  <span>Pay upon arrival at front desk</span>
                </div>
              </div>
            </div>

            {/* Gallery triggering button placed right below the booking card */}
            <div className="mt-5 flex items-center">
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-ink/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md backdrop-blur-md transition hover:bg-white/20 hover:border-white/50"
              >
                <Icon name="camera" className="size-4 text-sunset transition-transform group-hover:scale-110" />
                <span>View Photo Gallery</span>
              </button>
            </div>
          </div>
        </section>

        {/* THE STAY SECTION */}
        <section id="stay" className="px-6 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="eyebrow mb-7">
                  <span /> Made for your rhythm
                </div>
                <h2 className="font-display text-[clamp(3.4rem,6vw,6rem)] leading-[0.88] tracking-[-0.035em]">
                  Your calm in
                  <br />
                  <em>the city.</em>
                </h2>
              </div>
              <div className="lg:pt-16">
                <p className="max-w-xl font-display text-3xl leading-[1.25] text-ink/80">
                  Whether Dar is your destination or one stop before Zanzibar, settle into a stay that keeps things
                  simple, personal, and close at hand.
                </p>
                <div className="mt-12 grid gap-5 border-t border-ink/15 pt-8 sm:grid-cols-3">
                  {[
                    ["clock", "Easy arrivals", "24-hour front desk with late night check-ins"],
                    ["moon", "Restful nights", "Air-conditioned rooms & standby generator"],
                    ["heart", "Warm welcome", "Helpful local staff & direct WhatsApp service"],
                  ].map(([icon, title, text]) => (
                    <div key={title}>
                      <Icon name={icon as IconName} className="mb-5 size-6 text-clay" />
                      <h3 className="text-sm font-bold">{title}</h3>
                      <p className="mt-2 text-sm text-ink/55">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <article className="image-card group min-h-[35rem] bg-palm/30">
                <img src={images.room} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="image-card-shade" />
                <div className="image-card-copy">
                  <span className="eyebrow text-white/70">
                    <span /> Rest well
                  </span>
                  <h3 className="font-display text-5xl text-white">Rooms to unwind in</h3>
                </div>
              </article>
              <article className="relative flex min-h-[35rem] flex-col justify-between overflow-hidden bg-palm p-8 text-cream sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-display text-8xl leading-none text-cream/10">FEI</span>
                  <Icon name="moon" className="size-8 text-sunset" />
                </div>
                <div>
                  <p className="eyebrow mb-5 text-cream/60">
                    <span className="!bg-sunset" /> What guests mention
                  </p>
                  <p className="font-display text-[2.4rem] leading-[1.06]">
                    Friendly staff, working air-con and Wi-Fi, and Kariakoo a short walk away.
                  </p>
                  <button
                    className="mt-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.17em]"
                    onClick={() => openBooking()}
                  >
                    Plan your stay <Icon name="arrow" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ROOMS SECTION - Clean editorial cards displaying both currencies side-by-side */}
        <section id="rooms" className="px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="eyebrow mb-6">
                  <span /> Rooms & Rates
                </div>
                <h2 className="font-display text-[clamp(3.2rem,6vw,5.6rem)] leading-[0.9] tracking-[-0.035em]">
                  Three ways
                  <br />
                  <em>to rest.</em>
                </h2>
              </div>
              <div className="flex flex-col md:items-end">
                <p className="max-w-sm text-base leading-7 text-ink/60">
                  {HOTEL.roomsTotal} air-conditioned rooms, each with a private bathroom, flat-screen TV, fridge, and free Wi-Fi.
                </p>

                {/* Mobile carousel indicator & next/prev arrows */}
                <div className="mt-4 flex items-center gap-3 md:hidden">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                    Room {activeRoomIndex + 1} of {ROOMS.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {ROOMS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollRoomsToIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeRoomIndex === i ? "w-6 bg-clay" : "w-1.5 bg-ink/20"
                        }`}
                        aria-label={`Go to room ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <button
                      onClick={() => scrollRooms("left")}
                      className="grid size-9 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-30"
                      disabled={activeRoomIndex === 0}
                      aria-label="Previous room"
                    >
                      <Icon name="chevron" className="size-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => scrollRooms("right")}
                      className="grid size-9 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-30"
                      disabled={activeRoomIndex === ROOMS.length - 1}
                      aria-label="Next room"
                    >
                      <Icon name="chevron" className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms Cards Track: Horizontally moving on mobile, 3-column grid on desktop */}
            <div
              ref={roomsTrackRef}
              onScroll={handleRoomsScroll}
              className="-mx-6 mt-8 flex gap-5 overflow-x-auto px-6 pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
            >
              {ROOMS.map((r) => (
                <article
                  key={r.id}
                  className="flex w-[84vw] max-w-[21.5rem] shrink-0 snap-center flex-col justify-between border border-ink/15 bg-sand/40 p-7 transition-all hover:bg-sand/65 sm:p-8 md:w-auto md:max-w-none md:shrink"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-ink/40">{r.size}</span>
                      <Icon name="moon" className="size-6 text-clay" />
                    </div>

                    <h3 className="mt-12 font-display text-4xl">{r.name}</h3>
                    <p className="mt-2 text-sm text-ink/60">
                      {r.bed} · {r.view} · sleeps {r.sleeps}
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-xs text-ink/75">
                      {r.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-clay" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual Currency Details Displayed Directly on the Card */}
                  <div className="mt-10 border-t border-ink/15 pt-5">
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink/40">Rate per night</p>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-semibold">TSh {r.rateTzs.toLocaleString()}</span>
                      <span className="text-sm font-medium text-ink/60">/ night</span>
                    </div>
                    <p className="mt-1.5 text-xs text-ink/60">
                      Equivalent to <strong className="text-ink">US${r.rate}</strong> <span className="text-ink/40">· indicative</span>
                    </p>

                    <button className="btn-dark mt-7 w-full" onClick={() => openBooking(r.id)}>
                      Request this room <Icon name="arrow" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile swipe indicator cue */}
            <div className="mt-3 flex items-center justify-between text-xs text-ink/45 md:hidden">
              <span>Swipe horizontally to view room options</span>
              <span>3 room categories</span>
            </div>
          </div>
        </section>

        {/* VERIFIED GUEST REVIEWS SECTION - Google Review Cards Grid */}
        <section id="reviews" className="bg-sand/60 px-6 py-24 lg:px-10 lg:py-32 border-y border-ink/10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <div className="eyebrow mb-6">
                  <span /> Verified Guest Reviews
                </div>
                <h2 className="font-display text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9] tracking-[-0.035em]">
                  Rated 4.1 on Google.
                  <br />
                  <em>900+ Stays.</em>
                </h2>
                <p className="mt-6 text-base leading-7 text-ink/70">
                  Direct feedback from business traders, regional visitors, and travelers in transit through Dar es
                  Salaam.
                </p>

                {/* Score Summary Box */}
                <div className="mt-8 rounded-sm border border-ink/15 bg-cream p-6 shadow-xs">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-6xl font-medium text-ink">4.1</span>
                    <div>
                      <div className="flex text-sunset">
                        {[1, 2, 3, 4].map((i) => (
                          <Icon key={i} name="star" className="size-5" />
                        ))}
                        <Icon name="star" className="size-5 opacity-40" />
                      </div>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/60">
                        908 Google Reviews · 2-Star Hotel
                      </p>
                    </div>
                  </div>

                  {/* Sub-ratings */}
                  <div className="mt-6 space-y-3 border-t border-ink/10 pt-4 text-xs font-semibold">
                    {[
                      ["Location & Market Access", "4.8 / 5"],
                      ["Staff Hospitality & 24/7 Desk", "4.6 / 5"],
                      ["Value for Money", "4.4 / 5"],
                      ["Air Conditioning & Wi-Fi", "4.2 / 5"],
                    ].map(([label, score]) => (
                      <div key={label} className="flex justify-between text-ink/75">
                        <span>{label}</span>
                        <span className="font-bold text-ink">{score}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-clay hover:text-ink"
                  >
                    View profile on Google Maps <Icon name="arrow" className="size-4" />
                  </a>
                </div>
              </div>

              {/* Review Cards Column: Horizontally moving on mobile, 2-column grid on tablet/desktop */}
              <div>
                {/* Mobile carousel indicator & next/prev arrows for reviews */}
                <div className="mb-4 flex items-center justify-between sm:hidden">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                    Review {activeReviewIndex + 1} of {GOOGLE_REVIEWS.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {GOOGLE_REVIEWS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollReviewsToIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeReviewIndex === i ? "w-5 bg-clay" : "w-1.5 bg-ink/20"
                        }`}
                        aria-label={`Go to review ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => scrollReviews("left")}
                      className="grid size-8 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-30"
                      disabled={activeReviewIndex === 0}
                      aria-label="Previous review"
                    >
                      <Icon name="chevron" className="size-3.5 rotate-180" />
                    </button>
                    <button
                      onClick={() => scrollReviews("right")}
                      className="grid size-8 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream disabled:opacity-30"
                      disabled={activeReviewIndex === GOOGLE_REVIEWS.length - 1}
                      aria-label="Next review"
                    >
                      <Icon name="chevron" className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Review Cards Track */}
                <div
                  ref={reviewsTrackRef}
                  onScroll={handleReviewsScroll}
                  className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"
                >
                  {GOOGLE_REVIEWS.map((rev) => (
                    <article
                      key={rev.author}
                      className="flex w-[84vw] max-w-[21.5rem] shrink-0 snap-center flex-col justify-between border border-ink/15 bg-cream p-7 shadow-xs sm:w-auto sm:max-w-none sm:shrink"
                    >
                      <div>
                        <div className="flex items-center justify-between text-sunset">
                          <div className="flex">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Icon key={i} name="star" className="size-4" />
                            ))}
                          </div>
                          <span className="text-[0.68rem] font-medium text-ink/40">{rev.date}</span>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-ink/80 italic">"{rev.text}"</p>
                      </div>
                      <div className="mt-6 border-t border-ink/10 pt-4">
                        <p className="text-sm font-bold text-ink">{rev.author}</p>
                        <p className="text-xs text-ink/50">{rev.origin}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Mobile swipe helper text below reviews */}
                <div className="mt-3 flex items-center justify-between text-xs text-ink/45 sm:hidden">
                  <span>Swipe to read guest reviews</span>
                  <span>{GOOGLE_REVIEWS.length} stories</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE / AMENITIES SECTION */}
        <section id="experience" className="bg-sand px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="eyebrow mb-6">
                  <span /> At your pace
                </div>
                <h2 className="font-display text-[clamp(3.5rem,6vw,6rem)] leading-[0.9] tracking-[-0.035em]">
                  More than
                  <br />
                  <em>a room.</em>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-ink/60">
                Step into the energy of Dar, then return to a place that feels easy. Your stay starts at the heart of the city.
              </p>
            </div>
            <div className="mt-16 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["wifi", "Free Wi-Fi", "In rooms and public areas."],
                ["parking", "Free parking", "On-site, for guests who drive."],
                ["clock", "Front desk 24/7", "Late arrival? Someone is always there."],
                ["people", "Kariakoo on foot", "The market is an 8 to 15 minute walk."],
              ].map(([icon, title, text], index) => (
                <article
                  key={title}
                  className="group bg-sand p-7 transition-colors hover:bg-cream lg:min-h-64 lg:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-ink/35">0{index + 1}</span>
                    <Icon name={icon as IconName} className="size-7 text-clay" />
                  </div>
                  <div className="mt-20">
                    <h3 className="font-display text-3xl">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/55">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION SECTION - Kept strictly with the original info and Google Maps link */}
        <section className="grid min-h-[44rem] lg:grid-cols-2">
          <div className="relative min-h-[30rem] overflow-hidden bg-palm/30">
            <img src={images.coast} alt="" aria-hidden="true" loading="lazy" decoding="async" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
            <span className="absolute bottom-8 left-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Dar es Salaam • Tanzania
            </span>
          </div>

          <div id="location" className="flex flex-col justify-center bg-clay px-8 py-20 text-cream sm:px-14 lg:px-[10%]">
            <div className="eyebrow mb-7 text-cream/70">
              <span className="!bg-sunset" /> In the middle of it all
            </div>
            <h2 className="font-display text-[clamp(3.5rem,6vw,6.4rem)] leading-[0.86] tracking-[-0.04em]">
              Dar is at
              <br />
              <em>your door.</em>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-cream/70">
              Find us on Congo Street in Gerezani, Ilala. Kariakoo Market is an 8 to 15 minute walk, Dar es Salaam Central Station about 13, and Julius Nyerere International Airport roughly 20 minutes by car.
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex w-fit items-center gap-4 border-b border-cream/40 pb-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:border-sunset hover:text-sunset"
            >
              Open in Google Maps <Icon name="arrow" />
            </a>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section id="faq" className="bg-cream px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <div className="eyebrow mb-6 justify-center">
                <span /> Helpful Information <span />
              </div>
              <h2 className="font-display text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9] tracking-[-0.035em]">
                Frequently asked
                <br />
                <em>questions.</em>
              </h2>
            </div>

            <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between font-display text-2xl text-ink transition group-hover:text-clay">
                    <span>{faq.q}</span>
                    <span className="ml-4 text-xl font-light text-ink/40 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="bg-sand/70 px-6 py-24 lg:px-10 lg:py-32 border-t border-ink/10">
          <div className="mx-auto max-w-7xl text-center">
            <div className="eyebrow mb-7 justify-center">
              <span /> Come stay awhile <span />
            </div>
            <h2 className="mx-auto max-w-4xl font-display text-[clamp(3.7rem,7vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              Your Dar story
              <br />
              <em>starts here.</em>
            </h2>
            <p className="mt-6 text-base text-ink/60">
              Rooms starting from TSh 85,000 (~US$34) per night · 24-Hour Reception
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="btn-dark" onClick={() => openBooking()}>
                Check availability <Icon name="arrow" />
              </button>
              <a
                className="btn-light !border-ink/25 !text-ink hover:!bg-ink hover:!text-cream"
                href={`https://wa.me/${HOTEL.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-ink px-6 pb-12 pt-16 text-cream lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/12 pb-14 md:grid-cols-3">
            <div>
              <Logo light />
              <p className="mt-6 max-w-xs text-sm leading-6 text-cream/50">
                A welcoming city stay in the heart of Dar es Salaam.
              </p>
            </div>
            <div>
              <p className="footer-label">Explore</p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-cream/70">
                <a href="#stay">The stay</a>
                <a href="#rooms">Rooms</a>
                <a href="#reviews">Reviews</a>
                <a href="#experience">Experience</a>
                <a href="#location">Location</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
            <div>
              <p className="footer-label">Find us</p>
              <p className="mt-5 text-sm leading-6 text-cream/70">
                {HOTEL.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <a className="mt-3 block underline-offset-4 hover:underline" href={`tel:${HOTEL.phoneTel}`}>
                  {HOTEL.phone}
                </a>
                <span className="block text-cream/45">{HOTEL.frontDesk}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-[0.65rem] uppercase tracking-[0.15em] text-cream/35 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Florida Executive Inn</p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-cream/80">
              View Google listing
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp Direct Inquiry Button */}
      <a
        href={`https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(
          "Hello Florida Executive Inn, I have a question regarding room availability."
        )}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-palm px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cream shadow-2xl transition hover:bg-ink hover:scale-105 border border-white/20"
        aria-label="Direct WhatsApp message to front desk"
      >
        <span className="size-2 rounded-full bg-sunset animate-pulse" />
        <Icon name="whatsapp" className="size-4 text-sunset" />
        <span className="hidden sm:inline">WhatsApp Desk</span>
      </a>

      {/* Booking Flow Modal */}
      {bookingOpen && (
        <BookingFlow
          initialRoom={bookingRoom}
          initialDates={{
            checkIn: quickCheckIn,
            checkOut: quickCheckOut,
            guests: quickGuests,
            rooms: quickRooms,
          }}
          onClose={() => setBookingOpen(false)}
        />
      )}

      {/* Gallery Modal */}
      {galleryOpen && <GalleryModal onClose={() => setGalleryOpen(false)} />}
    </div>
  )
}

export default App
