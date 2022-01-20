import { useState } from "react";

// Components
import { Input, InputWrapper, Typography } from "components";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

// Utils
import { useNavigate } from "react-router-dom";

// Service
import { useRegister } from "service/auth";

// Hooks
import { useLinearProgressContext } from "contexts";
import { useToastContext } from "contexts/ToastContext/ToastContext";

// Constants
import {
  REGISTER_TITLE,
  REGISTER_MESSAGE_SUCCESS,
  REGISTER_SUBTITLE_SUCCESS,
  AUTH_SUBTITLE,
  LOGIN,
  TOAST_TYPE_ERROR,
  REGISTER_MESSAGE_ERROR,
  REGISTER_PROMPT,
  REGISTER_LINK_TEXT,
  TOAST_TYPE_SUCCESS,
} from "constants/index";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [register, { isLoading }] = useRegister();
  const { setProgress } = useLinearProgressContext();
  const { openToast, dismissToast } = useToastContext();

  function handleChange({ target }) {
    setUsername(target.value);
  }

  async function handleClick() {
    setProgress(true);

    try {
      const result = await register({ username }).unwrap();

      if (result) {
        openToast({
          message: REGISTER_MESSAGE_SUCCESS,
          subtitle: REGISTER_SUBTITLE_SUCCESS,
          type: TOAST_TYPE_SUCCESS,
        });

        setTimeout(() => {
          navigate(`/${LOGIN}`);
          setProgress(false);
          dismissToast();
        }, 3000);
      }
    } catch (e) {
      setProgress(false);
      openToast({
        message: REGISTER_MESSAGE_ERROR,
        subtitle: e.data.message,
        type: TOAST_TYPE_ERROR,
      });
    }
  }

  return (
    <InputWrapper>
      <Typography variant="h4" color="redMain">
        {REGISTER_TITLE}
      </Typography>
      <Typography variant="body1" color="redMain" sx={{ marginLeft: 0.5 }}>
        {AUTH_SUBTITLE}
      </Typography>
      <Input
        value={username}
        onChange={handleChange}
        onClick={handleClick}
        loading={isLoading}
        buttonAction="Register"
      />
      <Box
        ml="auto"
        mr={0.5}
        mt={1}
        sx={{
          color: "custom.redMain",
          a: { color: "custom.redMain", marginLeft: 0.5 },
        }}
      >
        {REGISTER_PROMPT}
        <Link to={`/${LOGIN}`}>{REGISTER_LINK_TEXT}</Link>
      </Box>
    </InputWrapper>
  );
}

export default Register;
