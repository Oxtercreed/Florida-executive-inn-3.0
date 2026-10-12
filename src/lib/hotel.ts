// Facts below were cross-checked across Expedia/Hotels.com, Booking.com, Trip.com, Kayak and Tripadvisor listings.
// Items marked CONFIRM disagree between sources or are estimates: verify with the hotel before launch.

export const HOTEL = {
  name: "Florida Executive Inn",
  phone: "+255 765 846 123", // CONFIRM: a second listing shows +255 768 466 161
  phoneTel: "+255765846123",
  whatsapp: "255765846123", // CONFIRM this number is on WhatsApp
  address: ["Congo Street (Omari Londo St)", "Gerezani, Kariakoo · Ilala", "Dar es Salaam, Tanzania"],
  roomsTotal: 40,
  frontDesk: "Front desk open 24 hours",
  timesNote: "Typical check-in from 11:00 and check-out by 10:00; listings differ, so the desk confirms your times.", // CONFIRM
  mapsUrl:
    "https://www.google.com/maps/place/Florida+Executive+Inn/@-6.8247631,39.2728843,17z/data=!4m9!3m8!1s0x185c4baa3d8ce805:0x32df0c2e11846fc6!5m2!4m1!1i2!8m2!3d-6.8247631!4d39.2754592!16s%2Fg%2F11cnxyr54k",
}

export type Room = { id: string; name: string; bed: string; size: string; view: string; sleeps: number; rate: number; count: number }

// rate = indicative USD per night (OTA range ~US$28-42). count = split of the 40 rooms. Both CONFIRM.
export const ROOMS: Room[] = [
  { id: "standard-double", name: "Standard Double", bed: "1 double bed", size: "≈18 m²", view: "City view", sleeps: 2, rate: 34, count: 14 },
  { id: "standard-twin", name: "Standard Twin", bed: "2 single beds", size: "≈20 m²", view: "City view", sleeps: 2, rate: 34, count: 12 },
  { id: "comfort-double", name: "Comfort Double", bed: "1 queen bed", size: "≈24 m²", view: "City view", sleeps: 2, rate: 42, count: 14 },
]

// Stock imagery: swap for the hotel's own photos (drop files in /public/photos and change the paths).
export const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1669123547602-b85454d7ee84?auto=format&fit=crop&w=1800&q=88",
  room: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=86",
  coast: "https://images.unsplash.com/photo-1602590552438-cb9d622acf46?auto=format&fit=crop&w=1200&q=86",
}
