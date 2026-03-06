import {cloneElement, isValidElement, useEffect, useState} from "react";

export function Visible({
  children,
  status,
  delay = 0,
}: {
  children?: React.ReactElement<{isVisible: boolean}>;
  status: boolean;
  delay?: number;
}) {
  const [active, setActive] = useState(status);
  const [passive, setPassive] = useState(status);

  useEffect(() => {
    if (status === active) {
      return;
    }

    if (status || delay <= 0) {
      setPassive(status);
      setActive(status);
      return;
    }

    setActive(status);
  }, [active, status, delay]);

  useEffect(() => {
    if (passive === active) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setPassive(active);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [active, passive, delay]);

  if (passive === false) {
    return null;
  }

  if (!isValidElement(children)) {
    return children;
  }

  return cloneElement(children, {
    isVisible: active,
  });
}
