import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
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

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
        sx={{
          py: 6,
          px: 4,
          my: 6,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          color: "white",
          textAlign: "center",
          mx: "auto",
          maxWidth: "900px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Pronto para começar?
        </Typography>
        <Typography
          variant="h6"
          fontWeight="normal"
          mb={4}
          sx={{ opacity: 0.9 }}
        >
          Junte-se a nossa comunidade e transforme sua experiência de
          aprendizado
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: "white",
            color: "primary.main",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.9)",
            },
          }}
        >
          Comece Agora
        </Button>
      </Box>
    </Container>
  );
}
