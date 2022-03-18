import { RefObject, useCallback, useEffect } from "react";

type FunctionTypeClick = (value: boolean) => void;
type ElmentTypeClick = RefObject<HTMLElement>;

const useClickOutside = (
  element: ElmentTypeClick,
  handler: FunctionTypeClick
) => {
  const _handleClick = useCallback(
    (event: any) => {
      if (element.current && element.current?.contains(event.target))
        handler(false);
      else handler(true);
    },
    [element, handler]
  );

  useEffect(() => {
    window.addEventListener("click", _handleClick);
    return () => window.removeEventListener("click", _handleClick);
  }, [_handleClick]);
};

export default useClickOutside;
