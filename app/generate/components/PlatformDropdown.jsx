import React from "react";

const platforms = [
  { label: "YouTube", value: "YouTube" },
  { label: "TikTok", value: "TikTok" },
  { label: "Instagram", value: "Instagram" },
];

export default function PlatformDropdown({ value, onChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium">Select Platform</span>
      <select
        className="rounded-lg px-4 py-3 bg-[#23233a] text-white focus:outline-none focus:ring-2 focus:ring-[#00c3ff]"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {platforms.map(platform => (
          <option key={platform.value} value={platform.value}>
            {platform.label}
          </option>
        ))}
      </select>
    </label>
  );
} 