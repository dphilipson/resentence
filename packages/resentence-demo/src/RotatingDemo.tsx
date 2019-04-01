import classNames from "classnames";
import React, { memo, ReactElement, useEffect, useRef, useState } from "react";
import Resentence from "resentence";

interface Props {
  className?: string;
  entries: string[];
  interval: number;
  align: "left" | "center" | "right";
}

const RotatingDemo = memo(function RotatingDemo({
  className,
  entries,
  interval,
  align,
}: Props): ReactElement | null {
  const [index, setIndex] = useState(0);
  useInterval(showNextEntry, interval);

  if (entries.length === 0) {
    return null;
  }
  return (
    <Resentence className={classNames("demo-readout", className)} align={align}>
      {entries[index % entries.length]}
    </Resentence>
  );

  function showNextEntry(): void {
    setIndex(i => (i + 1) % entries.length);
  }
});
export default RotatingDemo;

function useInterval(callback: () => void, delay: number): void {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const id = setInterval(callbackRef.current, delay);
    return () => clearInterval(id);
  }, [delay]);
}
