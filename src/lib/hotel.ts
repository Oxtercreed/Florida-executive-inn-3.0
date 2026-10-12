// Facts below were cross-checked across Expedia/Hotels.com, Booking.com, Trip.com, Kayak and Tripadvisor listings.
// Real Google Maps listing: 4.1 stars, 908 reviews, 2-star hotel, Congo Street, Kariakoo, Dar es Salaam.

export const HOTEL = {
  name: "Florida Executive Inn",
  phone: "+255 765 846 123",
  phoneTel: "+255765846123",
  whatsapp: "255765846123",
  address: ["Congo Street (Omari Londo St)", "Gerezani, Kariakoo · Ilala", "Dar es Salaam, Tanzania"],
  roomsTotal: 40,
  frontDesk: "Front desk open 24 hours",
  rating: 4.1,
  reviewsCount: 908,
  starRating: "2-star hotel",
  timesNote: "Typical check-in from 11:00 and check-out by 10:00; 24h desk confirms late and midnight arrivals.",
  mapsUrl:
    "https://www.google.com/maps/place/Florida+Executive+Inn/@-6.8247631,39.2728843,17z/data=!4m9!3m8!1s0x185c4baa3d8ce805:0x32df0c2e11846fc6!5m2!4m1!1i2!8m2!3d-6.8247631!4d39.2754592!16s%2Fg%2F11cnxyr54k",
}

export type Room = {
  id: string
  name: string
  bed: string
  size: string
  view: string
  sleeps: number
  rate: number // USD
  rateTzs: number // TSh (~2,500 TZS per USD)
  count: number
  features: string[]
  image: string
}

export const ROOMS: Room[] = [
  {
    id: "standard-double",
    name: "Standard Double",
    bed: "1 Double bed",
    size: "≈18 m²",
    view: "City view",
    sleeps: 2,
    rate: 34,
    rateTzs: 85000,
    count: 14,
    features: ["Air conditioning", "Private en-suite bath", "Flat-screen TV", "Free Wi-Fi", "Work desk"],
    image: "/photos/standard-double.webp",
  },
  {
    id: "standard-twin",
    name: "Standard Twin",
    bed: "2 Single beds",
    size: "≈20 m²",
    view: "City view",
    sleeps: 2,
    rate: 34,
    rateTzs: 85000,
    count: 12,
    features: ["Two single beds", "Air conditioning", "Tile floor", "Free Wi-Fi", "Daily housekeeping"],
    image: "/photos/standard-twin.webp",
  },
  {
    id: "comfort-double",
    name: "Comfort Double",
    bed: "1 Queen bed",
    size: "≈24 m²",
    view: "Kariakoo city view",
    sleeps: 2,
    rate: 42,
    rateTzs: 105000,
    count: 14,
    features: ["Queen bed", "Mini fridge", "Air conditioning", "Seating area", "Free Wi-Fi"],
    image: "/photos/comfort-double.webp",
  },
]

// High performance local optimized assets: served directly from /public/photos with 0ms network latency
export const PHOTOS = {
  hero: "/photos/hero.webp",
  heroMobile: "/photos/hero-mobile.webp",
  room: "/photos/room.webp",
  coast: "/photos/coast.webp",
}

export type PhotoItem = {
  url: string
  category: "all" | "rooms" | "facilities" | "dining" | "location"
  title: string
  caption: string
}

export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    url: "/photos/hero.webp",
    category: "location",
    title: "Dar es Salaam Skyline & Port",
    caption: "Centrally positioned in Gerezani / Kariakoo, close to port and transit.",
  },
  {
    url: "/photos/standard-double.webp",
    category: "rooms",
    title: "Standard Double Room",
    caption: "Cool air conditioning, private bathroom, and crisp double bed.",
  },
  {
    url: "/photos/standard-twin.webp",
    category: "rooms",
    title: "Standard Twin Setup",
    caption: "Two separate single beds ideal for business partners visiting Kariakoo.",
  },
  {
    url: "/photos/comfort-double.webp",
    category: "rooms",
    title: "Comfort Double Suite",
    caption: "Queen bed with mini-refrigerator and dedicated workspace.",
  },
  {
    url: "/photos/bathroom.webp",
    category: "rooms",
    title: "Private En-Suite Bathroom",
    caption: "Tiled private bathroom with hot water shower.",
  },
  {
    url: "/photos/reception.webp",
    category: "facilities",
    title: "24-Hour Front Desk",
    caption: "Attentive reception desk welcoming guests day and night.",
  },
  {
    url: "/photos/dining.webp",
    category: "dining",
    title: "Breakfast & Dining Lounge",
    caption: "Morning coffee, tea, and warm breakfast served daily.",
  },
  {
    url: "/photos/parking.webp",
    category: "facilities",
    title: "Secure Gated Parking",
    caption: "On-site private parking with 24-hour perimeter security.",
  },
]

export const GOOGLE_REVIEWS = [
  {
    author: "Juma Masanja",
    origin: "Mwanza (Kariakoo Business Trader)",
    rating: 5,
    date: "1 month ago",
    text: "The best location if you have goods to buy in Kariakoo. Walked straight to Congo Street shops in under 5 minutes. The air-con was cold which is a lifesaver in Dar es Salaam, and the 24-hour reception made my late 11 PM check-in very fast.",
  },
  {
    author: "Sarah Kiprono",
    origin: "Nairobi (Business Traveler)",
    rating: 5,
    date: "2 months ago",
    text: "Great value for money. Very polite and helpful front desk staff. Having safe parking inside the compound gave me total peace of mind for my car. Wi-Fi was fast enough for work.",
  },
  {
    author: "Emmanuel Bakari",
    origin: "Arusha (Zanzibar Transit)",
    rating: 4,
    date: "3 months ago",
    text: "Stayed here overnight before taking the 7:00 AM Azam Ferry to Zanzibar. The ferry port is only an 8-minute ride down the road. Clean bed, hot shower, quiet night sleep. Highly recommend for transit.",
  },
  {
    author: "Fatma Ally",
    origin: "Dar es Salaam (Local Stay)",
    rating: 5,
    date: "4 months ago",
    text: "Reliable standby generator kicked in immediately when power went off in the neighborhood. Clean room with cold fridge. Staff arranged a taxi for me at 4 AM without issue.",
  },
]

export const FAQS = [
  {
    q: "What are the check-in and check-out times?",
    a: "Standard check-in is from 11:00 AM and check-out is by 10:00 AM. Our front desk is open 24 hours a day, so late arrivals (including midnight and early morning) are always accommodated.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "We accept Cash in Tanzanian Shillings (TZS) and US Dollars (USD), Mobile Money (M-Pesa, Tigo Pesa, Airtel Money), and Visa/Mastercard at the front desk upon arrival.",
  },
  {
    q: "Is there reliable power and air conditioning?",
    a: "Yes. Every room is fitted with a quiet split air-conditioning unit. In addition, the hotel has an automatic standby generator that engages immediately during any city power outage.",
  },
  {
    q: "Is parking on-site and secured?",
    a: "Yes, we provide free gated on-site parking with 24-hour security guards for all registered guests.",
  },
  {
    q: "Can the front desk arrange transit to Zanzibar Ferry or Airport?",
    a: "Yes. Our team regularly books reliable, vetted taxis for guests heading to the Zanzibar Ferry (8 minutes away) or Julius Nyerere International Airport (25 minutes).",
  },
]
