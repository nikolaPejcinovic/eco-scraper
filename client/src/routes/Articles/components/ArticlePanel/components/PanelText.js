import PropTypes from "prop-types";

// Components
import { Typography } from "components";

export function PanelText({ textParagraphs }) {
  if (textParagraphs.length) {
    return (
      <>
        {textParagraphs.map((p) => (
          <Typography
            key={p}
            variant="body2"
            color="greyMain"
            sx={{ fontWeight: 300, marginTop: 2 }}
          >
            {p}
          </Typography>
        ))}
      </>
    );
  }

  return null;
}

PanelText.propTypes = {
  textParagraphs: PropTypes.arrayOf(PropTypes.string),
};
