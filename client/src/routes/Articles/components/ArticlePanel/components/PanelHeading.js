import PropTypes from "prop-types";

// Components
import { Typography } from "components";

// Constants
import { CARD_HEADLINE_DEFAULT } from "constants/index";

export function PanelHeading({ headline, deck }) {
  return (
    <>
      <Typography
        variant="h5"
        color="redMain"
        sx={{
          fontWeight: 700,
          margin: "16px auto auto 0",
        }}
      >
        {headline}
      </Typography>
      {deck && (
        <Typography
          variant="body2"
          color="redMain"
          sx={{ fontWeight: 300, marginTop: 2, textTransform: "uppercase" }}
        >
          {deck}
        </Typography>
      )}
    </>
  );
}

PanelHeading.propTypes = {
  headline: PropTypes.string.isRequired,
  deck: PropTypes.string,
};

PanelHeading.defaultProps = {
  headline: CARD_HEADLINE_DEFAULT,
};
