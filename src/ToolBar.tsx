import { useState, useEffect, useRef } from "react";
import Tools from "./types/Tools";

interface Position {
  x: number;
  y: number;
}

interface ToolbarProps {
  onSelect: (tool: Tools) => void;
}

const tools = [
  { label: "Selection Tool", value: Tools.Selection },
  { label: "Start State", value: Tools.Start },
  { label: "Accepting State", value: Tools.Accept },
  { label: "Normal State", value: Tools.Normal },
  { label: "Transition Line", value: Tools.Transition },
];

function ToolBar({ onSelect }: ToolbarProps) {
  const [selected, setSelected] = useState<Tools>(Tools.Selection);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => setDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = toolbarRef.current?.getBoundingClientRect();
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setDragging(true);
    }
  };

  return (
    <div
      ref={toolbarRef}
      className="absolute bg-white shadow-xl border border-gray-300 rounded-lg p-3 z-50 cursor-move w-48"
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
    >
      <h3 className="text-center font-bold mb-2 text-gray-700">Toolbar</h3>
      <div className="flex flex-col gap-2">
        {tools.map((tool) => (
          <button
            key={tool.value}
            onClick={() => {
              setSelected(tool.value);
              onSelect(tool.value);
            }}
            className={`px-3 py-2 text-sm rounded-md border ${
              selected === tool.value
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ToolBar;
