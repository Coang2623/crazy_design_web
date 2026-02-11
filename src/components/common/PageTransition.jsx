
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -20 },
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear', duration: 0.3 }}
            className="w-full flex-grow flex flex-col"
        >
            {children}
        </motion.div>
    );
}
