import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

interface FileUploadProps {
  template: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MAX_SIZE = 1 * 1024 * 1024; // 1 MB

const FileUpload: React.FC<FileUploadProps> = ({ template, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > MAX_SIZE) {
      setError("File size must be 1 MB or less.");
      e.target.value = ""; // Reset the input
      return;
    }
    setError(null);
    onChange(e);
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer bg-[#23233a] px-4 py-2 rounded-lg hover:bg-[#2d2d4d] transition-colors">
      <FaUpload className="text-[#00c3ff]" />
      <span>{template ? template.name : "Upload .txt or .docx file"}</span>
      <input
        type="file"
        accept=".doc,.docx"
        className="hidden"
        onChange={handleChange}
      />
      {error && <span className="text-red-400 ml-2 text-xs">{error}</span>}
    </label>
  );
};

export default FileUpload; 