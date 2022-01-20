import React from "react";
import PropTypes from "prop-types";

// Components
import { Box, IconButton, Snackbar as MUISnackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Typography } from "components/Typography";

// Constants
import {
  TOAST_MESSAGE_DEFAULT,
  TOAST_SUBTITLE_DEFAULT,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
} from "constants/index";

export function Toast({ open, toast, dismissToast }) {
  return (
    <MUISnackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={5000}
      message={
        <Box display="flex">
          <Box
            width={12}
            height={12}
            display="flex"
            alignSelf="center"
            mr={2}
            borderRadius="50%"
            sx={{
              backgroundColor:
                toast.type === TOAST_TYPE_ERROR
                  ? "custom.redMain"
                  : "custom.greenMain",
            }}
          />
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body1"
              color={toast.type === TOAST_TYPE_ERROR ? "redMain" : "greenMain"}
            >
              {toast.message}
            </Typography>
            <Typography
              variant="body2"
              color={
                toast.type === TOAST_TYPE_ERROR
                  ? "redSecondary"
                  : "greenSecondary"
              }
            >
              {toast.subtitle}
            </Typography>
          </Box>
        </Box>
      }
      onClose={dismissToast}
      action={
        <IconButton onClick={dismissToast}>
          <Close />
        </IconButton>
      }
      sx={{
        borderRadius: 2,
        "& .MuiPaper-root": {
          backgroundColor: "custom.white",
          borderRadius: 2,
          boxShadow: ({ palette }) => palette.custom.shadow,
          borderLeftWidth: 8,
          borderLeftStyle: "solid",
          borderLeftColor:
            toast.type === TOAST_TYPE_ERROR
              ? "custom.redMain"
              : "custom.greenMain",
        },
      }}
    />
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  toast: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
  dismissToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  open: false,
  toast: {
    type: TOAST_TYPE_SUCCESS,
    message: TOAST_MESSAGE_DEFAULT,
    subtitle: TOAST_SUBTITLE_DEFAULT,
  },
  dismissToast: () => {},
};
