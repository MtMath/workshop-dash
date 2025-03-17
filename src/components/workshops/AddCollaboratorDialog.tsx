import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { Collaborator } from "../../types";
import { collaboratorsService } from "../../services/collaboratorsService";
import { workshopsService } from "../../services/workshopsService";

interface AddCollaboratorDialogProps {
  open: boolean;
  onClose: () => void;
  workshopId: number;
  onSuccess: () => void;
  // Array of collaborator IDs who are already attending the workshop
  existingAttendees: number[];
}

export const AddCollaboratorDialog = ({
  open,
  onClose,
  workshopId,
  onSuccess,
  existingAttendees,
}: AddCollaboratorDialogProps) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState<number | "">(
    ""
  );
  const [loading, setLoading] = useState(false);
  const [fetchingCollaborators, setFetchingCollaborators] = useState(false);
  const [attended, setAttended] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch collaborators when dialog opens
  useEffect(() => {
    if (open) {
      fetchCollaborators();
    }
  }, [open]);

  const fetchCollaborators = async () => {
    setFetchingCollaborators(true);
    try {
      const response = await collaboratorsService.getAll();
      setCollaborators(response.data);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      setError("Erro ao carregar colaboradores");
    } finally {
      setFetchingCollaborators(false);
    }
  };

  const handleAddCollaborator = async () => {
    if (!selectedCollaborator) {
      setError("Por favor, selecione um colaborador");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await workshopsService.addCollaborator(
        workshopId,
        selectedCollaborator as number
      );
      onSuccess();
      onClose();
      // Reset the form
      setSelectedCollaborator("");
      setAttended(false);
    } catch (error) {
      console.error("Error adding collaborator:", error);
      setError("Erro ao adicionar colaborador ao workshop");
    } finally {
      setLoading(false);
    }
  };

  const availableCollaborators = collaborators.filter(
    (collab) => !existingAttendees.includes(collab.id)
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Colaborador ao Workshop</DialogTitle>
      <Divider />
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {fetchingCollaborators ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        ) : availableCollaborators.length === 0 ? (
          <Typography color="text.secondary" sx={{ my: 2 }}>
            Não há colaboradores disponíveis para adicionar a este workshop.
          </Typography>
        ) : (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="collaborator-select-label">
                Colaborador
              </InputLabel>
              <Select
                labelId="collaborator-select-label"
                value={selectedCollaborator}
                onChange={(e) =>
                  setSelectedCollaborator(e.target.value as number)
                }
                label="Colaborador"
              >
                {availableCollaborators.map((collaborator) => (
                  <MenuItem key={collaborator.id} value={collaborator.id}>
                    {collaborator.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={attended}
                  onChange={(e) => setAttended(e.target.checked)}
                />
              }
              label="Marcar como presente"
              sx={{ mt: 2 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleAddCollaborator}
          variant="contained"
          color="primary"
          disabled={
            loading ||
            fetchingCollaborators ||
            availableCollaborators.length === 0 ||
            !selectedCollaborator
          }
        >
          {loading ? <CircularProgress size={24} /> : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
