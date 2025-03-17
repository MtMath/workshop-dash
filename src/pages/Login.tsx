import { useState } from "react";
import { Button, Container, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login with:", email, password);
    // Aqui chamaria o service de autenticação
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
            Bem-vindo!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Faça login para acessar o painel de workshops.
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

          {/* Botão de Login */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </motion.div>

          {/* Link para Registro */}
          <Typography variant="body2" color="text.secondary" mt={2}>
            Não tem conta?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
}
