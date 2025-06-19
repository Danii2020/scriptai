import React from "react";
import { FaUpload } from "react-icons/fa";

interface FileUploadProps {
  template: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ template, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer bg-[#23233a] px-4 py-2 rounded-lg hover:bg-[#2d2d4d] transition-colors">
    <FaUpload className="text-[#00c3ff]" />
    <span>{template ? template.name : "Upload .txt or .docx file"}</span>
    <input
      type="file"
      accept=".doc,.docx"
      className="hidden"
      onChange={onChange}
    />
  </label>
);

export default FileUpload; 