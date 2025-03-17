import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Workshop, AttendeesRecord } from "../../types";
import { workshopsService } from "../../services/workshopsService";
import { AddCollaboratorDialog } from "./AddCollaboratorDialog";

interface WorkshopAttendeesProps {
  workshop: Workshop;
  onUpdate: () => void;
}

export const WorkshopAttendees = ({
  workshop,
  onUpdate,
}: WorkshopAttendeesProps) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveCollaborator = async (attendeeRecord: AttendeesRecord) => {
    setLoading(true);
    setError(null);
    try {
      await workshopsService.removeCollaborator(
        workshop.id,
        attendeeRecord.collaboratorId
      );
      onUpdate();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error removing collaborator:", error);
      setError("Erro ao remover colaborador do workshop");
    } finally {
      setLoading(false);
    }
  };

  // Get list of collaborator IDs who are already attending
  const existingAttendeeIds = workshop.attendees.map(
    (attendee) => attendee.collaboratorId
  );

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Participantes do Workshop
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<PersonAddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Adicionar Participante
            </Button>
          </motion.div>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {workshop.attendees.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "background.default",
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Nenhum participante registrado para este workshop.
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              onClick={() => setOpenAddDialog(true)}
              sx={{ mt: 1 }}
            >
              Adicionar Participante
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "background.default" }}>
                  <TableCell>
                    <Typography fontWeight="bold">ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Colaborador ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Data de Registro</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">Ações</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workshop.attendees.map((attendee) => (
                  <TableRow key={attendee.id} hover>
                    <TableCell>{attendee.id}</TableCell>
                    <TableCell>{attendee.collaboratorId}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        icon={attendee.attended ? <CheckIcon /> : <ClearIcon />}
                        label={attendee.attended ? "Presente" : "Ausente"}
                        color={attendee.attended ? "success" : "default"}
                        variant={attendee.attended ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell>{formatDate(attendee.createdAt)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Remover participante">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setConfirmDeleteId(attendee.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <AddCollaboratorDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        workshopId={workshop.id}
        onSuccess={onUpdate}
        existingAttendees={existingAttendeeIds}
      />

      <Dialog
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
      >
        <DialogTitle>Confirmar Remoção</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja remover este participante do workshop?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (confirmDeleteId !== null) {
                const attendee = workshop.attendees.find(
                  (a) => a.id === confirmDeleteId
                );
                if (attendee) {
                  handleRemoveCollaborator(attendee);
                }
              }
            }}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Remover"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
