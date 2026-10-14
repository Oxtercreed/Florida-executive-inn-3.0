// Boutique hotel template data tailored for executive, leisure, and business travelers.
export const HOTEL = {
  name: "The Kensington Grand Hotel",
  phone: "+44 20 7946 0192",
  phoneTel: "+442079460192",
  whatsapp: "447700900192",
  address: ["18 Kensington Gardens Square", "Royal Borough of Kensington & Chelsea", "London, W2 4BH, United Kingdom"],
  roomsTotal: 40,
  frontDesk: "24-Hour Concierge & Front Desk",
  rating: 4.9,
  reviewsCount: 520,
  starRating: "4-Star Boutique Hotel",
  timesNote: "Typical check-in from 14:00 and check-out by 11:00; 24h concierge desk accommodates late and midnight arrivals.",
  mapsUrl:
    "https://maps.google.com/?q=Kensington+Gardens+Square+London",
}

export type Room = {
  id: string
  name: string
  bed: string
  size: string
  view: string
  sleeps: number
  rate: number // USD
  rateGbp: number // GBP (£)
  rateTzs: number // alias
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
    view: "Courtyard view",
    sleeps: 2,
    rate: 110,
    rateGbp: 85,
    rateTzs: 85,
    count: 14,
    features: ["Climate control", "En-suite bathroom", "Smart flat-screen TV", "High-speed Wi-Fi", "Work desk"],
    image: "/photos/standard-double.webp",
  },
  {
    id: "standard-twin",
    name: "Standard Twin",
    bed: "2 Single beds",
    size: "≈20 m²",
    view: "Kensington garden view",
    sleeps: 2,
    rate: 110,
    rateGbp: 85,
    rateTzs: 85,
    count: 12,
    features: ["Two single beds", "Climate control", "Hardwood flooring", "High-speed Wi-Fi", "Daily housekeeping"],
    image: "/photos/standard-twin.webp",
  },
  {
    id: "comfort-double",
    name: "Comfort Double",
    bed: "1 Queen bed",
    size: "≈24 m²",
    view: "London city view",
    sleeps: 2,
    rate: 150,
    rateGbp: 115,
    rateTzs: 115,
    count: 14,
    features: ["King/Queen bed", "Mini refrigerator", "Climate control", "Seating lounge", "High-speed Wi-Fi"],
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
    title: "London Skyline & Kensington",
    caption: "Centrally positioned in the Royal Borough of Kensington & Chelsea, moments from Hyde Park and express transit.",
  },
  {
    url: "/photos/standard-double.webp",
    category: "rooms",
    title: "Standard Double Room",
    caption: "Quiet climate control, private en-suite bathroom, and crisp double bed.",
  },
  {
    url: "/photos/standard-twin.webp",
    category: "rooms",
    title: "Standard Twin Setup",
    caption: "Two separate single beds ideal for business partners and colleagues traveling together.",
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
    caption: "Tiled private bathroom with rainfall hot water shower.",
  },
  {
    url: "/photos/reception.webp",
    category: "facilities",
    title: "24-Hour Concierge & Desk",
    caption: "Attentive concierge team welcoming guests day and night.",
  },
  {
    url: "/photos/dining.webp",
    category: "dining",
    title: "Breakfast & Dining Lounge",
    caption: "Fresh artisan coffee, tea, and warm British breakfast served daily.",
  },
  {
    url: "/photos/parking.webp",
    category: "facilities",
    title: "Secure Private Parking",
    caption: "On-site private courtyard parking with 24-hour perimeter security.",
  },
]

export const GOOGLE_REVIEWS = [
  {
    author: "Oliver Thornton",
    origin: "Edinburgh (Corporate Guest)",
    rating: 5,
    date: "1 month ago",
    text: "The best location for business in Central London. Quiet, comfortable, and within minutes of Paddington and Kensington High Street. The climate control was whisper-quiet and the 24-hour concierge made my late arrival effortless.",
  },
  {
    author: "Charlotte Davies",
    origin: "Manchester (Weekend City Break)",
    rating: 5,
    date: "2 months ago",
    text: "Exceptional value and British charm. Very polite and helpful front desk staff. Having private parking in Central London gave us complete peace of mind. Wi-Fi was fast and reliable.",
  },
  {
    author: "James Campbell",
    origin: "Cambridge (Transit & Business)",
    rating: 5,
    date: "3 months ago",
    text: "Stayed overnight before heading to Heathrow. Paddington express link was seamless. Crisp linens, hot shower, quiet night's sleep. Highly recommend for business and leisure.",
  },
  {
    author: "Sophie Bennett",
    origin: "Surrey (London Staycation)",
    rating: 5,
    date: "4 months ago",
    text: "Beautiful boutique atmosphere. Spotlessly clean room with tea & coffee amenities and mini fridge. Concierge arranged an executive black cab for me at 5 AM without hesitation.",
  },
]

export const FAQS = [
  {
    q: "What are the check-in and check-out times?",
    a: "Standard check-in is from 14:00 and check-out is by 11:00. Our concierge and reception desk is open 24 hours a day, so late arrivals and early departures are seamlessly accommodated.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and contactless payments at the front desk upon arrival.",
  },
  {
    q: "Is there climate control and high-speed Wi-Fi?",
    a: "Yes. Every room is fitted with quiet individual climate control (air conditioning & heating), along with complimentary high-speed optical Wi-Fi throughout the hotel.",
  },
  {
    q: "Is parking on-site and secured?",
    a: "Yes, we provide private on-site courtyard parking with 24-hour security for all registered hotel guests.",
  },
  {
    q: "Can the concierge arrange airport or station transfers?",
    a: "Yes. Our team regularly books reliable executive transfers to Heathrow Airport (30 minutes), Gatwick, London City Airport, or St. Pancras International station.",
  },
]
