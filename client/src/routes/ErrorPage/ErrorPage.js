import PropTypes from "prop-types";

// Components
import { Box } from "@mui/material";
import { Typography } from "components";
import { Link } from "react-router-dom";

// Utils
import { useLocation } from "react-router-dom";

// Constants
import { ERROR_PAGE_LINK, ERROR_PAGE_MESSAGE_DEFAULT } from "constants/index";

function ErrorPage({ message }) {
  const { state } = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Typography variant="h5" color="redMain">
        {message || state?.message}
      </Typography>
      <Box
        mt={1}
        sx={{
          color: "custom.redMain",
          a: { color: "custom.redMain", marginLeft: 0.5 },
        }}
      >
        <Link to="/">{ERROR_PAGE_LINK}</Link>
      </Box>
    </Box>
  );
}

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};

ErrorPage.defaultProps = {
  message: ERROR_PAGE_MESSAGE_DEFAULT,
};

export default ErrorPage;
