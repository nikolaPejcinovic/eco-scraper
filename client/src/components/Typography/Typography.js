import PropTypes from "prop-types";

// Components
import { Typography as MUITypography } from "@mui/material";

export function Typography({ color, ...rest }) {
  return (
    <MUITypography {...rest} sx={{ color: `custom.${color}`, ...rest.sx }} />
  );
}

Typography.propTypes = {
  color: PropTypes.string.isRequired,
};

Typography.defaultProps = {
  color: "black",
};
