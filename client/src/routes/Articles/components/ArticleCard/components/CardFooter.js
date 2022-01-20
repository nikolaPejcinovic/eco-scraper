import PropTypes from "prop-types";

// Components
import { DateRange } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Typography } from "components";

export function CardFooter({ date }) {
  if (date) {
    return (
      <Box
        display="flex"
        alignItems="flex-end"
        mt={2}
        mb="-6px"
        sx={{ color: "custom.redSecondary" }}
      >
        <DateRange sx={{ marginRight: 1 }} />
        <Typography variant="body2" color="greyMain" sx={{ fontWeight: 300 }}>
          {date}
        </Typography>
      </Box>
    );
  }

  return null;
}

CardFooter.propTypes = {
  date: PropTypes.string,
};
