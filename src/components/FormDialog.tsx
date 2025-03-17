import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface FormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
  loading: boolean;
  isEdit: boolean;
  disabled: boolean;
  children: React.ReactNode;
}

export const FormDialog = ({
  open,
  title,
  onClose,
  onSave,
  loading,
  isEdit,
  disabled,
  children,
}: FormDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={loading || disabled}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isEdit ? (
            "Atualizar"
          ) : (
            "Criar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
