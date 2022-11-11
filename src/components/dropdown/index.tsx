// Dropdown component
import React, {
  ReactEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
type Position = "left" | "right" | "center";
interface DropdownProps {
  children?: React.ReactNode;
  header: React.ReactNode;
  show: boolean;
  handleShowDropdown?: (value?: boolean) => void;
  className?: string;
  position: Position;
}
type Coords = {
  x: number;
  y: number;
  width: number;
};
const Dropdown = ({
  children,
  header,
  show = false,
  handleShowDropdown = () => {},
  className = "",
  position = "left",
}: DropdownProps) => {
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
    width: 0,
  });
  const handleClickHeader = (e: any) => {
    const position = e.target.getBoundingClientRect() as DOMRect;
    setCoords({
      x: position?.left,
      y: position?.top + position?.height + window?.scrollY,
      width: position?.width,
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
      <div className="w-fit" onClick={handleClickHeader}>
        {header}
      </div>
      {show && (
        <DropdownContent position={position} coords={coords}>
          {children}
        </DropdownContent>
      )}
    </div>
  );
};
const DropdownContent = ({
  children,
  coords,
  position = "left",
}: {
  children: React.ReactNode;
  coords: Coords;
  position: Position;
}) => {
  if (typeof document === "undefined") return null;
  const top = coords.y;
  const left = coords.x + coords.width / 2;
  const transform = `${position === "center" ? "translateX(-50%)" : ""}`;
  return createPortal(
    <div
      className="absolute z-10"
      style={{
        top: coords.y,
        [position === "center" ? "left" : position]: left,
        transform,
      }}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default Dropdown;
