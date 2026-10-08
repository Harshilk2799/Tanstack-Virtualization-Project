import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const rows = Array.from({ length: 1000000 }, (_, i) => `Row ${i}`);

function VirtualDemo() {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // px height per row
    overscan: 5, // extra items rendered above/below
  });
  return (
    <div
      ref={parentRef}
      style={{ height: 400, overflow: "auto", border: "1px solid black" }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <div
            key={item.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: item.size,
              transform: `translateY(${item.start}px)`,
            }}
          >
            {rows[item.index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualDemo;
