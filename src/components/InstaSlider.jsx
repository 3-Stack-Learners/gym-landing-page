import React from "react";
import mf2Image from "../assets/mf2.jpg";
import mfImage from "../assets/mf.jpg";

const images = [
  mf2Image,
  mfImage,
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
];

const repeatedImages = [...images, ...images];

const InstaSlider = () => {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      <div className="w-full overflow-hidden whitespace-nowrap relative flex items-center bg-transparent py-4">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-4 animate-marquee">
          {repeatedImages.map((src, idx) => (
            <img
              key={`${idx}-${src}`}
              src={src}
              alt={`gallery-${idx}`}
              draggable={false}
              className="w-56 h-72 sm:w-72 sm:h-96 md:w-80 md:h-[420px] object-cover rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 ease-in-out hover:scale-105 hover:border-red-500/50 hover:shadow-red-500/10 cursor-pointer shrink-0"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InstaSlider;

