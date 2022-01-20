import PropTypes from "prop-types";

// Components
import { Typography } from "components";

// Constants
import { LOGO_DESKTOP, LOGO_MOBILE } from "constants/index";

export function LogoTypography({ smallScreens }) {
  return (
    <Typography variant={smallScreens ? "h6" : "h4"} color="white">
      {smallScreens ? LOGO_MOBILE : LOGO_DESKTOP}
    </Typography>
  );
}

LogoTypography.propTypes = {
  smallScreens: PropTypes.bool,
};
