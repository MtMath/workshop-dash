import { useState } from "react";
import { Button, Container, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Register with:", email, password);
    // Aqui chamaria o service de registro
  };

  return (
    <Container maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={4}
          sx={{ p: 4, mt: 10, textAlign: "center", borderRadius: 3 }}
        >
          {/* Título */}
          <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
            Criar Conta
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Registre-se para acessar os workshops.
          </Typography>

          {/* Campos de entrada */}
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

          {/* Botão de Registro */}
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

          {/* Link para Login */}
          <Typography variant="body2" color="text.secondary" mt={2}>
            Já tem uma conta?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Faça login
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
}
