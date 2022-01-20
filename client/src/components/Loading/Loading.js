import PropTypes from "prop-types";

// Components
import { Box, CircularProgress } from "@mui/material";

export function Loading({ boxProps }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      {...boxProps}
    >
      <CircularProgress sx={{ color: "custom.redMain" }} />
    </Box>
  );
}

Loading.propTypes = {
  boxProps: PropTypes.object,
};
