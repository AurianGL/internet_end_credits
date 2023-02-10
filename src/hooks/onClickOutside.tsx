import React, { useEffect, MutableRefObject, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const [focus, setFocus] = useState<boolean>(true)
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFocus(false) 
      }
    }
    console.log(focus)
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return focus
}

/**
 * Component that alerts if you click outside of it
 */
