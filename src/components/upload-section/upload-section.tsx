import React, {useState} from "react";
import {cn} from "@/lib/utils.ts";
import Papa from "papaparse";
import {Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport} from '@radix-ui/react-toast';
import {AlertCircle, CheckCircle2, X} from "lucide-react";
import {importCsvFile} from "@/api/_callApi.ts";
import {CircleLoader} from "react-spinners";


const FileUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [toastMessage, setToastMessage] = useState('');
  const formData = new FormData();

  const showToast = (type: 'success' | 'error', message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(true);
  };

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
      setLoading(true)
      setFile(file);
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const parsedData = Papa.parse(text, {header: false});
      // Validate file type and row count
      if (file.type !== 'text/csv') {
        setLoading(false);
        showToast('error', 'Please upload a valid CSV file.');
        return;
      }
      if (parsedData.data.length > 1001) {
        setLoading(false);
        showToast('error', 'File must contain 1,000 rows or fewer.');
        return;
      }

      setCsvData(parsedData.data as string[][]);
      setLoading(false);
      showToast('success', 'File parsed successfully!');
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    // Validate file existence
    if (!file) {
      showToast('error', 'Please upload a CSV file first.');
      return;
    }

    // Validate row count
    if (!csvData || csvData.length > 1001) {
      showToast('error', 'File must contain 1,000 rows or fewer.');
      return;
    }

    try {
      formData.append('file', file);
      const response = await importCsvFile(formData)
      showToast('success', 'CSV file uploaded successfully!');
    } catch (error) {
      showToast('error', 'Failed to upload CSV file. Please try again.');
    }
  };

  return (
      <ToastProvider swipeDirection="right">
        <div className="max-w-lg mx-auto space-y-4 relative">
          {loading&&(<div className="fixed inset-0 z-[99] bg-white/60 flex justify-center items-center">
            <CircleLoader className='absolute' color={'rgb(59, 130, 246)'} size={200} />
          </div>)}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Upload your clients datasets (csv)</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Ensure your file contains contact name and phone number.
              Files with up to 1,000 rows work best.
            </p>
          </div>

          <div
              className={cn(
                  "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out group",
                  dragActive
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
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
            <label
                htmlFor="file-upload"
                className="cursor-pointer block"
            >
              <div className="flex flex-col items-center space-y-3">
                <svg
                    width="50"
                    height="50"
                    className={cn(
                        "stroke-gray-400 transition-colors group-hover:stroke-blue-500",
                        dragActive && "stroke-blue-500"
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d='m11.966 20-.004-8m7.863 5c4.495-3.16.475-7.73-3.706-7.73C13.296-1.732-3.265 7.368 4.074 15.662'/>
                  <path d='m15.144 14.318-3.182-3.182-3.182 3.182'/>
                </svg>
                <p className="text-sm text-gray-600">
                  Drag & drop a file here, or{" "}
                  <span className="text-blue-500 underline group-hover:text-blue-600">
                  click to browse
                </span>
                </p>
              </div>
            </label>
          </div>
          {csvData && (
              <div className="bg-white shadow-sm rounded-xl border overflow-hidden">
                <div className="max-h-64 overflow-auto">
                  <table className="w-full text-sm text-gray-700">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                      {csvData[0]?.map((header, idx) => (
                          <th
                              key={idx}
                              className="px-4 py-2 text-left font-semibold text-gray-800"
                          >
                            {header}
                          </th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {csvData.slice(1).map((row, idx) => (
                        <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors"
                        >
                          {row.map((cell, i) => (
                              <td
                                  key={i}
                                  className="px-4 py-2 border-b"
                              >
                                {cell}
                              </td>
                          ))}
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
          )}

          <div className="flex justify-between items-center">
            <button
                className="w-full py-2.5 bg-blue-500 text-white font-semibold rounded-lg
               hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:ring-offset-2 transition-colors duration-300"
                onClick={() => {
                  setLoading(true);
                  handleSubmit().then(r=> {
                    setCsvData([]);
                    setLoading(false);
                  });
                }}
            >
              Submit Import
            </button>
          </div>

          {/* Radix UI Toast */}
          <Toast
              open={toastOpen}
              onOpenChange={setToastOpen}
              className={cn(
                  "bg-white justify-between  rounded-lg shadow-lg p-4 border-2 flex items-center space-x-3 z-50",
                  toastType === 'success'
                      ? "border-green-300 text-green-600"
                      : "border-red-300 text-red-600"
              )}
          >
            <div className="flex justify-around items-center space-x-3">
              {toastType === 'success'
                  ? <CheckCircle2 className="text-green-600"/>
                  : <AlertCircle className="text-red-600"/>
              }
              <div>
                <ToastTitle className="font-semibold">
                  {toastType === 'success' ? 'Success' : 'Error'}
                </ToastTitle>
                <ToastDescription>
                  {toastMessage}
                </ToastDescription>
              </div>
            </div>
            <ToastClose className="ml-auto">
              <X className="h-4 w-4"/>
            </ToastClose>
          </Toast>
          <ToastViewport className="fixed top-20 right-0 z-[100] m-4"/>
        </div>
      </ToastProvider>
  );
};

export default FileUploader;