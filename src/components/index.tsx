import React, {
  ReactEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
interface DropdownProps {
  children?: React.ReactNode;
  header: React.ReactNode;
  show?: boolean;
  handleShowDropdown?: (value?: boolean) => void;
  className?: string;
}
type Coords = {
  x: number;
  y: number;
};
const Dropdown = ({
  children,
  header,
  show = false,
  handleShowDropdown = () => {},
  className = "",
}: DropdownProps) => {
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
  });
  const handleClickHeader = (e: any) => {
    const position = e.target.getBoundingClientRect() as DOMRect;
    console.log("handleClickHeader ~ position", position);
    setCoords({
      x: position?.left,
      y: position?.top + position?.height + window?.scrollY,
    });
    handleShowDropdown?.();
  };
  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(this: Document, e: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        handleShowDropdown?.(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={className} ref={nodeRef}>
      <div onClick={handleClickHeader}>{header}</div>
      {show && <DropdownContent coords={coords}>{children}</DropdownContent>}
    </div>
  );
};
const DropdownContent = ({
  children,
  coords,
}: {
  children: React.ReactNode;
  coords: Coords;
}) => {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="absolute z-10"
      style={{
        top: coords.y,
        left: coords.x,
      }}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default Dropdown;
