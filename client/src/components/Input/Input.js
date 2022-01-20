import PropTypes from "prop-types";

// Components
import { Typography } from "components";
import { LoadingButton } from "@mui/lab";
import { Login as LoginIcon } from "@mui/icons-material";
import { TextField } from "@mui/material";

export function Input({ value, onChange, onClick, loading, buttonAction }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "custom.redMain",
          padding: "0 0 0 12px",
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: ({ palette }) => palette.custom.overlay,
            },
          },
        },
        "& input": {
          padding: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: 3,
        },
        "&&& .Mui-focused fieldset": {
          borderColor: ({ palette }) => palette.custom.overlay,
          borderWidth: 1,
        },
      }}
      InputProps={{
        endAdornment: (
          <LoadingButton
            onClick={onClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            variant="contained"
            disabled={!value.length || value.length >= 10}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              "&:hover": { backgroundColor: "custom.redSecondary" },
              zIndex: 1,
            }}
          >
            <Typography variant="body1" color="white">
              {buttonAction}
            </Typography>
          </LoadingButton>
        ),
      }}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonAction: PropTypes.string.isRequired,
};

Input.defaultProps = {
  value: "",
  onChange: () => {},
  onClick: () => {},
  loading: false,
  buttonAction: "Click",
};
