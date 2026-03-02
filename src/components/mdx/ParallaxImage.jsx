
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({ src, alt, caption }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

    return (
        <figure className="my-12 w-full overflow-hidden rounded-xl shadow-2xl" ref={ref}>
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
                <motion.img
                    style={{ y, scale }}
                    src={src}
                    alt={alt}
                    className="absolute top-[-10%] left-0 w-full h-[120%] object-cover"
                />
            </div>
            {caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-4 italic font-mono">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
