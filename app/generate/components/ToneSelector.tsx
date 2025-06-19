import React from "react";

interface ToneSelectorProps {
  tones: string[];
  onToggleTone: (tone: string) => void;
  availableTones: { label: string; value: string }[];
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ tones, onToggleTone, availableTones }) => (
  <div className="flex flex-wrap gap-3">
    {availableTones.map((tone) => (
      <button
        type="button"
        key={tone.value}
        className={`px-4 py-2 rounded-full font-semibold border-2 transition-colors cursor-pointer ${tones.includes(tone.value)
          ? "bg-gradient-to-r from-[#00c3ff] to-[#ffff1c] text-black border-transparent"
          : "bg-[#23233a] text-white border-[#333] hover:bg-[#2d2d4d]"}
        `}
        onClick={() => onToggleTone(tone.value)}
      >
        {tone.label}
      </button>
    ))}
  </div>
);

export default ToneSelector; 