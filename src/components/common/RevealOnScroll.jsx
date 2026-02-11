
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function RevealOnScroll({ children, delay = 0, width = "100%" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <div ref={ref} style={{ width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
}
