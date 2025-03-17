import { TextField } from "@mui/material";
import { CollaboratorRequest } from "../../types";

interface CollaboratorFormProps {
  formData: CollaboratorRequest;
  setFormData: React.Dispatch<React.SetStateAction<CollaboratorRequest>>;
}

export const CollaboratorForm = ({
  formData,
  setFormData,
}: CollaboratorFormProps) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        autoFocus
      />
    </>
  );
};
