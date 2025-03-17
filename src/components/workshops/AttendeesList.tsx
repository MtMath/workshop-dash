import { Box, Grid, Paper, Typography, Chip } from "@mui/material";
import { Check, Clear, Info } from "@mui/icons-material";
import { AttendeesRecord } from "../../types";

interface AttendeesListProps {
  attendees: AttendeesRecord[];
}

export const AttendeesList = ({ attendees }: AttendeesListProps) => {
  if (!attendees || attendees.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Info color="action" sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Nenhum colaborador registrado para este workshop.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", borderRadius: 1, p: 1 }}>
      <Grid container spacing={2}>
        {attendees.map((attendee) => (
          <Grid item xs={12} sm={6} md={4} key={attendee.id}>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">
                Colaborador ID: {attendee.collaboratorId}
              </Typography>
              <Chip
                size="small"
                icon={attendee.attended ? <Check /> : <Clear />}
                label={attendee.attended ? "Presente" : "Ausente"}
                color={attendee.attended ? "success" : "default"}
                variant={attendee.attended ? "filled" : "outlined"}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
