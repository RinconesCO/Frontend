import React, { useState, useMemo } from "react";

type Props = {
  images: string[];
};

export default function CoverflowCarousel({ images }: Props) {
  const [active, setActive] = useState(0);

  const len = images.length;

  const goPrev = () => setActive((s) => (s - 1 + len) % len);
  const goNext = () => setActive((s) => (s + 1) % len);

  const spacing = 160; // px between centers (rough base, responsive visually)

  // prepare positions with wrap-aware offsets
  const items = useMemo(() => {
    return images.map((src, i) => {
      let diff = i - active;
      if (diff > len / 2) diff -= len;
      if (diff < -len / 2) diff += len;

      const abs = Math.abs(diff);
      const scale = diff === 0 ? 1.2 : abs === 1 ? 0.95 : 0.75;
      const opacity = diff === 0 ? 1 : abs === 1 ? 0.9 : 0.5;
      const z = diff === 0 ? 40 : abs === 1 ? 30 : 10;
      const translateX = diff * spacing;

      return { src, diff, scale, opacity, z, translateX, index: i };
    });
  }, [images, active, len]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative">
        <h3 className="mb-6 text-2xl font-bold">Galería</h3>

        <div className="relative w-full flex items-center justify-center">
          <button
            aria-label="Anterior"
            onClick={goPrev}
            style={{ zIndex: 45 }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 text-white p-3 md:p-4 rounded-full shadow-lg backdrop-blur-sm transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="w-full h-80 md:h-96 flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full">
              {items
                .filter((it) => Math.abs(it.diff) <= 2) // show only center ±2
                .map((it) => (
                  <div
                    key={it.index}
                    onClick={() => setActive(it.index)}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%,-50%) translateX(${it.translateX}px) scale(${it.scale})`,
                      opacity: it.opacity,
                      zIndex: it.z,
                    }}
                    className={`absolute transition-all duration-500 ease-in-out rounded-2xl shadow-lg overflow-hidden bg-gray-100 cursor-pointer`}
                  >
                    <div className="w-56 md:w-72 lg:w-80 aspect-[3/4]">
                      <img
                        src={it.src}
                        alt={`Slide ${it.index + 1}`}
                        draggable={false}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button
            aria-label="Siguiente"
            onClick={goNext}
            style={{ zIndex: 45 }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/60 text-white p-3 md:p-4 rounded-full shadow-lg backdrop-blur-sm transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
