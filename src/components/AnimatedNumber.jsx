// src/components/AnimatedNumber.jsx
import { useEffect, useState } from "react";
import { animate } from "framer-motion";

const AnimatedNumber = ({ value, duration = 1.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate: (latest) => {
        setDisplayValue(Number(latest.toFixed(2)).toLocaleString());
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <>{displayValue}</>;
};

export default AnimatedNumber;
