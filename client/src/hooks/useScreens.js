// Utils
import { useTheme, useMediaQuery } from "@mui/material";

export function useScreens(size) {
  const { breakpoints } = useTheme();

  return useMediaQuery(`(max-width:${breakpoints.values[size]}px)`, {
    noSsr: true,
    defaultMatches: true,
  });
}
