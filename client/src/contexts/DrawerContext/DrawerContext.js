import {
  useContext,
  useState,
  createContext,
  useMemo,
  useCallback,
  createElement,
} from "react";
import PropTypes from "prop-types";

// Components
import { Drawer } from "@mui/material";

const DrawerStateContext = createContext(null);

const DrawerActionsContext = createContext(null);

export const useDrawerState = () => useContext(DrawerStateContext);
export const useDrawerActions = () => useContext(DrawerActionsContext);

export const useDrawerContext = () => [useDrawerState(), useDrawerActions()];

export function DrawerProvider({ children }) {
  const [drawer, setDrawer] = useState(null);
  const [open, setOpen] = useState(false);

  const setDrawerCallback = useCallback(setDrawer, [setDrawer]);

  const setOpenCallback = useCallback(setOpen, [setOpen]);

  const stateValue = useMemo(
    () => ({
      drawer,
      open,
    }),
    [drawer, open]
  );

  const actionsValue = useMemo(
    () => ({
      setDrawer: setDrawerCallback,
      setOpen: setOpenCallback,
    }),
    [setDrawerCallback, setOpenCallback]
  );

  function handleClose() {
    setOpen(false);
  }

  return (
    <DrawerStateContext.Provider value={stateValue}>
      <DrawerActionsContext.Provider value={actionsValue}>
        <Drawer
          anchor="left"
          open={open && Boolean(drawer?.content)}
          onClose={handleClose}
          sx={{
            // width: "50%",
            "& .MuiPaper-root": { width: "100%", maxWidth: 600 },
          }}
        >
          {drawer?.content}
        </Drawer>
        {children}
      </DrawerActionsContext.Provider>
    </DrawerStateContext.Provider>
  );
}

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

DrawerProvider.defaultProps = {
  children: createElement("div"),
};
