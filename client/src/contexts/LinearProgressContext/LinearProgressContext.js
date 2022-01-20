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
import { LinearProgress, Box } from "@mui/material";

const LinearProgressContext = createContext(null);

export const LinearProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);

  const setProgressCallback = useCallback(setProgress, [setProgress]);

  const progressMemo = useMemo(() => progress, [progress]);

  const valueMemo = useMemo(
    () => ({
      setProgress: setProgressCallback,
      progress: progressMemo,
    }),
    [setProgressCallback, progressMemo]
  );

  return (
    <LinearProgressContext.Provider value={valueMemo}>
      <Box
        zIndex={1300}
        position="fixed"
        top={0}
        right={0}
        left={0}
        sx={{
          "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "custom.redMain",
          },
          "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: "custom.redLight",
          },
        }}
      >
        {progress && <LinearProgress />}
      </Box>
      {children}
    </LinearProgressContext.Provider>
  );
};

LinearProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

LinearProgressProvider.defaultProps = {
  children: createElement("div"),
};

export const useLinearProgressContext = () => useContext(LinearProgressContext);
