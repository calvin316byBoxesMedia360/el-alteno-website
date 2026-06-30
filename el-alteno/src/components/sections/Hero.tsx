import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #3D3226 0%, #6B4A35 45%, #A84A2C 100%)",
      }}
    >
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0), radial-gradient(circle at 75px 75px, white 2px, transparent 0)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Flags */}
        <div className="flex items-center justify-center gap-3 mb-6 text-sm font-medium tracking-widest uppercase opacity-80">
          <span>🇲🇽 Bienvenidos</span>
          <span className="w-px h-4 bg-white/40" />
          <span>🇺🇸 Welcome</span>
        </div>

        {/* Logo */}
        <h1 className="sr-only">El Alteño — Auténtica Comida Mexicana</h1>
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo/logo.png"
            alt="El Alteño — Auténtica Comida Mexicana"
            width={420}
            height={280}
            priority
            className="w-64 md:w-96 h-auto object-contain drop-shadow-2xl"
          />
        </div>

        <p className="text-base text-white/80 mb-10 tracking-wide">
          323 Main St · Watsonville, California
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-white text-[#C65D3B] font-bold px-8 py-3 rounded-md text-base hover:bg-amber-50 transition-colors shadow-lg"
          >
            See Our Menu
          </a>
          <a
            href="#events"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-md text-base hover:bg-white/10 transition-colors"
          >
            Book an Event
          </a>
        </div>

        {/* Delivery badges */}
        <div className="mt-10 flex items-center justify-center gap-4 text-xs text-white/60">
          <span>Available on</span>
          <span className="bg-white/10 px-3 py-1 rounded-full font-bold">DoorDash</span>
          <span className="bg-white/10 px-3 py-1 rounded-full font-bold">Uber Eats</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
