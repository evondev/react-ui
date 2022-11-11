import { EventHandler, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// React Portal
// getBoundingClientRect
type Position = "left" | "right";
type Coords = {
  x: number;
  y: number;
  width: number;
  height: number;
};
function App() {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const handleClickAvatar = (
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
    setIsShowDropdown((s) => !s);
  };
  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutPopover(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        setIsShowDropdown(false);
      }
    }
    document.addEventListener("click", handleClickOutPopover);
    return () => {
      document.removeEventListener("click", handleClickOutPopover);
    };
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative" ref={nodeRef}>
        <div className="w-10 h-10 cursor-pointer" onClick={handleClickAvatar}>
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        {isShowDropdown && (
          <DropdownContent position="right" coords={coords}></DropdownContent>
        )}
      </div>
    </div>
  );
}

function DropdownContent({
  coords,
  position = "left",
}: {
  coords: Coords;
  position: Position;
}) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      style={{
        [position]: coords.x,
        top: coords.y + coords.height * 1.5,
      }}
      className="absolute top-full bg-white rounded-2xl shadow z-10 w-[230px] py-6 px-5"
    >
      <div className="flex flex-col gap-5 pb-7 mb-7 border-b border-b-gray-200">
        <a
          href="#"
          className="font-medium text-gray-700 inline-block hover:text-blue-500"
        >
          Account
        </a>
        <a
          href="#"
          className="font-medium text-gray-700 inline-block hover:text-blue-500"
        >
          Settings
        </a>
      </div>
      <button className="flex items-center gap-3 hover:opacity-80">
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.36751 8.48109L2.72685 7.82742L6.40267 7.82742C6.61506 7.82742 6.81876 7.74025 6.96894 7.58508C7.11913 7.4299 7.2035 7.21945 7.2035 7C7.2035 6.78055 7.11913 6.5701 6.96894 6.41492C6.81876 6.25975 6.61506 6.17258 6.40267 6.17258L2.72685 6.17258L3.36751 5.51891C3.44257 5.44199 3.50215 5.35048 3.54281 5.24965C3.58346 5.14882 3.6044 5.04067 3.6044 4.93144C3.6044 4.82221 3.58346 4.71406 3.54281 4.61324C3.50215 4.51241 3.44257 4.42089 3.36751 4.34397C3.29306 4.26642 3.20449 4.20486 3.1069 4.16286C3.00931 4.12085 2.90464 4.09922 2.79892 4.09922C2.6932 4.09922 2.58853 4.12085 2.49094 4.16286C2.39335 4.20486 2.30478 4.26642 2.23033 4.34397L0.228248 6.41253C0.15534 6.49122 0.0981881 6.58401 0.0600729 6.68558C-0.0200247 6.88702 -0.0200247 7.11298 0.060073 7.31442C0.0981881 7.41599 0.15534 7.50878 0.228248 7.58747L2.23033 9.65603C2.38113 9.81183 2.58566 9.89936 2.79892 9.89936C3.01218 9.89936 3.21671 9.81183 3.36751 9.65603C3.51831 9.50022 3.60303 9.2889 3.60303 9.06856C3.60303 8.84821 3.51831 8.63689 3.36751 8.48109ZM4.44864 2.03546C4.37292 2.1137 4.31285 2.20658 4.27187 2.30879C4.23089 2.41101 4.2098 2.52057 4.2098 2.63121C4.2098 2.74185 4.23089 2.8514 4.27187 2.95362C4.31285 3.05584 4.37292 3.14872 4.44864 3.22695C4.52436 3.30519 4.61425 3.36724 4.71318 3.40958C4.81211 3.45192 4.91815 3.47372 5.02523 3.47372C5.13232 3.47372 5.23836 3.45192 5.33729 3.40958C5.43622 3.36724 5.52611 3.30519 5.60183 3.22695C6.32415 2.48038 7.24453 1.9719 8.24656 1.76581C9.2486 1.55973 10.2873 1.6653 11.2312 2.06918C12.1752 2.47306 12.982 3.1571 13.5497 4.03479C14.1174 4.91247 14.4203 5.94438 14.4203 7C14.4203 8.05562 14.1174 9.08753 13.5497 9.96521C12.982 10.8429 12.1752 11.5269 11.2312 11.9308C10.2873 12.3347 9.2486 12.4403 8.24656 12.2342C7.24453 12.0281 6.32415 11.5196 5.60183 10.773C5.52611 10.6948 5.43622 10.6328 5.33729 10.5904C5.23836 10.5481 5.13232 10.5263 5.02524 10.5263C4.91815 10.5263 4.81212 10.5481 4.71318 10.5904C4.61425 10.6328 4.52436 10.6948 4.44864 10.773C4.37292 10.8513 4.31285 10.9442 4.27187 11.0464C4.23089 11.1486 4.2098 11.2582 4.2098 11.3688C4.2098 11.4794 4.23089 11.589 4.27187 11.6912C4.31285 11.7934 4.37292 11.8863 4.44864 11.9645C5.39775 12.9393 6.60501 13.6018 7.91813 13.8685C9.23125 14.1352 10.5914 13.9942 11.827 13.4631C13.0626 12.9321 14.1184 12.0349 14.861 10.8846C15.6037 9.7344 16 8.38268 16 7C16 5.61731 15.6037 4.2656 14.861 3.11536C14.1184 1.96513 13.0626 1.0679 11.827 0.536863C10.5914 0.00582172 9.23125 -0.135245 7.91813 0.131459C6.60501 0.398163 5.39775 1.06069 4.44864 2.03546Z"
            fill="#777E90"
          />
        </svg>
        <span>Sign out</span>
      </button>
    </div>,
    document.getElementById("root") as HTMLElement
  );
}

export default App;
