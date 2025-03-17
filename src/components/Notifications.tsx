import { Snackbar } from "@mui/material";

interface NotificationsProps {
  successMessage: string | null;
  errorMessage: string | null;
  onCloseSuccess: () => void;
  onCloseError: () => void;
}

export const Notifications = ({
  successMessage,
  errorMessage,
  onCloseSuccess,
  onCloseError,
}: NotificationsProps) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={onCloseSuccess}
        message={successMessage}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(errorMessage)}
        autoHideDuration={3000}
        onClose={onCloseError}
        message={errorMessage}
      />
    </>
  );
};
