import React, { memo } from "react";
import { createPortal } from "react-dom";
import { Coords, Position } from "../types/global";
interface PopoverProps {
  coords: Coords;
  position: Position;
  children?: React.ReactNode;
  className?: string;
}
function Popover({
  coords,
  position = "left",
  children,
  className = "z-10",
}: PopoverProps) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      style={{
        left: position === "right" ? coords.x + coords.width : coords.x,
        top: coords.y + coords.height * 1.5,
      }}
      className={`absolute top-full ${
        position === "right" ? "-translate-x-full" : ""
      } ${className}`}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLElement
  );
}

export default Popover;
