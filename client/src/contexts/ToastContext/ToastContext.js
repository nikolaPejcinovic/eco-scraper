import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  createElement,
} from "react";
import PropTypes from "prop-types";

// Components
import { Toast } from "components/Toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [toast, setToast] = useState(null);

  const openToast = useCallback((data) => {
    setOpen(true);
    setToast(data);
  }, []);

  const dismissToast = useCallback(() => {
    setOpen(false);
    setToast(null);
  }, []);

  const actionsValue = useMemo(
    () => ({
      openToast,
      dismissToast,
    }),
    [openToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={actionsValue}>
      {children}
      {open && toast && (
        <Toast open={open} toast={toast} dismissToast={dismissToast} />
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ToastProvider.defaultProps = {
  children: createElement("div"),
};

export const useToastContext = () => useContext(ToastContext);
