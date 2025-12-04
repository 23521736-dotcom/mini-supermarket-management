import { useState, useCallback } from "react";

export const useNotification = () => {
  const [successNotification, setSuccessNotification] = useState({
    isVisible: false,
    title: "",
    message: "",
  });

  const [errorNotification, setErrorNotification] = useState({
    isVisible: false,
    title: "",
    message: "",
  });

  const showSuccess = useCallback(
    (title = "Success!", message = "Operation completed successfully.") => {
      setSuccessNotification({
        isVisible: true,
        title,
        message,
      });
    },
    []
  );

  const showError = useCallback(
    (title = "Error!", message = "Something went wrong. Please try again.") => {
      setErrorNotification({
        isVisible: true,
        title,
        message,
      });
    },
    []
  );

  const hideSuccess = useCallback(() => {
    setSuccessNotification((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const hideError = useCallback(() => {
    setErrorNotification((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    successNotification,
    errorNotification,
    showSuccess,
    showError,
    hideSuccess,
    hideError,
  };
};
