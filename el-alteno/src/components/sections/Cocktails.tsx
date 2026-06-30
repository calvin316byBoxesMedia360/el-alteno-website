const cocktails = [
  {
    name: "Cantarito",
    emoji: "🍊",
    description:
      "Tequila, lime, grapefruit and orange juice served in a clay cup over ice. The classic Jalisco cocktail — citrusy, refreshing, unmistakably Mexican.",
    color: "from-[#C99A3F] to-[#C65D3B]",
  },
  {
    name: "Sunrise",
    emoji: "🌅",
    description:
      "Tequila, orange juice and grenadine layered into a beautiful gradient. Order one and watch the room turn heads.",
    color: "from-[#C65D3B] to-[#A84A2C]",
  },
  {
    name: "Chavela",
    emoji: "🍺",
    description:
      "Chilled beer with lime, Clamato, hot sauce and Worcestershire in a salt-rimmed glass. Bold, savory, and perfect with mariscos.",
    color: "from-[#6B7A4F] to-[#3D3226]",
  },
];

export default function Cocktails() {
  return (
    <section id="cocktails" className="section-padding bg-[#F0E6D6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C65D3B] text-sm font-bold tracking-widest uppercase mb-3">
            Signature Cocktails
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2E2620] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Raise a glass
          </h2>
          <p className="text-[#8A7E6F] text-lg max-w-lg mx-auto">
            Three drinks that define the El Alteño experience. Each one made to order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cocktails.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`bg-gradient-to-br ${c.color} h-40 flex items-center justify-center`}>
                <span className="text-7xl">{c.emoji}</span>
              </div>
              <div className="p-6">
                <h3
                  className="text-2xl font-bold text-[#2E2620] mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {c.name}
                </h3>
                <p className="text-[#8A7E6F] text-sm leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#8A7E6F] mt-8">
          We also serve beer, wine, margaritas and more. Ask your server.
        </p>
      </div>
    </section>
  );
}
