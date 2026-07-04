import React, { useEffect, useRef, useState } from 'react';


const images = [
    'src/assets/mf2.jpg',
    'src/assets/mf.jpg',
	'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
];

const Tripled = [...images, ...images, ...images];

// Measurements used for snapping bounds
const CARD_WIDTH = 256; // w-64
const GAP = 24; // gap-6
const ITEMS = images.length; // 7
const SET_WIDTH = ITEMS * CARD_WIDTH + (ITEMS - 1) * GAP;

const InstaSlider = () => {
	// 1. Pure State Transformation
	const [transformOffset, setTransformOffsetState] = useState(-1500);
	const [isDragging, setIsDragging] = useState(false);

	const transformRef = useRef(transformOffset);
	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const startYRef = useRef(0);
	const rafRef = useRef(null);
	const wrapperRef = useRef(null);

	const setTransformOffset = (updater) => {
		setTransformOffsetState((prev) => {
			const next = typeof updater === 'function' ? updater(prev) : updater;
			transformRef.current = next;
			return next;
		});
	};

	// 2. High-Speed Vertical Wheel Capture (inline on main wrapper)
	const handleWheel = (e) => {
		if (e.deltaY !== 0) {
			// high-speed shift
			setTransformOffset((prev) => prev - e.deltaY * 3.5);
		}
	};

	// 3. Laptop Mouse Drag System
	const handleMouseDown = (e) => {
		// allow left button only
		if (e.button !== 0) return;
		e.preventDefault();
		isDraggingRef.current = true;
		setIsDragging(true);
		startXRef.current = e.clientX;
		startYRef.current = e.clientY;
	};

	const handleMouseMove = (e) => {
		if (!isDraggingRef.current) return;
		const currentX = e.clientX;
		const deltaX = currentX - startXRef.current;
		startXRef.current = currentX;
		setTransformOffset((prev) => prev + deltaX);
	};

	const handleMouseUpOrLeave = () => {
		isDraggingRef.current = false;
		setIsDragging(false);
	};

	// 4. Mobile Touch Sync
	const handleTouchStart = (e) => {
		const t = e.touches && e.touches[0];
		if (!t) return;
		isDraggingRef.current = true;
		setIsDragging(true);
		startXRef.current = t.clientX;
		startYRef.current = t.clientY;
	};

	const handleTouchMove = (e) => {
		if (!isDraggingRef.current) return;
		const t = e.touches && e.touches[0];
		if (!t) return;
		const diffX = t.clientX - startXRef.current;
		const diffY = t.clientY - startYRef.current;

		if (Math.abs(diffX) > Math.abs(diffY)) {
			e.preventDefault();
			startXRef.current = t.clientX;
			setTransformOffset((prev) => prev + diffX);
		}
	};

	const handleTouchEnd = () => {
		isDraggingRef.current = false;
		setIsDragging(false);
	};

	// 5. Absolute Infinite Looping via RAF
	useEffect(() => {
		transformRef.current = transformOffset;

		const loop = () => {
			const val = transformRef.current;
			// If moved too far left (< -2 * set) snap right by one set
			if (val < -SET_WIDTH * 2) {
				// disable transition for instant snap
				setIsDragging(true);
				setTransformOffset((prev) => prev + SET_WIDTH);
				setTimeout(() => setIsDragging(false), 20);
			} else if (val > 0) {
				setIsDragging(true);
				setTransformOffset((prev) => prev - SET_WIDTH);
				setTimeout(() => setIsDragging(false), 20);
			}

			rafRef.current = requestAnimationFrame(loop);
		};

		rafRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(rafRef.current);
	}, []);

	useEffect(() => {
		transformRef.current = transformOffset;
	}, [transformOffset]);

	return (
		<div
			className="w-full overflow-hidden bg-slate-950 py-1 relative select-none"
			onWheel={handleWheel}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUpOrLeave}
			onMouseLeave={handleMouseUpOrLeave}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			ref={wrapperRef}
		>
			{/* Left Gradient Overlay */}
			<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent" />

			{/* Right Gradient Overlay */}
			<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent" />

			<div
				style={{
					transform: `translateX(${transformOffset}px)`,
					transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
					willChange: 'transform',
				}}
				className="flex gap-6"
			>
				{Tripled.map((src, idx) => (
					<img
						key={`${idx}-${src}`}
						src={src}
						alt={`gallery-${idx}`}
						draggable={false}
						className="w-64 h-75 object-cover rounded-xl shrink-0 border border-slate-900 pointer-events-none"
					/>
				))}
			</div>
		</div>
	);
};

export default InstaSlider;

