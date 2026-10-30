"use client";

type Line = { cls: "title" | "cmd" | "out" | "warn"; text: string };

export default function MiniTerminal({ lines }: { lines: Line[] }) {
  return (
    <div className="mini-terminal" dir="ltr">
      {lines.map((line, i) => (
        <p key={i} className={line.cls === "title" ? "mt-title" : `mt-${line.cls}`}>
          {line.text}
        </p>
      ))}
    </div>
  );
}
