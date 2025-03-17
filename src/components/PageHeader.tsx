import { Typography, Grid, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onAddNew: () => void;
  addButtonText: string;
}

export const PageHeader = ({
  title,
  subtitle,
  onAddNew,
  addButtonText,
}: PageHeaderProps) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Grid item xs>
        <Typography variant="h4" fontWeight="bold" color="primary">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAddNew}
            size="large"
          >
            {addButtonText}
          </Button>
        </motion.div>
      </Grid>
    </Grid>
  );
};
