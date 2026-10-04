import { useEffect, useState } from "react";

export function useScrollProgress(sectionIds) {
  const [scrollY, setScrollY] = useState(0);
  const [offsets, setOffsets] = useState({});

  useEffect(() => {
    const measure = () => {
      const next = {};
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        next[id] = el ? el.offsetTop : 0;
      });
      setOffsets(next);
    };

    measure();
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure);

    // re-measure after fonts/images settle
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 1200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { scrollY, offsets };
}