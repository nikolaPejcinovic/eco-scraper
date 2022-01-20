// Components
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Hooks
import { useDrawerActions } from "contexts";

export function PanelClose() {
  const { setOpen } = useDrawerActions();

  function handleClose() {
    setOpen(false);
  }

  return (
    <IconButton
      sx={{
        marginBottom: 2,
        marginLeft: "auto",
        display: "flex",
        color: "custom.redSecondary",
      }}
      onClick={handleClose}
    >
      <Close />
    </IconButton>
  );
}
