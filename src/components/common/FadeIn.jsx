import React, { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll reveal component using Intersection Observer.
 * No external dependencies. CSS-only animations.
 */
export default function FadeIn({
    children,
    className = '',
    delay = 0,
    direction = 'up', // 'up', 'down', 'left', 'right', 'none'
    duration = 600,
    threshold = 0.1
}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    const transforms = {
        up: 'translateY(30px)',
        down: 'translateY(-30px)',
        left: 'translateX(30px)',
        right: 'translateX(-30px)',
        none: 'none',
    };

    const style = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transforms[direction],
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    };

    return (
        <div ref={ref} style={style} className={className}>
            {children}
        </div>
    );
}
