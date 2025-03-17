import { IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";

interface ActionButtonsProps {
  onEdit: (event: React.MouseEvent) => void;
  onDelete: (event: React.MouseEvent) => void;
}

export const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <>
      <Tooltip title="Editar">
        <motion.div whileHover={{ scale: 1.1 }}>
          <IconButton
            onClick={onEdit}
            color="primary"
            size="small"
            sx={{ mx: 0.5 }}
          >
            <Edit />
          </IconButton>
        </motion.div>
      </Tooltip>
      <Tooltip title="Excluir">
        <motion.div whileHover={{ scale: 1.1 }}>
          <IconButton
            onClick={onDelete}
            color="error"
            size="small"
            sx={{ mx: 0.5 }}
          >
            <Delete />
          </IconButton>
        </motion.div>
      </Tooltip>
    </>
  );
};
