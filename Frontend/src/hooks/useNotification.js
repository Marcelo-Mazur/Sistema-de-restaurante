import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_NOTIFICATION = { message: "", type: "success" };

export function useNotification(options = {}) {
  const { autoHideDuration = null } = options;
  const timeoutRef = useRef(null);
  const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

  const clearNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setNotification(DEFAULT_NOTIFICATION);
  }, []);

  const showNotification = useCallback(
    (message, type = "success", duration = autoHideDuration) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setNotification({ message, type });

      if (duration) {
        timeoutRef.current = setTimeout(() => {
          setNotification(DEFAULT_NOTIFICATION);
          timeoutRef.current = null;
        }, duration);
      }
    },
    [autoHideDuration]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    notification,
    showNotification,
    clearNotification,
    setNotification: showNotification,
  };
}
