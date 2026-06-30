import { MapPin, Phone, Clock } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C65D3B] text-sm font-bold tracking-widest uppercase mb-3">
            Find Us
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2E2620]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            We are in downtown Watsonville
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E5D9C5] aspect-video">
            <iframe
              title="El Alteño location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.0!2d-121.7569!3d36.9099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e0e0e0e0e0e0e%3A0x0!2s323+Main+St%2C+Watsonville%2C+CA+95076!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin size={20} className="text-[#C65D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2E2620] mb-1">Address</p>
                <p className="text-[#8A7E6F]">323 Main St</p>
                <p className="text-[#8A7E6F]">Watsonville, CA 95076</p>
                <a
                  href="https://maps.app.goo.gl/JuMsrYVQm52sZR3X7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C65D3B] text-sm font-medium mt-2 inline-block hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone size={20} className="text-[#C65D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2E2620] mb-1">Phone</p>
                <a href="tel:8317689876" className="text-[#8A7E6F] hover:text-[#C65D3B] transition-colors">
                  (831) 768-9876
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock size={20} className="text-[#C65D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2E2620] mb-3">Hours</p>
                <table className="text-sm text-[#8A7E6F] w-full">
                  <tbody className="space-y-1">
                    <tr>
                      <td className="pr-8 py-0.5">Tuesday – Saturday</td>
                      <td className="font-medium text-[#2E2620]">11:00 AM – 8:00 PM</td>
                    </tr>
                    <tr>
                      <td className="pr-8 py-0.5">Sunday</td>
                      <td className="font-medium text-[#2E2620]">9:00 AM – 8:00 PM</td>
                    </tr>
                    <tr className="text-[#8A7E6F]/60">
                      <td className="pr-8 py-0.5 pl-4 text-xs">↳ Breakfast</td>
                      <td className="text-xs">9:00 – 11:45 AM</td>
                    </tr>
                    <tr className="text-[#8A7E6F]/60">
                      <td className="pr-8 py-0.5 text-xs">Lunch (Tue–Sat)</td>
                      <td className="text-xs">11:00 AM – 2:00 PM</td>
                    </tr>
                    <tr className="border-t border-[#E5D9C5]">
                      <td className="pr-8 py-1 text-[#C65D3B] font-medium">Monday</td>
                      <td className="text-[#C65D3B] font-medium">Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-[#F0E6D6] rounded-xl p-4">
              <p className="font-bold text-[#2E2620] mb-2 text-sm">We Accept</p>
              <div className="flex flex-wrap gap-2 text-sm text-[#8A7E6F]">
                {["Visa", "Mastercard", "Zelle", "DoorDash", "Uber Eats"].map((p) => (
                  <span key={p} className="bg-white border border-[#E5D9C5] px-3 py-1 rounded-full text-xs font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
