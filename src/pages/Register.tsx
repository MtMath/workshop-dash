import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }
    console.log("Register with:", email, password);
    authService.register(email, password).then((response) => {
      console.log("Register response:", response);
      navigate("/login");
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "450px",
          mx: "auto",
          p: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
              Criar Conta
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Registre-se para acessar os workshops.
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirmar Senha"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleRegister}
              >
                Registrar
              </Button>
            </motion.div>

            <Typography variant="body2" color="text.secondary" mt={2}>
              Já tem uma conta?{" "}
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => navigate("/login")}
              >
                Faça login
              </Typography>
            </Typography>
          </Paper>
        </motion.div>
      </Box>

      {/* Snackbars para feedback */}
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
        />
      )}
      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          message={errorMessage}
        />
      )}
    </Box>
  );
}
