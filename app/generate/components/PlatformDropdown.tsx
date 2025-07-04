import React from "react";

const platforms = [
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram", value: "instagram" },
];

type PlatformDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PlatformDropdown({ value, onChange }: PlatformDropdownProps) {
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