import React from 'react';

const HamburgerIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h9" />
      <path d="M3 6h9" />
      <path d="M3 18h9" />
      <circle cx="17" cy="10" r="3" />
      <path d="m19 12 2.5 2.5" />
    </svg>
  );
};

export default HamburgerIcon; 