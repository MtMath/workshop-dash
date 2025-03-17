import { Typography, Paper } from "@mui/material";

interface EmptyStateProps {
  message: string;
  submessage?: string;
}

export const EmptyState = ({ message, submessage }: EmptyStateProps) => {
  return (
    <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      {submessage && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {submessage}
        </Typography>
      )}
    </Paper>
  );
};
