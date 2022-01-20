import { createElement } from "react";
import PropTypes from "prop-types";

// Components
import { Paper as MUIPaper } from "@mui/material";

export function Paper({ children, onClick }) {
  return (
    <MUIPaper
      elevation={1}
      sx={{
        borderRadius: 4,
        padding: 2,
        borderWidth: 2,
        width: "100%",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        borderColor: "transparent",
        borderStyle: "solid",
        "&:hover": {
          borderColor: "custom.redSecondary",
        },
      }}
      onClick={onClick}
    >
      {children}
    </MUIPaper>
  );
}

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

Paper.defaultProps = {
  children: createElement("div"),
  onClick: () => {},
};
