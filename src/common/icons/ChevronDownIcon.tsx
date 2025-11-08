interface ChevronDownIconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

function ChevronDownIcon({
  className = '',
  'aria-hidden': ariaHidden = true,
}: ChevronDownIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default ChevronDownIcon;
