import { createElement } from "react";
import PropTypes from "prop-types";

// Components
import { Box } from "@mui/material";

export function InputWrapper({ children }) {
  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      maxWidth={400}
      width="100%"
      height={70}
      margin="auto"
      sx={{
        "& .MuiLoadingButton-root": {
          backgroundColor: "custom.redMain",
          paddingLeft: 2.5,
          paddingRight: 2.5,
        },
      }}
    >
      {children}
    </Box>
  );
}

InputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

InputWrapper.defaultProps = {
  children: createElement("div"),
};
