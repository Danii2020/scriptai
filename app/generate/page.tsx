"use client";
import { useState, useEffect } from "react";
import ToneSelector from "./components/ToneSelector";
import FileUpload from "./components/FileUpload";
import LoadingIndicator from "./components/LoadingIndicator";
import ScriptResult from "./components/ScriptResult";
import ErrorMessage from "./components/ErrorMessage";
import { TONES, LOADING_MESSAGES } from "./utils/constants";
import { generateScript, pollTask, downloadScript } from "./utils/api";
import axios from "axios";

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

    const poll = async () => {
      if (!taskId) return;
      try {
        const response = await pollTask(taskId);
        const { status, result: taskResult } = response.data;
        if (status === "completed" && taskResult) {
          setResult(taskResult);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error polling task:", err);
      }
    };

    if (taskId && loading) {
      pollInterval = setInterval(poll, 2000);
    }
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [taskId, loading]);

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
      const formData = new FormData();
      formData.append("topic", idea);
      formData.append("tones", JSON.stringify(tones));
      if (template) {
        formData.append("template", template);
      }
      const response = await generateScript(formData);
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

  const handleDownload = async () => {
    if (!taskId) return;
    try {
      const response = await downloadScript(taskId);
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'generated-script.docx';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
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
            <FileUpload template={template} onChange={handleTemplateChange} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">Select Tone(s)</span>
            <ToneSelector tones={tones} onToggleTone={handleToneToggle} availableTones={TONES} />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r bg-gradient-theme text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition-transform cursor-pointer"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </form>
        <ErrorMessage error={error} />
        {loading && <LoadingIndicator message={currentLoadingMessage} />}
        {result && (
          <ScriptResult
            result={result}
            onCopy={handleCopy}
            copySuccess={copySuccess}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
} 