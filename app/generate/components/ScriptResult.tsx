import React from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface ScriptResultProps {
  result: string;
  onCopy: () => void;
  copySuccess: boolean;
  onDownload: () => void;
}

const ScriptResult: React.FC<ScriptResultProps> = ({ result, onCopy, copySuccess, onDownload }) => (
  <div className="mt-6 bg-[#23233a] rounded-lg p-6 text-white whitespace-pre-line shadow-inner">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Generated Script</h3>
      <button
        onClick={onCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d2d4d] hover:bg-[#3d3d5d] transition-colors cursor-pointer"
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
    <button
      type="button"
      onClick={onDownload}
      className="mt-4 bg-gradient-to-r bg-gradient-theme text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition-transform cursor-pointer"
    >
      Download Script
    </button>
  </div>
);

export default ScriptResult; 