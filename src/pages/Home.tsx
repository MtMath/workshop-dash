import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" fontWeight="bold" color="primary">
            FAST Soluções
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography variant="h5" color="text.secondary">
            Acompanhe workshops, analise métricas e melhore a experiência de
            aprendizado.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/workshops")}
            >
              Ver Workshops
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate("/register")}
            >
              Criar Conta
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* Background Effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: "linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)",
          opacity: 0.15,
        }}
      />
    </Container>
  );
}
