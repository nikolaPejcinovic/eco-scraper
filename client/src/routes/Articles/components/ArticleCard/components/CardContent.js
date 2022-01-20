import PropTypes from "prop-types";

// Components
import { CallMade } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Typography } from "components";

// Constants
import { CARD_HEADLINE_DEFAULT } from "constants/index";

export function CardContent({ headline, deck, link }) {
  function handleClick(e) {
    e.stopPropagation();
    window.open(link);
  }

  return (
    <>
      <Box display="flex" alignItems="flex-start" height="100%">
        <Typography
          variant="h5"
          color="redMain"
          sx={{ fontWeight: 700, margin: "auto auto auto 0" }}
        >
          {headline}
        </Typography>
        <IconButton
          sx={{ marginLeft: 1.5, color: "custom.redSecondary" }}
          onClick={handleClick}
        >
          <CallMade />
        </IconButton>
      </Box>
      {deck && (
        <Typography
          variant="body2"
          color="greyMain"
          sx={{ fontWeight: 300, marginTop: 2 }}
        >
          {deck}
        </Typography>
      )}
    </>
  );
}

CardContent.propTypes = {
  headline: PropTypes.string.isRequired,
  deck: PropTypes.string,
  link: PropTypes.string.isRequired,
};

CardContent.defaultProps = {
  headline: CARD_HEADLINE_DEFAULT,
  link: "",
};
