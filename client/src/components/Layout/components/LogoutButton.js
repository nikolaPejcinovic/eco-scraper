// Components
import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Utils
import { useDispatch } from "react-redux";

// Actions
import { setCredentials } from "redux/reducers/authReducer";

export function LogoutButton() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      setCredentials({ username: "", token: "", isAuthenticated: false })
    );
  }

  return (
    <IconButton
      sx={{ color: "custom.white", marginLeft: 2 }}
      onClick={handleClick}
    >
      <Logout />
    </IconButton>
  );
}
