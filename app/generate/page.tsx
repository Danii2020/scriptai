"use client";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";

const TONES = [
  { label: "Educational", value: "educational" },
  { label: "Funny", value: "funny" },
  { label: "Entertained", value: "entertained" },
  { label: "Casual", value: "casual" },
];

export default function GeneratePage() {
  const [idea, setIdea] = useState("");
  const [template, setTemplate] = useState<File | null>(null);
  const [tones, setTones] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleToneToggle(tone: string) {
    setTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    );
  }

  function handleTemplateChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setTemplate(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("idea", idea);
      formData.append("tones", JSON.stringify(tones));
      if (template) {
        formData.append("template", template);
      }
      // Placeholder API endpoint
      const response = await axios.post("/api/generate-script", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.script || "No script returned.");
    } catch (err: unknown) {
      let message = "Something went wrong.";
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data?.error || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div className="w-full max-w-xl bg-[#181828]/80 rounded-2xl shadow-xl p-8 flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-center mb-2">Generate Your YouTube Script</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Video Idea</span>
            <input
              type="text"
              className="rounded-lg px-4 py-3 bg-[#23233a] text-white placeholder:text-[#b0b0b0] focus:outline-none focus:ring-2 focus:ring-[#636768]"
              placeholder="Describe your video idea..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </label>
          <div className="flex flex-col gap-2">
            <span className="font-medium">Attach Script Template (optional)</span>
            <label className="flex items-center gap-3 cursor-pointer bg-[#23233a] px-4 py-2 rounded-lg hover:bg-[#2d2d4d] transition-colors">
              <FaUpload className="text-[#00c3ff]" />
              <span>{template ? template.name : "Upload .txt or .docx file"}</span>
              <input
                type="file"
                accept=".txt,.doc,.docx"
                className="hidden"
                onChange={handleTemplateChange}
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">Select Tone(s)</span>
            <div className="flex flex-wrap gap-3">
              {TONES.map((tone) => (
                <button
                  type="button"
                  key={tone.value}
                  className={`px-4 py-2 rounded-full font-semibold border-2 transition-colors cursor-pointer ${tones.includes(tone.value)
                    ? "bg-gradient-theme border-transparent"
                    : "bg-[#23233a] text-white border-[#333] hover:bg-[#2d2d4d]"}
                  `}
                  onClick={() => handleToneToggle(tone.value)}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-theme text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition-transform cursor-pointer"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </form>
        {error && <div className="text-red-400 text-center mt-2">{error}</div>}
        {result && (
          <div className="mt-6 bg-[#23233a] rounded-lg p-6 text-white whitespace-pre-line shadow-inner">
            <h3 className="text-xl font-bold mb-2">Generated Script</h3>
            <div>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
} 