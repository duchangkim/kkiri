import { useState, useEffect } from "react";

// 윈도우 크기를 감지 -> 특정 사이즈 이상일 경우 true 리턴
export const useWindowMatches = () => {
  const [windowMatches, setWindowMatches] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowMatches(window.matchMedia(`(min-width: 768px)`).matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // empty array ensures that effect is only run on mount
  return windowMatches;
};
