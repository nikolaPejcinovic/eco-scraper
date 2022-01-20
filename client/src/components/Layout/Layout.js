// Components
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Toolbar, Box } from "@mui/material";
import { LogoTypography } from "./components/LogoTypography";
import { UsernameTypography } from "./components/UsernameTypography";
import { LogoutButton } from "./components/LogoutButton";

// Hooks
import { useScreens } from "hooks";

// Constants
import { SM } from "constants/index";

export function Layout() {
  const smallScreens = useScreens(SM);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "custom.redMain" }}>
        <Toolbar>
          <LogoTypography smallScreens={smallScreens} />
          <Box display="flex" marginLeft="auto" alignItems="center">
            <AccountCircle sx={{ fontSize: 20 }} />
            <UsernameTypography smallScreens={smallScreens} />
          </Box>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </>
  );
}
