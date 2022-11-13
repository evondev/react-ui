import { useEffect, useRef, useState } from "react";
import { Coords } from "../types/global";

export default function useGetElementCoords() {
  const elmRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const handleGetElementCoords = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const node = e.target as HTMLElement;
    const clientRect = node.getBoundingClientRect() as DOMRect;
    setCoords({
      x: clientRect.left,
      y: clientRect.top + window?.scrollY,
      width: clientRect.width,
      height: clientRect.height,
    });
  };
  useEffect(() => {
    function handleElementResize() {
      if (elmRef.current) {
        const node = elmRef.current;
        const clientRect = node.getBoundingClientRect() as DOMRect;
        setCoords({
          x: clientRect.left,
          y: clientRect.top + window?.scrollY,
          width: clientRect.width,
          height: clientRect.height,
        });
      }
    }
    window.addEventListener("resize", handleElementResize);
    return () => {
      window.removeEventListener("resize", handleElementResize);
    };
  }, []);
  return {
    coords,
    elmRef,
    handleGetElementCoords,
  };
}
