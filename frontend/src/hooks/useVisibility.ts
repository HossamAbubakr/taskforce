import { useState, useEffect, useRef } from "react";

function useVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (ref.current) {
      ref.current.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (ref.current) {
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return [ref, isVisible, setIsVisible] as const;
}

export default useVisibility;
