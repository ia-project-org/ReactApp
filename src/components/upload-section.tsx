import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Papa from "papaparse"

const FileUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [csvData, setCsvData] = useState<string[][] | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const parsedData = Papa.parse(text, { header: false });
      setCsvData(parsedData.data as string[][]);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Upload a CSV file</h2>
      <p className="text-sm text-gray-500 mb-2">
        Make sure the file includes contact name and phone number. File with up
        to 10,000 rows works best.
      </p>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <svg width="50" height="50" className="stroke-[#656567]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d='m11.966 20-.004-8m7.863 5c4.495-3.16.475-7.73-3.706-7.73C13.296-1.732-3.265 7.368 4.074 15.662'/><path d='m15.144 14.318-3.182-3.182-3.182 3.182'/>
            </svg>
            <p className="text-sm text-gray-600 mt-2">
              Drag & drop a file here, or{" "}
              <span className="text-blue-500 underline">click to browse</span>
            </p>
          </div>
        </label>
      </div>
      {csvData && (
        <div className="mt-6 overflow-auto border rounded-lg max-h-64">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {csvData[0]?.map((header, idx) => (
                  <th key={idx} className="border px-2 py-1 bg-gray-100">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, i) => (
                    <td key={i} className="border px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-500">
        <a href="#" className="text-blue-500 underline">
          Learn more
        </a>{" "}
        about importing contacts or{" "}
        <a href="#" className="text-blue-500 underline">
          download a sample CSV file
        </a>
        .
      </p>
    </div>
  );
};

export default FileUploader;
