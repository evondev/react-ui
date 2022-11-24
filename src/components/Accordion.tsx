import React, { useRef, useState } from "react";
interface AccordionProps {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  title: string;
}
const Accordion = ({
  children,
  title,
  className = "",
  contentClassName = "",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
    if (contentRef.current) {
      const elm = contentRef.current as HTMLElement;
      const elHeight = elm.offsetHeight;
      setContentHeight(elHeight);
    }
  };
  return (
    <div className={className}>
      <div
        className="cursor-pointer flex items-center justify-between gap-5 p-4 rounded-lg border border-gray-200 text-sm font-medium capitalize text-gray-500"
        onClick={handleToggle}
      >
        <span>{title}</span>
        {!isOpen ? <IconPlus /> : <IconMinus></IconMinus>}
      </div>
      <div
        className="relative overflow-hidden transition-height"
        style={{
          height: isOpen ? `${contentHeight}px` : 0,
        }}
      >
        <div className={`absolute ${contentClassName}`} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
function IconMinus({}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function IconPlus({}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
