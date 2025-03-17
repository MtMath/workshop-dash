import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            FAST Soluções
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              component={Link}
              to="/collaborators"
              variant="text"
              sx={{ color: "white" }}
            >
              Colaboradores
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              component={Link}
              to="/workshops"
              variant="text"
              sx={{ color: "white" }}
            >
              Workshops
            </Button>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
