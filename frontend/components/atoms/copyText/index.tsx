"use client";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

const CopyText = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500); // After 1.5 seconds, return the icon to its original state
    } catch (error) {
      console.error("Tidak dapat menyalin teks ke clipboard:", error);
      alert("Gagal menyalin teks ke clipboard.");
    }
  };

  return (
    <span className="flex items-center space-x-1 max-w-sm p-1">
      <p className="text-nowrap overflow-hidden overflow-ellipsis">
        {textToCopy}
      </p>
      {copied ? (
        <FaCheckCircle className="text-green-500" />
      ) : (
        <FaCopy
          className="text-primary-600 cursor-pointer"
          onClick={handleCopy}
        />
      )}
    </span>
  );
};

export default CopyText;
