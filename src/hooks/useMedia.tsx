import { useCallback, useEffect, useState } from "react";

const useMedia = (media: number) => {
  const [match, setMatch] = useState<boolean>(false);

  const _handleResize = useCallback(() => {
    const { matches } = window.matchMedia(`(max-width: ${media}px)`);

    setMatch(matches);
  }, [media]);

  useEffect(() => {
    if (window.innerWidth <= media) setMatch(true);
    window.addEventListener("resize", _handleResize);

    return () => window.removeEventListener("resize", _handleResize);
  }, [_handleResize, media]);

  return match;
};

export default useMedia;
