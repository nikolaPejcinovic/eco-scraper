import PropTypes from "prop-types";

// Components
import { Typography } from "components";

export function PanelDate({ date }) {
  if (date) {
    return (
      <Typography
        variant="body2"
        color="redSecondary"
        sx={{ fontWeight: 300, marginTop: 2 }}
      >
        {date}
      </Typography>
    );
  }

  return null;
}

PanelDate.propTypes = {
  date: PropTypes.string,
};
