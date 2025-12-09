"use client";
import { useState, useEffect } from "react";
import ToneSelector from "./components/ToneSelector";
import FileUpload from "./components/FileUpload";
import LoadingIndicator from "./components/LoadingIndicator";
import ScriptResult from "./components/ScriptResult";
import ErrorMessage from "./components/ErrorMessage";
import { TONES, LOADING_MESSAGES } from "./utils/constants";
import { downloadScript, generateScript } from "./utils/api";
import axios from "axios";
import PlatformDropdown from "./components/PlatformDropdown";
import AdBanner from "./components/AdBanner";

export default function GeneratePage() {
  const [idea, setIdea] = useState("");
  const [template, setTemplate] = useState<File | null>(null);
  const [tones, setTones] = useState<string[]>([]);
  const [platform, setPlatform] = useState<string>("YouTube");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    if (loading) {
      let messageIndex = 0;
      setCurrentLoadingMessage(LOADING_MESSAGES[0]);
      messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setCurrentLoadingMessage(LOADING_MESSAGES[messageIndex]);
      }, 10000);
    }
    return () => {
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [loading]);

  useEffect(() => {
    // Polling removed: streaming handled directly in submit handler.
    return () => {};
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
    setFilePath(null);

    try {
      const formData = new FormData();
      formData.append("topic", idea);
      // FastAPI expects List[str] for tones, so send each tone separately
      // If no tones selected, FastAPI will default to ["professional"]
      if (tones.length > 0) {
        tones.forEach(tone => {
          formData.append("tones", tone);
        });
      }
      formData.append("platform", platform);
      if (template) {
        formData.append("file_name", template);
      }
      // Stream response chunks via fetch + getReader()
      let buffer = "";

      // Helper function to handle parsed events
      const handleEvent = (event: {
        status?: string;
        research_results?: string;
        final_script?: string;
        file_path?: string;
        task_id?: string;
        error?: string;
        message?: string;
        type?: string;
        text?: string;
      }) => {
        console.log("Handling event:", event);
        
        // Handle backend event structure: status, research_results, final_script, file_path
        if (event.status === "research_completed" && event.research_results) {
          // Research phase completed - could show this as progress
          console.log("Research completed");
        } else if (event.status === "completed" && event.final_script) {
          // Final script received - set it directly (not append)
          setResult(event.final_script);
          if (event.file_path) {
            // Store the full file_path
            setFilePath(event.file_path);
            
            // Extract task_id (UUID) from file_path
            // The file_path format: /var/folders/.../script_<uuid>.docx
            const pathParts = event.file_path.split('/');
            const fileName = pathParts[pathParts.length - 1];
            
            // Extract UUID from filename (script_<uuid>.docx)
            const uuidMatch = fileName.match(/script_([a-f0-9-]+)\.docx/);
            if (uuidMatch && uuidMatch[1]) {
              setTaskId(uuidMatch[1]);
            } else {
              // Fallback: try to extract any UUID-like pattern from the path
              const uuidPattern = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;
              const uuidFromPath = event.file_path.match(uuidPattern);
              if (uuidFromPath && uuidFromPath[1]) {
                setTaskId(uuidFromPath[1]);
              }
            }
          }
          // Also check if task_id is provided directly
          if (event.task_id) {
            setTaskId(event.task_id);
          }
          setLoading(false);
        } else if (event.status === "error" || event.error) {
          setError(event.message || event.error || "An error occurred during generation.");
          setLoading(false);
        } else if (event.type === "chunk" && typeof event.text === "string") {
          // Legacy format support: chunk events - append text
          setResult((prev) => (prev || "") + event.text);
        } else if (event.type === "done") {
          // Legacy format support: done events
          if (event.task_id) setTaskId(event.task_id);
          setLoading(false);
        } else if (event.text) {
          // Fallback: if there's a text field, append it
          setResult((prev) => (prev || "") + event.text);
        }
      };

      const processBuffer = () => {
        // Process complete SSE events (separated by \n\n)
        let boundary = buffer.indexOf("\n\n");
        while (boundary !== -1) {
          const rawEvent = buffer.slice(0, boundary).trim();
          buffer = buffer.slice(boundary + 2);

          if (!rawEvent) {
            boundary = buffer.indexOf("\n\n");
            continue;
          }

          // Try to parse as SSE format first: "data: {...}"
          const lines = rawEvent.split(/\r?\n/);
          let parsed = false;
          
          for (const line of lines) {
            if (line.startsWith("data:")) {
              const payload = line.replace(/^data:\s*/, "").trim();
              if (!payload) continue;
              
              try {
                const event = JSON.parse(payload);
                handleEvent(event);
                parsed = true;
              } catch (err) {
                console.error("Failed to parse SSE payload:", err, "Payload:", payload);
              }
            }
          }
          
          // Fallback: Try parsing as raw JSON object (in case backend sends without "data:" prefix)
          if (!parsed && rawEvent.trim().startsWith("{")) {
            try {
              const event = JSON.parse(rawEvent);
              handleEvent(event);
            } catch (err) {
              console.error("Failed to parse raw JSON:", err, "Raw event:", rawEvent);
            }
          }

          boundary = buffer.indexOf("\n\n");
        }
      };

      const onChunk = (chunk: string) => {
        buffer += chunk;
        processBuffer();
      };

      await generateScript(formData, onChunk);

      // Process any remaining buffer after streaming completes
      if (buffer.trim()) {
        processBuffer();
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
    if (!filePath) {
      alert('File information not available. Please generate the script again.');
      return;
    }
    
    try {
      console.log('Downloading script with file_path:', filePath);
      const response = await downloadScript(filePath);
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
    <div className="min-h-screen flex flex-col items-center justify-center text-white md:p-6 p-4">
      <div className="w-full max-w-xl bg-[#181828]/80 rounded-2xl shadow-xl md:p-8 p-4 flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-center mb-2">Generate Your Video Script for YouTube, TikTok, or Instagram</h2>
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
          <div className="flex flex-col gap-2">
            <PlatformDropdown value={platform} onChange={setPlatform} />
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
        <AdBanner dataAdFormat="auto" dataFullWidthResponsive={true} dataAdSlot={process.env.NEXT_AD_ID || ""}/>
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