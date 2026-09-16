import { useEffect, useRef } from "react";

export default function TagsRow({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const children = Array.from(container.children) as HTMLElement[];
      for (const child of children) child.style.display = "inline-flex";

      const maxWidth = container.clientWidth;
      const padding = 8;

      let total = 0;
      for (const child of children) {
        total += child.offsetWidth + 4;
        if (total > maxWidth - padding) child.style.display = "none";
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-full gap-1 overflow-hidden flex-nowrap"
    >
      {tags.map((tag) => (
        <Tag key={tag} title={tag} />
      ))}
    </div>
  );
}

function Tag({ title }: { title: string }) {
  return (
    <div className="flex-none inline-flex justify-center items-center text-xs bg-gray-6 px-1 mr-1">
      {title}
    </div>
  );
}
