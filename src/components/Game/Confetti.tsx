// ConfettiComponent.tsx
import React, { useEffect } from "react";
import confetti from "canvas-confetti";

type Origin = { x: number; y: number };

const ConfettiComponent: React.FC = () => {
  useEffect(() => {
    // Configuration for the big blow of confetti
    const defaults = {
      startVelocity: 50, // Control how far the confetti goes across the screen
      spread: 330,
      ticks: 300, // Increase ticks to make confetti fall more slowly
      zIndex: Number.MAX_SAFE_INTEGER,
      gravity: 0.4, // Lower gravity makes the confetti fall more slowly
      scalar: 1.5, // Adjust size of the confetti particles
      decay: 0.9, // Less decay makes the confetti slow down more slowly
    };

    // Amount of confetti particles
    const particleCount = 800; // Increase particle count for a bigger burst

    const confettiDefaults = { ...defaults, particleCount };
    const launchConfetti = (origin: Origin) => {
      confetti({ ...confettiDefaults, origin });
    };

    const scheduleConfetti = (origin: Origin, delay: number) => {
      setTimeout(() => launchConfetti(origin), delay);
    };

    // Confetti from the left
    launchConfetti({ x: 0, y: 0.8 });
    scheduleConfetti({ x: 0, y: 0.4 }, 1000);
    scheduleConfetti({ x: 0, y: 0 }, 2000);

    // Confetti from the right
    launchConfetti({ x: 1, y: 0.4 });
    scheduleConfetti({ x: 1, y: 0 }, 1000);
    scheduleConfetti({ x: 1, y: 0.8 }, 2000);
  }, []);

  return null; // This component does not render anything
};

export default ConfettiComponent;
