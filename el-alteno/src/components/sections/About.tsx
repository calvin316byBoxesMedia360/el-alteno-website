export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <p className="text-[#C65D3B] text-sm font-bold tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2E2620] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Flavors that feel<br />like home
          </h2>
          <p className="text-[#8A7E6F] text-lg leading-relaxed mb-5">
            El Alteño brings the soulful cooking of Mexico to the heart of Watsonville, California.
            Every dish starts with recipes handed down through generations — slow-cooked stews,
            hand-pressed tortillas, and mariscos so fresh you can taste the coast.
          </p>
          <p className="text-[#8A7E6F] text-lg leading-relaxed mb-8">
            Whether you are stopping in on a road trip down the coast, celebrating a milestone with family,
            or hosting a private event for 100 guests — this is a place where you will leave full and come back soon.
          </p>

          {/* Stats */}
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-[#C65D3B]" style={{ fontFamily: "var(--font-playfair)" }}>
                100
              </p>
              <p className="text-sm text-[#8A7E6F]">guests per event</p>
            </div>
            <div className="w-px bg-[#E5D9C5]" />
            <div>
              <p className="text-3xl font-bold text-[#C65D3B]" style={{ fontFamily: "var(--font-playfair)" }}>
                50+
              </p>
              <p className="text-sm text-[#8A7E6F]">dishes on the menu</p>
            </div>
            <div className="w-px bg-[#E5D9C5]" />
            <div>
              <p className="text-3xl font-bold text-[#C65D3B]" style={{ fontFamily: "var(--font-playfair)" }}>
                7
              </p>
              <p className="text-sm text-[#8A7E6F]">days a week</p>
            </div>
          </div>
        </div>

        {/* Visual card */}
        <div className="bg-[#F0E6D6] rounded-2xl p-8 flex flex-col gap-4">
          <div className="bg-[#C65D3B] text-white rounded-xl p-6">
            <p className="text-sm font-bold tracking-widest uppercase mb-1 text-amber-200">
              Hand Made
            </p>
            <p
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tortillas Hecha a Mano
            </p>
            <p className="text-white/80 mt-2 text-sm">
              Every tortilla is pressed and cooked to order. You can taste the difference.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-[#E5D9C5]">
              <p className="text-2xl mb-1">🦐</p>
              <p className="font-bold text-sm text-[#2E2620]">Fresh Mariscos</p>
              <p className="text-xs text-[#8A7E6F]">Seafood daily</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#E5D9C5]">
              <p className="text-2xl mb-1">🎉</p>
              <p className="font-bold text-sm text-[#2E2620]">Private Events</p>
              <p className="text-xs text-[#8A7E6F]">Up to 100 guests</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#E5D9C5]">
              <p className="text-2xl mb-1">🍹</p>
              <p className="font-bold text-sm text-[#2E2620]">Signature Drinks</p>
              <p className="text-xs text-[#8A7E6F]">Cantarito & more</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#E5D9C5]">
              <p className="text-2xl mb-1">📦</p>
              <p className="font-bold text-sm text-[#2E2620]">DoorDash Ready</p>
              <p className="text-xs text-[#8A7E6F]">Order online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
