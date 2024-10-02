import confetti from "canvas-confetti";

export const triggerConfetti = () => {
    const isMobile = window.innerWidth <= 768; // Adjust for mobile screen size

    // Determine the starting position and angle based on device type
    const startOriginY = isMobile ? 1 : 0.6;  // Start at bottom for mobile, middle for desktop
    const angle = isMobile ? 90 : 270;        // Shoot upwards from bottom for mobile, vertical for desktop
    const spread = isMobile ? 80 : 200;

    const yAxis = isMobile ? 0.9 : 1.3;

    confetti({
        particleCount: 200,
        spread: spread,
        origin: { y: startOriginY },  // Adjust starting point
        angle: 90,                 // Adjust angle based on device
        gravity: 0.4,
        scalar: 1.2,
    });

    // Second burst (dynamic adjustment for mobile and desktop)
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: yAxis }, // For mobile, slightly above bottom; for desktop, lower middle
            // angle: isMobile ?  150: 250,          // Adjust angle for leftward spread on mobile
            angle: 150,
            gravity: 0.3,
            decay: 0.95,
        });
    }, 600);

    // Third burst (dynamic adjustment for mobile and desktop)
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: yAxis },  // For mobile, near bottom; for desktop, a bit higher
            // angle: isMobile ? 70:40 ,           // Adjust angle for rightward spread on mobile
            angle: 75,
            gravity: 0.2,
            decay: 0.98, // Slow decay for longer effect
        });
    }, 1200);
}
