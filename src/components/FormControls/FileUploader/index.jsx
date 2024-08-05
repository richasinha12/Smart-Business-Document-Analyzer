import React, { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FileIcon, ImageIcon } from "../../UI";

const FileUploader = ({
  label,
  id,
  fileTypes = [],
  text,
  className,
  file,
  setFile,
}) => {
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const filteredFiles = Array.from(selectedFiles).filter((file) =>
      fileTypes.includes(file.type)
    );

    if (filteredFiles.length > 0) {
      const newFile = filteredFiles[0];
      setFile({ file: newFile, preview: URL.createObjectURL(newFile) });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      <div
        className="w-full flex items-center justify-center border-[2px] border-dotted border-blue-600 rounded-lg py-8 px-4 bg-white bg-opacity-10 cursor-pointer"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={fileTypes.join(",")}
          onChange={handleFileChange}
        />
        <label
          htmlFor={id}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="flex justify-center mb-4">
            <FileIcon className="w-8 h-8" />
          </div>
          <p className="text-lg text-gray-800">
            <span className="font-medium">Drop your document here, or</span>{" "}
            <span className="text-blue-600 font-semibold">browse</span>
          </p>
        </label>
      </div>
      {file && (
        <div className="mt-4">
          <div className="flex items-center justify-between border border-indigo-300 p-2 rounded mb-2 bg-white bg-opacity-40">
            <div className="mr-2">
              {file.file.type.startsWith("image/") ? (
                <ImageIcon />
              ) : (
                <FileIcon />
              )}
            </div>
            <p className="text-sm text-gray-800 font-medium">
              {file.file.name}
            </p>

            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-400 hover:text-red-600"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
