import React, { useState, useEffect } from 'react';

/**
 * Delayed component
 * Only renders its children after a specified delay.
 * Useful for preventing skeleton flicker on fast connections.
 */
const Delayed = ({ children, delay = 500 }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender ? <>{children}</> : null;
};

export default Delayed;
