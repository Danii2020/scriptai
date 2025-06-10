"use client";
import { useState, useEffect } from "react";
import { FaUpload, FaCopy, FaCheck } from "react-icons/fa";
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";

const TONES = [
  { label: "Educational", value: "educational" },
  { label: "Funny", value: "funny" },
  { label: "Entertained", value: "entertained" },
  { label: "Casual", value: "casual" },
];

const LOADING_MESSAGES = [
  "Cooking up your script...",
  "Researching the best content...",
  "Writing the perfect script...",
  "Adding some creative flair...",
  "Polishing the final touches...",
  "Making it engaging and fun...",
  "Almost there...",
];

const URL = "http://127.0.0.1:8000"

export default function GeneratePage() {
  const [idea, setIdea] = useState("");
  const [template, setTemplate] = useState<File | null>(null);
  const [tones, setTones] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    if (loading) {
      let messageIndex = 0;
      setCurrentLoadingMessage(LOADING_MESSAGES[0]);
      messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setCurrentLoadingMessage(LOADING_MESSAGES[messageIndex]);
      }, 3000);
    }
    return () => {
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [loading]);

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const pollTask = async () => {
      if (!taskId) return;

      try {
        const response = await axios.get(`${URL}/task/${taskId}`);
        const { status, result: taskResult } = response.data;

        if (status === "completed" && taskResult) {
          setResult(taskResult);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error polling task:", err);
      }
    };

    if (taskId) {
      pollInterval = setInterval(pollTask, 2000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [taskId]);

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
    setTaskId(null);

    try {
      const formData = { "topic": idea, "tones": tones, "file_name": template }
      //   formData.append("topic", idea);
      //   formData.append("tones", JSON.stringify(tones));
      //   if (template) {
      //     formData.append("template", template);
      //   }
      const response = await axios.post(`${URL}/generate-script`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.task_id) {
        setTaskId(response.data.task_id);
      } else {
        throw new Error("No task ID received");
      }
    } catch (err: unknown) {
      let message = "Something went wrong.";
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data?.error || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      setLoading(false);
    }
  }

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div className="w-full max-w-xl bg-[#181828]/80 rounded-2xl shadow-xl p-8 flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-center mb-2">Generate Your YouTube Script</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Video Idea</span>
            <input
              type="text"
              className="rounded-lg px-4 py-3 bg-[#23233a] text-white placeholder:text-[#b0b0b0] focus:outline-none focus:ring-2 focus:ring-[#00c3ff]"
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
                accept=".doc,.docx"
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
                    ? "bg-gradient-to-r from-[#00c3ff] to-[#ffff1c] text-black border-transparent"
                    : "bg-[#23233a] text-white border-[#333] hover:bg-[#2d2d4d]"}
                  `}
                  onClick={() => handleToneToggle(tone.value)}
                >
                  {tone.label}
                </button>
              ))}
            </div>
            {
              result && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const response = await axios.get(`${URL}/download-script/${taskId}`, {
                        responseType: 'blob'
                      });

                      // Get filename from Content-Disposition header if available
                      const contentDisposition = response.headers['content-disposition'];
                      let filename = 'generated-script.docx';
                      if (contentDisposition) {
                        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                        if (filenameMatch) {
                          filename = filenameMatch[1];
                        }
                      }

                      // Create blob URL and trigger download
                      const blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                      });
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', filename);
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      console.error('Error downloading script:', err);
                      if (axios.isAxiosError(err)) {
                        if (err.response?.status === 404) {
                          alert('Script file not found. Please try generating the script again.');
                        } else if (err.response?.status === 400) {
                          alert('Script is not ready for download yet. Please wait.');
                        } else {
                          alert('Error downloading the script. Please try again.');
                        }
                      }
                    }
                  }}
                  className="mt-4 bg-gradient-to-r bg-gradient-theme text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  Download Script
                </button>
              )
            }

          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r bg-gradient-theme text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition-transform cursor-pointer"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </form>
        {error && <div className="text-red-400 text-center mt-2">{error}</div>}
        {loading && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c3ff] mx-auto mb-4"></div>
            <p className="text-lg font-medium text-[#00c3ff]">{currentLoadingMessage}</p>
          </div>
        )}
        {result && (
          <div className="mt-6 bg-[#23233a] rounded-lg p-6 text-white whitespace-pre-line shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Generated Script</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d2d4d] hover:bg-[#3d3d5d]
                transition-colors cursor-pointer"
                title="Copy to clipboard"
              >
                {copySuccess ? (
                  <>
                    <FaCheck className="text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(result, { async: false }))
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 