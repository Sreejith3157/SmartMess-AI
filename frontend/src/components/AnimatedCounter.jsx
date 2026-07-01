import { useEffect, useState } from "react";

function AnimatedCounter({
  value,
  duration = 1200,
  suffix = "",
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);

    if (isNaN(end)) return;

    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <>
      {Number(count).toFixed(
        Number(value) % 1 !== 0 ? 2 : 0
      )}
      {suffix}
    </>
  );
}

export default AnimatedCounter;