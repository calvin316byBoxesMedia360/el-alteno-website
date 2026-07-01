import { 
  Utensils, 
  ChefHat, 
  Wine, 
  Flame, 
  Fish, 
  Coffee, 
  Leaf, 
  Sparkles 
} from "lucide-react";

export default function WatermarkBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-20">
      {/* Upper Area (Hero & About) */}
      <div 
        className="absolute top-[8%] left-[5%] text-[#C99A3F] rotate-[15deg] opacity-[0.1]" 
        style={{ transform: "rotate(15deg)" }}
      >
        <Utensils size={120} strokeWidth={1} />
      </div>
      <div 
        className="absolute top-[18%] right-[8%] text-[#C65D3B] rotate-[-25deg] opacity-[0.08]"
      >
        <Wine size={90} strokeWidth={1} />
      </div>

      {/* Mid Upper (About & Menu) */}
      <div 
        className="absolute top-[32%] left-[12%] text-[#6B7A4F] rotate-[45deg] opacity-[0.08]"
      >
        <ChefHat size={110} strokeWidth={1} />
      </div>
      <div 
        className="absolute top-[42%] right-[12%] text-[#C99A3F] rotate-[-15deg] opacity-[0.1]"
      >
        <Fish size={130} strokeWidth={1} />
      </div>

      {/* Mid Lower (Menu & Events) */}
      <div 
        className="absolute top-[58%] left-[8%] text-[#C65D3B] rotate-[-35deg] opacity-[0.08]"
      >
        <Flame size={100} strokeWidth={1} />
      </div>
      <div 
        className="absolute top-[68%] right-[6%] text-[#6B7A4F] rotate-[20deg] opacity-[0.1]"
      >
        <Leaf size={80} strokeWidth={1} />
      </div>

      {/* Lower Area (Events & Location) */}
      <div 
        className="absolute top-[78%] left-[15%] text-[#C99A3F] rotate-[12deg] opacity-[0.08]"
      >
        <Coffee size={95} strokeWidth={1} />
      </div>
      <div 
        className="absolute top-[88%] right-[10%] text-[#C65D3B] rotate-[-45deg] opacity-[0.08]"
      >
        <Sparkles size={110} strokeWidth={1} />
      </div>
    </div>
  );
}
