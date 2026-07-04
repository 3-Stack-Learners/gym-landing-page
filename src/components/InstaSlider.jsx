import React from "react";

const images = [
  "src/assets/mf2.jpg",
  "src/assets/mf.jpg",
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
              className="h-36 w-36 sm:h-48 sm:w-48 md:h-64 md:w-64 object-cover rounded-xl shadow-lg shrink-0"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InstaSlider;

