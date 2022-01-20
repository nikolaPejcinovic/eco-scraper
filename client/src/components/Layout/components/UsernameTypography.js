// Components
import { Typography } from "components";

// Utils
import { useSelector } from "react-redux";

// Selectors
import { selectUsername } from "redux/reducers/authReducer";

export function UsernameTypography() {
  const username = useSelector(selectUsername);

  return (
    <Typography variant="h6" color="white" sx={{ marginLeft: 1.5 }}>
      {username}
    </Typography>
  );
}
