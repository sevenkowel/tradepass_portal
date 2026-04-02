"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "options"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, placeholder, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={cn(fullWidth && "w-full")}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              "transition-all duration-200",
              error && "border-red-300 focus:border-red-500 focus:ring-red-200",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
