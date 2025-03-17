import { useState, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FormDialog } from "../components/FormDialog";
import { Notifications } from "../components/Notifications";
import { Workshop, WorkshopRequest } from "../types";
import { workshopsService } from "../services/workshopsService";
import { WorkshopCard } from "../components/workshops/WorkshopCard";
import { WorkshopForm } from "../components/workshops/WorkshopForm";

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<WorkshopRequest>({
    title: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingWorkshopId, setEditingWorkshopId] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    setLoading(true);
    try {
      const response = await workshopsService.getAll();
      setWorkshops(response.data);
    } catch (error) {
      setErrorMessage("Erro ao carregar workshops");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (workshop?: Workshop) => {
    if (workshop) {
      setFormData({
        title: workshop.name,
        date: workshop.realizationDate.split("T")[0],
        capacity: workshop.capacity,
        description: workshop.description,
      });
      setEditingWorkshopId(workshop.id);
    } else {
      setFormData({
        title: "",
        date: "",
        description: "",
      });
      setEditingWorkshopId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingWorkshopId !== null) {
        await workshopsService.update(editingWorkshopId, formData);
        setSuccessMessage("Workshop atualizado com sucesso!");
      } else {
        await workshopsService.create(formData);
        setSuccessMessage("Workshop criado com sucesso!");
      }
      setOpenDialog(false);
      loadWorkshops();
    } catch (error) {
      setErrorMessage("Erro ao salvar workshop");
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
        await workshopsService.delete(id);
        setSuccessMessage("Workshop excluído com sucesso!");
        loadWorkshops();
      } catch (error) {
        setErrorMessage("Erro ao excluir workshop");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (workshop: Workshop, event: React.MouseEvent) => {
    event.stopPropagation();
    handleOpenDialog(workshop);
  };

  // Update workshops when attendees change
  const handleAttendeeUpdate = () => {
    loadWorkshops();
    setSuccessMessage("Participantes atualizados com sucesso!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flex: 1,
      }}
    >
      <Container
        sx={{
          width: "100%",
          maxWidth: "100% !important",
          px: { xs: 2, sm: 3, md: 4 },
          py: 4,
          flex: 1,
        }}
      >
        <PageHeader
          title="Workshops"
          subtitle="Gerencie seus workshops e participantes"
          onAddNew={() => handleOpenDialog()}
          addButtonText="Novo Workshop"
        />

        {loading && !openDialog ? (
          <LoadingSpinner />
        ) : (
          <Box>
            {workshops.length === 0 ? (
              <EmptyState
                message="Nenhum workshop encontrado"
                submessage="Clique em 'Novo Workshop' para começar"
              />
            ) : (
              <Grid container spacing={3}>
                {workshops.map((workshop) => (
                  <Grid item xs={12} key={workshop.id}>
                    <WorkshopCard
                      workshop={workshop}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onUpdate={handleAttendeeUpdate}
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
            editingWorkshopId !== null ? "Editar Workshop" : "Novo Workshop"
          }
          onClose={handleCloseDialog}
          onSave={handleSave}
          loading={loading}
          isEdit={editingWorkshopId !== null}
          disabled={!formData.title || !formData.date || !formData.description}
        >
          <WorkshopForm formData={formData} setFormData={setFormData} />
        </FormDialog>

        <Notifications
          successMessage={successMessage}
          errorMessage={errorMessage}
          onCloseSuccess={() => setSuccessMessage(null)}
          onCloseError={() => setErrorMessage(null)}
        />
      </Container>
    </Box>
  );
}
