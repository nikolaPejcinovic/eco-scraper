import { useState } from "react";

// Utils
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import { InputWrapper, Input, Typography } from "components";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

// Actions
import { setCredentials } from "redux/reducers/authReducer";

// Service
import { useLogin } from "service/auth";

// Hooks
import { useLinearProgressContext } from "contexts";
import { useToastContext } from "contexts/ToastContext/ToastContext";

// Constants
import {
  ARTICLES,
  LOGIN_MESSAGE_SUCCESS,
  LOGIN_SUBTITLE_SUCCESS,
  TOAST_TYPE_ERROR,
  LOGIN_MESSAGE_ERROR,
  LOGIN_TITLE,
  AUTH_SUBTITLE,
  LOGIN_PROMPT,
  LOGIN_LINK_TEXT,
  REGISTER,
  TOAST_TYPE_SUCCESS,
} from "constants/index";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [login, { isLoading }] = useLogin();
  const { setProgress } = useLinearProgressContext();
  const { openToast } = useToastContext();

  function handleChange({ target }) {
    setUsername(target.value);
  }

  async function handleClick() {
    setProgress(true);

    try {
      const result = await login({ username }).unwrap();

      if (result) {
        dispatch(setCredentials({ ...result, isAuthenticated: true }));
        navigate(`/${ARTICLES}`);
        setProgress(false);
        openToast({
          message: LOGIN_MESSAGE_SUCCESS,
          subtitle: LOGIN_SUBTITLE_SUCCESS,
          type: TOAST_TYPE_SUCCESS,
        });
      }
    } catch (e) {
      setProgress(false);
      openToast({
        message: LOGIN_MESSAGE_ERROR,
        subtitle: e.data.message,
        type: TOAST_TYPE_ERROR,
      });
    }
  }

  return (
    <InputWrapper>
      <Typography variant="h4" color="redMain">
        {LOGIN_TITLE}
      </Typography>
      <Typography variant="body1" color="redMain" sx={{ marginLeft: 0.5 }}>
        {AUTH_SUBTITLE}
      </Typography>
      <Input
        value={username}
        onChange={handleChange}
        onClick={handleClick}
        loading={isLoading}
        buttonAction="Login"
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
        {LOGIN_PROMPT}
        <Link to={`/${REGISTER}`}>{LOGIN_LINK_TEXT}</Link>
      </Box>
    </InputWrapper>
  );
}

export default Login;
