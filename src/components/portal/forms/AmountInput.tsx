"use client";

import { forwardRef, useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";

interface AmountInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  helperText?: string;
  currency?: string;
  min?: number;
  max?: number;
  presets?: number[];
  onChange?: (value: number) => void;
  fullWidth?: boolean;
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    currency = "USD", 
    min, 
    max, 
    presets,
    onChange,
    fullWidth = true,
    className,
    value,
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = useState(value ? String(value) : "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      
      // 只允许数字和小数点
      if (!/^\d*\.?\d*$/.test(rawValue)) return;
      
      setDisplayValue(rawValue);
      
      const numValue = parseFloat(rawValue);
      if (!isNaN(numValue)) {
        onChange?.(numValue);
      } else {
        onChange?.(0);
      }
    };

    const handlePresetClick = (amount: number) => {
      setDisplayValue(String(amount));
      onChange?.(amount);
    };

    return (
      <div className={cn(fullWidth && "w-full")}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {currency}
          </span>
          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            className={cn(
              "w-full pl-14 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              "transition-all duration-200",
              error && "border-red-300 focus:border-red-500 focus:ring-red-200",
              className
            )}
            value={displayValue}
            onChange={handleChange}
            {...props}
          />
        </div>
        
        {presets && presets.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {presets.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetClick(amount)}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {formatCurrency(amount, currency, { notation: "compact" })}
              </button>
            ))}
          </div>
        )}
        
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AmountInput.displayName = "AmountInput";
