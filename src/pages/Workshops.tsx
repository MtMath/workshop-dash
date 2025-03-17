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

interface Workshop {
  id: number;
  nome: string;
  dataRealizacao: string;
  descricao: string;
  colaboradores: Collaborator[];
}

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    nome: "",
    dataRealizacao: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    setLoading(true);
    try {
      const response = await api.get("/workshops");
      setWorkshops(response.data);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Erro ao carregar workshops");
      setLoading(false);
    }
  };

  const handleOpenDialog = (workshop?: Workshop) => {
    setFormData(
      workshop || { id: 0, nome: "", dataRealizacao: "", descricao: "" }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        await api.put(`/workshops/${formData.id}`, formData);
        setSuccessMessage("Workshop atualizado com sucesso!");
      } else {
        await api.post("/workshops", formData);
        setSuccessMessage("Workshop criado com sucesso!");
      }
      setOpenDialog(false);
      loadWorkshops();
    } catch (error) {
      setErrorMessage("Erro ao salvar workshop");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      setLoading(true);
      try {
        await api.delete(`/workshops/${id}`);
        setSuccessMessage("Workshop excluído com sucesso!");
        loadWorkshops();
      } catch (error) {
        setErrorMessage("Erro ao excluir workshop");
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mt={4} mb={2} color="primary">
        Workshops
      </Typography>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Novo Workshop
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
            {workshops.map((workshop) => (
              <ListItem
                key={workshop.id}
                divider
                button
                onClick={() => setSelectedWorkshop(workshop)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText
                  primary={workshop.nome}
                  secondary={`Data: ${new Date(
                    workshop.dataRealizacao
                  ).toLocaleDateString()}`}
                />
                <motion.div whileHover={{ scale: 1.1 }}>
                  <IconButton onClick={() => handleOpenDialog(workshop)}>
                    <Edit color="primary" />
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <IconButton onClick={() => handleDelete(workshop.id)}>
                    <Delete color="error" />
                  </IconButton>
                </motion.div>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Dialog para Criar/Editar Workshop */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {formData.id ? "Editar Workshop" : "Novo Workshop"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Data"
            type="date"
            value={formData.dataRealizacao}
            onChange={(e) =>
              setFormData({ ...formData, dataRealizacao: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descrição"
            multiline
            rows={3}
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
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

      {/* Exibir detalhes dos colaboradores */}
      {selectedWorkshop && (
        <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h5">{selectedWorkshop.nome}</Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            {selectedWorkshop.descricao}
          </Typography>
          <Typography variant="h6" fontWeight="bold" mt={2}>
            Colaboradores Presentes
          </Typography>
          <List>
            {selectedWorkshop.colaboradores.map((colaborador) => (
              <ListItem key={colaborador.id}>
                <ListItemText primary={colaborador.nome} />
              </ListItem>
            ))}
          </List>
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
