import { useState } from "react"
import { GALLERY_PHOTOS, type PhotoItem } from "../lib/hotel"

type GalleryModalProps = {
  onClose: () => void
}

export default function GalleryModal({ onClose }: GalleryModalProps) {
  const [filter, setFilter] = useState<string>("all")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => filter === "all" || p.category === filter)
  const currentPhoto: PhotoItem = filteredPhotos[selectedIndex] || filteredPhotos[0]

  const next = () => setSelectedIndex((i) => (i + 1) % filteredPhotos.length)
  const prev = () => setSelectedIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length)

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/75 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Hotel photo gallery"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden bg-cream shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div>
            <div className="eyebrow mb-1">
              <span /> Visual Tour
            </div>
            <h2 className="font-display text-2xl sm:text-3xl">The Kensington Grand Hotel Photos</h2>
          </div>
          <button
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream"
            aria-label="Close photo gallery"
          >
            ✕
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 bg-sand/30 px-6 py-3">
          {[
            { id: "all", label: "All Photos" },
            { id: "rooms", label: "Rooms & Beds" },
            { id: "facilities", label: "Reception & Security" },
            { id: "dining", label: "Dining & Breakfast" },
            { id: "location", label: "Kensington & London" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id)
                setSelectedIndex(0)
              }}
              className={`px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                filter === cat.id
                  ? "bg-ink text-cream"
                  : "border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-xs font-semibold text-ink/40">
            {selectedIndex + 1} of {filteredPhotos.length}
          </span>
        </div>

        {/* Main Photo Display */}
        <div className="relative flex min-h-[18rem] flex-1 items-center justify-center overflow-hidden bg-ink/90 sm:min-h-[26rem]">
          {currentPhoto && (
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              loading="eager"
              decoding="async"
              className="max-h-[60vh] w-full object-contain"
            />
          )}

          {/* Navigation Controls */}
          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-white backdrop-blur-xs transition hover:bg-ink"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-white backdrop-blur-xs transition hover:bg-ink"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          {/* Caption overlay */}
          {currentPhoto && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-5 text-white">
              <p className="font-display text-xl sm:text-2xl">{currentPhoto.title}</p>
              <p className="mt-1 text-xs text-white/80">{currentPhoto.caption}</p>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-2 overflow-x-auto bg-sand/40 p-3">
          {filteredPhotos.map((photo, idx) => (
            <button
              key={photo.url + idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative size-16 shrink-0 overflow-hidden border transition-all ${
                idx === selectedIndex ? "border-2 border-clay ring-1 ring-clay" : "border-ink/20 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={photo.url} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
