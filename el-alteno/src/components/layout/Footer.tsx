import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2E2620] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3
            className="text-2xl font-bold text-[#C99A3F] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            El Alteño
          </h3>
          <p className="text-sm text-gray-400 mb-4">Auténtica Comida Mexicana</p>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <MapPin size={14} className="text-[#C99A3F] shrink-0" />
            <span>323 Main St, Watsonville, CA 95076</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Phone size={14} className="text-[#C99A3F] shrink-0" />
            <a href="tel:8317689876" className="hover:text-white transition-colors">
              (831) 768-9876
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-[#C99A3F]" />
            <h4 className="font-bold text-white">Hours</h4>
          </div>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="flex justify-between gap-4">
              <span>Tuesday – Saturday</span>
              <span>11:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sunday</span>
              <span>9:00 AM – 8:00 PM</span>
            </li>
            <li className="flex justify-between gap-4 text-gray-500">
              <span>Sunday Breakfast</span>
              <span>9:00 – 11:45 AM</span>
            </li>
            <li className="flex justify-between gap-4 text-gray-500">
              <span>Lunch (Tue–Sat)</span>
              <span>11:00 AM – 2:00 PM</span>
            </li>
            <li className="mt-2 pt-2 border-t border-gray-700 text-[#C99A3F]">
              Monday — Closed
            </li>
          </ul>
        </div>

        {/* Order & Payment */}
        <div>
          <h4 className="font-bold text-white mb-4">Order Online</h4>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.doordash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FF3008] text-white text-sm font-bold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              DoorDash
            </a>
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#06C167] text-white text-sm font-bold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Uber Eats
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            We accept Visa · Mastercard · Zelle
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-lg">🇲🇽</span>
            <span className="text-xs text-gray-500 self-center">Bienvenidos</span>
            <span className="text-lg ml-2">🇺🇸</span>
            <span className="text-xs text-gray-500 self-center">Welcome</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} El Alteño Restaurant · Watsonville, CA ·{" "}
        <span className="text-gray-700">Built with Claude Web Builder</span>
      </div>
    </footer>
  );
}
