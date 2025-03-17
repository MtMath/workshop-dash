import { TextField } from "@mui/material";
import { WorkshopRequest } from "../../types";

interface WorkshopFormProps {
  formData: WorkshopRequest;
  setFormData: React.Dispatch<React.SetStateAction<WorkshopRequest>>;
}

export const WorkshopForm = ({ formData, setFormData }: WorkshopFormProps) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Título"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Data de Realização"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Capacidade"
        type="number"
        value={formData.capacity || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            capacity: parseInt(e.target.value) || undefined,
          })
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Descrição"
        multiline
        rows={4}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />
    </>
  );
};
