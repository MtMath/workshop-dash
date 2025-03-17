import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import { api } from "../services/api";

interface Collaborator {
  id: number;
  nome: string;
}

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Collaborator | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ id: 0, nome: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadCollaborators();
  }, []);

  const loadCollaborators = async () => {
    setLoading(true);
    try {
      const response = await api.get("/collaborators");
      setCollaborators(response.data);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erro ao carregar colaboradores");
      setLoading(false);
    }
  };

  const handleOpenDialog = (collaborator?: Collaborator) => {
    setFormData(collaborator || { id: 0, nome: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        await api.put(`/collaborators/${formData.id}`, formData);
        setSuccessMessage("Colaborador atualizado com sucesso!");
      } else {
        await api.post("/collaborators", formData);
        setSuccessMessage("Colaborador criado com sucesso!");
      }
      setOpenDialog(false);
      loadCollaborators();
    } catch (error) {
      setErrorMessage("Erro ao salvar colaborador");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      setLoading(true);
      try {
        await api.delete(`/collaborators/${id}`);
        setSuccessMessage("Colaborador excluído com sucesso!");
        loadCollaborators();
      } catch (error) {
        setErrorMessage("Erro ao excluir colaborador");
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mt={4} mb={2} color="primary">
        Colaboradores
      </Typography>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Novo Colaborador
        </Button>
      </motion.div>

      {loading ? (
        <CircularProgress
          color="primary"
          sx={{ display: "block", margin: "auto", marginTop: 5 }}
        />
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {collaborators.map((collaborator) => (
              <ListItem
                key={collaborator.id}
                divider
                button
                onClick={() => setSelectedCollaborator(collaborator)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={collaborator.nome} />
                <motion.div whileHover={{ scale: 1.1 }}>
                  <IconButton onClick={() => handleOpenDialog(collaborator)}>
                    <Edit color="primary" />
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <IconButton onClick={() => handleDelete(collaborator.id)}>
                    <Delete color="error" />
                  </IconButton>
                </motion.div>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Dialog para Criar/Editar Colaborador */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {formData.id ? "Editar Colaborador" : "Novo Colaborador"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : formData.id ? (
              "Salvar"
            ) : (
              "Criar"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Exibir detalhes do colaborador */}
      {selectedCollaborator && (
        <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h5">{selectedCollaborator.nome}</Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            Detalhes do colaborador
          </Typography>
        </Paper>
      )}

      {/* Snackbars para feedback */}
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
        />
      )}
      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          message={errorMessage}
        />
      )}
    </Container>
  );
}
