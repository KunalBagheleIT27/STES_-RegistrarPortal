"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface SelectValueProps {
  placeholder?: string;
}

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  value: "",
  onValueChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export const Select: React.FC<SelectProps> = ({
  children,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ value, onValueChange: handleValueChange, isOpen, setIsOpen }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ children, className = "" }, ref) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#026892] focus:ring-offset-2 ${className}`}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className = "",
}) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`absolute top-full mt-1 min-w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${className}`}
      >
        <div className="py-1">{children}</div>
      </div>
    </>
  );
};

export const SelectItem: React.FC<SelectItemProps> = ({
  children,
  value,
  className = "",
}) => {
  const { onValueChange, value: selectedValue } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => onValueChange(value)}
      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
        selectedValue === value ? "bg-gray-100 font-semibold" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
