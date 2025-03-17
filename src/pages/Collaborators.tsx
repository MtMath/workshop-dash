import { useState, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FormDialog } from "../components/FormDialog";
import { Notifications } from "../components/Notifications";
import { CollaboratorCard } from "../components/collaborators/CollaboratorCard";
import { CollaboratorForm } from "../components/collaborators/CollaboratorForm";
import { Collaborator, CollaboratorRequest } from "../types";
import { collaboratorsService } from "../services/collaboratorsService";

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<CollaboratorRequest>({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingCollaboratorId, setEditingCollaboratorId] = useState<
    number | null
  >(null);

  useEffect(() => {
    loadCollaborators();
  }, []);

  const loadCollaborators = async () => {
    setLoading(true);
    try {
      const response = await collaboratorsService.getAll();
      setCollaborators(response.data);
    } catch (error) {
      setErrorMessage("Erro ao carregar colaboradores");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (collaborator?: Collaborator) => {
    if (collaborator) {
      setFormData({
        name: collaborator.name,
      });
      setEditingCollaboratorId(collaborator.id);
    } else {
      setFormData({
        name: "",
      });
      setEditingCollaboratorId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingCollaboratorId !== null) {
        // Find the existing collaborator to preserve attendances data
        const existingCollaborator = collaborators.find(
          (c) => c.id === editingCollaboratorId
        );

        // Need to create a full Collaborator object for the update
        const collaboratorData: Collaborator = {
          id: editingCollaboratorId,
          name: formData.name,
          attendances: existingCollaborator?.attendances || [],
        };

        await collaboratorsService.update(
          editingCollaboratorId,
          collaboratorData
        );
        setSuccessMessage("Colaborador atualizado com sucesso!");
      } else {
        // For create, we'll need to create a temporary ID since the service expects a Collaborator
        // In reality, the API would generate this ID
        const newCollaborator: Collaborator = {
          id: 0,
          name: formData.name,
          attendances: [],
        };

        await collaboratorsService.create(newCollaborator);
        setSuccessMessage("Colaborador criado com sucesso!");
      }
      setOpenDialog(false);
      loadCollaborators();
    } catch (error) {
      setErrorMessage("Erro ao salvar colaborador");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm("Tem certeza que deseja excluir?")) {
      setLoading(true);
      try {
        await collaboratorsService.delete(id);
        setSuccessMessage("Colaborador excluído com sucesso!");
        loadCollaborators();
      } catch (error) {
        setErrorMessage("Erro ao excluir colaborador");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (collaborator: Collaborator, event: React.MouseEvent) => {
    event.stopPropagation();
    handleOpenDialog(collaborator);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <PageHeader
          title="Colaboradores"
          subtitle="Gerencie os colaboradores da sua empresa"
          onAddNew={() => handleOpenDialog()}
          addButtonText="Novo Colaborador"
        />

        {loading && !openDialog ? (
          <LoadingSpinner />
        ) : (
          <Box>
            {collaborators.length === 0 ? (
              <EmptyState
                message="Nenhum colaborador encontrado"
                submessage="Clique em 'Novo Colaborador' para começar"
              />
            ) : (
              <Grid container spacing={3}>
                {collaborators.map((collaborator) => (
                  <Grid item xs={12} key={collaborator.id}>
                    <CollaboratorCard
                      collaborator={collaborator}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        <FormDialog
          open={openDialog}
          title={
            editingCollaboratorId !== null
              ? "Editar Colaborador"
              : "Novo Colaborador"
          }
          onClose={handleCloseDialog}
          onSave={handleSave}
          loading={loading}
          isEdit={editingCollaboratorId !== null}
          disabled={!formData.name}
        >
          <CollaboratorForm formData={formData} setFormData={setFormData} />
        </FormDialog>

        <Notifications
          successMessage={successMessage}
          errorMessage={errorMessage}
          onCloseSuccess={() => setSuccessMessage(null)}
          onCloseError={() => setErrorMessage(null)}
        />
      </Box>
    </Container>
  );
}
