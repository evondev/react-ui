import React from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  className?: string;
  bodyClassName?: string;
  onModalClose: () => void;
}
const Modal = ({
  children,
  isOpen = false,
  className = "",
  bodyClassName = "",
  onModalClose,
}: ModalProps) => {
  if (typeof document === "undefined") return null;
  if (!isOpen) return null;
  return createPortal(
    <div
      className={`fixed px-5 inset-0 z-50 flex items-center justify-center ${
        isOpen ? "animate-fade" : ""
      } ${className}`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={onModalClose}
      ></div>
      <div className={`relative z-50 p-10 ${bodyClassName}`}>
        <div
          aria-label="modal-close"
          className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full cursor-pointer right-5 top-5"
          onClick={onModalClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>,
    document.body as HTMLElement
  );
};

export default Modal;
