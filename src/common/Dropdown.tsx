import { useState, useRef } from 'react';
import CheckmarkIcon from './icons/CheckmarkIcon';
import type { DropdownOption } from '../types';
import { useClickOutside } from '../hooks/useClickOutside';

interface DropdownProps<T = string> {
  options: DropdownOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  buttonClassName?: string;
  optionClassName?: string;
  ariaLabelledBy?: string;
}

function Dropdown<T = string>({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  id = 'dropdown',
  className = '',
  buttonClassName = '',
  optionClassName = '',
  ariaLabelledBy,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  const onCloseDropdown = () => setIsOpen(false);
  useClickOutside({
    ref: dropdownRef,
    handler: onCloseDropdown,
    isEnabled: isOpen,
  });

  const handleSelect = (optionValue: T | null) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    optionValue: T
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(optionValue);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
        className={`select-with-icon w-full px-4 py-2.5 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 transition-colors ${buttonClassName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={ariaLabelledBy}
      >
        <span className="block truncate">{displayValue}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto custom-scrollbar">
          <ul role="listbox" className="py-1" aria-labelledby={id}>
            {options.map((option, index) => {
              const isSelected = value === option.value;

              const baseClasses =
                'px-4 py-2.5 cursor-pointer transition-colors';
              const borderClass =
                index > 0
                  ? 'border-t border-gray-100 dark:border-gray-600'
                  : '';
              const stateClasses = isSelected
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600';

              const className = [
                baseClasses,
                borderClass,
                stateClasses,
                optionClassName,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li
                  key={index}
                  role="option"
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                  className={className}
                  aria-selected={isSelected}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <CheckmarkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
