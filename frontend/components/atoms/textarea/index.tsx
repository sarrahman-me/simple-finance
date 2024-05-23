import React from "react";

// Interface Props
interface TextareaProps {
  label?: string;
  placeholder?: string;
  onChange: (v: any) => void;
  value?: any;
}

// Textarea Component
const Textarea = ({ label, placeholder, onChange, value }: TextareaProps) => {
  return (
    <div className="space-y-1 w-full">
      <label
        htmlFor={label}
        className="block text-sm md:text-base font-medium text-primary-700"
      >
        {label}
      </label>
      <textarea
        onChange={(e) => onChange(e.target.value)}
        value={value}
        name={label}
        id={label}
        rows={10}
        className="bg-white outline-none border text-primary-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 md:p-2 resize-none" // Added 'resize-none' to disable resizing
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
